"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { STEP_META, TOTAL_STEPS, type StepMeta } from "@/lib/register/types";

interface StepIndicatorProps {
    currentStep: number;
    completedSteps: number[];
}

export default function StepIndicator({ currentStep, completedSteps }: StepIndicatorProps) {
    return (
        <div className="w-full">
            {/* Desktop step indicator */}
            <div className="hidden md:block">
                <DesktopIndicator currentStep={currentStep} completedSteps={completedSteps} />
            </div>
            {/* Mobile step indicator */}
            <div className="block md:hidden">
                <MobileIndicator currentStep={currentStep} />
            </div>
        </div>
    );
}

/* ─── Desktop Version ──────────────────────────────────────── */

function DesktopIndicator({
    currentStep,
    completedSteps,
}: {
    currentStep: number;
    completedSteps: number[];
}) {
    return (
        <div
            className="dossier-card"
            style={{ padding: "2rem 2.5rem" }}
        >
            {/* Header */}
            <div
                className="flex items-center gap-3 mb-6"
                style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}
            >
                <span
                    className="animate-blink w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--red)" }}
                />
                <span className="font-classified text-[9px] tracking-[0.25em] text-white/30 uppercase">
                    MISSION PROGRESS
                </span>
                <span className="font-classified text-[9px] tracking-[0.15em] text-white/20 ml-auto">
                    {currentStep + 1} / {TOTAL_STEPS}
                </span>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-1">
                {STEP_META.map((meta, index) => {
                    const isActive = index === currentStep;
                    const isCompleted = completedSteps.includes(index);
                    const isLocked = index > currentStep && !isCompleted;

                    return (
                        <StepRow
                            key={meta.step}
                            meta={meta}
                            index={index}
                            isActive={isActive}
                            isCompleted={isCompleted}
                            isLocked={isLocked}
                        />
                    );
                })}
            </div>

            {/* Progress bar */}
            <div className="mt-6 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="flex justify-between mb-2">
                    <span className="font-classified text-[8px] tracking-[0.2em] text-white/20 uppercase">
                        COMPLETION
                    </span>
                    <span className="font-classified text-[9px] tabular text-white/30">
                        {Math.round((completedSteps.length / TOTAL_STEPS) * 100)}%
                    </span>
                </div>
                <div
                    className="h-[2px] relative overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                >
                    <motion.div
                        className="absolute top-0 left-0 h-full"
                        style={{ background: "var(--red)" }}
                        initial={{ width: "0%" }}
                        animate={{ width: `${(completedSteps.length / TOTAL_STEPS) * 100}%` }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                </div>
            </div>

        </div>
    );
}

function StepRow({
    meta,
    index,
    isActive,
    isCompleted,
    isLocked,
}: {
    meta: StepMeta;
    index: number;
    isActive: boolean;
    isCompleted: boolean;
    isLocked: boolean;
}) {
    return (
        <div
            className="flex items-center gap-3 py-2.5 px-3 rounded-sm transition-all duration-300"
            style={{
                background: isActive ? "rgba(196,30,58,0.08)" : "transparent",
                borderLeft: isActive ? "2px solid var(--red)" : "2px solid transparent",
            }}
        >
            {/* Status indicator */}
            <div
                className="w-5 h-5 flex items-center justify-center flex-shrink-0"
                style={{
                    border: `1px solid ${isCompleted ? "var(--red)" : isActive ? "var(--red)" : "rgba(255,255,255,0.1)"}`,
                    background: isCompleted ? "var(--red)" : "transparent",
                }}
            >
                {isCompleted ? (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <span
                        className="font-classified text-[8px]"
                        style={{
                            color: isActive ? "var(--red)" : "rgba(255,255,255,0.2)",
                        }}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </span>
                )}
            </div>

            {/* Label */}
            <div className="flex flex-col gap-0.5 min-w-0">
                <span
                    className="font-classified text-[9px] tracking-[0.2em] uppercase truncate"
                    style={{
                        color: isActive
                            ? "var(--red)"
                            : isCompleted
                                ? "rgba(255,255,255,0.6)"
                                : isLocked
                                    ? "rgba(255,255,255,0.2)"
                                    : "rgba(255,255,255,0.35)",
                    }}
                >
                    MISSION {meta.missionNumber}
                </span>
                <span
                    className="font-classified text-[10px] tracking-[0.12em] uppercase truncate"
                    style={{
                        color: isActive
                            ? "rgba(255,255,255,0.9)"
                            : isCompleted
                                ? "rgba(255,255,255,0.5)"
                                : "rgba(255,255,255,0.25)",
                    }}
                >
                    {meta.label}
                </span>
            </div>

            {/* Status badge */}
            <span
                className="font-classified text-[7px] tracking-[0.18em] uppercase ml-auto flex-shrink-0"
                style={{
                    color: isCompleted
                        ? "#4ade80"
                        : isActive
                            ? "var(--red)"
                            : "rgba(255,255,255,0.12)",
                }}
            >
                {isCompleted ? "COMPLETE" : isActive ? "ACTIVE" : "LOCKED"}
            </span>
        </div>
    );
}

/* ─── Mobile Version ──────────────────────────────────────── */

function MobileIndicator({ currentStep }: { currentStep: number }) {
    const meta = STEP_META[currentStep];

    return (
        <div className="flex flex-col gap-3">
            {/* Mission label */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span
                        className="w-1.5 h-1.5 rounded-full animate-blink"
                        style={{ background: "var(--red)" }}
                    />
                    <span className="font-classified text-[9px] tracking-[0.25em] uppercase" style={{ color: "var(--red)" }}>
                        MISSION {meta.missionNumber} OF {TOTAL_STEPS}
                    </span>
                </div>
                <span className="font-classified text-[9px] tracking-[0.12em] text-white/25 uppercase">
                    {meta.label}
                </span>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-1.5">
                {STEP_META.map((_, index) => (
                    <div
                        key={index}
                        className="h-[3px] flex-1 rounded-full transition-all duration-500"
                        style={{
                            background:
                                index < currentStep
                                    ? "var(--red)"
                                    : index === currentStep
                                        ? "var(--red-bright)"
                                        : "rgba(255,255,255,0.08)",
                            opacity: index < currentStep ? 0.6 : 1,
                        }}
                    />
                ))}
            </div>

        </div>
    );
}
