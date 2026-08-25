"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
    referenceCode: string | null;
    error: string | null;
    onRetry?: () => void;
}

export default function SubmissionSuccess({ referenceCode, error, onRetry }: Props) {
    const [phase, setPhase] = useState<"initializing" | "verifying" | "securing" | "transmitting" | "secured" | "error">("initializing");
    const [progress, setProgress] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (error) {
            setPhase("error");
            return;
        }

        if (referenceCode) {
            setPhase("secured");
            setProgress(100);
            return;
        }

        const phases: Array<typeof phase> = ["initializing", "verifying", "securing", "transmitting"];
        let currentPhaseIdx = phases.indexOf(phase);

        if (currentPhaseIdx === -1 || currentPhaseIdx >= phases.length) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + (Math.random() * 8 + 2);
                if (next > 95) {
                    return 95;
                }

                if (next > 25 && next < 50 && currentPhaseIdx === 0) setPhase("verifying");
                if (next > 50 && next < 75 && currentPhaseIdx <= 1) setPhase("securing");
                if (next > 75 && currentPhaseIdx <= 2) setPhase("transmitting");

                return next;
            });
        }, 300);

        return () => clearInterval(interval);
    }, [phase, error, referenceCode]);

    return (
        <fieldset className="flex flex-col items-center justify-center min-h-[400px] w-full dossier-card p-6 sm:p-12 text-center overflow-hidden relative">
            {phase !== "secured" && phase !== "error" ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-6 w-full max-w-sm"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[var(--red)] animate-pulse" />
                        <h2 className="font-bebas text-2xl tracking-[0.1em] text-white">
                            {phase === "initializing" && "INITIALIZING MISSION FILE..."}
                            {phase === "verifying" && "VERIFYING IDENTITY..."}
                            {phase === "securing" && "SECURING DOSSIER..."}
                            {phase === "transmitting" && "TRANSMITTING REGISTRATION..."}
                        </h2>
                    </div>
                    <p className="font-sans text-sm tracking-wide text-white/60 uppercase">
                        Please stand by.
                    </p>

                    <div className="w-full flex flex-col gap-2 mt-4">
                        <div className="flex justify-between font-mono text-xs tracking-widest text-[var(--red)]">
                            <span>PROCESSING</span>
                            <span>{Math.floor(progress)}%</span>
                        </div>
                        <div className="h-4 w-full border border-[var(--border-strong)] p-[2px] bg-black/50">
                            <motion.div
                                className="h-full bg-[var(--red)]"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "linear" }}
                            />
                        </div>
                    </div>
                </motion.div>
            ) : phase === "error" ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-8 w-full max-w-md"
                >
                    <div className="flex flex-col items-center gap-2">
                        <h2 className="font-bebas text-3xl tracking-[0.1em] text-[var(--red)]">
                            TRANSMISSION FAILED
                        </h2>
                        <p className="font-sans text-sm tracking-wide text-white/60">
                            {error || "Unknown network sequence interrupted"}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onRetry}
                        className="btn-ghost mt-4 px-6 w-full sm:w-auto"
                    >
                        RETRY TRANSMISSION
                    </button>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-8 w-full max-w-md"
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full border border-[var(--red)] bg-white/5 mb-4">
                            <Check className="text-[var(--red)]" size={32} />
                        </div>
                        <h2 className="font-bebas text-4xl tracking-[0.1em] text-white">
                            MISSION COMPLETE
                        </h2>
                        <p className="font-sans text-base tracking-wide text-white/60 mt-2 text-center leading-relaxed">
                            Your registration has been successfully submitted.<br />
                            Thank you for accepting the mission.<br /><br />
                            <span className="text-xs text-white/40">Further communication will be sent to your registered email if required.</span>
                        </p>
                    </div>
                </motion.div>
            )}
        </fieldset>
    );
}
