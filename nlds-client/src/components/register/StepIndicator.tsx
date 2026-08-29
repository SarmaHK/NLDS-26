"use client";

import { motion } from "framer-motion";
import { STEP_META, TOTAL_STEPS, type StepMeta } from "@/lib/register/types";

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: number[];
}

export default function StepIndicator({
  currentStep,
  completedSteps,
}: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="hidden lg:block">
        <DesktopIndicator
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      </div>
      <div className="block lg:hidden">
        <MobileIndicator
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      </div>
    </div>
  );
}

function DesktopIndicator({
  currentStep,
  completedSteps,
}: {
  currentStep: number;
  completedSteps: number[];
}) {
  return (
    <nav
      aria-label="Mission protocol"
      className="reg-panel"
      style={{ padding: "1.75rem 1.5rem" }}
    >
      <div
        className="flex items-center gap-3 mb-6"
        style={{
          borderBottom: "1px solid var(--border)",
          paddingBottom: "1rem",
        }}
      >
        <span
          className="animate-blink w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: "var(--red)" }}
        />
        <span className="font-classified text-[9px] tracking-[0.25em] text-white/40 uppercase">
          MISSION PROTOCOL
        </span>
        <span className="font-classified text-[9px] tracking-[0.15em] text-white/25 ml-auto tabular">
          {String(currentStep + 1).padStart(2, "0")} /{" "}
          {String(TOTAL_STEPS).padStart(2, "0")}
        </span>
      </div>

      <ol className="flex flex-col gap-0">
        {STEP_META.map((meta, index) => {
          const isActive = index === currentStep;
          const isCompleted = completedSteps.includes(index);
          const isLocked = index > currentStep && !isCompleted;

          return (
            <li key={meta.step}>
              <StepRow
                meta={meta}
                index={index}
                isActive={isActive}
                isCompleted={isCompleted}
                isLocked={isLocked}
                isLast={index === STEP_META.length - 1}
              />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function StepRow({
  meta,
  index,
  isActive,
  isCompleted,
  isLocked,
  isLast,
}: {
  meta: StepMeta;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  isLocked: boolean;
  isLast: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className="w-[2px] flex-shrink-0"
          style={{
            height: 10,
            background:
              index === 0
                ? "transparent"
                : isCompleted || isActive
                  ? "var(--red)"
                  : "rgba(255,255,255,0.1)",
          }}
        />
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{
            background: isActive || isCompleted ? "var(--red)" : "transparent",
            border: `1px solid ${isActive || isCompleted ? "var(--red)" : "rgba(255,255,255,0.2)"}`,
            boxShadow: isActive ? "0 0 10px rgba(196,30,58,0.55)" : "none",
          }}
        />
        {!isLast && (
          <div
            className="w-[2px] flex-1 min-h-[18px]"
            style={{
              background: isCompleted ? "var(--red)" : "rgba(255,255,255,0.1)",
            }}
          />
        )}
      </div>

      <div
        className="flex items-center gap-3 py-2.5 min-w-0 flex-1"
        style={{
          opacity: isLocked ? 0.45 : 1,
        }}
      >
        <span
          className="font-classified text-[10px] tracking-[0.18em] tabular flex-shrink-0"
          style={{ color: isActive ? "var(--red)" : "rgba(255,255,255,0.35)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex flex-col min-w-0">
          <span
            className="font-classified text-[10px] tracking-[0.14em] uppercase truncate"
            style={{
              color: isActive
                ? "var(--text)"
                : isCompleted
                  ? "var(--text-dim)"
                  : "rgba(255,255,255,0.45)",
            }}
          >
            {meta.label}
          </span>
          <span className="sr-only">
            {isCompleted ? "Complete" : isActive ? "Current step" : "Upcoming"}
          </span>
        </div>
      </div>
    </div>
  );
}

function MobileIndicator({
  currentStep,
  completedSteps,
}: {
  currentStep: number;
  completedSteps: number[];
}) {
  const meta = STEP_META[currentStep];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-1.5 h-1.5 rounded-full animate-blink flex-shrink-0"
            style={{ background: "var(--red)" }}
          />
          <span
            className="font-classified text-[9px] tracking-[0.22em] uppercase tabular"
            style={{ color: "var(--red)" }}
          >
            {String(currentStep + 1).padStart(2, "0")} /{" "}
            {String(TOTAL_STEPS).padStart(2, "0")}
          </span>
        </div>
        <span className="font-classified text-[10px] tracking-[0.12em] text-white/50 uppercase truncate">
          {meta.label}
        </span>
      </div>

      <div className="flex items-center gap-1.5" aria-hidden>
        {STEP_META.map((_, index) => (
          <motion.div
            key={index}
            className="h-[2px] flex-1"
            initial={false}
            animate={{
              backgroundColor:
                index < currentStep || completedSteps.includes(index)
                  ? "var(--red)"
                  : index === currentStep
                    ? "var(--red-bright)"
                    : "rgba(255,255,255,0.08)",
            }}
            transition={{ duration: 0.35 }}
          />
        ))}
      </div>
    </div>
  );
}
