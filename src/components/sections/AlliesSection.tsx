"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TIER_SLOTS = [
  { tier: "TITLE PARTNER",         slots: 1,  size: "large"  },
  { tier: "NATIONAL PARTNER",      slots: 2,  size: "medium" },
  { tier: "TECHNOLOGY PARTNER",    slots: 3,  size: "medium" },
  { tier: "EDUCATION PARTNER",     slots: 4,  size: "small"  },
  { tier: "ASSOCIATE PARTNER",     slots: 6,  size: "small"  },
];

function LogoPlaceholder({
  tier,
  size,
  index,
}: {
  tier: string;
  size: string;
  index: number;
}) {
  const h = size === "large" ? "120px" : size === "medium" ? "90px" : "70px";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="relative group flex items-center justify-center"
      style={{
        height: h,
        border: "1px dashed rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.015)",
        transition: "border-color 0.3s, background 0.3s",
      }}
    >
      <span className="font-classified text-[8px] tracking-[0.2em] text-white/12 uppercase text-center px-4">
        PARTNER
        <br />
        TBA
      </span>
      {/* Corner tl */}
      <div className="absolute top-1.5 left-1.5 w-2 h-2 corner-tl border-white/08" />
      <div className="absolute bottom-1.5 right-1.5 w-2 h-2 corner-br border-white/08" />
    </motion.div>
  );
}

export default function AlliesSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="partners"
      className="w-full py-24 md:py-32"
      style={{ background: "var(--bg)", marginTop: "clamp(4rem, 10vw, 8rem)" }}
    >
      {/* Grid bg */}
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

      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", paddingLeft: "clamp(1.5rem, 6vw, 5rem)", paddingRight: "clamp(1.5rem, 6vw, 5rem)" }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "4rem", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", textAlign: "center", width: "100%", maxWidth: "56rem" }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-8" style={{ background: "var(--red)" }} />
              <span className="label-classified">STRATEGIC SUPPORT</span>
            </div>
            <h2
              className="font-display leading-[0.88] tracking-[0.03em]"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "var(--text)" }}
            >
              MISSION
              <br />
              ALLIES
            </h2>
          </div>
          <p
            className="max-w-sm pb-2"
            style={{ fontSize: "0.875rem", color: "var(--text-muted)", fontWeight: 300 }}
          >
            No mission succeeds alone. Our strategic allies power the infrastructure,
            resources, and reach that make NLDS'26 possible.
          </p>
        </motion.div>

        {/* Tier groups */}
        <div className="flex flex-col gap-12">
          {TIER_SLOTS.map((group, gi) => {
            const cols = group.slots === 1 ? 1 : group.slots <= 3 ? group.slots : Math.min(group.slots, 4);
            return (
              <motion.div
                key={group.tier}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: gi * 0.1, duration: 0.6 }}
              >
                {/* Tier label */}
                <div className="flex items-center gap-4 mb-5">
                  <span className="label-section">{group.tier}</span>
                  <div
                    className="flex-1 h-[1px]"
                    style={{ background: "var(--border)" }}
                  />
                </div>

                {/* Logo grid */}
                <div
                  className={`grid gap-px`}
                  style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    border: "1px solid var(--border)",
                  }}
                >
                  {Array.from({ length: group.slots }).map((_, i) => (
                    <LogoPlaceholder
                      key={i}
                      tier={group.tier}
                      size={group.size}
                      index={gi * 10 + i}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Partnership CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-16 p-8 text-center"
          style={{ border: "1px solid var(--border)" }}
        >
          <p className="font-classified text-[10px] tracking-[0.25em] text-white/30 mb-3">
            BECOME A MISSION ALLY
          </p>
          <p
            className="mb-6"
            style={{ fontSize: "0.875rem", color: "var(--text-muted)", fontWeight: 300 }}
          >
            Partner with Sri Lanka&apos;s premier leadership development seminar.
          </p>
          <a
            href="mailto:nlds@aiesec.lk"
            className="btn-ghost inline-flex"
          >
            CONTACT COMMAND →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
