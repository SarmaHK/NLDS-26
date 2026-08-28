"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function StoreFront() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="store"
      className="relative overflow-hidden w-full flex flex-col items-center justify-center"
      style={{ background: "var(--bg)", paddingTop: "8rem", paddingBottom: "10rem" }}
    >
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Red ambient glow centered */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(196,30,58,1) 0%, transparent 70%)",
          filter: "blur(140px)",
          opacity: 0.07,
        }}
      />

      {/* Content — completely frameless, spacious & centered */}
      <div className="relative z-10 max-w-[800px] mx-auto px-6 md:px-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
        >


          {/* Main Headline */}
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(3rem, 9vw, 6.5rem)",
              letterSpacing: "0.04em",
              lineHeight: 0.88,
              color: "white",
              marginBottom: "2rem",
            }}
          >
            LAUNCHING SOON!
          </h2>

          {/* Subtext */}
          <p
            style={{
              color: "var(--text-dim)",
              maxWidth: "32rem",
              width: "100%",
              fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
              fontWeight: 300,
              lineHeight: 1.8,
              marginBottom: "2.5rem",
              padding: "0 1.5rem",
            }}
          >
            Official NLDS&apos;26 merchandise and operative gear are currently being prepared.
            Stay tuned for the deployment date.
          </p>

          {/* Status Tag */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 1.5rem",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--red)", opacity: 0.6 }} />
            <span className="font-classified" style={{ fontSize: "11px", letterSpacing: "0.22em", color: "var(--text-muted)" }}>
              STATUS: ACCESS LOCKED UNTIL RELEASE
            </span>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--red)", opacity: 0.6 }} />
          </div>

        </motion.div>
      </div>
    </section>
  );
}

