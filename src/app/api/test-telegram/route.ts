import { NextResponse } from 'next/server';
import { TelegramClient } from '@/lib/backend/integrations/telegram';

export async function GET() {
    try {
        const client = new TelegramClient();

        // Simulating exactly test payload structurally configured via phase guidelines!
        const result = await client.sendMessage(`🧪 <b>NLDS TELEGRAM TEST</b>\n\nTelegram integration is working.`);

        return NextResponse.json({
            success: true,
            message: "Test execution injected into Telegram Cloud API pipeline successfully.",
            delivered: result
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
