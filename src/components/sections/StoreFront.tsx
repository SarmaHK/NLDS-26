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
      className="relative overflow-hidden w-full flex flex-col items-center justify-center py-28 md:py-48 lg:py-56"
      style={{ background: "var(--bg)" }}
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
          className="flex flex-col items-center"
        >
          {/* Glowing Icon Badge */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-8"
            style={{
              background: "rgba(196,30,58,0.08)",
              border: "1px solid rgba(196,30,58,0.3)",
              boxShadow: "0 0 30px rgba(196,30,58,0.15)",
            }}
          >
            <ShoppingBag size={24} className="text-[var(--red)]" />
          </div>

          {/* Classification Strip */}
          <div className="flex items-center gap-3 mb-5">
            <span className="animate-blink w-1.5 h-1.5 rounded-full" style={{ background: "var(--red)" }} />
            <span className="label-classified text-[9px] tracking-[0.28em]">
              PROCUREMENT CELL // GEAR DEPLOYMENT
            </span>
            <span className="animate-blink w-1.5 h-1.5 rounded-full" style={{ background: "var(--red)" }} />
          </div>

          {/* Main Headline */}
          <h2
            className="font-display tracking-[0.04em] leading-[0.88] mb-6 text-white"
            style={{ fontSize: "clamp(3rem, 9vw, 6.5rem)" }}
          >
            LAUNCHING SOON!
          </h2>

          {/* Subtext */}
          <p
            className="text-white/45 max-w-lg font-sans text-base md:text-lg font-light leading-relaxed mb-10"
          >
            Official NLDS&apos;26 merchandise and operative gear are currently being prepared.
            Stay tuned for the deployment date.
          </p>

          {/* Minimal status tag */}
          <div
            className="flex items-center gap-3 px-5 py-2.5"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--red)] opacity-60" />
            <span className="font-classified text-[8.5px] tracking-[0.22em] text-white/30 uppercase">
              STATUS: ACCESS LOCKED UNTIL RELEASE
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--red)] opacity-60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

