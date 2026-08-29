import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireSuperAdmin } from '@/lib/auth/rbac';

export async function GET() {
    try {
        await requireSuperAdmin();

        const users = await prisma.admin.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                isActive: true,
                lastLoginAt: true,
                createdAt: true,
                permissions: {
                    select: {
                        permission: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Map it so permissions is a clean array of strings
        const mappedUsers = users.map(u => ({
            ...u,
            permissions: u.permissions.map((p: any) => p.permission)
        }));

        return NextResponse.json({ users: mappedUsers });
    } catch (e: any) {
        if (e.name === 'AuthorizationError') return NextResponse.json({ error: e.message }, { status: 403 });
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
