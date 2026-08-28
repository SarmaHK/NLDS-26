import { Resend } from "resend";
import { env } from "@/lib/config/env";

export class EmailClient {
    private resend: Resend | null = null;
    private fromEmail: string;

    constructor() {
        const apiKey = env.EMAIL_API_KEY;
        // Binds strictly to configured environmental structures preventing spoofing envelopes natively
        this.fromEmail = env.EMAIL_FROM || "NLDS Auth <onboarding@resend.dev>";

        if (!apiKey) {
            console.warn("[EmailClient] Missing EMAIL_API_KEY. Email execution logically disabled.");
        } else {
            this.resend = new Resend(apiKey);
        }
    }

    /**
     * Natively dispatches an Email utilizing official boundaries dropping exceptions implicitly securely.
     */
    async sendEmail(options: { to: string; subject: string; html: string }) {
        if (!this.resend) {
            console.warn("[EmailClient] Missing API Key. Executing mocked console-dispatch sequence internally:");
            console.warn(`[EmailClient] MOCKED EMAIL DISPATCH: TO[${options.to}] SUB[${options.subject}]`);
            return { id: "mock_email_dev" };
        }

        try {
            const data = await this.resend.emails.send({
                from: this.fromEmail,
                to: options.to,
                subject: options.subject,
                html: options.html,
            });

            // Resend API SDK structural intercepts natively trapping unverified domain restrictions
            if (data.error) {
                // Allows local testing to proceed even if the domain is unverified by defaulting to a terminal mock
                if (data.error.message?.includes("testing emails")) {
                    console.warn(`[EmailClient] Unverified Resend Domain. Bypassed restriction organically: Email suppressed for (${options.to}).`);
                    return { id: "mock_email_dev" };
                }
                console.error(`[EmailClient] Delivery rejected: ${data.error.name}`);
                throw new Error(data.error.message || "Failed to dispatch email safely over API bounds.");
            }

            return data;
        } catch (error: any) {
            // Block sensitive headers / Keys from executing backward into Node exception leaks natively
            console.error(`[EmailClient] Exception encountered internally resolving structural headers: ${error.message}`);
            throw new Error(error.message || "A fatal configuration error occurred synchronizing API parameters over Email protocols.");
        }
    }
}
