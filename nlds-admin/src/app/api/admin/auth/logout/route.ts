import { NextResponse } from 'next/server';
import { destroySession, getCurrentAdmin } from '@/lib/auth/session';
import { logAudit } from '@/lib/auth/audit';

export async function POST() {
    try {
        const admin = await getCurrentAdmin();

        // Destroy the session (removes DB record and clears cookie)
        await destroySession();

        if (admin) {
            // Best effort audit login
            await logAudit(
                admin.id,
                'ADMIN',
                'ADMIN_LOGOUT',
                admin.id,
                'AdminSession'
            );
        }

        return NextResponse.json({ success: true, redirect: '/login' });
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
    }
}
