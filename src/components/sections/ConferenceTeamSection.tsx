"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { organisingCommittee, type TeamMember } from "@/data/team";

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
  return role
    .replace(/^OC\b/, "ORGANIZING COMMITTEE")
    .toUpperCase();
}

/** Group members by role, preserving display order */
function groupByRole(members: TeamMember[]): { role: string; members: TeamMember[] }[] {
  const map = new Map<string, TeamMember[]>();
  for (const m of members) {
    if (!map.has(m.role)) map.set(m.role, []);
    map.get(m.role)!.push(m);
  }
  return OC_ROLE_ORDER
    .filter((r) => map.has(r))
    .map((r) => ({ role: r, members: map.get(r)! }));
}

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden flex flex-col"
      style={{ border: "1px solid var(--border)", width: "240px", flexShrink: 0 }}
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
            <div className="w-16 h-16 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
            <div
              className="w-10 h-10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ border: "1px solid rgba(196,30,58,0.2)" }}
            />
            <div
              className="w-2 h-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ background: "rgba(196,30,58,0.3)" }}
            />
            <span className="font-classified text-[9px] tracking-[0.2em] text-white/20 absolute bottom-4">
              PHOTO PENDING
            </span>
          </div>
        )}

        {/* Hover gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: "linear-gradient(to top, rgba(6,6,8,0.9) 0%, transparent 60%)" }}
        />
      </div>

      {/* Info */}
      <div className="px-5 py-5 text-center" style={{ borderTop: "1px solid var(--border)" }}>
        <p
          className="font-display leading-none tracking-[0.04em] text-white"
          style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)" }}
        >
          {member.name}
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
      transition={{ delay: rowIndex * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ textAlign: "center", width: "100%" }}
    >
      {/* Role label */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: "1.25rem", marginBottom: "2.5rem" }}>
        <div style={{ height: "1px", width: "40px", background: "var(--border-red)" }} />
        <span
          className="font-classified"
          style={{ fontSize: "9px", letterSpacing: "0.3em", color: "var(--red)" }}
        >
          {displayRole(role)}
        </span>
        <div style={{ height: "1px", width: "40px", background: "var(--border-red)" }} />
      </div>

      {/* Member cards — centered */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
          maxWidth: "1080px",
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
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const groups = groupByRole(organisingCommittee);

  return (
    <section
      ref={ref}
      id="team"
      className="relative overflow-hidden py-32 md:py-44"
      style={{ background: "var(--bg)" }}
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

      {/* Single centered column — mx-auto does the work */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 4rem",
          textAlign: "center",
        }}
      >

        {/* Section header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "5rem",
            textAlign: "center",
            width: "100%",
          }}
        >
          <span
            className="font-classified"
            style={{
              fontSize: "10px",
              letterSpacing: "0.25em",
              padding: "4px 12px",
              border: "1px solid var(--border-red)",
              color: "var(--red)",
            }}
          >
            OC
          </span>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--text)",
              lineHeight: 1,
              letterSpacing: "0.04em",
            }}
          >
            ORGANISING COMMITTEE
          </h2>
        </motion.div>

        {/* Role rows */}
        {groups.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 gap-4"
            style={{ border: "1px dashed rgba(255,255,255,0.07)" }}
          >
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
              <div className="absolute inset-3 rounded-full" style={{ border: "1px solid rgba(196,30,58,0.15)" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-xl text-white/10">OC</span>
              </div>
            </div>
            <p className="font-classified text-[9px] tracking-[0.25em] text-white/20">
              ORGANISING COMMITTEE — PERSONNEL FILES PENDING
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "6rem", width: "100%" }}>
            {groups.map((g, ri) => (
              <RoleRow key={g.role} role={g.role} members={g.members} rowIndex={ri} />
            ))}
          </div>
        )}

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="font-classified text-[9px] tracking-[0.2em] text-white/20 mt-20 text-center"
        >
          ALL PERSONNEL DETAILS ARE CLASSIFIED UNTIL OFFICIALLY ANNOUNCED
        </motion.p>
      </div>
    </section>
  );
}
