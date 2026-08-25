"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { READINESS_OPTIONS } from "@/lib/register/constants";
import type { RegistrationFormData } from "@/lib/register/types";

interface FinalReviewProps {
    onEditStep: (stepIndex: number) => void;
}

export default function FinalReview({ onEditStep }: FinalReviewProps) {
    const { getValues } = useFormContext<RegistrationFormData>();

    // We can use getValues here because we only reach this step after all other data is entered.
    // However, to ensure reactivity if we flip back and forth, we could also use useWatch.
    // But since it's the final review, a simple dump of getValues() is appropriate for presentation.
    const form = getValues();
    const { personalIntel, aiesecIntel, agentProfile, missionIntel, missionReadiness } = form;

    const readinessObj = READINESS_OPTIONS.find((o) => o.level === missionReadiness.readinessLevel);

    const ReviewSection = ({
        title,
        stepIndex,
        children,
    }: {
        title: string;
        stepIndex: number;
        children: React.ReactNode;
    }) => (
        <fieldset className="flex flex-col gap-4 p-5 dossier-card relative">
            <button
                type="button"
                onClick={() => onEditStep(stepIndex)}
                className="absolute top-4 right-4 font-classified text-[10px] tracking-[0.2em] text-white/50 hover:text-[var(--red)] transition-colors uppercase"
            >
                [ EDIT ]
            </button>
            <legend className="flex items-center gap-3 mb-2">
                <div className="h-[1px] w-4" style={{ background: "var(--red)" }} />
                <span className="label-classified">{title}</span>
            </legend>
            <div className="flex flex-col gap-3">{children}</div>
        </fieldset>
    );

    const DataRow = ({ label, value }: { label: string; value: string | undefined }) => (
        <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 border-b border-[var(--border-strong)] pb-2 mb-2 last:border-0 last:pb-0 last:mb-0">
            <span className="font-classified text-[10px] tracking-[0.1em] text-white/40 uppercase sm:w-1/3 flex-shrink-0">
                {label}
            </span>
            <span className="font-sans text-sm text-[var(--text)] whitespace-pre-wrap">
                {value && value.trim() !== "" ? value : <span className="italic text-white/20">Not provided</span>}
            </span>
        </div>
    );

    return (
        <div className="flex flex-col gap-8">
            <ReviewSection title="PERSONAL INTEL" stepIndex={0}>
                <DataRow label="Full Name" value={personalIntel.fullName} />
                <DataRow label="Preferred Name" value={personalIntel.preferredName} />
                <DataRow label="Personal Email" value={personalIntel.personalEmail} />
                <DataRow label="Phone Number" value={personalIntel.phone} />
                <DataRow label="Profile Picture" value={personalIntel.profilePicture} />
                <DataRow label="Gender" value={personalIntel.gender} />
                <DataRow label="Date of Birth" value={personalIntel.dateOfBirth} />
                <DataRow label="National ID / Passport" value={personalIntel.nationalIdOrPassport} />
            </ReviewSection>

            <ReviewSection title="AIESEC INTEL" stepIndex={1}>
                <DataRow label="AIESEC Email" value={aiesecIntel.aiesecEmail} />
                <DataRow label="AIESEC Entity" value={aiesecIntel.entity} />
                {/* Omit IG if custom empty, or just pass the value because our DataRow handles empty implicitly */}
                {aiesecIntel.entity === "Other" && aiesecIntel.initiativeGroup === "Other IG" ? (
                    <DataRow label="Initiative Group" value={aiesecIntel.customInitiativeGroup} />
                ) : (
                    <DataRow label="Initiative Group" value={aiesecIntel.initiativeGroup} />
                )}
                <DataRow label="Current Position" value={aiesecIntel.currentPosition} />
            </ReviewSection>

            <ReviewSection title="AGENT PROFILE" stepIndex={2}>
                <DataRow label="Food Preference" value={agentProfile.foodPreference} />
                <DataRow label="Medical Conditions / Allergies" value={agentProfile.medicalConditions} />
                <DataRow label="Guardian Name" value={agentProfile.guardianName} />
                <DataRow label="Guardian Contact" value={agentProfile.guardianContact} />
                <DataRow label="CV Link" value={agentProfile.cvLink} />
                {agentProfile.cvLink && agentProfile.cvLink.trim() !== "" && (
                    <DataRow label="CV Consent" value={agentProfile.cvConsent} />
                )}
            </ReviewSection>

            <ReviewSection title="MISSION INTEL" stepIndex={3}>
                <DataRow label="Mission Goal" value={missionIntel.missionGoal} />
                <DataRow label="Additional Information" value={missionIntel.additionalInformation} />
            </ReviewSection>

            <ReviewSection title="MISSION READINESS" stepIndex={4}>
                <DataRow label="Readiness Level" value={readinessObj ? `Level ${readinessObj.level}` : undefined} />
                <DataRow label="Status" value={readinessObj?.title} />
                <DataRow label="Declaration" value={readinessObj?.description} />
            </ReviewSection>
        </div>
    );
}
