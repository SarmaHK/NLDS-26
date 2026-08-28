import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireAdmin } from '@/lib/auth/session';
import { logAudit } from '@/lib/auth/audit';

export async function POST(request: Request) {
    try {
        const caller = await requireAdmin();
        if (caller.role !== "SUPER_ADMIN") return NextResponse.json({ error: "Unauthorized." }, { status: 403 });

        const body = await request.json();
        const { targetId, isActive } = body;

        const target = await prisma.admin.findUnique({ where: { id: targetId } });
        if (!target) return NextResponse.json({ error: "Target not found." }, { status: 404 });

        if (target.role === "SUPER_ADMIN") {
            return NextResponse.json({ error: "Super Admin deactivation intrinsically blocked." }, { status: 400 });
        }

        await prisma.admin.update({
            where: { id: targetId },
            data: { isActive: !!isActive }
        });

        await logAudit(caller.id, "ADMIN", isActive ? "ADMIN_ACTIVATED" : "ADMIN_DEACTIVATED", target.id, "AdminUser");

        return NextResponse.json({ success: true });
    } catch (e: any) {
        if (e.message === "UNAUTHORIZED" || e.message === "FORBIDDEN") return NextResponse.json({}, { status: 403 });
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
