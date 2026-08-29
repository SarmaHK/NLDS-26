import { cookies } from 'next/headers';
import { randomBytes, createHash } from 'crypto';
import { prisma } from '@/lib/db/prisma';

export const SESSION_COOKIE_NAME = 'nlds_admin_session';
export const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export function generateSessionToken() {
    return randomBytes(32).toString('hex');
}

export function hashToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
}

export async function createSession(adminId: string) {
    const token = generateSessionToken();
    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

    await prisma.adminSession.create({
        data: {
            adminId,
            tokenHash,
            expiresAt
        }
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: expiresAt
    });

    return token;
}

export async function destroySession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (token) {
        const tokenHash = hashToken(token);
        await prisma.adminSession.deleteMany({
            where: { tokenHash }
        });
        cookieStore.delete(SESSION_COOKIE_NAME);
    }
}

export async function getCurrentAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
        return null;
    }

    const tokenHash = hashToken(token);
    const session = await prisma.adminSession.findUnique({
        where: { tokenHash },
        include: {
            admin: {
                include: {
                    permissions: true
                }
            }
        }
    });

    if (!session || session.expiresAt < new Date() || session.revokedAt || !session.admin.isActive) {
        return null;
    }

    return {
        id: session.admin.id,
        email: session.admin.email,
        role: session.admin.role,
        isActive: session.admin.isActive,
        permissions: session.admin.permissions.map((p: any) => p.permission)
    };
}

export async function requireAuth() {
    const admin = await getCurrentAdmin();
    if (!admin) {
        throw new Error('UNAUTHORIZED');
    }
    return admin;
}
