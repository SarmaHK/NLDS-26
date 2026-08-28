"use client";

import { motion } from "framer-motion";

interface Props {
    referenceCode: string | null;
    error: string | null;
    onRetry?: () => void;
}

export default function SubmissionSuccess({ referenceCode, error, onRetry }: Props) {
    const succeeded = Boolean(referenceCode) && !error;

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-8 w-full max-w-md mx-auto text-center py-16"
            >
                <span className="font-classified text-[10px] tracking-[0.32em] text-[var(--red)]">
                    TRANSMISSION FAILED
                </span>
                <p className="font-sans text-[15px] tracking-wide text-[var(--text-dim)]">
                    {error || "Unknown network sequence interrupted"}
                </p>
                <button type="button" onClick={onRetry} className="btn-ghost mt-2 px-6">
                    RETRY TRANSMISSION
                </button>
            </motion.div>
        );
    }

    if (!succeeded) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-8 w-full max-w-md mx-auto text-center py-20"
            >
                <div className="relative flex items-center justify-center w-28 h-28">
                    <span className="absolute inset-0 rounded-full border border-[var(--red)]/30" />
                    <span className="absolute inset-3 rounded-full border border-[var(--red)]/20" />
                    <span className="absolute inset-6 rounded-full border border-[var(--red)]/40 animate-blink" />
                    <span className="w-2 h-2 rounded-full" style={{ background: "var(--red)" }} />
                </div>
                <h2 className="font-display text-3xl tracking-[0.12em] text-white">
                    TRANSMITTING...
                </h2>
                <p className="font-classified text-[12px] tracking-[0.22em] text-[var(--text-dim)] uppercase">
                    Please stand by.
                </p>
                <div className="reg-progress reg-progress--indet w-full max-w-[220px]">
                    <div className="reg-progress__bar" />
                </div>
            </motion.div>
        );
    }

    return (
        <div className="relative flex flex-col items-center justify-center text-center min-h-[70vh] py-16 sm:py-24 overflow-hidden w-full">
            <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: [0, 0.8, 0.25] }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    background: "linear-gradient(90deg, transparent, var(--red), transparent)",
                }}
            />

            <motion.p
                className="font-classified text-[10px] tracking-[0.4em] text-[var(--red)] mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                TRANSMISSION COMPLETE
            </motion.p>

            <motion.h2
                className="font-display leading-[0.9] tracking-[0.06em] text-white mb-6 sm:mb-8"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
                MISSION ACCEPTED
            </motion.h2>

            <motion.p
                className="font-sans text-[15px] sm:text-base text-[var(--text-dim)] max-w-md leading-[1.8] relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                Your registration has been successfully submitted.
                <br />
                Your mission briefing has been received.
                <br />
                <span className="block mt-6 text-[13px] tracking-wide text-white/60 uppercase font-medium">
                    Further communication will be sent to your registered email if required.
                </span>
            </motion.p>

            <motion.p
                className="font-classified text-[9px] tracking-[0.4em] text-[var(--red)] mt-12 sm:mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
            >
                STAND BY FOR FURTHER INSTRUCTIONS
            </motion.p>
        </div>
    );
}
