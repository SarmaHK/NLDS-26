import { realtimePublisher } from "../src/lib/backend/realtime/publisher";
import { SocketIoStrategy } from "../src/lib/backend/events/socket.strategy";
import { ExternalSyncService } from "../src/lib/backend/events/sync.service";
import { PrismaClient } from "@prisma/client";

// Global fetching mock
global.fetch = jest.fn();

describe("Phase 10C - Socket.IO Realtime Abstract Boundaries", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("1. Publisher securely structures payload with explicit session boundaries over HTTP fallback", async () => {
        (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

        await realtimePublisher.emit("REGISTRATION_SUBMITTED", {
            registrationId: "TEST",
            referenceCode: "NLDS-123",
            status: "SUBMITTED",
            submittedAt: new Date().toISOString()
        }, "participant:12345");

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("localhost:3001/internal/emit"),
            expect.objectContaining({
                method: "POST",
                body: expect.stringContaining("participant:12345")
            })
        );
    });

    test("2. Socket IO Strategy intrinsically executes decoupled UI interactions", async () => {
        // We override emit specifically just for testing 
        const spyEmit = jest.spyOn(realtimePublisher, "emit").mockResolvedValue(undefined);
        const strategy = new SocketIoStrategy();

        await strategy.execute({
            registrationId: "r-123",
            referenceCode: "c-123",
            type: "REGISTRATION_SUBMITTED",
            payload: { participantId: "p-444" }
        });

        // Verifying it fires both Participant private room AND admin general room perfectly isolated 
        expect(spyEmit).toHaveBeenCalledWith(
            "REGISTRATION_SUBMITTED",
            expect.any(Object),
            "participant:p-444"
        );

        expect(spyEmit).toHaveBeenCalledWith(
            "REGISTRATION_CREATED",
            expect.any(Object),
            "admin:registrations"
        );
    });

    test("3. Abstract strategy implicitly drops sensitive information globally", async () => {
        const spyEmit = jest.spyOn(realtimePublisher, "emit").mockResolvedValue(undefined);
        const strategy = new SocketIoStrategy();

        await strategy.execute({
            registrationId: "r-123",
            referenceCode: "c-123",
            type: "REGISTRATION_SUBMITTED",
            // The massive heavy structure from DTO
            payload: {
                participantId: "p-444",
                nationalIdOrPassport: "SECRET-NIC",
                foodPreference: "Allergy",
                cvConsent: "YES"
            }
        });

        // The exact packet logged on the WS should ONLY have status, dates, IDs
        const packetArg = spyEmit.mock.calls[0][1] as any;
        expect(packetArg.nationalIdOrPassport).toBeUndefined();
        expect(packetArg.cvConsent).toBeUndefined();
        expect(packetArg.status).toBe("SUBMITTED");
    });
});
