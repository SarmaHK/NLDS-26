// ═══════════════════════════════════════════════════════
// NLDS 2026 — MISSION CONTROL TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════

export type RegistrationStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
export type ParticipantType = 'NEWBIE' | 'OLDBIE';
export type AdminRole = 'SUPER_ADMIN' | 'OC_VIEWER';

export interface Participant {
    id: string;
    fullName: string;
    preferredName: string;
    personalEmail: string;
    phone: string;
    gender: string;
    dateOfBirth: string;
    nationalId: string;
    aiesecEmail: string | null;
    profilePhoto: string | null;
    entity: string;
    currentPosition: string;
    participantType: ParticipantType;
    registrationCount: number;
    createdAt: string;
}

export interface Registration {
    id: string;
    referenceCode: string;
    participantId: string;
    participantName: string;
    participantEmail: string;
    entity: string;
    entityCode: string;
    participantType: ParticipantType;
    currentPosition: string;
    aiesecEmail: string | null;
    foodPreference: string;
    medicalConditions: string | null;
    guardianName: string;
    guardianContact: string;
    missionGoal: string;
    additionalInfo: string | null;
    readinessLevel: string;
    status: RegistrationStatus;
    submittedAt: string;
    createdAt: string;
    updatedAt: string;
    hasCv: boolean;
    hasPhoto: boolean;
}

export interface AdminUser {
    id: string;
    email: string;
    role: AdminRole;
    isActive: boolean;
    lastLoginAt: string | null;
    createdAt: string;
    permissions: string[];
}

export interface AuditEntry {
    id: string;
    actorEmail: string;
    actorRole: AdminRole;
    action: string;
    targetType: string;
    targetId: string;
    details: string;
    timestamp: string;
}

export interface CvEntry {
    id: string;
    participantName: string;
    entity: string;
    registrationRef: string;
    uploadedAt: string;
    fileType: string;
}

export interface PhotoEntry {
    id: string;
    participantName: string;
    entity: string;
    uploadedAt: string;
}

export interface AnalyticsStat {
    label: string;
    value: number;
}
