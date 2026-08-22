"use client";

import { useEffect, useState } from "react";
import { getTimeRemaining } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CountdownProps {
    targetDate: string;
    className?: string;
    labelClassName?: string;
    valueClassName?: string;
}

interface TimeUnit {
    label: string;
    value: number;
}

/**
 * Live countdown timer to the event date.
 * Client component — uses state + interval.
 */
export default function Countdown({
    targetDate,
    className,
    labelClassName,
    valueClassName,
}: CountdownProps) {
    const [time, setTime] = useState(getTimeRemaining(targetDate));
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setTime(getTimeRemaining(targetDate));
        }, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <div className={cn("flex items-center gap-6", className)}>
                {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
                    <CountdownUnit key={label} label={label} value={0} valueClassName={valueClassName} labelClassName={labelClassName} />
                ))}
            </div>
        );
    }

    const units: TimeUnit[] = [
        { label: "Days", value: time.days },
        { label: "Hours", value: time.hours },
        { label: "Minutes", value: time.minutes },
        { label: "Seconds", value: time.seconds },
    ];

    return (
        <div className={cn("flex items-center gap-4 sm:gap-8", className)}>
            {units.map((unit, i) => (
                <div key={unit.label} className="flex items-center gap-4 sm:gap-8">
                    <CountdownUnit
                        label={unit.label}
                        value={unit.value}
                        valueClassName={valueClassName}
                        labelClassName={labelClassName}
                    />
                    {i < units.length - 1 && (
                        <span className="text-white/30 text-2xl font-light mb-4">:</span>
                    )}
                </div>
            ))}
        </div>
    );
}

function CountdownUnit({
    label,
    value,
    valueClassName,
    labelClassName,
}: {
    label: string;
    value: number;
    valueClassName?: string;
    labelClassName?: string;
}) {
    return (
        <div className="flex flex-col items-center gap-1">
            <span
                className={cn(
                    "text-4xl sm:text-5xl lg:text-6xl font-bold text-white tabular-nums leading-none",
                    valueClassName
                )}
            >
                {String(value).padStart(2, "0")}
            </span>
            <span
                className={cn(
                    "text-[10px] sm:text-xs uppercase tracking-[0.15em] text-white/40 font-medium",
                    labelClassName
                )}
            >
                {label}
            </span>
        </div>
    );
}
