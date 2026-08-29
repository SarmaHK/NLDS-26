"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  mainCommittee,
  organizingCommittee,
  type TeamMember,
} from "@/data/team";

/** Display order for OC roles */
const OC_ROLE_ORDER = [
  "Conference Manager",
  "Organizing Committee President",
  "OC Vice President — Finance",
  "OC Vice President — Delegates",
  "OC Vice President — Partnership Development",
  "OC Vice President — Logistics",
  "OC Vice President — Marketing",
];

/** Convert internal role key → display label */
function displayRole(role: string): string {
  if (role === "Conference Manager") return "CONFERENCE MANAGERS";
  return role.replace(/^OC\b/, "ORGANIZING COMMITTEE").toUpperCase();
}

/** Group members by role, preserving display order */
function groupByRole(
  members: TeamMember[],
): { role: string; members: TeamMember[] }[] {
  const map = new Map<string, TeamMember[]>();
  for (const m of members) {
    if (!map.has(m.role)) map.set(m.role, []);
    map.get(m.role)!.push(m);
  }
  return OC_ROLE_ORDER.filter((r) => map.has(r)).map((r) => ({
    role: r,
    members: map.get(r)!,
  }));
}

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.05,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative overflow-hidden flex flex-col"
      style={{
        border: "1px solid var(--border)",
        background: "var(--surface-1)",
        width: "240px",
        flexShrink: 0,
        transition: "border-color 0.3s ease, transform 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-red)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      {/* Photo */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ aspectRatio: "3/4", background: "var(--surface-2)" }}
      >
        {member.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image}
            alt={member.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="w-16 h-16 rounded-full"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            />
            <div
              className="w-10 h-10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ border: "1px solid rgba(196,30,58,0.2)" }}
            />
            <div
              className="w-2 h-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ background: "rgba(196,30,58,0.3)" }}
            />
            <span className="font-classified text-[11px] tracking-[0.2em] text-[border] absolute bottom-4">
              PHOTO PENDING
            </span>
          </div>
        )}

        {/* Hover gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{
            background:
              "linear-gradient(to top, rgba(6,6,8,0.95) 0%, rgba(6,6,8,0.2) 60%, transparent 100%)",
          }}
        />

        {/* Top red accent line on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
          style={{ background: "var(--red)" }}
        />
      </div>

      {/* Info: Name and Position */}
      <div
        className="px-4 py-4 text-center flex flex-col items-center justify-center gap-1.5 flex-1"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p
          className="font-display leading-tight tracking-[0.04em] text-white"
          style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
        >
          {member.name.toUpperCase()}
        </p>
        <p
          className="font-classified text-[11px] tracking-[0.14em] leading-normal"
          style={{ color: "var(--red)" }}
        >
          {member.role.toUpperCase()}
        </p>
      </div>
    </motion.div>
  );
}

function RoleRow({
  role,
  members,
  rowIndex,
}: {
  role: string;
  members: TeamMember[];
  rowIndex: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: rowIndex * 0.06,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ textAlign: "center", width: "100%" }}
    >
      {/* Role label */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "1.25rem",
          marginBottom: "2.5rem",
        }}
      >
        <div
          style={{
            height: "1px",
            width: "40px",
            background: "var(--border-red)",
          }}
        />
        <span
          className="font-classified"
          style={{
            fontSize: "11px",
            letterSpacing: "0.3em",
            color: "var(--red)",
          }}
        >
          {displayRole(role)}
        </span>
        <div
          style={{
            height: "1px",
            width: "40px",
            background: "var(--border-red)",
          }}
        />
      </div>

      {/* Member cards — centered */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
          maxWidth: "1120px",
          margin: "0 auto",
        }}
      >
        {members.map((m, i) => (
          <MemberCard key={m.id} member={m} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

export default function ConferenceTeamSection() {
  const [activeTab, setActiveTab] = useState<"MC" | "OC">("MC");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const ocGroups = groupByRole(organizingCommittee);

  // Separate MC: 1 top card (President) and 12 cards below
  const mcPresident =
    mainCommittee.find(
      (m) =>
        m.id === "mc-president" || m.role.toLowerCase().includes("president"),
    ) || mainCommittee[0];

  const mcMembers = mainCommittee.filter((m) => m.id !== mcPresident?.id);

  return (
    <section
      ref={ref}
      id="team"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg)",
        paddingTop: "8rem",
        paddingBottom: "10rem",
      }}
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

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: "50%",
          top: "20%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "350px",
          background:
            "radial-gradient(ellipse, rgba(196,30,58,1) 0%, transparent 70%)",
          filter: "blur(140px)",
          opacity: 0.06,
        }}
      />

      {/* Single centered column */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 4vw, 4rem)",
          textAlign: "center",
        }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "3.5rem",
            textAlign: "center",
            width: "100%",
          }}
        >
          <span
            className="font-classified"
            style={{
              fontSize: "12px",
              letterSpacing: "0.25em",
              padding: "4px 14px",
              border: "1px solid var(--border-red)",
              color: "var(--red)",
            }}
          >
            {activeTab === "MC" ? "MC // COMMAND" : "OC // OPERATIONS"}
          </span>

          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
              color: "var(--text)",
              lineHeight: 1,
              letterSpacing: "0.04em",
            }}
          >
            {activeTab === "MC" ? "MEMBER COMMITTEE" : "ORGANIZING COMMITTEE"}
          </h2>

          {/* ── Toggle Buttons (MC & OC) ── */}
          <div
            className="flex items-center justify-center p-1.5 mt-4"
            style={{
              background: "var(--surface-1)",
              border: "1px solid var(--border)",
              maxWidth: "340px",
              width: "100%",
            }}
          >
            <button
              onClick={() => setActiveTab("MC")}
              type="button"
              className="flex-1 relative py-2.5 px-6 font-classified text-[12px] tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer"
              style={{
                background: activeTab === "MC" ? "var(--red)" : "transparent",
                color: activeTab === "MC" ? "#ffffff" : "var(--text-dim)",
                border: "none",
                fontWeight: activeTab === "MC" ? "600" : "400",
                boxShadow:
                  activeTab === "MC" ? "0 0 20px rgba(196,30,58,0.35)" : "none",
              }}
            >
              MC
            </button>

            <button
              onClick={() => setActiveTab("OC")}
              type="button"
              className="flex-1 relative py-2.5 px-6 font-classified text-[12px] tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer"
              style={{
                background: activeTab === "OC" ? "var(--red)" : "transparent",
                color: activeTab === "OC" ? "#ffffff" : "var(--text-dim)",
                border: "none",
                fontWeight: activeTab === "OC" ? "600" : "400",
                boxShadow:
                  activeTab === "OC" ? "0 0 20px rgba(196,30,58,0.35)" : "none",
              }}
            >
              OC
            </button>
          </div>
        </motion.div>

        {/* ── Tab Content with AnimatePresence ── */}
        <AnimatePresence mode="wait">
          {activeTab === "MC" ? (
            <motion.div
              key="mc-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              style={{ width: "100%" }}
            >
              {mainCommittee.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-20 gap-4"
                  style={{ border: "1px dashed rgba(255,255,255,0.07)" }}
                >
                  <p className="font-classified text-[11px] tracking-[0.25em] text-[var(--text-muted)]">
                    MEMBER COMMITTEE — PERSONNEL FILES PENDING
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5rem",
                    width: "100%",
                  }}
                >
                  {/* Top: 1 Card (President) */}
                  {mcPresident && (
                    <div style={{ textAlign: "center", width: "100%" }}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "1.25rem",
                          marginBottom: "2rem",
                        }}
                      >
                        <div
                          style={{
                            height: "1px",
                            width: "40px",
                            background: "var(--border-red)",
                          }}
                        />
                        <span
                          className="font-classified"
                          style={{
                            fontSize: "11px",
                            letterSpacing: "0.3em",
                            color: "var(--red)",
                          }}
                        >
                          PRESIDENT
                        </span>
                        <div
                          style={{
                            height: "1px",
                            width: "40px",
                            background: "var(--border-red)",
                          }}
                        />
                      </div>

                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <MemberCard member={mcPresident} index={0} />
                      </div>
                    </div>
                  )}

                  {/* Below: 12 Cards (Vice Presidents) */}
                  {mcMembers.length > 0 && (
                    <div style={{ textAlign: "center", width: "100%" }}>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "1.25rem",
                          marginBottom: "2.5rem",
                        }}
                      >
                        <div
                          style={{
                            height: "1px",
                            width: "40px",
                            background: "var(--border-red)",
                          }}
                        />
                        <span
                          className="font-classified"
                          style={{
                            fontSize: "11px",
                            letterSpacing: "0.3em",
                            color: "var(--red)",
                          }}
                        >
                          VICE PRESIDENTS
                        </span>
                        <div
                          style={{
                            height: "1px",
                            width: "40px",
                            background: "var(--border-red)",
                          }}
                        />
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          gap: "2rem",
                          maxWidth: "1120px",
                          margin: "0 auto",
                        }}
                      >
                        {mcMembers.map((m, i) => (
                          <MemberCard key={m.id} member={m} index={i + 1} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="oc-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              style={{ width: "100%" }}
            >
              {ocGroups.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center py-20 gap-4"
                  style={{ border: "1px dashed rgba(255,255,255,0.07)" }}
                >
                  <p className="font-classified text-[11px] tracking-[0.25em] text-[var(--text-muted)]">
                    ORGANIZING COMMITTEE — PERSONNEL FILES PENDING
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5rem",
                    width: "100%",
                  }}
                >
                  {ocGroups.map((g, ri) => (
                    <RoleRow
                      key={g.role}
                      role={g.role}
                      members={g.members}
                      rowIndex={ri}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="font-classified text-[11px] tracking-[0.2em] text-[var(--text-muted)] mt-24 mb-48 text-center"
        >
          ALL PERSONNEL DETAILS ARE CLASSIFIED
        </motion.p>
      </div>
    </section>
  );
}
