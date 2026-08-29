// @ts-nocheck
import { prisma } from "../db/prisma";
import {
  RegistrationStateMachine,
  RegistrationStatus,
} from "../state/registration.state";
import { globalNotificationService } from "../events/notification.strategy";
import {
  AuthorizationService,
  AdminUser,
} from "../security/authorization.service";
import { syncService } from "../events/sync.service";

export class ReviewService {
  /**
   * Start reviewing a registration. SUBMITTED -> UNDER_REVIEW.
   */
  async startReview(admin: AdminUser, registrationId: string) {
    AuthorizationService.requirePermission(admin, "REVIEW_REGISTRATION");

    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
    });

    if (!registration) throw new Error("Registration not found");

    const nextStatus = RegistrationStateMachine.transition(
      registration.status as RegistrationStatus,
      "UNDER_REVIEW",
    );

    const resultPayload = await prisma.$transaction(async (tx) => {
      const updated = await tx.registration.update({
        where: { id: registrationId, status: registration.status }, // Optimistic Concurrency check
        data: { status: nextStatus },
      });

      await tx.auditLog.create({
        data: {
          actorId: admin.id,
          actorType: admin.role,
          action: "REGISTRATION_REVIEW_STARTED",
          targetId: registration.id,
          targetType: "REGISTRATION",
        },
      });

      return updated;
    });

    syncService.dispatch({
      registrationId: registration.id,
      referenceCode: registration.referenceCode,
      type: "STATUS_CHANGED",
      payload: {
        status: resultPayload.status,
        participantId: registration.participantId,
      },
    });

    return resultPayload;
  }

  /**
   * Accept a registration. UNDER_REVIEW -> ACCEPTED.
   * Requires reason.
   */
  async acceptRegistration(
    admin: AdminUser,
    registrationId: string,
    internalReason: string,
  ) {
    AuthorizationService.requirePermission(admin, "ACCEPT_REGISTRATION");

    if (!internalReason?.trim())
      throw new Error("Internal reason is REQUIRED to accept.");

    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
    });

    if (!registration) throw new Error("Registration not found");

    const nextStatus = RegistrationStateMachine.transition(
      registration.status as RegistrationStatus,
      "ACCEPTED",
    );

    const resultPayload = await prisma.$transaction(async (tx) => {
      const updated = await tx.registration.update({
        where: { id: registrationId, status: registration.status },
        data: { status: nextStatus },
      });

      await tx.registrationReview.create({
        data: {
          registrationId,
          reviewerId: admin.id,
          decision: "ACCEPTED",
          internalReason,
        },
      });

      await tx.auditLog.create({
        data: {
          actorId: admin.id,
          actorType: admin.role,
          action: "REGISTRATION_ACCEPTED",
          targetId: registration.id,
          targetType: "REGISTRATION",
        },
      });

      return updated;
    });

    syncService.dispatch({
      registrationId: registration.id,
      referenceCode: registration.referenceCode,
      type: "STATUS_CHANGED",
      payload: {
        status: resultPayload.status,
        participantId: registration.participantId,
      },
    });

    return resultPayload;
  }

  /**
   * Reject a registration. UNDER_REVIEW -> REJECTED.
   */
  async rejectRegistration(
    admin: AdminUser,
    registrationId: string,
    internalReason: string,
  ) {
    AuthorizationService.requirePermission(admin, "REJECT_REGISTRATION");

    if (!internalReason?.trim())
      throw new Error("Internal reason is REQUIRED to reject.");

    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
    });

    if (!registration) throw new Error("Registration not found");

    const nextStatus = RegistrationStateMachine.transition(
      registration.status as RegistrationStatus,
      "REJECTED",
    );

    const resultPayload = await prisma.$transaction(async (tx) => {
      const updated = await tx.registration.update({
        where: { id: registrationId, status: registration.status },
        data: { status: nextStatus },
      });

      await tx.registrationReview.create({
        data: {
          registrationId,
          reviewerId: admin.id,
          decision: "REJECTED",
          internalReason,
        },
      });

      await tx.auditLog.create({
        data: {
          actorId: admin.id,
          actorType: admin.role,
          action: "REGISTRATION_REJECTED",
          targetId: registration.id,
          targetType: "REGISTRATION",
        },
      });

      return updated;
    });

    syncService.dispatch({
      registrationId: registration.id,
      referenceCode: registration.referenceCode,
      type: "STATUS_CHANGED",
      payload: {
        status: resultPayload.status,
        participantId: registration.participantId,
      },
    });

    return resultPayload;
  }
}
