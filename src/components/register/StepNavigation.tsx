import { TOTAL_STEPS } from "@/lib/register/types";

interface StepNavigationProps {
    currentStep: number;
    isSubmitting: boolean;
    onPrev: () => void;
    onNext: () => void;
}

export default function StepNavigation({
    currentStep,
    isSubmitting,
    onPrev,
    onNext,
}: StepNavigationProps) {
    const isLast = currentStep >= TOTAL_STEPS - 1;

    return (
        <div
            className="flex flex-col items-stretch justify-between mt-8 sm:flex-row sm:items-center gap-4"
            style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}
        >
            {currentStep > 0 ? (
                <button
                    type="button"
                    onClick={onPrev}
                    className="btn-ghost"
                    id="reg-btn-prev"
                    disabled={isSubmitting}
                >
                    BACK
                </button>
            ) : (
                <div className="hidden sm:block" />
            )}

            {isLast ? (
                <div className="flex flex-col items-stretch sm:items-end gap-3 sm:text-right">
                    <span className="font-sans text-xs tracking-wide text-white/50 max-w-[280px]">
                        Once submitted, your mission profile will be sent to the NLDS 2026 Conference Team for review.
                    </span>
                    <button
                        type="submit"
                        className="btn-mission"
                        id="reg-btn-submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "TRANSMITTING..." : "SUBMIT MISSION →"}
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={onNext}
                    className="btn-mission"
                    id="reg-btn-next"
                    disabled={isSubmitting}
                >
                    CONTINUE →
                </button>
            )}
        </div>
    );
}
