import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';
import { createSessionCookie } from '@/lib/auth/session';
import { z } from 'zod';

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

// Mechanical Rate Limiter fallback mapping IPs securely maintaining memory context locally. 
// A database bounded system is necessary long term.
const rateLimitCache = new Map<string, { count: number; expiresAt: number }>();

export async function POST(request: Request) {
    try {
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const now = Date.now();

        // Very basic simple Rate limiting mechanics: 5 attempts per 15 minutes mapping directly natively 
        const rateRecord = rateLimitCache.get(ip);
        if (rateRecord && rateRecord.expiresAt > now) {
            if (rateRecord.count >= 5) {
                return NextResponse.json({ error: "Too many login attempts. Please try again later." }, { status: 429 });
            }
            rateLimitCache.set(ip, { count: rateRecord.count + 1, expiresAt: rateRecord.expiresAt });
        } else {
            rateLimitCache.set(ip, { count: 1, expiresAt: now + 15 * 60 * 1000 }); // 15 mins block span limit
        }

        const body = await request.json();
        const parseResult = LoginSchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json({ error: "Invalid email or password format." }, { status: 400 });
        }

        const { email, password } = parseResult.data;

        // Fetch securely matching existing identity resolving accurately
        const admin = await prisma.admin.findUnique({
            where: { email: email.toLowerCase() }
        });

        // Fail unambiguously cleanly
        if (!admin || !admin.passwordHash) {
            return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
        }

        if (!admin.isActive) {
            return NextResponse.json({ error: "Account disabled. Secure intervention required." }, { status: 403 });
        }

        // Strongly enforce bcrypt cryptography boundaries validating authentication mechanically natively properly
        const isSecureMatch = await bcrypt.compare(password, admin.passwordHash);

        if (!isSecureMatch) {
            return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
        }

        // Successfully authenticated intercept:
        await prisma.admin.update({
            where: { id: admin.id },
            data: { lastLoginAt: new Date() }
        });

        // Bind session natively securely avoiding localStorage leaks
        await createSessionCookie(admin.id, admin.role);

        // Natively reset Rate Limiter block tracking safely mapped correctly
        rateLimitCache.delete(ip);

        return NextResponse.json({ success: true, redirect: "/dashboard" }, { status: 200 });

    } catch (e) {
        // Enforce generic internal error handling safely securely
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
