"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { organizingCommittee } from "@/data/team";

/* ── Pull the 3 VP PD contacts from team data ───────────── */
const VP_PD = organizingCommittee.filter((m) =>
  m.id.startsWith("oc-vp-pd-")
);

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function AlliesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="partners"
      className="relative w-full pt-20 pb-44 md:pt-32 md:pb-60 lg:pt-36 lg:pb-72 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Grid background */}
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
          top: "40%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(196,30,58,1) 0%, transparent 70%)",
          filter: "blur(140px)",
          opacity: 0.05,
        }}
      />

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingLeft: "clamp(1.5rem, 6vw, 5rem)",
          paddingRight: "clamp(1.5rem, 6vw, 5rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── Contact Cards Grid (with balanced top & bottom spacing) ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 my-6 md:my-12"
          style={{ maxWidth: "68rem" }}
        >
          {VP_PD.map((person, i) => (
            <motion.div
              key={person.id}
              variants={fadeUp}
              className="group relative flex flex-col"
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--border)",
                overflow: "hidden",
                transition: "border-color 0.3s, transform 0.3s",
              }}
            >
              {/* File Code */}
              <span
                className="font-classified text-[8px] tracking-[0.2em] text-white/20"
                style={{
                  position: "absolute",
                  top: "0.75rem",
                  right: "0.75rem",
                  zIndex: 10,
                  background: "rgba(6,6,8,0.7)",
                  padding: "2px 6px",
                  backdropFilter: "blur(4px)",
                }}
              >
                PD-{String(i + 1).padStart(2, "0")}
              </span>

              {/* Photo Frame */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  overflow: "hidden",
                  background: "var(--surface-2)",
                }}
              >
                {person.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "grayscale(10%) contrast(1.04)" }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-classified text-[8px] text-white/20 tracking-[0.2em]">
                      PHOTO PENDING
                    </span>
                  </div>
                )}

                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "45%",
                    background: "linear-gradient(to bottom, transparent, var(--surface-1))",
                  }}
                />

                {/* Red hover line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: "var(--red)" }}
                />
              </div>

              {/* Info block */}
              <div className="p-5 flex flex-col gap-4 flex-1">
                <div>
                  <h3
                    className="font-display leading-[0.95] tracking-[0.04em]"
                    style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.55rem)", color: "var(--text)" }}
                  >
                    {person.name.toUpperCase()}
                  </h3>
                  <p
                    className="font-classified text-[8px] tracking-[0.16em] mt-1"
                    style={{ color: "var(--red)" }}
                  >
                    OC VP — PARTNERSHIP DEVELOPMENT
                  </p>
                </div>

                <div style={{ height: "1px", background: "var(--border)" }} />

                {/* Contact items */}
                <div className="flex flex-col gap-2.5">
                  {person.phone && (
                    <a
                      href={`tel:${person.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2.5 group/link text-decoration-none"
                    >
                      <div
                        className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <Phone size={11} className="text-white/40 group-hover/link:text-[var(--red)] transition-colors" />
                      </div>
                      <span
                        className="font-classified text-[10px] tracking-[0.08em] text-white/55 group-hover/link:text-white transition-colors"
                      >
                        {person.phone}
                      </span>
                    </a>
                  )}

                  {person.email && (
                    <a
                      href={`mailto:${person.email}`}
                      className="flex items-center gap-2.5 group/link text-decoration-none"
                    >
                      <div
                        className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <Mail size={11} className="text-white/40 group-hover/link:text-[var(--red)] transition-colors" />
                      </div>
                      <span
                        className="font-classified text-[9.5px] tracking-[0.06em] text-white/55 group-hover/link:text-white transition-colors truncate"
                        style={{ wordBreak: "break-all" }}
                      >
                        {person.email}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Classified Tag */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 md:mt-24 flex items-center justify-center gap-3"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--red)] opacity-60" />
          <p className="font-classified text-[8px] tracking-[0.22em] text-white/20 uppercase text-center">
            DIRECT INQUIRIES // NLDS 2026 PARTNERSHIP CELL
          </p>
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--red)] opacity-60" />
        </motion.div>
      </div>
    </section>
  );
}
