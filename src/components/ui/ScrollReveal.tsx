"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    /** Delay in seconds */
    delay?: number;
    /** Direction from which to reveal */
    direction?: "up" | "down" | "left" | "right" | "none";
    /** How much of the element must be visible before triggering */
    threshold?: number;
    /** Only trigger once */
    once?: boolean;
}

/**
 * Wraps children in a scroll-triggered entrance animation.
 * Respects prefers-reduced-motion via Framer Motion's built-in support.
 */
export default function ScrollReveal({
    children,
    className,
    delay = 0,
    direction = "up",
    threshold = 0.2,
    once = true,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { amount: threshold, once });

    const offsets: Record<string, { x?: number; y?: number }> = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 },
        none: {},
    };

    const variants: Variants = {
        hidden: { opacity: 0, ...offsets[direction] },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay,
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={className}
        >
            {children}
        </motion.div>
    );
}
