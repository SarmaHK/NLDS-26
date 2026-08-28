import { prisma } from '../db/prisma';

export async function logAudit(
    actorId: string,
    actorType: "ADMIN" | "SYSTEM",
    action: string,
    targetId: string,
    targetType: string,
    metadata?: Record<string, any>
) {
    try {
        await prisma.auditLog.create({
            data: {
                actorId,
                actorType,
                action,
                targetId,
                targetType,
                metadata: metadata ? JSON.stringify(metadata) : null
            }
        });
    } catch (e) {
        // Suppress failure defensively so primary actions don't abort, but tracking isn't critical path.
        console.error("Audit log failed to write:", e);
    }
}
