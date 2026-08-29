"use client";

import { Lock } from "lucide-react";

interface LockedStepProps {
  missionNumber: number;
  label: string;
  description: string;
}

/**
 * Placeholder for steps that are not yet implemented.
 * Displays a locked/classified card in the Mission Impossible theme.
 */
export default function LockedStep({
  missionNumber,
  label,
  description,
}: LockedStepProps) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-16 px-6"
      style={{ minHeight: "300px" }}
    >
      {/* Lock icon */}
      <div
        className="w-16 h-16 flex items-center justify-center mb-6"
        style={{
          border: "1px solid var(--border-strong)",
          background: "var(--surface-1)",
        }}
      >
        <Lock size={24} style={{ color: "rgba(255,255,255,0.2)" }} />
      </div>

      {/* Mission label */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="h-[1px] w-6"
          style={{ background: "var(--red)", opacity: 0.5 }}
        />
        <span className="label-classified" style={{ opacity: 0.6 }}>
          MISSION {missionNumber}
        </span>
        <div
          className="h-[1px] w-6"
          style={{ background: "var(--red)", opacity: 0.5 }}
        />
      </div>

      {/* Title */}
      <h3
        className="font-display tracking-[0.04em] mb-3"
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          color: "rgba(255,255,255,0.3)",
        }}
      >
        {label}
      </h3>

      {/* Description */}
      <p
        className="font-classified text-[10px] tracking-[0.18em] uppercase max-w-sm mb-6"
        style={{ color: "rgba(255,255,255,0.18)", lineHeight: 1.8 }}
      >
        {description}
      </p>

      {/* CLASSIFIED stamp */}
      <div
        style={{
          border: "1px solid rgba(196,30,58,0.3)",
          padding: "0.35rem 1.2rem",
        }}
      >
        <span
          className="font-classified text-[9px] tracking-[0.3em] uppercase"
          style={{ color: "var(--red)", opacity: 0.5 }}
        >
          CLASSIFIED — PHASE 2
        </span>
      </div>
    </div>
  );
}
