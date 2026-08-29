// @ts-nocheck
import { RegistrationRepository } from "../repositories/registration.repository";
import { RegistrationStateMachine } from "../state/registration.state";
import { globalNotificationService } from "../events/notification.strategy";
import type { Prisma } from "@prisma/client";

export class RegistrationService {
  constructor(private readonly repo: RegistrationRepository) {}

  private generateReferenceCode(): string {
    return `NLDS26-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  }

  private normalizePhone(phone: string): string {
    return phone.replace(/[^0-9]/g, "").replace(/^94/, "0");
  }

  async submitRegistration(
    participantData: Prisma.ParticipantCreateInput,
    registrationData: any, // Using relaxed type during dev before Zod mapping
    documents: Prisma.DocumentCreateWithoutRegistrationInput[],
  ) {
    // Enforce Personal Email uniqueness && Rule constraints
    if (participantData.personalEmail.toLowerCase().endsWith("@aiesec.net")) {
      throw new Error(
        "Please provide your personal email address, not your AIESEC email.",
      );
    }

    // AIESEC email duplication is securely validated in the Controller route bounds explicitly against their verified HTTP Session mappings natively.
    // We defer constraint checking over National IDs securely to the Prisma engine explicitly.

    // Validate Guardian phone against personal
    const pPhone = this.normalizePhone(participantData.phone);
    const gPhone = this.normalizePhone(registrationData.guardianContact);
    if (pPhone === gPhone) {
      throw new Error(
        "Guardian contact number must be different from your personal phone number.",
      );
    }

    const referenceCode = this.generateReferenceCode();

    // Execute Transaction via Repo
    const result = await this.repo.createRegistration(
      participantData,
      registrationData,
      documents,
      referenceCode,
    );

    // Async Non-Blocking Notification
    globalNotificationService.emit("REGISTRATION_SUBMITTED", { referenceCode });

    return result;
  }

  async getStatus(referenceCode: string) {
    return this.repo.findByReferenceCode(referenceCode);
  }
}
