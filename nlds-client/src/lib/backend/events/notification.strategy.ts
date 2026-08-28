export interface INotificationProvider {
    send(event: string, payload: any): Promise<void>;
}

export class TelegramProvider implements INotificationProvider {
    async send(event: string, payload: any): Promise<void> {
        // Future Telegram Integration
        console.log(`[Telegram Placeholder] Event: ${event}`, payload);
    }
}

export class NotificationService {
    private providers: INotificationProvider[] = [];

    register(provider: INotificationProvider) {
        this.providers.push(provider);
    }

    async emit(event: string, payload: any) {
        // Fire and Forget so it doesn't block critical transactions
        Promise.allSettled(this.providers.map(p => p.send(event, payload))).catch(console.error);
    }
}

// Singleton instantiation mapping Strategy Pattern for dependency decoupling
export const globalNotificationService = new NotificationService();
globalNotificationService.register(new TelegramProvider());
