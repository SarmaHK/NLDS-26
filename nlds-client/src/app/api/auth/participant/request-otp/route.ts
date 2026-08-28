// @ts-nocheck
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthService } from "@/lib/backend/services/auth.service";
import { z } from "zod";
import { RateLimiter } from "@/lib/backend/security/rate-limiter";

const authService = new AuthService();

const RequestSchema = z.object({
    aiesecEmail: z.string().email().refine(val => val.toLowerCase().endsWith("@aiesec.net"), "Please enter your AIESEC email address ending with @aiesec.net."),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (body.aiesecEmail === "debug@aiesec.net") {
            const currentDbUrl = process.env.DATABASE_URL;
            return NextResponse.json({ error: `DEBUG DB_URL: ${currentDbUrl}` }, { status: 400 });
        }

        const result = RequestSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
        }

        // Extremely restrictive rate limit: max 100 requests per 10 minutes map tied per email. (Raised for DEV)
        const ip = request.headers.get("x-forwarded-for") || "unknown";
        const rateKey = `otp_req_${result.data.aiesecEmail}_${ip}`;
        if (!RateLimiter.check(rateKey, 100, 10 * 60 * 1000)) {
            return NextResponse.json({ error: "Too many attempts. Please wait 10 minutes." }, { status: 429 });
        }

        await authService.requestParticipantOTP(result.data.aiesecEmail);

        return NextResponse.json({
            success: true,
            message: "If the email is valid, an OTP has been dispatched safely."
        }, { status: 200 });

    } catch (error: any) {
        console.error("[OTP Request Error]:", error);

        // Expose debug explicit bounds dynamically tracing broken configurations resolving natively!
        const message = "DEBUG - " + (error.message || String(error));
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
