"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: "270+", label: "OPERATIVES", sub: "Future leaders" },
  { value: "11+", label: "UNIVERSITIES", sub: "Across Sri Lanka" },
  { value: "03", label: "DAYS", sub: "Of transformation" },
  { value: "01", label: "MISSION", sub: "Impossible" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function MissionBriefing() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="mission"
      className="relative w-full overflow-hidden py-24 md:py-32"
      style={{
        background: "var(--bg)",
        marginTop: "clamp(4rem, 10vw, 8rem)",
      }}
    >
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(196,30,58,1) 0%, transparent 70%)",
          filter: "blur(120px)",
          opacity: 0.04,
        }}
      />

      {/* Centered wrapper */}
      <div
        className="relative z-10"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingLeft: "clamp(1.5rem, 6vw, 5rem)",
          paddingRight: "clamp(1.5rem, 6vw, 5rem)",
        }}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "2rem",
            width: "100%",
            maxWidth: "56rem",
          }}
        >
          {/* Section label */}
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <div style={{ height: "1px", width: "2.5rem", background: "var(--red)" }} />
            <span className="label-classified">THE MISSION</span>
            <div style={{ height: "1px", width: "2.5rem", background: "var(--red)" }} />
          </motion.div>

          {/* File info */}
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "center" }}>
              <span className="label-section">FILE NO.</span>
              <span className="font-classified text-[10px] text-white/40">NLDS-2026-0001</span>
            </div>
            <div style={{ height: "1.5rem", width: "1px", background: "var(--border)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "center" }}>
              <span className="label-section">ORIGIN</span>
              <span className="font-classified text-[10px] text-white/40">AIESEC IN SRI LANKA</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="font-display leading-[0.9] tracking-[0.03em]"
            style={{
              fontSize: "clamp(2.6rem, 6vw, 5rem)",
              color: "var(--text)",
              textAlign: "center",
              width: "100%",
            }}
          >
            EVERY GENERATION FACES CHALLENGES THAT SEEM IMPOSSIBLE.
          </motion.h2>

          {/* Body text */}
          <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", maxWidth: "38rem", textAlign: "center" }}>
            <p style={{ fontSize: "1.1rem", color: "var(--text-dim)", fontWeight: 300, lineHeight: 1.7 }}>
              The National Leadership Development Seminar (NLDS) is one of the largest
              conferences organized by AIESEC in Sri Lanka, bringing together over 270 delegates
              from more than 11 prestigious universities across the country. It serves as a
              platform for AIESECers from all over Sri Lanka to connect, expand their networks,
              and foster the development of the next generation of leaders.
            </p>
          </motion.div>

          {/* Classification stamp */}
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center" }}>
            <div
              style={{ border: "1px solid var(--red)", padding: "0.375rem 1rem", opacity: 0.65 }}
            >
              <span className="label-classified">CLASSIFIED</span>
            </div>
            <span className="font-classified text-[11px] text-white/50">
              AUTHORIZED PERSONNEL ONLY
            </span>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4"
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              gap: "1px",
              width: "100%",
              background: "var(--border)",
              border: "1px solid var(--border)",
              marginTop: "2rem",
            }}
          >
            {STATS.map(({ value, label, sub }, i) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="group"
                style={{
                  background: "var(--surface-1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "0.5rem",
                  padding: "1.5rem 0.75rem",
                  position: "relative",
                  transition: "background 0.3s",
                }}
              >
                <span className="font-classified text-[8px] text-white/20" style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span
                  className="font-display leading-none"
                  style={{
                    fontSize: "clamp(2rem, 10vw, 4.2rem)",
                    color: i === 3 ? "var(--red)" : "var(--text)",
                  }}
                >
                  {value}
                </span>

                <span className="font-classified text-[11px] tracking-[0.22em] text-[var(--text-dim)]">
                  {label}
                </span>

                <span className="font-classified text-[10px] text-[var(--text-muted)]">
                  {sub.toUpperCase()}
                </span>

                <div
                  className="group-hover:w-full transition-all duration-500"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "2px",
                    width: 0,
                    background: "var(--red)",
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
        }}
      />
    </section>
  );
}
