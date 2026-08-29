-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('CV', 'MEDICAL_CERT', 'OTHER');

-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'OC_VIEWER');

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('VIEW_DASHBOARD', 'VIEW_REGISTRATIONS', 'VIEW_PARTICIPANTS', 'VIEW_PERSONAL_INFO', 'VIEW_AIESEC_INFO', 'VIEW_CVS', 'VIEW_PROFILE_PHOTOS', 'UPDATE_REGISTRATION_STATUS', 'VIEW_ANALYTICS', 'VIEW_REPORTS', 'EXPORT_DATA', 'VIEW_AUDIT_LOGS', 'MANAGE_SETTINGS', 'MANAGE_USERS');

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ReviewDecision" AS ENUM ('ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "Participant" (
    "id" UUID NOT NULL,
    "fullName" TEXT,
    "preferredName" TEXT,
    "personalEmail" TEXT,
    "phone" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "gender" TEXT,
    "dateOfBirth" TEXT,
    "nationalIdOrPassport" TEXT,
    "aiesecEmail" TEXT,
    "aiesecEmailVerifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entity" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InitiativeGroup" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "entityId" UUID NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InitiativeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" UUID NOT NULL,
    "referenceCode" TEXT NOT NULL,
    "participantId" UUID NOT NULL,
    "entityId" UUID NOT NULL,
    "initiativeGroupId" UUID,
    "customInitiativeGroup" TEXT,
    "currentPosition" TEXT NOT NULL,
    "foodPreference" TEXT NOT NULL,
    "medicalConditions" TEXT,
    "guardianName" TEXT NOT NULL,
    "guardianContact" TEXT NOT NULL,
    "missionGoal" TEXT NOT NULL,
    "additionalInformation" TEXT,
    "readinessLevel" TEXT NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'DRAFT',
    "submittedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "participantType" TEXT NOT NULL DEFAULT 'OLDBIE',

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalSync" (
    "id" UUID NOT NULL,
    "registrationId" UUID NOT NULL,
    "provider" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "lastAttemptAt" TIMESTAMP(3),
    "syncedAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExternalSync_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" UUID NOT NULL,
    "registrationId" UUID NOT NULL,
    "type" "DocumentType" NOT NULL DEFAULT 'CV',
    "urlReference" TEXT NOT NULL,
    "consentGiven" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "role" "AdminRole" NOT NULL DEFAULT 'OC_VIEWER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminPermission" (
    "id" UUID NOT NULL,
    "adminId" UUID NOT NULL,
    "permission" "Permission" NOT NULL,

    CONSTRAINT "AdminPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminInvitation" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "assignedPermissions" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdBy" UUID NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminAccessRequest" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedBy" UUID,
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "AdminAccessRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistrationReview" (
    "id" UUID NOT NULL,
    "registrationId" UUID NOT NULL,
    "reviewerId" UUID NOT NULL,
    "decision" "ReviewDecision" NOT NULL,
    "internalReason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegistrationReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" UUID NOT NULL,
    "actorId" UUID,
    "actorType" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "targetId" UUID,
    "targetType" TEXT NOT NULL,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OTPChallenge" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "otpHash" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 5,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OTPChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantSession" (
    "id" UUID NOT NULL,
    "participantId" UUID NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParticipantSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminSession" (
    "id" UUID NOT NULL,
    "adminId" UUID NOT NULL,
    "tokenHash" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_nationalIdOrPassport_key" ON "Participant"("nationalIdOrPassport");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_aiesecEmail_key" ON "Participant"("aiesecEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Entity_name_key" ON "Entity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Entity_code_key" ON "Entity"("code");

-- CreateIndex
CREATE UNIQUE INDEX "InitiativeGroup_name_entityId_key" ON "InitiativeGroup"("name", "entityId");

-- CreateIndex
CREATE UNIQUE INDEX "Registration_referenceCode_key" ON "Registration"("referenceCode");

-- CreateIndex
CREATE INDEX "Registration_status_idx" ON "Registration"("status");

-- CreateIndex
CREATE INDEX "Registration_participantId_idx" ON "Registration"("participantId");

-- CreateIndex
CREATE INDEX "Registration_entityId_idx" ON "Registration"("entityId");

-- CreateIndex
CREATE INDEX "ExternalSync_registrationId_idx" ON "ExternalSync"("registrationId");

-- CreateIndex
CREATE INDEX "ExternalSync_status_idx" ON "ExternalSync"("status");

-- CreateIndex
CREATE INDEX "ExternalSync_provider_idx" ON "ExternalSync"("provider");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Admin_email_idx" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "AdminPermission_adminId_idx" ON "AdminPermission"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminInvitation_email_key" ON "AdminInvitation"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AdminInvitation_token_key" ON "AdminInvitation"("token");

-- CreateIndex
CREATE INDEX "RegistrationReview_registrationId_idx" ON "RegistrationReview"("registrationId");

-- CreateIndex
CREATE INDEX "RegistrationReview_reviewerId_idx" ON "RegistrationReview"("reviewerId");

-- CreateIndex
CREATE INDEX "AuditLog_targetId_idx" ON "AuditLog"("targetId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "OTPChallenge_email_idx" ON "OTPChallenge"("email");

-- CreateIndex
CREATE INDEX "ParticipantSession_participantId_idx" ON "ParticipantSession"("participantId");

-- CreateIndex
CREATE INDEX "ParticipantSession_expiresAt_idx" ON "ParticipantSession"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "AdminSession_tokenHash_key" ON "AdminSession"("tokenHash");

-- CreateIndex
CREATE INDEX "AdminSession_adminId_idx" ON "AdminSession"("adminId");

-- CreateIndex
CREATE INDEX "AdminSession_expiresAt_idx" ON "AdminSession"("expiresAt");

-- AddForeignKey
ALTER TABLE "InitiativeGroup" ADD CONSTRAINT "InitiativeGroup_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_initiativeGroupId_fkey" FOREIGN KEY ("initiativeGroupId") REFERENCES "InitiativeGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalSync" ADD CONSTRAINT "ExternalSync_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminPermission" ADD CONSTRAINT "AdminPermission_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminInvitation" ADD CONSTRAINT "AdminInvitation_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminAccessRequest" ADD CONSTRAINT "AdminAccessRequest_reviewedBy_fkey" FOREIGN KEY ("reviewedBy") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrationReview" ADD CONSTRAINT "RegistrationReview_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrationReview" ADD CONSTRAINT "RegistrationReview_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantSession" ADD CONSTRAINT "ParticipantSession_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminSession" ADD CONSTRAINT "AdminSession_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
