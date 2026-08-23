"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { mainCommittee, organisingCommittee, type TeamMember } from "@/data/team";

const COMMITTEES = [
  { title: "MAIN COMMITTEE",       code: "MC", members: mainCommittee },
  { title: "ORGANISING COMMITTEE", code: "OC", members: organisingCommittee },
];

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Photo */}
      <div
        className="relative overflow-hidden"
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
          /* Placeholder when no photo */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            {/* Targeting circle */}
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
            <span className="font-classified text-[9px] tracking-[0.2em] text-white/15 mt-12 absolute bottom-4">
              PHOTO PENDING
            </span>
          </div>
        )}

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{
            background: "linear-gradient(to top, rgba(6,6,8,0.9) 0%, transparent 60%)",
          }}
        />

        {/* Committee badge */}
        <div className="absolute top-3 left-3">
          <span
            className="font-classified text-[8px] tracking-[0.2em] px-2 py-1"
            style={{
              background: "rgba(6,6,8,0.7)",
              border: "1px solid var(--border)",
              backdropFilter: "blur(8px)",
              color: "var(--red)",
            }}
          >
            {member.committee}
          </span>
        </div>

        {/* LinkedIn on hover */}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <span className="font-classified text-[9px] tracking-[0.15em] text-white/60 hover:text-white">
              IN ↗
            </span>
          </a>
        )}
      </div>

      {/* Info */}
      <div className="p-4" style={{ borderTop: "1px solid var(--border)" }}>
        <p className="font-display leading-none tracking-[0.04em] text-white mb-1"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)" }}>
          {member.name}
        </p>
        <p className="font-classified text-[9px] tracking-[0.18em] text-white/40 mb-1">
          {member.role.toUpperCase()}
        </p>
        {member.university && (
          <p className="font-classified text-[8px] tracking-[0.12em] text-white/20">
            {member.university.toUpperCase()}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function EmptyState({ code, title }: { code: string; title: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 gap-4"
      style={{ border: "1px dashed rgba(255,255,255,0.07)" }}
    >
      {/* Targeting reticle */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.08)" }} />
        <div className="absolute inset-3 rounded-full" style={{ border: "1px solid rgba(196,30,58,0.15)" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xl text-white/10">{code}</span>
        </div>
      </div>
      <p className="font-classified text-[9px] tracking-[0.25em] text-white/20">
        {title} — PERSONNEL FILES PENDING
      </p>
      <p className="font-classified text-[8px] text-white/12 tracking-[0.18em]">
        DETAILS WILL BE REVEALED SOON
      </p>
    </div>
  );
}

export default function ConferenceTeamSection() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="team"
      className="relative overflow-hidden py-24 md:py-32"
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

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {COMMITTEES.map((committee, ci) => (
          <div key={committee.code} className={ci > 0 ? "mt-20 pt-20" : ""} style={ci > 0 ? { borderTop: "1px solid var(--border)" } : {}}>

            {/* Committee header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.1, duration: 0.6 }}
              className="flex items-center gap-4 mb-12"
            >
              <span
                className="font-classified text-[10px] tracking-[0.25em] px-2 py-1"
                style={{
                  border: "1px solid var(--border-red)",
                  color: "var(--red)",
                }}
              >
                {committee.code}
              </span>
              <h2
                className="font-display leading-none tracking-[0.04em]"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text)" }}
              >
                {committee.title}
              </h2>
              <div className="flex-1 h-[1px]" style={{ background: "var(--border)" }} />
            </motion.div>

            {/* Members grid or empty state */}
            {committee.members.length === 0 ? (
              <EmptyState code={committee.code} title={committee.title} />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px"
                style={{ border: "1px solid var(--border)" }}>
                {committee.members.map((member, i) => (
                  <MemberCard key={member.id} member={member} index={i} />
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="font-classified text-[9px] tracking-[0.2em] text-white/15 mt-12 text-center"
        >
          ALL PERSONNEL DETAILS ARE CLASSIFIED UNTIL OFFICIALLY ANNOUNCED
        </motion.p>
      </div>
    </section>
  );
}
