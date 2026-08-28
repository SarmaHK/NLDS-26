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
        className="relative overflow-hidden w-full"
        style={{ background: "var(--bg)", paddingTop: "5rem", paddingBottom: "8rem" }}
      >
        {/* Subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
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
            right: "-10%",
            top: "10%",
            width: "600px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(196,30,58,1) 0%, transparent 70%)",
            filter: "blur(130px)",
            opacity: 0.05,
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10">
          {/* ── Section Header ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14"
          >
            {/* Label row */}
            <div className="flex items-center gap-4 mb-6">
              <div style={{ height: "1px", width: "1.5rem", background: "var(--red)" }} />
              <span className="label-classified">MISSION SUPPLY</span>
              <div style={{ height: "1px", width: "1.5rem", background: "var(--red)" }} />
            </div>

            {/* Heading + supporting */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2
                  className="font-display"
                  style={{
                    fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                    letterSpacing: "0.04em",
                    lineHeight: 0.88,
                    color: "var(--text)",
                    marginBottom: "1rem",
                  }}
                >
                  OFFICIAL EQUIPMENT
                  <br />
                  <span style={{ color: "var(--red)" }}>FOR THE MISSION.</span>
                </h2>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-muted)",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    maxWidth: "32rem",
                  }}
                >
                  Official NLDS&apos;26 merchandise. Limited edition gear for NLDS&apos;26 delegates. Available while supplies last.
                </p>
              </div>

              {/* Technical metadata block */}
              <div
                className="flex flex-col gap-2 flex-shrink-0"
                style={{
                  padding: "1rem 1.5rem",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.01)",
                }}
              >
                {[
                  ["OPERATION", "NLDS'26"],
                  ["CLASSIFICATION", "OFFICIAL ISSUE"],
                  ["STATUS", "AVAILABLE"],
                ].map(([key, val]) => (
                  <div key={key} className="flex items-center gap-3">
                    <span
                      className="font-classified"
                      style={{ fontSize: "9px", letterSpacing: "0.22em", color: "var(--text-ghost)", minWidth: 90 }}
                    >
                      {key}
                    </span>
                    <span style={{ width: "1px", height: 10, background: "rgba(255,255,255,0.1)" }} />
                    <span
                      className="font-classified"
                      style={{ fontSize: "9px", letterSpacing: "0.18em", color: val === "AVAILABLE" ? "var(--red)" : "var(--text-muted)" }}
                    >
                      {val === "AVAILABLE" ? `● ${val}` : val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider line */}
            <div
              className="mt-8"
              style={{ height: "1px", background: "linear-gradient(90deg, var(--red) 0%, rgba(196,30,58,0.3) 30%, transparent 70%)", opacity: 0.4 }}
            />
          </motion.div>

          {/* ── Product Grid ───────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ProductGrid />
          </motion.div>
        </div>
      </section>

      {/* Cart Drawer (portal-level) */}
      <CartDrawer />
    </>
  );
}
