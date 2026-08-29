import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireSuperAdmin } from '@/lib/auth/rbac';
import { logAudit } from '@/lib/auth/audit';
import { AdminRole } from '@prisma/client';

export async function POST(request: Request) {
    try {
        const caller = await requireSuperAdmin();

        const body = await request.json();
        const { targetId, isActive } = body;

        const target = await prisma.admin.findUnique({ where: { id: targetId } });
        if (!target) return NextResponse.json({ error: "Target not found." }, { status: 404 });

        if (target.role === AdminRole.SUPER_ADMIN) {
            return NextResponse.json({ error: "Super Admin deactivation intrinsically blocked." }, { status: 400 });
        }

        await prisma.admin.update({
            where: { id: targetId },
            data: { isActive: !!isActive }
        });

        // Kill sessions if user is deactivated
        if (!isActive) {
            await prisma.adminSession.deleteMany({
                where: { adminId: targetId }
            });
        }

        await logAudit(caller.id, "ADMIN", isActive ? "ADMIN_ACTIVATED" : "ADMIN_DEACTIVATED", target.id, "AdminUser");

        return NextResponse.json({ success: true });
    } catch (e: any) {
        if (e.name === 'AuthorizationError') return NextResponse.json({ error: e.message }, { status: 403 });
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
