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
                <p className="font-sans text-sm tracking-wide text-white/60">
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
                <p className="font-classified text-[10px] tracking-[0.22em] text-white/40 uppercase">
                    Please stand by.
                </p>
                <div className="reg-progress reg-progress--indet w-full max-w-[220px]">
                    <div className="reg-progress__bar" />
                </div>
            </motion.div>
        );
    }

    return (
        <div className="relative flex flex-col items-center text-center py-16 sm:py-24 overflow-hidden">
            <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-1/3 h-px"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: [0, 0.7, 0] }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    background: "linear-gradient(90deg, transparent, var(--red), transparent)",
                }}
            />

            <motion.p
                className="font-classified text-[10px] tracking-[0.4em] text-[var(--red)] mb-5"
                initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.45 }}
            >
                TRANSMISSION COMPLETE
            </motion.p>

            <motion.h2
                className="font-display leading-[0.9] tracking-[0.06em] text-white mb-6"
                style={{ fontSize: "clamp(2.4rem, 7vw, 5rem)" }}
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.55, delay: 0.15 }}
            >
                MISSION ACCEPTED
            </motion.h2>

            <motion.p
                className="font-sans text-base text-white/60 max-w-md leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                Your registration has been successfully submitted.
                <br />
                Your mission briefing has been received.
                <br />
                <span className="block mt-4 text-sm text-white/40">
                    Further communication will be sent to your registered email if required.
                </span>
            </motion.p>

            <motion.p
                className="font-classified text-[9px] tracking-[0.38em] text-[var(--red)] mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
            >
                STAND BY FOR FURTHER INSTRUCTIONS
            </motion.p>
        </div>
    );
}
