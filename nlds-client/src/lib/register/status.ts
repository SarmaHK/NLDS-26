export type RegistrationClientStatus =
    | "SUBMITTED"
    | "UNDER_REVIEW"
    | "ACCEPTED"
    | "REJECTED";

export interface StatusContent {
    title: string;
    message: string;
    stageIndex: number; // 0, 1, or 2 (which stage it falls under)
}

export const STATUS_MAP: Record<RegistrationClientStatus, StatusContent> = {
    SUBMITTED: {
        title: "DOSSIER RECEIVED",
        message: "Your mission profile has been received by the Conference Team.",
        stageIndex: 0,
    },
    UNDER_REVIEW: {
        title: "MISSION UNDER REVIEW",
        message: "Your mission is currently being reviewed. Please allow the Conference Team some time to complete the assessment.",
        stageIndex: 1,
    },
    ACCEPTED: {
        title: "MISSION ACCEPTED",
        message: "Your mission has been approved. Prepare for the next stage.",
        stageIndex: 2,
    },
    REJECTED: {
        title: "MISSION CONCLUDED",
        message: "This mission was not selected for the current operation. Thank you for accepting the challenge.",
        stageIndex: 2,
    },
};

// Represents the 3 core visual timeline stages
export const TIMELINE_STAGES = [
    {
        id: 0,
        title: "DOSSIER RECEIVED",
        description: "Your registration has been securely received by the Conference Team.",
    },
    {
        id: 1,
        title: "MISSION UNDER REVIEW",
        description: "Your mission is currently being reviewed by the Conference Team.",
    },
    {
        id: 2,
        title: "DECISION",
        description: "The final decision on your mission is being prepared.",
    },
];

// Helper to determine state of a timeline step
export function getTimelineStepState(
    currentStageIndex: number,
    stepIndex: number
): "COMPLETED" | "IN_PROGRESS" | "PENDING" {
    if (stepIndex < currentStageIndex) return "COMPLETED";
    if (stepIndex === currentStageIndex) return "IN_PROGRESS";
    return "PENDING";
}
