import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/db/prisma';
import { createSession } from '@/lib/auth/session';
import { logAudit } from '@/lib/auth/audit';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const admin = await prisma.admin.findUnique({
            where: { email: email.toLowerCase() }
        });

        // Generic fallback mapping to prevent revealing email existence
        if (!admin || !admin.passwordHash) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        if (!admin.isActive) {
            return NextResponse.json({ error: 'Account deactivated' }, { status: 403 });
        }

        const isValid = await compare(password, admin.passwordHash);

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Create session and set HTTP-only cookie
        await createSession(admin.id);

        // Update last login
        await prisma.admin.update({
            where: { id: admin.id },
            data: { lastLoginAt: new Date() }
        });

        await logAudit(
            admin.id,
            'ADMIN',
            'ADMIN_LOGIN',
            admin.id,
            'AdminSession'
        );

        return NextResponse.json({ success: true, redirect: '/dashboard' });

    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
