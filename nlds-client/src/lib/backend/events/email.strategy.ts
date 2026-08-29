import * as React from "react";
import { SyncStrategy, ExternalEvent } from "./sync.service";
import { EmailClient } from "../integrations/email";
import { render } from "@react-email/render";
import { RegistrationSuccessEmail } from "../email/templates/registration-success";

export class EmailStrategy implements SyncStrategy {
    providerName = "RESEND_EMAIL";
    private client = new EmailClient();

    async execute(event: ExternalEvent): Promise<void> {
        if (event.type === "REGISTRATION_SUBMITTED") {
            const preferredEmail = event.payload?.aiesecEmail;
            const fallbackEmail = event.payload?.personalEmail;

            const recipientEmail = (preferredEmail && preferredEmail !== "N/A" && preferredEmail !== "[N/A]")
                ? preferredEmail
                : fallbackEmail;

            if (!recipientEmail) {
                console.warn("[EmailStrategy] No valid email address (AIESEC or Personal) mapped. Bypassing delivery.");
                return;
            }

            // Syncing payload specifically natively parsing into React Email rendering nodes accurately
            const htmlFormat = await render(React.createElement(RegistrationSuccessEmail, { missionId: event.referenceCode, recipientName: event.payload?.preferredName || event.payload?.fullName || "AGENT" }));

            await this.client.sendEmail({
                to: recipientEmail,
                subject: "NLDS 2026 — Mission Successfully Submitted",
                html: htmlFormat
            });
        }
    }
}
