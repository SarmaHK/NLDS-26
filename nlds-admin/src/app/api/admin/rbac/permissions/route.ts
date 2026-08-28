import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireAdmin } from '@/lib/auth/session';
import { logAudit } from '@/lib/auth/audit';

export async function POST(request: Request) {
    try {
        const caller = await requireAdmin();
        if (caller.role !== "SUPER_ADMIN") return NextResponse.json({ error: "Unauthorized." }, { status: 403 });

        const body = await request.json();
        const { targetId, permissions } = body;

        if (!targetId || !Array.isArray(permissions)) {
            return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
        }

        // Prevent self-destructive or cross-destructive edits logically
        const target = await prisma.admin.findUnique({ where: { id: targetId } });
        if (!target) return NextResponse.json({ error: "Target not found." }, { status: 404 });
        if (target.role === "SUPER_ADMIN") {
            return NextResponse.json({ error: "Super Admins intrinsically possess all permissions. Edits structurally rejected." }, { status: 400 });
        }

        // Wipe and replace atomically
        await prisma.$transaction([
            prisma.adminPermission.deleteMany({ where: { adminId: targetId } }),
            prisma.adminPermission.createMany({
                data: permissions.map((p: any) => ({ adminId: targetId, permission: p }))
            })
        ]);

        await logAudit(caller.id, "ADMIN", "PERMISSION_CHANGED", target.id, "AdminUser", { assigned: permissions });

        return NextResponse.json({ success: true });
    } catch (e: any) {
        if (e.message === "UNAUTHORIZED" || e.message === "FORBIDDEN") return NextResponse.json({}, { status: 403 });
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
