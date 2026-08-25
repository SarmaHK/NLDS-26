import { prisma } from "../db/prisma";
import { TelegramStrategy } from "./telegram.strategy";
import { GoogleSheetsStrategy } from "./sheets.strategy";
import { EmailStrategy } from "./email.strategy";
import { SocketIoStrategy } from "./socket.strategy";

export interface ExternalEvent {
    registrationId: string;
    referenceCode: string;
    type: "REGISTRATION_SUBMITTED" | "STATUS_CHANGED";
    payload: any;
}

export interface SyncStrategy {
    providerName: string;
    execute(event: ExternalEvent): Promise<void>;
}

export class ExternalSyncService {
    private strategies: SyncStrategy[] = [];

    registerStrategy(strategy: SyncStrategy) {
        this.strategies.push(strategy);
    }

    /**
     * Dispatches an event to all configured strategies natively without blocking node loops.
     */
    async dispatch(event: ExternalEvent) {
        for (const strategy of this.strategies) {
            // Native Fire and Forget handling wrapping around Database tracking implicitly
            this.handleDispatch(strategy, event).catch(err => {
                console.error(`[ExternalSync Error] - ${strategy.providerName}: `, err);
            });
        }
    }

    private async handleDispatch(strategy: SyncStrategy, event: ExternalEvent) {
        // Enforcing DB Idempotency across notifications explicitly to avoid spam triggers
        const existingSuccess = await prisma.externalSync.findFirst({
            where: {
                registrationId: event.registrationId,
                provider: strategy.providerName,
                eventType: event.type,
                status: "SUCCESS"
            }
        });

        if (existingSuccess) {
            console.log(`[Idempotency Watch] Dropping duplicate sequence for ${event.referenceCode} on ${strategy.providerName}`);
            return;
        }

        const syncRecord = await prisma.externalSync.create({
            data: {
                registrationId: event.registrationId,
                provider: strategy.providerName,
                eventType: event.type,
                status: "PENDING"
            }
        });

        try {
            await strategy.execute(event);

            await prisma.externalSync.update({
                where: { id: syncRecord.id },
                data: {
                    status: "SUCCESS",
                    syncedAt: new Date(),
                    attempts: 1
                }
            });
        } catch (error: any) {
            await prisma.externalSync.update({
                where: { id: syncRecord.id },
                data: {
                    status: "FAILED",
                    errorMessage: error.message || "Unknown external failure",
                    attempts: 1,
                    lastAttemptAt: new Date()
                }
            });
            throw error; // Let generic error handler catch and output without halting DB pipeline
        }
    }
}

export const syncService = new ExternalSyncService();
syncService.registerStrategy(new TelegramStrategy());
syncService.registerStrategy(new GoogleSheetsStrategy());
syncService.registerStrategy(new EmailStrategy());
syncService.registerStrategy(new SocketIoStrategy());
