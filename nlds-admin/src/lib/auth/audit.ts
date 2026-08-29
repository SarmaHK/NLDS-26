import { prisma } from '@/lib/db/prisma';

export async function logAudit(
    actorId: string | null,
    actorType: 'ADMIN' | 'SYSTEM',
    action: string,
    targetId: string | null,
    targetType: string,
    metadata?: any
) {
    try {
        await prisma.auditLog.create({
            data: {
                actorId,
                actorType,
                action,
                targetId,
                targetType,
                metadata: metadata ? JSON.stringify(metadata) : null,
            }
        });
    } catch (error) {
        console.error('Failed to write audit log:', error);
    }
}
