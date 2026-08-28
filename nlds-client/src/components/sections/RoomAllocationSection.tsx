"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const EVENT_DATE = new Date("2026-10-09T00:00:00+05:30");

function getTimeLeft() {
  const diff = EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) return null; // Event day — unlocked
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function RoomAllocationSection() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const isUnlocked = timeLeft === null;

  return (
    <section
      id="room-allocation"
      className="relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        paddingTop: "100px",
      }}
    >
      {/* Grid bg */}
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

      {/* Red glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(196,30,58,1) 0%, transparent 70%)",
          filter: "blur(100px)",
          opacity: 0.04,
        }}
      />

      {/* Corner marks */}
      {["top-10 left-10 corner-tl", "top-10 right-10 corner-tr",
        "bottom-10 left-10 corner-bl", "bottom-10 right-10 corner-br"].map((cls, i) => (
          <div key={i} className={`absolute z-10 w-5 h-5 border-white/08 ${cls}`} />
        ))}

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">

        {/* Lock icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-10 relative"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center relative"
            style={{ border: "1px solid rgba(196,30,58,0.2)", background: "rgba(196,30,58,0.04)" }}
          >
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
              style={{ border: "1px solid rgba(196,30,58,0.3)" }}
            />
            <Lock size={28} style={{ color: "var(--red)", opacity: 0.7 }} />
          </div>
        </motion.div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-[1px] w-8" style={{ background: "var(--red)", opacity: 0.4 }} />
          <span className="label-classified">
            {isUnlocked ? "ACCESS GRANTED" : "ACCESS RESTRICTED"}
          </span>
          <div className="h-[1px] w-8" style={{ background: "var(--red)", opacity: 0.4 }} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="font-display leading-[0.85] tracking-[0.04em] mb-4"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)", color: "var(--text)" }}
        >
          ROOM
          <br />
          <span style={{ color: "var(--red)" }}>ALLOCATION</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="font-classified text-[12px] tracking-[0.3em] text-[var(--text-muted)] mb-10"
        >
          {isUnlocked
            ? "MISSION ACTIVE // ALLOCATIONS RELEASED"
            : "THIS SECTION UNLOCKS ON THE EVENT DAY"}
        </motion.p>

        {/* Countdown or unlocked message */}
        {!isUnlocked && timeLeft ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="w-full"
          >
            {/* Countdown row */}
            <div
              className="flex items-center justify-center gap-3 sm:gap-6 mb-8"
            >
              {[
                { v: timeLeft.days, l: "DAYS" },
                { v: timeLeft.hours, l: "HOURS" },
                { v: timeLeft.minutes, l: "MIN" },
                { v: timeLeft.seconds, l: "SEC" },
              ].map(({ v, l }, i) => (
                <div key={l} className="flex items-center gap-3 sm:gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: "clamp(52px, 12vw, 80px)",
                        height: "clamp(60px, 14vw, 90px)",
                        background: "var(--surface-1)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <span
                        className="font-display tabular"
                        style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)", lineHeight: 1 }}
                      >
                        {String(v).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="font-classified text-[10px] tracking-[0.22em] text-[var(--text-muted)]">{l}</span>
                  </div>
                  {i < 3 && (
                    <span className="font-display mb-6 hidden sm:block"
                      style={{ fontSize: "1.5rem", color: "rgba(196,30,58,0.4)" }}>
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Info box */}
            <div
              className="p-6 text-center"
              style={{ border: "1px solid rgba(255,255,255,0.06)", background: "var(--surface-1)" }}
            >
              <p className="font-classified text-[11px] tracking-[0.22em] text-white/50 mb-2">
                OPERATION DATE
              </p>
              <p className="font-classified text-[12px] tracking-[0.18em] text-white/70">
                09 — 11 OCTOBER 2026
              </p>
              <div className="h-[1px] my-4" style={{ background: "var(--border)" }} />
              <p className="font-classified text-[11px] text-[var(--text-muted)] leading-relaxed">
                ROOM ALLOCATION DETAILS WILL BE RELEASED TO ALL REGISTERED DELEGATES ON THE MORNING OF OCTOBER 9, 2026.
              </p>
            </div>
          </motion.div>
        ) : (
          /* Unlocked state */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full p-8 text-center"
            style={{ border: "1px solid rgba(74,222,128,0.2)", background: "rgba(74,222,128,0.03)" }}
          >
            <p className="font-classified text-[11px] tracking-[0.2em] mb-2" style={{ color: "#4ade80" }}>
              ALLOCATION ACTIVE
            </p>
            <p className="font-classified text-[11px] text-white/50">
              CHECK YOUR EMAIL FOR YOUR ROOM ASSIGNMENT.
            </p>
          </motion.div>
        )}

        {/* Nav back */}
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="btn-ghost mt-8 inline-flex"
        >
          ← RETURN TO HOME
        </motion.a>
      </div>

      {/* Bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-8 py-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <span className="font-classified text-[10px] tracking-[0.15em] text-white/30">
          NLDS'26 // DELEGATE PORTAL
        </span>
        <span className="font-classified text-[10px] tracking-[0.15em] text-white/30">
          AIESEC IN SRI LANKA
        </span>
      </div>
    </section>
  );
}
