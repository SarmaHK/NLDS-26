import { env } from "@/lib/config/env";

export class TelegramClient {
    private botToken: string | undefined;
    private chatId: string | undefined;

    constructor() {
        this.botToken = env.TELEGRAM_BOT_TOKEN?.trim();
        this.chatId = env.TELEGRAM_CHAT_ID?.trim();

        if (!this.botToken || !this.chatId) {
            console.warn("[TelegramClient] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID. Telegram dispatch logically disabled.");
        }
    }

    /**
     * Sends an HTML-formatted message to the configured Telegram chat via the Bot API.
     */
    async sendMessage(text: string): Promise<{ ok: boolean; messageId?: number }> {
        console.log(`TELEGRAM_BOT_TOKEN: ${this.botToken ? 'configured' : 'missing'}`);
        console.log(`TELEGRAM_CHAT_ID: ${this.chatId ? 'configured' : 'missing'}`);

        if (!this.botToken || !this.chatId) {
            console.warn("[TelegramClient] Missing credentials. Executing mocked console-dispatch sequence internally:");
            console.warn(`[TelegramClient] MOCKED TELEGRAM DISPATCH: CHAT[${this.chatId}] MSG_LENGTH[${text.length}]`);
            return { ok: true, messageId: -1 };
        }

        const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text,
                    parse_mode: "HTML",
                }),
            });

            console.log(`Telegram API response status: ${response.status}`);
            const data = await response.json();

            if (!data.ok) {
                console.log(`Telegram API safe response description: ${data.description}`);
                console.error(`[TelegramClient] API rejected dispatch: ${data.description}`);
                throw new Error(data.description || "Telegram API returned a non-OK response.");
            }

            return { ok: true, messageId: data.result?.message_id };
        } catch (error: any) {
            console.error(`[TelegramClient] Exception encountered dispatching message: ${error.message}`);
            throw new Error(error.message || "A fatal error occurred dispatching the Telegram message.");
        }
    }
}
