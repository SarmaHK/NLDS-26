"use client";

import type { ReactNode } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { READINESS_OPTIONS } from "@/lib/register/constants";
import type { RegistrationFormData } from "@/lib/register/types";
import SectionLabel from "@/components/register/SectionLabel";

interface FinalReviewProps {
    onEditStep: (stepIndex: number) => void;
}

function fileSecured(value?: string) {
    return Boolean(value && value.trim() !== "");
}

export default function FinalReview({ onEditStep }: FinalReviewProps) {
    const form = useWatch() as RegistrationFormData;
    const { personalIntel, aiesecIntel, agentProfile, missionIntel, missionReadiness } = form;
    const { getValues } = useFormContext<RegistrationFormData>();

    const pi = personalIntel ?? getValues("personalIntel");
    const ai = aiesecIntel ?? getValues("aiesecIntel");
    const ap = agentProfile ?? getValues("agentProfile");
    const mi = missionIntel ?? getValues("missionIntel");
    const mr = missionReadiness ?? getValues("missionReadiness");

    const readinessObj = READINESS_OPTIONS.find((o) => o.level === mr.readinessLevel);

    const ReviewSection = ({
        title,
        stepIndex,
        children,
    }: {
        title: string;
        stepIndex: number;
        children: ReactNode;
    }) => (
        <fieldset className="flex flex-col gap-4 p-5 reg-panel relative">
            <button
                type="button"
                onClick={() => onEditStep(stepIndex)}
                className="absolute top-4 right-4 font-classified text-[12px] tracking-[0.2em] text-[var(--red)] hover:text-white transition-colors uppercase"
            >
                EDIT
            </button>
            <SectionLabel>{title}</SectionLabel>
            <div className="flex flex-col gap-3">{children}</div>
        </fieldset>
    );

    const DataRow = ({ label, value }: { label: string; value: string | undefined }) => (
        <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 border-b border-[var(--border-strong)] pb-2 mb-2 last:border-0 last:pb-0 last:mb-0">
            <span className="font-sans text-[13px] tracking-wide text-white/60 font-medium uppercase sm:w-1/3 flex-shrink-0">
                {label}
            </span>
            <span className="font-sans text-[15px] text-[var(--text)] whitespace-pre-wrap">
                {value && value.trim() !== "" ? value : <span className="italic text-white/20">Not provided</span>}
            </span>
        </div>
    );

    return (
        <div className="flex flex-col gap-8">
            <p className="font-classified text-[11px] tracking-[0.2em] uppercase text-white/50">
                MISSION BRIEFING
            </p>

            <ReviewSection title="PERSONAL INTEL" stepIndex={0}>
                <DataRow label="Full Name" value={pi.fullName} />
                <DataRow label="Preferred Name" value={pi.preferredName} />
                <DataRow label="Personal Email" value={pi.personalEmail} />
                <DataRow label="Phone Number" value={pi.phone} />
                <DataRow
                    label="Profile Picture"
                    value={fileSecured(pi.profilePicture) ? "✓ Profile photo secured" : undefined}
                />
                <DataRow label="Gender" value={pi.gender} />
                <DataRow label="Date of Birth" value={pi.dateOfBirth} />
                <DataRow label="National ID / Passport" value={pi.nationalIdOrPassport} />
            </ReviewSection>

            <ReviewSection title="AIESEC INTEL" stepIndex={1}>
                <DataRow label="Newbie / Oldbie" value={ai.participantType} />
                <DataRow label="AIESEC Email" value={ai.aiesecEmail} />
                <DataRow label="AIESEC Entity" value={ai.entity} />
                {ai.entity === "Other" && ai.initiativeGroup === "Other IG" ? (
                    <DataRow label="Initiative Group" value={ai.customInitiativeGroup} />
                ) : (
                    <DataRow label="Initiative Group" value={ai.initiativeGroup} />
                )}
                <DataRow label="Current Position" value={ai.currentPosition} />
            </ReviewSection>

            <ReviewSection title="AGENT PROFILE" stepIndex={2}>
                <DataRow label="Food Preference" value={ap.foodPreference} />
                <DataRow label="Medical Conditions / Allergies" value={ap.medicalConditions} />
                <DataRow label="Guardian Name" value={ap.guardianName} />
                <DataRow label="Guardian Contact" value={ap.guardianContact} />
                <DataRow
                    label="CV"
                    value={fileSecured(ap.cvLink) ? "✓ CV secured" : undefined}
                />
                {fileSecured(ap.cvLink) && (
                    <DataRow label="CV Consent" value={ap.cvConsent} />
                )}
            </ReviewSection>

            <ReviewSection title="MISSION INTEL" stepIndex={3}>
                <DataRow label="Mission Goal" value={mi.missionGoal} />
                <DataRow label="Additional Information" value={mi.additionalInformation} />
            </ReviewSection>

            <ReviewSection title="MISSION READINESS" stepIndex={4}>
                <DataRow label="Readiness Level" value={readinessObj ? `Level ${readinessObj.level}` : undefined} />
                <DataRow label="Status" value={readinessObj?.title} />
                <DataRow label="Declaration" value={readinessObj?.description} />
            </ReviewSection>
        </div>
    );
}
