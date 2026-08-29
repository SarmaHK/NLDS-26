import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireSuperAdmin } from '@/lib/auth/rbac';
import { logAudit } from '@/lib/auth/audit';
import { Permission, AdminRole } from '@prisma/client';

export async function POST(request: Request) {
    try {
        const caller = await requireSuperAdmin();

        const body = await request.json();
        const { targetId, permissions } = body;

        if (!targetId || !Array.isArray(permissions)) {
            return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
        }

        // Prevent self-destructive or cross-destructive edits logically
        const target = await prisma.admin.findUnique({ where: { id: targetId } });
        if (!target) return NextResponse.json({ error: "Target not found." }, { status: 404 });

        if (target.role === AdminRole.SUPER_ADMIN) {
            return NextResponse.json({ error: "Super Admins intrinsically possess all permissions." }, { status: 400 });
        }

        // Validate that all strings map to real Permissions
        const validPermissions = Object.values(Permission);
        for (const p of permissions) {
            if (!validPermissions.includes(p as Permission)) {
                return NextResponse.json({ error: `Invalid permission string: ${p}` }, { status: 400 });
            }
        }

        // Wipe and replace atomically
        await prisma.$transaction([
            prisma.adminPermission.deleteMany({ where: { adminId: targetId } }),
            prisma.adminPermission.createMany({
                data: permissions.map((p: any) => ({ adminId: targetId, permission: p as Permission }))
            })
        ]);

        await logAudit(caller.id, "ADMIN", "PERMISSIONS_UPDATED", target.id, "AdminUser", { assigned: permissions });

        return NextResponse.json({ success: true });
    } catch (e: any) {
        if (e.name === 'AuthorizationError') return NextResponse.json({ error: e.message }, { status: 403 });
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
