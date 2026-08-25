import { SyncStrategy, ExternalEvent } from "./sync.service";
import { EmailClient } from "../integrations/email";
import { render } from "@react-email/render";
import { RegistrationSuccessEmail } from "../email/templates/registration-success";

export class EmailStrategy implements SyncStrategy {
    providerName = "RESEND_EMAIL";
    private client = new EmailClient();

    async execute(event: ExternalEvent): Promise<void> {
        if (event.type === "REGISTRATION_SUBMITTED") {
            const recipientEmail = event.payload?.aiesecEmail;
            if (!recipientEmail || recipientEmail === "[N/A]") {
                console.warn("[EmailStrategy] No valid AIESEC email mapped. Bypassing delivery.");
                return;
            }

            // Syncing payload specifically natively parsing into React Email rendering nodes accurately
            const htmlFormat = await render(RegistrationSuccessEmail({ missionId: event.referenceCode }));

            await this.client.sendEmail({
                to: recipientEmail,
                subject: "NLDS 2026 — Mission Successfully Submitted",
                html: htmlFormat
            });
        }
    }
}
