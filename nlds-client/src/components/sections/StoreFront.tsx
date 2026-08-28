"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProductGrid from "@/components/store/ProductGrid";
import CartDrawer from "@/components/store/CartDrawer";

export default function StoreFront() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      <section
        ref={ref}
        id="store"
        className="relative overflow-hidden w-full flex flex-col items-center"
        style={{ background: "var(--bg)", paddingTop: "4rem", paddingBottom: "10rem" }}
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

        {/* Red ambient glow */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: "50%",
            top: "20%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(196,30,58,0.8) 0%, transparent 70%)",
            filter: "blur(140px)",
            opacity: 0.05,
          }}
        />

        {/* Centered Main Column */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 clamp(1.5rem, 4vw, 3.5rem)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* ── Centered Section Header ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center mb-20 sm:mb-28 lg:mb-32 w-full max-w-[800px]"
          >
            {/* Pill / status indicator */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.45rem 1.25rem",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--red)", display: "inline-block" }} />
              <span className="font-classified" style={{ fontSize: "10px", letterSpacing: "0.26em", color: "rgba(255,255,255,0.85)" }}>
                OFFICIAL INVENTORY // LIMITED RUN
              </span>
            </div>

            {/* Heading */}
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                letterSpacing: "0.04em",
                lineHeight: 0.95,
                color: "var(--text)",
                marginBottom: "1.25rem",
              }}
            >
              AUTHORIZED <span style={{ color: "var(--red)" }}>MISSION GEAR</span>
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-muted)",
                fontWeight: 300,
                lineHeight: 1.75,
                maxWidth: "34rem",
                marginBottom: "2rem",
              }}
            >
              Select an item to view specifications, available sizes, and secure your order. All items are delivered during registration at NLDS&apos;26.
            </p>

            {/* Centered tactical metadata row */}
            <div
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 px-6 max-w-2xl w-full"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.015)",
              }}
            >
              {[
                ["OPERATION", "NLDS'26"],
                ["CLASSIFICATION", "OFFICIAL ISSUE"],
                ["FULFILLMENT", "ON-SITE VENUE PICKUP"],
                ["STATUS", "INVENTORY ACTIVE"],
              ].map(([key, val], idx) => (
                <div key={key} className="flex items-center gap-2">
                  {idx > 0 && (
                    <span className="hidden sm:inline-block" style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.15)", marginRight: "0.75rem" }} />
                  )}
                  <span
                    className="font-classified"
                    style={{ fontSize: "9.5px", letterSpacing: "0.22em", color: "var(--text-ghost)" }}
                  >
                    {key}:
                  </span>
                  <span
                    className="font-classified"
                    style={{ fontSize: "9.5px", letterSpacing: "0.18em", color: val === "INVENTORY ACTIVE" ? "var(--red)" : "var(--text-muted)" }}
                  >
                    {val === "INVENTORY ACTIVE" ? `● ${val}` : val}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtle centered accent divider */}
            <div
              className="mt-10 mx-auto"
              style={{
                width: "140px",
                height: "1px",
                background: "linear-gradient(90deg, transparent, var(--red), transparent)",
                opacity: 0.6,
              }}
            />
          </motion.div>

          {/* ── Product Grid ───────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full flex justify-center"
          >
            <ProductGrid />
          </motion.div>

          {/* ── Reassurance Info Strip ─────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-20 w-full max-w-[1080px]"
          >
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 p-6 sm:p-8"
              style={{
                background: "rgba(255,255,255,0.015)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <span className="font-classified text-[10px] tracking-[0.24em] text-[var(--red)]">01 // VERIFIED QUALITY</span>
                <p className="text-[12px] text-white/60 font-light max-w-[280px] leading-relaxed">
                  Premium materials, heavy-weight cotton, and durable vinyl designed for NLDS&apos;26 operatives.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <span className="font-classified text-[10px] tracking-[0.24em] text-[var(--red)]">02 // VENUE COLLECTION</span>
                <p className="text-[12px] text-white/60 font-light max-w-[280px] leading-relaxed">
                  Collect your merchandise pack at delegate registration on Day 1 of the conference.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <span className="font-classified text-[10px] tracking-[0.24em] text-[var(--red)]">03 // DIRECT SUPPORT</span>
                <p className="text-[12px] text-white/60 font-light max-w-[280px] leading-relaxed">
                  Need help with your order? Our conference finance and logistics cell is standing by.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cart Drawer (portal-level) */}
      <CartDrawer />
    </>
  );
}
