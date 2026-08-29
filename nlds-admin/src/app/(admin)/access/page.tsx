import React from 'react';
import { requireSuperAdmin } from '@/lib/auth/rbac';
import prisma from '@/lib/db/prisma';
import AccessManagerClient from './AccessManagerClient';
import { redirect } from 'next/navigation';

export default async function AccessControlPage() {
    let currentUser;
    try {
        currentUser = await requireSuperAdmin();
    } catch {
        redirect('/dashboard?error=unauthorized');
    }

    const allAdmins = await prisma.admin.findMany({
        orderBy: { createdAt: 'desc' },
        include: { permissions: true }
    });

    const mapped = allAdmins.map(a => ({
        id: a.id,
        email: a.email,
        role: a.role,
        isActive: a.isActive,
        lastLoginAt: a.lastLoginAt?.toISOString() ?? null,
        createdAt: a.createdAt.toISOString(),
        permissions: a.permissions.map((p: any) => p.permission)
    }));

    return (
        <div className="space-y-[var(--section-gap)] animate-fade-in-up max-w-[1200px]">
            <div className="pb-6 border-b border-[var(--border)]">
                <h1 className="text-page-title">OC ACCESS</h1>
                <p className="text-meta mt-2">Manage admin operators and their permissions.</p>
            </div>
            <AccessManagerClient initialAdmins={mapped} />
        </div>
    );
}
