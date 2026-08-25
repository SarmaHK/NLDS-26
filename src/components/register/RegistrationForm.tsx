"use client";

import { useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

import StepIndicator from "@/components/register/StepIndicator";
import PersonalIntel from "@/components/register/steps/PersonalIntel";
import AiesecIntel from "@/components/register/steps/AiesecIntel";
import AgentProfile from "@/components/register/steps/AgentProfile";
import MissionIntel from "@/components/register/steps/MissionIntel";
import MissionReadiness from "@/components/register/steps/MissionReadiness";
import FinalReview from "@/components/register/steps/FinalReview";
import LockedStep from "@/components/register/steps/LockedStep";
import SubmissionSuccess from "@/components/register/SubmissionSuccess";

import { STEP_META, TOTAL_STEPS, type RegistrationFormData } from "@/lib/register/types";
import { personalIntelSchema, aiesecIntelSchema, agentProfileSchema, missionIntelSchema, missionReadinessSchema } from "@/lib/register/schema";

/* Full form schema — validates step 0 strictly, rest are permissive */
const registrationSchema = z.object({
    personalIntel: personalIntelSchema,
    aiesecIntel: aiesecIntelSchema,
    agentProfile: agentProfileSchema,
    missionIntel: missionIntelSchema,
    missionReadiness: missionReadinessSchema,
});

/* ─── Form default values ────────────────────────────────── */

const defaultValues: RegistrationFormData = {
    personalIntel: {
        fullName: "",
        preferredName: "",
        personalEmail: "",
        phone: "",
        profilePicture: "",
        gender: "",
        dateOfBirth: "",
        nationalIdOrPassport: "",
    },
    aiesecIntel: {
        participantType: "OLDBIE",
        aiesecEmail: "",
        entity: "",
        initiativeGroup: "",
        customInitiativeGroup: "",
        currentPosition: "",
    },
    agentProfile: {
        foodPreference: "",
        medicalConditions: "",
        guardianName: "",
        guardianContact: "",
        cvLink: "",
        cvConsent: "",
    },
    missionIntel: {
        missionGoal: "",
        additionalInformation: "",
    },
    missionReadiness: {
        readinessLevel: "",
    },
};

/* ─── Step animation variants ────────────────────────────── */

const stepVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 60 : -60,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -60 : 60,
        opacity: 0,
    }),
};

/* ─── Main Registration Form ────────────────────────────── */

export default function RegistrationForm() {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [direction, setDirection] = useState(0);

    const methods = useForm<RegistrationFormData>({
        defaultValues,
        resolver: zodResolver(registrationSchema) as never,
        mode: "onBlur",
    });

    const { handleSubmit, trigger } = methods;

    /* ── Step navigation ──────────────────────────────────── */

    const goToStep = useCallback(
        async (targetStep: number) => {
            // Can only go forward from step 0 after validation
            if (targetStep > currentStep && currentStep === 0) {
                type PersonalField = `personalIntel.${keyof RegistrationFormData["personalIntel"]}`;
                const fieldsToValidate: PersonalField[] = [
                    "personalIntel.fullName",
                    "personalIntel.preferredName",
                    "personalIntel.personalEmail",
                    "personalIntel.phone",
                    "personalIntel.profilePicture",
                    "personalIntel.gender",
                    "personalIntel.dateOfBirth",
                    "personalIntel.nationalIdOrPassport",
                ];

                const valid = await trigger(fieldsToValidate);
                if (!valid) return;

                // Mark step as completed
                setCompletedSteps((prev) =>
                    prev.includes(currentStep) ? prev : [...prev, currentStep]
                );
            }

            // Can only go forward from step 1 after validation
            if (targetStep > currentStep && currentStep === 1) {
                type AiesecField = `aiesecIntel.${keyof RegistrationFormData["aiesecIntel"]}`;
                const fieldsToValidate: AiesecField[] = [
                    "aiesecIntel.participantType",
                    "aiesecIntel.aiesecEmail",
                    "aiesecIntel.entity",
                    "aiesecIntel.initiativeGroup",
                    "aiesecIntel.customInitiativeGroup",
                    "aiesecIntel.currentPosition",
                ];

                const valid = await trigger(fieldsToValidate);
                if (!valid) return;

                // Mark step as completed
                setCompletedSteps((prev) =>
                    prev.includes(currentStep) ? prev : [...prev, currentStep]
                );
            }

            // Can only go forward from step 2 after validation
            if (targetStep > currentStep && currentStep === 2) {
                type AgentField = `agentProfile.${keyof RegistrationFormData["agentProfile"]}`;
                const fieldsToValidate: AgentField[] = [
                    "agentProfile.foodPreference",
                    "agentProfile.medicalConditions",
                    "agentProfile.guardianName",
                    "agentProfile.guardianContact",
                    "agentProfile.cvLink",
                    "agentProfile.cvConsent",
                ];

                const valid = await trigger(fieldsToValidate);
                if (!valid) return;

                // Mark step as completed
                setCompletedSteps((prev) =>
                    prev.includes(currentStep) ? prev : [...prev, currentStep]
                );
            }

            // Can only go forward from step 3 after validation
            if (targetStep > currentStep && currentStep === 3) {
                type MissionIntelField = `missionIntel.${keyof RegistrationFormData["missionIntel"]}`;
                const fieldsToValidate: MissionIntelField[] = [
                    "missionIntel.missionGoal",
                    "missionIntel.additionalInformation",
                ];

                const valid = await trigger(fieldsToValidate);
                if (!valid) return;

                setCompletedSteps((prev) =>
                    prev.includes(currentStep) ? prev : [...prev, currentStep]
                );
            }

            // Can only go forward from step 4 after validation
            if (targetStep > currentStep && currentStep === 4) {
                type MissionReadinessField = `missionReadiness.${keyof RegistrationFormData["missionReadiness"]}`;
                const fieldsToValidate: MissionReadinessField[] = [
                    "missionReadiness.readinessLevel",
                ];

                const valid = await trigger(fieldsToValidate);
                if (!valid) return;

                setCompletedSteps((prev) =>
                    prev.includes(currentStep) ? prev : [...prev, currentStep]
                );
            }

            setDirection(targetStep > currentStep ? 1 : -1);
            setCurrentStep(targetStep);
        },
        [currentStep, trigger]
    );

    const handleNext = useCallback(() => {
        if (currentStep < TOTAL_STEPS - 1) {
            goToStep(currentStep + 1);
        }
    }, [currentStep, goToStep]);

    const handlePrev = useCallback(() => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep(currentStep - 1);
        }
    }, [currentStep]);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitReferenceCode, setSubmitReferenceCode] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);

    /* ── Form submit ──────────────────────────────────────── */

    const onSubmit = async (data: RegistrationFormData) => {
        setIsSubmitted(true);
        setSubmitError(null);
        setSubmitReferenceCode(null);

        try {
            // Map the nested Form structure to the flat Backend DTO gracefully
            const payload = {
                fullName: data.personalIntel.fullName,
                preferredName: data.personalIntel.preferredName,
                personalEmail: data.personalIntel.personalEmail,
                phone: data.personalIntel.phone,
                profilePicture: data.personalIntel.profilePicture,
                gender: data.personalIntel.gender,
                dateOfBirth: data.personalIntel.dateOfBirth,
                nationalIdOrPassport: data.personalIntel.nationalIdOrPassport,
                participantType: data.aiesecIntel.participantType,
                aiesecEmail: data.aiesecIntel.participantType === "NEWBIE" && !data.aiesecIntel.aiesecEmail ? undefined : data.aiesecIntel.aiesecEmail,
                entityId: data.aiesecIntel.entity,
                initiativeGroupId: data.aiesecIntel.initiativeGroup === "none" ? undefined : data.aiesecIntel.initiativeGroup,
                customInitiativeGroup: data.aiesecIntel.customInitiativeGroup,
                currentPosition: data.aiesecIntel.currentPosition,
                foodPreference: data.agentProfile.foodPreference,
                medicalConditions: data.agentProfile.medicalConditions,
                guardianName: data.agentProfile.guardianName,
                guardianContact: data.agentProfile.guardianContact,
                missionGoal: data.missionIntel.missionGoal,
                additionalInformation: data.missionIntel.additionalInformation,
                readinessLevel: data.missionReadiness.readinessLevel,
                documents: data.agentProfile.cvLink ? [{
                    type: "CV",
                    urlReference: data.agentProfile.cvLink,
                    consentGiven: data.agentProfile.cvConsent === "yes"
                }] : []
            };

            const res = await fetch("/api/register/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const responseData = await res.json();

            if (!res.ok) {
                throw new Error(responseData.error || "Failed to transmit file.");
            }

            setSubmitReferenceCode(responseData.referenceCode);
        } catch (error: any) {
            console.error("[Submission Error]", error);
            setSubmitError(error.message);
        }
    };

    /* ── Current step label ───────────────────────────────── */

    const currentMeta = STEP_META[currentStep];

    /* ── Render step content ──────────────────────────────── */

    function renderStep() {
        switch (currentStep) {
            case 0:
                return <PersonalIntel />;
            case 1:
                return <AiesecIntel />;
            case 2:
                return <AgentProfile />;
            case 3:
                return <MissionIntel />;
            case 4:
                return <MissionReadiness />;
            case 5:
                return <FinalReview onEditStep={(target) => {
                    setDirection(target > currentStep ? 1 : -1);
                    setCurrentStep(target);
                }} />;
            default:
                return null;
        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {isSubmitted ? (
                    <section
                        className="w-full flex items-center justify-center"
                        style={{
                            background: "var(--bg)",
                            minHeight: "60vh",
                            paddingTop: "3rem",
                            paddingBottom: "6rem",
                        }}
                    >
                        <SubmissionSuccess
                            referenceCode={submitReferenceCode}
                            error={submitError}
                            onRetry={() => {
                                setIsSubmitted(false);
                                setSubmitError(null);
                                setSubmitReferenceCode(null);
                            }}
                        />
                    </section>
                ) : (
                    <section
                        className="w-full"
                        style={{
                            background: "var(--bg)",
                            minHeight: "60vh",
                            paddingTop: "3rem",
                            paddingBottom: "6rem",
                        }}
                    >
                        <div
                            className="relative z-10 mx-auto"
                            style={{
                                maxWidth: "1400px",
                                paddingLeft: "clamp(1.5rem, 4vw, 2.5rem)",
                                paddingRight: "clamp(1.5rem, 4vw, 2.5rem)",
                            }}
                        >
                            {/* ── Layout: Sidebar + Form ──────────────────── */}
                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                                {/* Sidebar — Step Indicator */}
                                <div className="lg:w-[280px] xl:w-[320px] flex-shrink-0">
                                    <div className="lg:sticky lg:top-[100px]">
                                        <StepIndicator
                                            currentStep={currentStep}
                                            completedSteps={completedSteps}
                                        />
                                    </div>
                                </div>

                                {/* Main Content Area */}
                                <div className="flex-1 min-w-0">
                                    {/* Step header */}
                                    <div className="mb-8">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span
                                                className="w-1.5 h-1.5 rounded-full animate-blink"
                                                style={{ background: "var(--red)" }}
                                            />
                                            <span className="font-classified text-[9px] tracking-[0.25em] uppercase" style={{ color: "var(--red)" }}>
                                                MISSION {currentMeta.missionNumber} OF {TOTAL_STEPS}
                                            </span>
                                            <div className="h-[1px] flex-1" style={{ background: "var(--border)" }} />
                                            <span className="font-classified text-[8px] tracking-[0.15em] text-white/15">
                      // {currentMeta.fileNo}
                                            </span>
                                        </div>

                                        <h2
                                            className="font-display leading-[0.9] tracking-[0.04em] mb-2"
                                            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text)" }}
                                        >
                                            {currentMeta.title}
                                            <span style={{ color: "var(--red)" }}> {currentMeta.subtitle}</span>
                                        </h2>

                                        <p
                                            className="max-w-lg"
                                            style={{
                                                fontSize: "0.9rem",
                                                color: "var(--text-dim)",
                                                fontWeight: 300,
                                                lineHeight: 1.7,
                                            }}
                                        >
                                            {currentMeta.description}
                                        </p>
                                    </div>

                                    {/* Form card */}
                                    <div
                                        className="dossier-card"
                                        style={{ padding: "clamp(1.5rem, 4vw, 3rem)" }}
                                    >
                                        {/* Corner marks */}
                                        <div className="absolute top-3 left-3 w-3 h-3 corner-tl border-white/08" />
                                        <div className="absolute top-3 right-3 w-3 h-3 corner-tr border-white/08" />
                                        <div className="absolute bottom-3 left-3 w-3 h-3 corner-bl border-white/08" />
                                        <div className="absolute bottom-3 right-3 w-3 h-3 corner-br border-white/08" />

                                        {/* Animated step content */}
                                        <AnimatePresence mode="wait" custom={direction}>
                                            <motion.div
                                                key={currentStep}
                                                custom={direction}
                                                variants={stepVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{
                                                    duration: 0.35,
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                            >
                                                {renderStep()}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    {/* Navigation buttons */}
                                    <div
                                        className="flex flex-col items-center justify-between mt-8 sm:flex-row gap-4"
                                        style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}
                                    >
                                        {/* Back */}
                                        {currentStep > 0 ? (
                                            <button
                                                type="button"
                                                onClick={handlePrev}
                                                className="btn-ghost"
                                                id="reg-btn-prev"
                                                disabled={isSubmitted}
                                            >
                                                ← PREVIOUS MISSION
                                            </button>
                                        ) : (
                                            <div className="hidden sm:block" /> /* Spacer */
                                        )}

                                        {/* Next / Submit */}
                                        {currentStep < TOTAL_STEPS - 1 ? (
                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                className="btn-mission"
                                                id="reg-btn-next"
                                            >
                                                NEXT MISSION →
                                            </button>
                                        ) : (
                                            <div className="flex flex-col items-end gap-3 text-right">
                                                {!isSubmitted && (
                                                    <span className="font-sans text-xs tracking-wide text-white/50 max-w-[280px]">
                                                        Once submitted, your mission profile will be sent to the NLDS 2026 Conference Team for review.
                                                    </span>
                                                )}
                                                <button
                                                    type={isSubmitted ? "button" : "submit"}
                                                    className="btn-mission"
                                                    id="reg-btn-submit"
                                                    disabled={isSubmitted}
                                                    style={{ opacity: isSubmitted ? 0.8 : 1, background: isSubmitted ? "var(--border-strong)" : "" }}
                                                >
                                                    {isSubmitted ? "MISSION SUBMITTED ✔️" : "SUBMIT MISSION →"}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer info */}
                                    <div className="flex items-center justify-center gap-3 mt-8">
                                        <div className="h-[1px] w-6" style={{ background: "var(--border)" }} />
                                        <span className="font-classified text-[8px] tracking-[0.2em] text-white/15 uppercase">
                                            REGISTRATION DATA IS ENCRYPTED IN TRANSIT
                                        </span>
                                        <div className="h-[1px] w-6" style={{ background: "var(--border)" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </form>
        </FormProvider>
    );
}
