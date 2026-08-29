/**
 * Registration module type definitions.
 * All form data types, step metadata, and enums for the multi-step registration.
 */

/* ─── Step Enum ──────────────────────────────────────────── */

export enum RegistrationStep {
  PERSONAL_INTEL = 0,
  AIESEC_INTEL = 1,
  AGENT_PROFILE = 2,
  MISSION_INTEL = 3,
  MISSION_READINESS = 4,
  FINAL_REVIEW = 5,
}

export const TOTAL_STEPS = 6;

/* ─── Step Metadata ──────────────────────────────────────── */

export interface StepMeta {
  step: RegistrationStep;
  missionNumber: number;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  fileNo: string;
}

export const STEP_META: StepMeta[] = [
  {
    step: RegistrationStep.PERSONAL_INTEL,
    missionNumber: 1,
    label: "PERSONAL INTEL",
    title: "PERSONAL",
    subtitle: "INTEL",
    description:
      "Establish your identity. Provide your personal details to begin the mission briefing.",
    fileNo: "NLDS-REG-M01",
  },
  {
    step: RegistrationStep.AIESEC_INTEL,
    missionNumber: 2,
    label: "AIESEC INTEL",
    title: "AIESEC",
    subtitle: "INTEL",
    description:
      "Verify your affiliation. Provide your AIESEC entity and membership details.",
    fileNo: "NLDS-REG-M02",
  },
  {
    step: RegistrationStep.AGENT_PROFILE,
    missionNumber: 3,
    label: "AGENT PROFILE",
    title: "AGENT",
    subtitle: "PROFILE",
    description:
      "Craft your operative identity. Provide emergency protocol and agent wellbeing data.",
    fileNo: "NLDS-REG-M03",
  },
  {
    step: RegistrationStep.MISSION_INTEL,
    missionNumber: 4,
    label: "MISSION INTEL",
    title: "MISSION",
    subtitle: "INTEL",
    description:
      "Outline your goals. Provide the mission team with your operative objectives.",
    fileNo: "NLDS-REG-M04",
  },
  {
    step: RegistrationStep.MISSION_READINESS,
    missionNumber: 5,
    label: "MISSION READINESS",
    title: "MISSION",
    subtitle: "READINESS",
    description:
      "Declare your readiness state before entering the mission field.",
    fileNo: "NLDS-REG-M05",
  },
  {
    step: RegistrationStep.FINAL_REVIEW,
    missionNumber: 6,
    label: "FINAL REVIEW",
    title: "FINAL",
    subtitle: "REVIEW",
    description:
      "Verify your operative dossier before submitting to the NLDS Conference Team.",
    fileNo: "NLDS-REG-READY",
  },
];

/* ─── Form Data Types ────────────────────────────────────── */

export interface PersonalIntelData {
  fullName: string;
  preferredName: string;
  personalEmail: string;
  phone: string;
  profilePicture: string; // Ensure this is just a string (e.g. drive link)
  gender: string;
  dateOfBirth: string;
  nationalIdOrPassport: string;
}

export interface AiesecIntelData {
  participantType: string;
  aiesecEmail: string | undefined;
  entity: string;
  initiativeGroup: string;
  customInitiativeGroup: string;
  currentPosition: string;
}

export interface AgentProfileData {
  foodPreference: string;
  medicalConditions: string;
  guardianName: string;
  guardianContact: string;
  cvLink: string;
  cvConsent: string;
}

export interface MissionIntelData {
  missionGoal: string;
  additionalInformation: string;
}

export interface MissionReadinessData {
  readinessLevel: string;
}

/* ─── Complete Registration Data ─────────────────────────── */

export interface RegistrationFormData {
  personalIntel: PersonalIntelData;
  aiesecIntel: AiesecIntelData;
  agentProfile: AgentProfileData;
  missionIntel: MissionIntelData;
  missionReadiness: MissionReadinessData;
}
