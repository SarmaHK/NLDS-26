import crypto from "crypto";
import { AuthService } from "../src/lib/backend/services/auth.service";
import { prisma } from "../src/lib/backend/db/prisma";

jest.mock("../src/lib/backend/db/prisma", () => ({
    prisma: {
        participant: { upsert: jest.fn(), update: jest.fn() },
        oTPChallenge: { create: jest.fn(), findFirst: jest.fn(), update: jest.fn() },
        participantSession: { create: jest.fn() }
    }
}));

jest.mock("../src/lib/config/env", () => ({
    env: {
        DATABASE_URL: "dummy",
        SESSION_SECRET: "dummy",
        RESEND_API_KEY: "dummy"
    }
}));

jest.mock("../src/lib/backend/realtime/publisher", () => ({
    realtimePublisher: { emit: jest.fn() }
}));

jest.mock("../src/lib/backend/integrations/email", () => ({
    EmailClient: jest.fn().mockImplementation(() => ({ sendEmail: jest.fn() }))
}));

describe("Phase 10 - AIESEC Email OTP Verification Constraints", () => {
    const authService = new AuthService();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("1. Valid AIESEC email → OTP generated", async () => {
        prisma.oTPChallenge.findFirst.mockResolvedValueOnce(null); // No recent request
        await authService.requestParticipantOTP("valid@aiesec.net");

        expect(prisma.participant.upsert).toHaveBeenCalledWith(
            expect.objectContaining({ where: { aiesecEmail: "valid@aiesec.net" } })
        );
        expect(prisma.oTPChallenge.create).toHaveBeenCalled();
    });

    test("2. Invalid email → OTP not generated", async () => {
        const errorText = "Please provide your AIESEC email address.";
        await expect(authService.requestParticipantOTP("name@gmail.com")).rejects.toThrow(errorText);
        await expect(authService.requestParticipantOTP("name@yahoo.com")).rejects.toThrow(errorText);
        await expect(authService.requestParticipantOTP("name@outlook.com")).rejects.toThrow(errorText);
        await expect(authService.requestParticipantOTP("name@aiesec.lk")).rejects.toThrow(errorText);
        await expect(authService.requestParticipantOTP("any-other-domain@example.com")).rejects.toThrow(errorText);
        expect(prisma.oTPChallenge.create).not.toHaveBeenCalled();
    });

    test("2b. Case-insensitive valid email → OTP generated", async () => {
        prisma.oTPChallenge.findFirst.mockResolvedValue(null);
        await authService.requestParticipantOTP("NAME@AIESEC.NET");
        expect(prisma.participant.upsert).toHaveBeenCalledWith(
            expect.objectContaining({ where: { aiesecEmail: "name@aiesec.net" } })
        );
    });

    test("3. OTP stored only as a hash & never returned in API", async () => {
        prisma.oTPChallenge.findFirst.mockResolvedValueOnce(null);
        const result = await authService.requestParticipantOTP("secure@aiesec.net");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((result as any).otp).toBeUndefined(); // Verification avoiding API leaks
        const dbCallArgs = prisma.oTPChallenge.create.mock.calls[0][0].data;
        expect(dbCallArgs.otpHash).toContain("."); // Contains salt natively mapped protecting strings
    });

    test("4. Resend cooldown works (60s anti-spam)", async () => {
        prisma.oTPChallenge.findFirst.mockResolvedValueOnce({ id: "RECENT_REQUEST" });
        await expect(authService.requestParticipantOTP("spam@aiesec.net")).rejects.toThrow("Must wait 60 seconds before requesting a subsequent OTP.");
    });

    test("5. Incorrect OTP → verification fails & attempt increments", async () => {
        prisma.oTPChallenge.findFirst.mockResolvedValueOnce({
            id: "CHALLENGE-ID",
            otpHash: "wrong_hash.salt", // Mocking mismatch
            email: "agent@aiesec.net"
        });

        await expect(authService.verifyParticipantOTP("agent@aiesec.net", "123456")).rejects.toThrow("Invalid OTP code.");
        expect(prisma.oTPChallenge.update).toHaveBeenCalledWith(
            expect.objectContaining({ data: { attempts: { increment: 1 } } })
        );
    });

    test("7. Successful verification creates authenticated session", async () => {
        // Generating physical payload mapping native hashing to bypass validation internally
        const testOtp = "999999";
        const testSalt = "salthere";
        const generatedHash = crypto.scryptSync(testOtp, testSalt, 64).toString("hex") + "." + testSalt;

        prisma.oTPChallenge.findFirst.mockResolvedValueOnce({
            id: "CHALLENGE-ID",
            otpHash: generatedHash,
            email: "agent@aiesec.net"
        });
        prisma.participant.update.mockResolvedValueOnce({ id: "PARTICIPANT-1" });
        prisma.participantSession.create.mockResolvedValueOnce({ id: "SESSION-123" });

        const session = await authService.verifyParticipantOTP("agent@aiesec.net", testOtp);

        expect(session.sessionId).toBe("SESSION-123");
        expect(prisma.participant.update).toHaveBeenCalledWith(
            expect.objectContaining({ data: { aiesecEmailVerifiedAt: expect.any(Date) } })
        );
        expect(prisma.oTPChallenge.update).toHaveBeenCalledWith(
            expect.objectContaining({ data: { consumedAt: expect.any(Date) } })
        );
    });
});
