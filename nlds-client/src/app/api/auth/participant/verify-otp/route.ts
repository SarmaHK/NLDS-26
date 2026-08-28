// @ts-nocheck
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthService } from "@/lib/backend/services/auth.service";
import { z } from "zod";
import { RateLimiter } from "@/lib/backend/security/rate-limiter";
import { env } from "@/lib/config/env";

const authService = new AuthService();

const VerifySchema = z.object({
    aiesecEmail: z.string().email(),
    otp: z.string().length(6),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = VerifySchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: "Invalid payload formatting." }, { status: 400 });
        }

        // Limit brute force verifications matching native DB lockout bounds. Allows 100 hits max windowed for Dev.
        const ip = request.headers.get("x-forwarded-for") || "unknown";
        const rateKey = `otp_ver_${result.data.aiesecEmail}_${ip}`;
        if (!RateLimiter.check(rateKey, 100, 10 * 60 * 1000)) {
            return NextResponse.json({ error: "Too many verification attempts captured natively from Node layer IP sequence. Discarding." }, { status: 429 });
        }

        const sessionVector = await authService.verifyParticipantOTP(result.data.aiesecEmail, result.data.otp);

        // Security architecture constraint: Cookies mapped as strictly HttpOnly ensuring no DOM js scraping.
        const cookieStore = await cookies();
        cookieStore.set({
            name: "NLDS_SECURE_SESSION",
            value: sessionVector.sessionId,
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "lax",
            expires: sessionVector.expiresAt,
            path: "/"
        });

        return NextResponse.json({
            success: true,
            message: "AIESEC Verification Complete. Session Secured."
        }, { status: 200 });

    } catch (error: any) {
        console.error("[OTP Verify Error]:", error?.message);
        const safeMessage = (error?.message === "Invalid OTP code." || error?.message === "No active OTP request found, or challenge has expired.")
            ? error.message
            : "Internal Server Protocol Failure.";

        return NextResponse.json({ error: safeMessage }, { status: 400 });
    }
}
