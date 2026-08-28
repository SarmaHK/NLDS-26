import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from '../db/prisma';

// Use a secure fallback specifically blocking production crashes if loosely configured
const SECRET_KEY = new TextEncoder().encode(
    process.env.SESSION_SECRET || 'fallback_development_secret_only_for_local_env'
);

export async function createSessionCookie(adminId: string, role: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Sign JWT cleanly
    const token = await new SignJWT({ adminId, role })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(SECRET_KEY);

    const cookieStore = await cookies();
    cookieStore.set('nlds_admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: expiresAt,
        path: '/'
    });
}

export async function destroySessionCookie() {
    const cookieStore = await cookies();
    cookieStore.delete('nlds_admin_session');
}

/**
 * getCurrentAdmin safely decrypts the JWT natively, securely checks DB for revocation/isActive states, 
 * preventing orphaned tokens structurally.
 */
export async function getCurrentAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get('nlds_admin_session')?.value;

    if (!token) {
        return null; // Structurally absent
    }

    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);

        // Block compromised tokens immediately via rigorous DB validation
        if (!payload.adminId) return null;

        const admin = await prisma.admin.findUnique({
            where: { id: payload.adminId as string },
            select: {
                id: true,
                email: true,
                role: true,
                isActive: true,
                lastLoginAt: true
            }
        });

        if (!admin || !admin.isActive) {
            return null; // DB Revocation intercepts cleanly
        }

        // Augment with explicitly pre-fetched permissions for extended RBAC enforcement
        const permissions = await prisma.adminPermission.findMany({
            where: { adminId: admin.id }
        });

        return {
            ...admin,
            permissions: permissions.map(p => p.permission)
        };
    } catch (e) {
        // Token forged or expired
        return null;
    }
}

/** Explicitly block unauthorized APIs entirely */
export async function requireAdmin() {
    const admin = await getCurrentAdmin();
    if (!admin) {
        throw new Error("UNAUTHORIZED");
    }
    return admin;
}

/** 
 * Enforce RBAC structurally. SUPER_ADMIN naturally bypasses everything.
 */
export async function requirePermission(requestedPermission: string) {
    const admin = await requireAdmin();

    // Explicit bypass
    if (admin.role === "SUPER_ADMIN") return admin;

    // Strict validation
    if (!admin.permissions.includes(requestedPermission as any)) {
        throw new Error("FORBIDDEN");
    }

    return admin;
}
