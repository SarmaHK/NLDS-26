import * as nodemailer from "nodemailer";
import { env } from "@/lib/config/env";

export class EmailClient {
    private transporter: nodemailer.Transporter | null = null;
    private fromEmail: string;

    constructor() {
        // Fallback to the specifically requested credentials if env is missing
        const smtpUser = env.EMAIL_SMTP_USER || process.env.EMAIL_SMTP_USER || "monaliedirisinghe@aiesec.net";
        const smtpPass = env.EMAIL_SMTP_PASS || process.env.EMAIL_SMTP_PASS || "sdfxqdmtcwtwcwsg";

        this.fromEmail = smtpUser;

        if (!smtpUser || !smtpPass) {
            console.warn("[EmailClient] Missing SMTP Credentials. Email execution logically disabled.");
        } else {
            this.transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: smtpUser,
                    pass: smtpPass,
                },
            });
        }
    }

    /**
     * Dispatches an Email using Nodemailer over SMTP.
     */
    async sendEmail(options: { to: string; subject: string; html: string }) {
        if (!this.transporter) {
            console.warn("[EmailClient] Missing SMTP Config. Executing mocked console-dispatch sequence internally:");
            console.warn(`[EmailClient] MOCKED EMAIL DISPATCH: TO[${options.to}] SUB[${options.subject}]`);
            return { id: "mock_email_dev" };
        }

        try {
            const info = await this.transporter.sendMail({
                from: `"NLDS 2026" <${this.fromEmail}>`,
                to: options.to,
                subject: options.subject,
                html: options.html,
            });

            console.log(`[EmailClient] Message sent successfully: ${info.messageId}`);
            return { id: info.messageId };
        } catch (error: any) {
            console.error(`[EmailClient] Exception encountered sequentially during SMTP delivery: ${error.message}`);
            // Log it but we can choose to throw or bypass depending on requirements
            throw new Error(error.message || "A fatal configuration error occurred synchronizing SMTP parameters.");
        }
    }
}
