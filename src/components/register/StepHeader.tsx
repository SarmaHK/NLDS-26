import { STEP_META, TOTAL_STEPS } from "@/lib/register/types";

export default function StepHeader({ currentStep }: { currentStep: number }) {
    const currentMeta = STEP_META[currentStep];

    return (
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
                <span
                    className="w-1.5 h-1.5 rounded-full animate-blink"
                    style={{ background: "var(--red)" }}
                />
                <span
                    className="font-classified text-[9px] tracking-[0.25em] uppercase tabular"
                    style={{ color: "var(--red)" }}
                >
                    {String(currentStep + 1).padStart(2, "0")} / {String(TOTAL_STEPS).padStart(2, "0")}
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
    );
}
