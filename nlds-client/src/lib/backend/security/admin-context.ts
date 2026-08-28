// @ts-nocheck
import { cookies } from "next/headers";
import { prisma } from "../db/prisma";
import { AdminUser, AdminRole } from "./authorization.service";

/**
 * Extracts and strictly validates the active Admin payload from native NextJS secure cookies.
 * Resolves comprehensive recursive permissions mapping.
 */
export async function getAdminContext(): Promise<AdminUser | null> {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("NLDS_SECURE_SESSION")?.value;

    if (!sessionId) return null;

    const session = await prisma.adminSession.findFirst({
        where: {
            id: sessionId,
            revokedAt: null,
            expiresAt: { gt: new Date() }
        },
        include: {
            admin: {
                include: { permissions: true }
            }
        }
    });

    if (!session || !session.admin || !session.admin.isActive) return null;

    return {
        id: session.admin.id,
        role: session.admin.role as AdminRole,
        permissions: session.admin.permissions.map((p: any) => p.permission)
    };
}
