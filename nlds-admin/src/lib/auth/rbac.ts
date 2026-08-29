import { getCurrentAdmin } from './session';
import { Permission, AdminRole } from '@prisma/client';

export class AuthorizationError extends Error {
    constructor(message: string = 'FORBIDDEN') {
        super(message);
        this.name = 'AuthorizationError';
    }
}

/**
 * Ensures the current user is fully authenticated and specifically authorized as a SUPER_ADMIN.
 * Will throw an AuthorizationError otherwise.
 */
export async function requireSuperAdmin() {
    const admin = await getCurrentAdmin();

    if (!admin) {
        throw new AuthorizationError('UNAUTHORIZED');
    }

    if (admin.role !== AdminRole.SUPER_ADMIN) {
        throw new AuthorizationError('CLEARANCE LEVEL INSUFFICIENT');
    }

    return admin;
}

/**
 * Ensures the current user is authenticated and has the requested permission.
 * SUPER_ADMIN role bypasses standard permission checks.
 */
export async function requirePermission(permission: Permission) {
    const admin = await getCurrentAdmin();

    if (!admin) {
        throw new AuthorizationError('UNAUTHORIZED');
    }

    if (admin.role === AdminRole.SUPER_ADMIN) {
        return admin;
    }

    if (!admin.permissions.includes(permission)) {
        throw new AuthorizationError('ACCESS RESTRICTED');
    }

    return admin;
}
