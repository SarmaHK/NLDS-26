import { SyncStrategy, ExternalEvent } from "./sync.service";
import { TelegramClient } from "../integrations/telegram";

export class TelegramStrategy implements SyncStrategy {
    providerName = "TELEGRAM";
    private client = new TelegramClient();

    async execute(event: ExternalEvent): Promise<void> {
        if (event.type === "REGISTRATION_SUBMITTED") {
            const message = this.formatNewMissionMessage(event.payload);
            await this.client.sendMessage(message);
        }
    }

    /**
     * Statically extracts only explicit operation bounds while aggressively omitting Medical / Credentials.
     */
    private formatNewMissionMessage(data: any): string {
        return `
━━━━━━━━━━━━━━━━━━
🚨 <b>NEW NLDS 2026 MISSION</b>
━━━━━━━━━━━━━━━━━━

<b>MISSION ID:</b>
${data.referenceCode}

<b>AGENT:</b>
${data.fullName}

<b>PREFERRED NAME:</b>
${data.preferredName}

<b>AIESEC EMAIL:</b>
${data.aiesecEmail}

<b>ENTITY:</b>
${data.entityName}

<b>INITIATIVE GROUP:</b>
${data.igName}

<b>POSITION:</b>
${data.currentPosition}

<b>GENDER:</b>
${data.gender}

<b>FOOD:</b>
${data.foodPreference}

<b>READINESS:</b>
${data.readinessLevel}

<b>STATUS:</b>
SUBMITTED

━━━━━━━━━━━━━━━━━━
<b>MISSION RECEIVED</b>
━━━━━━━━━━━━━━━━━━`.trim();
    }
}
