"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, ArrowUpRight, Handshake } from "lucide-react";
import { organizingCommittee } from "@/data/team";

/* ── Pull the 3 VP PD contacts from team data ───────────── */
const VP_PD = organizingCommittee.filter((m) =>
  m.id.startsWith("oc-vp-pd-")
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

export default function AlliesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      id="partners"
      className="relative w-full overflow-hidden"
      style={{
        background: "var(--bg)",
        paddingTop: "8rem",
        paddingBottom: "10rem",
      }}
    >
      {/* Background Grid */}
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

      {/* Red Ambient Glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "450px",
          background: "radial-gradient(ellipse, rgba(196,30,58,0.8) 0%, transparent 70%)",
          filter: "blur(140px)",
          opacity: 0.06,
        }}
      />

      {/* ── Main Content Column ─────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        {/* ── Callout Header (Centered) ────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "720px",
            marginBottom: "5rem",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.4rem 1rem",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.02)",
              marginBottom: "1.75rem",
            }}
          >
            <Handshake size={14} style={{ color: "var(--red)" }} />
            <span className="font-classified" style={{ fontSize: "10px", letterSpacing: "0.24em", color: "rgba(255,255,255,0.8)" }}>
              STRATEGIC ALLIANCE INITIATIVE
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              color: "var(--text)",
              letterSpacing: "0.04em",
              lineHeight: 0.95,
              marginBottom: "2rem",
            }}
          >
            BECOME A <span style={{ color: "var(--red)" }}>STRATEGIC PARTNER</span>
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
              color: "rgba(255,255,255,0.72)",
              fontWeight: 300,
              lineHeight: 1.75,
              marginBottom: "1.25rem",
            }}
          >
            If your organization is looking to empower the next generation of youth leaders, amplify nationwide brand presence, and engage with Sri Lanka&apos;s top emerging talent — we invite you to partner with <strong style={{ color: "white", fontWeight: 500 }}>NLDS&apos;26</strong>.
          </p>

          <p
            className="font-classified"
            style={{
              fontSize: "11px",
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            Connect directly with our Partnership Development cell below to discuss tailored sponsorship packages, brand integrations, and collaborative avenues.
          </p>

          {/* Decorative red line */}
          <div style={{ width: "6rem", height: "1px", background: "linear-gradient(90deg, transparent, var(--red), transparent)" }} />
        </motion.div>

        {/* ── Contact Cards Grid ──────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            width: "100%",
            maxWidth: "1000px",
          }}
        >
          {VP_PD.map((person, i) => (
            <motion.div
              key={person.id}
              variants={fadeUp}
              className="group"
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                background: "var(--surface-1)",
                border: "1px solid var(--border)",
                padding: "2rem",
                transition: "transform 0.3s, border-color 0.3s",
              }}
              whileHover={{ y: -4 }}
            >
              {/* Corner accents */}
              <div style={{ position: "absolute", top: 8, left: 8, width: 10, height: 10, borderTop: "1px solid rgba(255,255,255,0.1)", borderLeft: "1px solid rgba(255,255,255,0.1)" }} />
              <div style={{ position: "absolute", top: 8, right: 8, width: 10, height: 10, borderTop: "1px solid rgba(255,255,255,0.1)", borderRight: "1px solid rgba(255,255,255,0.1)" }} />
              <div style={{ position: "absolute", bottom: 8, left: 8, width: 10, height: 10, borderBottom: "1px solid rgba(255,255,255,0.1)", borderLeft: "1px solid rgba(255,255,255,0.1)" }} />
              <div style={{ position: "absolute", bottom: 8, right: 8, width: 10, height: 10, borderBottom: "1px solid rgba(255,255,255,0.1)", borderRight: "1px solid rgba(255,255,255,0.1)" }} />
              {/* Hover top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" style={{ background: "var(--red)" }} />

              {/* Card header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <span className="font-classified" style={{ fontSize: "9px", letterSpacing: "0.24em", color: "var(--red)" }}>
                  // PD CELL 0{i + 1}
                </span>
                <span
                  className="font-classified"
                  style={{
                    fontSize: "8px",
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.3)",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: "2px 8px",
                  }}
                >
                  PD-{String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Identity */}
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.4rem, 2vw, 1.7rem)",
                    color: "var(--text)",
                    letterSpacing: "0.04em",
                    lineHeight: 1.05,
                    marginBottom: "0.5rem",
                  }}
                >
                  {person.name.toUpperCase()}
                </h3>
                <p className="font-classified" style={{ fontSize: "9px", letterSpacing: "0.18em", color: "var(--red)", marginBottom: "0.25rem" }}>
                  OC VP — PARTNERSHIP DEVELOPMENT
                </p>
                <p className="font-classified" style={{ fontSize: "8px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)" }}>
                  NLDS 2026 // AIESEC IN SRI LANKA
                </p>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "1.5rem" }} />

              {/* Contact buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {person.phone && (
                  <a
                    href={`tel:${person.phone.replace(/\s/g, "")}`}
                    className="group/btn"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.85rem 1rem",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      textDecoration: "none",
                      transition: "border-color 0.25s, background 0.25s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div
                        className="group-hover/btn:bg-[var(--red)]/20 transition-colors"
                        style={{
                          width: 28, height: 28,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          flexShrink: 0,
                        }}
                      >
                        <Phone size={12} className="text-white/60 group-hover/btn:text-[var(--red)] transition-colors" />
                      </div>
                      <div>
                        <p className="font-classified" style={{ fontSize: "7.5px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", marginBottom: "1px" }}>
                          PHONE DIRECT
                        </p>
                        <p className="font-classified group-hover/btn:text-white transition-colors" style={{ fontSize: "10px", letterSpacing: "0.08em", color: "rgba(255,255,255,0.8)" }}>
                          {person.phone}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={13} className="text-white/30 group-hover/btn:text-[var(--red)] transition-colors flex-shrink-0" />
                  </a>
                )}

                {person.email && (
                  <a
                    href={`mailto:${person.email}`}
                    className="group/btn"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.85rem 1rem",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      textDecoration: "none",
                      transition: "border-color 0.25s, background 0.25s",
                      minWidth: 0,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
                      <div
                        className="group-hover/btn:bg-[var(--red)]/20 transition-colors"
                        style={{
                          width: 28, height: 28,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          flexShrink: 0,
                        }}
                      >
                        <Mail size={12} className="text-white/60 group-hover/btn:text-[var(--red)] transition-colors" />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p className="font-classified" style={{ fontSize: "7.5px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", marginBottom: "1px" }}>
                          EMAIL DIRECT
                        </p>
                        <p
                          className="font-classified group-hover/btn:text-white transition-colors"
                          style={{
                            fontSize: "9.5px", letterSpacing: "0.05em",
                            color: "rgba(255,255,255,0.8)",
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                          }}
                        >
                          {person.email}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={13} className="text-white/30 group-hover/btn:text-[var(--red)] transition-colors flex-shrink-0" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom Tag ───────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            marginTop: "5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--red)", opacity: 0.6, display: "inline-block" }} />
          <p className="font-classified" style={{ fontSize: "8.5px", letterSpacing: "0.24em", color: "rgba(255,255,255,0.25)" }}>
            NLDS 2026 PARTNERSHIP CELL // ALL COMMUNICATIONS LOGGED
          </p>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--red)", opacity: 0.6, display: "inline-block" }} />
        </motion.div>

      </div>
    </section>
  );
}
