// @ts-nocheck
import { prisma } from "../db/prisma";
import type { Prisma } from "@prisma/client";

export class RegistrationRepository {
    async findById(id: string) {
        return prisma.registration.findUnique({
            where: { id },
            include: { participant: true, documents: true },
        });
    }

    async findByReferenceCode(referenceCode: string) {
        return prisma.registration.findUnique({
            where: { referenceCode },
            select: {
                referenceCode: true,
                status: true,
                submittedAt: true,
            }
        });
    }

    async isAiesecEmailTaken(email: string): Promise<boolean> {
        const count = await prisma.participant.count({
            where: { aiesecEmail: { equals: email, mode: "insensitive" } },
        });
        return count > 0;
    }

    async isPersonalEmailTaken(email: string): Promise<boolean> {
        const count = await prisma.participant.count({
            where: { personalEmail: { equals: email, mode: "insensitive" } },
        });
        return count > 0;
    }

    async isNationalIdTaken(nid: string): Promise<boolean> {
        const count = await prisma.participant.count({
            where: { nationalIdOrPassport: nid },
        });
        return count > 0;
    }

    async createRegistration(
        participantData: Prisma.ParticipantCreateInput,
        registrationData: Omit<Prisma.RegistrationCreateInput, "participant" | "referenceCode" | "status">,
        documents: Prisma.DocumentCreateWithoutRegistrationInput[],
        referenceCode: string
    ) {
        return prisma.$transaction(async (tx) => {
            // Because OTP flows create a participant with ONLY an AIESEC Email initially (no National ID),
            // an upsert purely by `nationalIdOrPassport` will fail to find them, executing `create` and causing a P2002 collision
            // on the `aiesecEmail` unique constraint. We must resolve the identity safely.
            let participant = null;
            if (participantData.aiesecEmail) {
                participant = await tx.participant.findUnique({ where: { aiesecEmail: participantData.aiesecEmail } });
            }
            if (!participant && participantData.nationalIdOrPassport) {
                participant = await tx.participant.findUnique({ where: { nationalIdOrPassport: participantData.nationalIdOrPassport } });
            }

            if (participant) {
                participant = await tx.participant.update({
                    where: { id: participant.id },
                    data: participantData,
                });
            } else {
                participant = await tx.participant.create({
                    data: participantData,
                });
            }

            const regInput: Prisma.RegistrationCreateInput = {
                ...registrationData,
                referenceCode,
                status: "SUBMITTED",
                participant: { connect: { id: participant.id } },
                documents: { create: documents },
            };

            const registration = await tx.registration.create({
                data: regInput,
                include: { participant: true },
            });

            await tx.auditLog.create({
                data: {
                    actorId: participant.id,
                    actorType: "PARTICIPANT",
                    action: "REGISTRATION_SUBMITTED",
                    targetId: registration.id,
                    targetType: "REGISTRATION",
                    metadata: JSON.stringify({ referenceCode }),
                },
            });

            return registration;
        }, {
            maxWait: 15000,
            timeout: 25000,
        });
    }

    async updateStatus(id: string, status: any) {
        return prisma.registration.update({
            where: { id },
            data: { status },
        });
    }
}
