import { SyncStrategy, ExternalEvent } from "./sync.service";
import { realtimePublisher } from "../realtime/publisher";

export class SocketIoStrategy implements SyncStrategy {
  providerName = "SOCKET_IO_REALTIME";

  async execute(event: ExternalEvent): Promise<void> {
    if (event.type === "REGISTRATION_SUBMITTED") {
      // 1. Alert the strict Private Participant Room natively matching robust architectures
      await realtimePublisher.emit(
        "REGISTRATION_SUBMITTED",
        {
          registrationId: event.registrationId,
          referenceCode: event.referenceCode,
          status: "SUBMITTED",
          submittedAt: new Date().toISOString(),
        },
        `participant:${event.payload?.participantId || ""}`, // Event mapping relies on safe ID hooks natively
      );

      // 2. Alert the Admin Live Dashboard strictly bound over secure namespace
      await realtimePublisher.emit(
        "REGISTRATION_CREATED",
        {
          registrationId: event.registrationId,
          referenceCode: event.referenceCode,
          status: "SUBMITTED",
          submittedAt: new Date().toISOString(),
        },
        "admin:registrations",
      );
    } else if (event.type === "STATUS_CHANGED") {
      const statusPayload = {
        registrationId: event.registrationId,
        referenceCode: event.referenceCode,
        status: event.payload.status,
      };

      await realtimePublisher.emit(
        "REGISTRATION_STATUS_CHANGED",
        statusPayload,
        `participant:${event.payload.participantId}`,
      );
      await realtimePublisher.emit(
        "REGISTRATION_STATUS_CHANGED",
        statusPayload,
        "admin:registrations",
      );
    }
  }
}
