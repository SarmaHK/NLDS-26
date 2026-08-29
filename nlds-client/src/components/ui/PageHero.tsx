"use client";

import { motion } from "framer-motion";

interface PageHeroProps {
  label: string; // e.g. "THE MISSION"
  fileNo: string; // e.g. "NLDS-2026-ABOUT"
  title: string; // e.g. "ABOUT"
  subtitle?: string; // e.g. "NLDS'26"
  description?: string;
}

export default function PageHero({
  label,
  fileNo,
  title,
  subtitle,
  description,
}: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden flex flex-col justify-center items-center"
      style={{
        background: "var(--bg)",
        minHeight: "clamp(380px, 50vh, 560px)",
        paddingTop: "9rem" /* generous top — clears navbar + breathes */,
        paddingBottom: "4rem" /* clear gap before the section below */,
        borderBottom: "1px solid var(--border)",
        textAlign: "center",
      }}
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Red glow top-left */}
      <div
        className="pointer-events-none absolute top-0 left-0"
        style={{
          width: "400px",
          height: "200px",
          background:
            "radial-gradient(ellipse at top left, rgba(196,30,58,1) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.04,
        }}
      />

      {/* Film grain */}
      <div
        className="animate-grain pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Corner marks */}
      <div className="absolute bottom-6 right-6 z-10 w-4 h-4 corner-br border-white/10" />
      <div className="absolute bottom-6 left-6 z-10 w-4 h-4 corner-bl border-white/10" />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 1.5rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Label row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "2rem" /* space between label and title */,
          }}
        >
          <div
            style={{ height: "1px", width: "1.5rem", background: "var(--red)" }}
          />
          <span className="label-classified">{label}</span>
          <span
            className="font-classified"
            style={{
              fontSize: "8px",
              color: "rgba(255,255,255,0.15)",
              letterSpacing: "0.15em",
            }}
          >
            // {fileNo}
          </span>
          <div
            style={{ height: "1px", width: "1.5rem", background: "var(--red)" }}
          />
        </motion.div>

        {/* Title + Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 8.5rem)",
              color: "var(--text)",
              letterSpacing: "0.04em",
              lineHeight: 0.88,
              marginBottom: description
                ? "2.5rem"
                : "0" /* space between title and description */,
            }}
          >
            {title}
            {subtitle && (
              <span style={{ color: "var(--red)" }}> {subtitle}</span>
            )}
          </h1>

          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                maxWidth: "36rem",
                textAlign: "center",
                fontSize: "0.95rem",
                color: "var(--text-muted)",
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Bottom thin red line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, var(--red), transparent 60%)",
          opacity: 0.25,
        }}
      />
    </section>
  );
}
