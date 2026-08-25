// @ts-nocheck
import { prisma } from "../db/prisma";
import { randomInt, scryptSync, randomBytes } from "crypto";
import { env } from "@/lib/config/env";
import { EmailClient } from "../integrations/email";
import { render } from "@react-email/render";
import { OTPEmail } from "../email/templates/otp";
import { realtimePublisher } from "../realtime/publisher";

export class AuthService {

    /** Hash a small keyspace PIN securely */
    private hashOTP(otp: string, salt: string): string {
        return scryptSync(otp, salt, 64).toString("hex") + "." + salt;
    }

    /** Generate random 6-digit OTP */
    private generateOTP(): string {
        return randomInt(100000, 999999).toString();
    }

    /**
     * Request a Participant OTP. Upserts the AIESEC Email identity.
     */
    async requestParticipantOTP(aiesecEmail: string) {
        // Enforce basic normalization
        const normalizedEmail = aiesecEmail.trim().toLowerCase();

        if (!normalizedEmail.endsWith("@aiesec.net")) {
            throw new Error("Please provide your AIESEC email address.");
        }

        const participant = await prisma.participant.upsert({
            where: { aiesecEmail: normalizedEmail },
            update: {}, // Keep existing data intact
            create: {
                aiesecEmail: normalizedEmail,
                phone: "",     // required schema field bypass for initial identity 
                profilePicture: "" // required schema field bypass
            },
        });

        // Anti-spam 60s cooldown limit enforced mechanically on the DB layer
        const recentChallenge = await prisma.oTPChallenge.findFirst({
            where: {
                email: normalizedEmail,
                createdAt: { gt: new Date(Date.now() - 60 * 1000) }
            }
        });

        if (recentChallenge) {
            throw new Error("Must wait 60 seconds before requesting a subsequent OTP.");
        }

        const otp = this.generateOTP();
        const salt = randomBytes(16).toString("hex");
        const hashedOtp = this.hashOTP(otp, salt);
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes strictly

        await prisma.oTPChallenge.create({
            data: {
                email: normalizedEmail,
                otpHash: hashedOtp,
                expiresAt,
            }
        });

        const emailClient = new EmailClient();

        // Expose internally mapped OTP payload resolving local test delays safely avoiding full prod deployments
        if (env.NODE_ENV !== "production" || !env.EMAIL_API_KEY) {
            console.log(`\n[DEV MOCK OTP] >>> ${otp} <<< specifically bound targeting (${normalizedEmail})\n`);
        }

        const htmlPayload = await render(OTPEmail({ otp }));

        await emailClient.sendEmail({
            to: normalizedEmail,
            subject: "NLDS 2026 — Mission Verification Code",
            html: htmlPayload
        });

        // Trigger safe event natively over WS boundary matching requirements implicitly preventing leaking actual OTPs
        if (participant) {
            await realtimePublisher.emit(
                "OTP_SENT",
                { email: normalizedEmail },
                `participant:${participant.id}`
            );
        }

        return { success: true };
    }

    /**
     * Verify Participant OTP. If valid, marks Participant verified and creates a Session.
     */
    async verifyParticipantOTP(aiesecEmail: string, otp: string) {
        const normalizedEmail = aiesecEmail.trim().toLowerCase();

        // 1. Fetch youngest applicable active challenge
        const challenge = await prisma.oTPChallenge.findFirst({
            where: {
                email: normalizedEmail,
                consumedAt: null,
                expiresAt: { gt: new Date() },
                attempts: { lt: 5 }
            },
            orderBy: { createdAt: 'desc' }
        });

        if (!challenge) {
            throw new Error("No active OTP request found, or challenge has expired.");
        }

        const [hash, salt] = challenge.otpHash.split(".");
        const inputHash = this.hashOTP(otp.trim(), salt).split(".")[0];

        // 2. Validate cryptographic match
        if (hash !== inputHash) {
            await prisma.oTPChallenge.update({
                where: { id: challenge.id },
                data: { attempts: { increment: 1 } }
            });
            throw new Error("Invalid OTP code.");
        }

        // 3. Mark consumed
        await prisma.oTPChallenge.update({
            where: { id: challenge.id },
            data: { consumedAt: new Date() }
        });

        // 4. Update Participant Verification Time and fetch ID
        const participant = await prisma.participant.update({
            where: { aiesecEmail: normalizedEmail },
            data: { aiesecEmailVerifiedAt: new Date() }
        });

        // 5. Create absolute participant Db HTTP session state
        const sessionLengthTokensDays = 7;
        const expiresAt = new Date(Date.now() + sessionLengthTokensDays * 24 * 60 * 60 * 1000);

        const session = await prisma.participantSession.create({
            data: {
                participantId: participant.id,
                expiresAt,
            }
        });

        // Safely emit success mapping WS decoupled UI interactions rigidly protecting integrity
        await realtimePublisher.emit(
            "AIESEC_EMAIL_VERIFIED",
            { email: normalizedEmail },
            `participant:${participant.id}`
        );

        return {
            success: true,
            sessionId: session.id,
            expiresAt
        };
    }
}
