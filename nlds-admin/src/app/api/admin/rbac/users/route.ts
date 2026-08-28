import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireAdmin } from '@/lib/auth/session';
import { logAudit } from '@/lib/auth/audit';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const caller = await requireAdmin();
        if (caller.role !== "SUPER_ADMIN") {
            return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
        }

        const body = await request.json();
        const { email, password } = body;

        if (!email || !password || password.length < 8) {
            return NextResponse.json({ error: "Valid Email and 8+ char password required." }, { status: 400 });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existing = await prisma.admin.findUnique({ where: { email: normalizedEmail } });
        if (existing) {
            return NextResponse.json({ error: "Agent already exists." }, { status: 400 });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const newAdmin = await prisma.admin.create({
            data: {
                email: normalizedEmail,
                passwordHash,
                role: "OC_VIEWER",
                isActive: true
            }
        });

        await logAudit(caller.id, "ADMIN", "ADMIN_CREATED", newAdmin.id, "AdminUser", { email: normalizedEmail });

        return NextResponse.json({ success: true, id: newAdmin.id });
    } catch (e: any) {
        if (e.message === "UNAUTHORIZED" || e.message === "FORBIDDEN") return NextResponse.json({}, { status: 403 });
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
