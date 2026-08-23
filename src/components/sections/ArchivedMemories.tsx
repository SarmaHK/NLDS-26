"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ── Types ─────────────────────────────────────────── */
type CardType = "gallery" | "film";

interface MemoryCard {
  id: string;
  fileNum: string;
  edition: string;
  date: string;
  coords: string;
  title: string;
  subtitle: string;
  status: "ARCHIVED" | "MEMORY RECOVERED" | "RESTRICTED ACCESS";
  type: CardType;
  caption: string;
  imageCount?: number;
  timestamp: string;
  classification: string;
  note: string;
}

/* ── Archival data ──────────────────────────────────── */
const MEMORIES: MemoryCard[] = [
  {
    id: "01",
    fileNum: "MEM-NLDS25-001",
    edition: "NLDS'25 EDITION",
    date: "NOV 2025",
    coords: "6.9271°N / 79.8612°E",
    title: "FIELD HIGHLIGHTS",
    subtitle: "Moments from the front lines",
    status: "MEMORY RECOVERED",
    type: "gallery",
    caption: "Selected frames recovered from NLDS'25 field operations. 270+ operatives, 3 days of high-intensity leadership missions across Sri Lanka.",
    imageCount: 6,
    timestamp: "2025:11:07 09:14:32",
    classification: "ARCHIVAL RECORD",
    note: "Some frames redacted for operational security.",
  },
  {
    id: "02",
    fileNum: "MEM-NLDS25-002",
    edition: "GALA AWARDS NIGHT",
    date: "NOV 2025 // FINAL NIGHT",
    coords: "6.8895°N / 79.8517°E",
    title: "GALA AWARDS NIGHT",
    subtitle: "The night they were recognised",
    status: "ARCHIVED",
    type: "gallery",
    caption: "Classified images from the Gala Awards Ceremony — NLDS'25's final night. Outstanding operatives recognised for leadership under pressure.",
    imageCount: 4,
    timestamp: "2025:11:09 21:47:55",
    classification: "RESTRICTED ARCHIVE",
    note: "██████████ ACCESS CONTROLLED.",
  },
  {
    id: "03",
    fileNum: "MEM-NLDS25-003",
    edition: "POST-MISSION DEBRIEF",
    date: "DEC 2025",
    coords: "RECORDED // SRI LANKA",
    title: "THE AFTER MOVIE",
    subtitle: "Full mission debrief — NLDS'25",
    status: "RESTRICTED ACCESS",
    type: "film",
    caption: "The complete visual record of NLDS'25. Every moment, every mission, every transformation — captured and archived for future operatives.",
    timestamp: "2025:12:01 00:00:00",
    classification: "DECLASSIFIED FOOTAGE",
    note: "Duration: classified. Viewing may cause permanent leadership upgrades.",
  },
];

/* ── Noise texture ──────────────────────────────────── */
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`;

/* ── Status badge colours ───────────────────────────── */
function statusColour(s: MemoryCard["status"]) {
  if (s === "MEMORY RECOVERED") return "#4ade80";
  if (s === "ARCHIVED") return "rgba(255,255,255,0.35)";
  return "var(--red)";
}

/* ── Image placeholder grid ─────────────────────────── */
function ImagePlaceholders({ count, hovered }: { count: number; hovered: boolean }) {
  const cols = count <= 2 ? count : count <= 4 ? 2 : 3;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: "2px",
        width: "100%",
        aspectRatio: cols === 3 ? "3/1.2" : "2/1",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: hovered ? 1 : 0.55 }}
          transition={{ duration: 0.4, delay: i * 0.04 }}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            position: "relative",
            overflow: "hidden",
            aspectRatio: "4/3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Grain overlay */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: NOISE_SVG, opacity: 0.08 }} />
          {/* Corner marks */}
          <div style={{ position: "absolute", top: 4, left: 4, width: 8, height: 8, borderTop: "1px solid rgba(255,255,255,0.2)", borderLeft: "1px solid rgba(255,255,255,0.2)" }} />
          <div style={{ position: "absolute", bottom: 4, right: 4, width: 8, height: 8, borderBottom: "1px solid rgba(255,255,255,0.2)", borderRight: "1px solid rgba(255,255,255,0.2)" }} />
          <span style={{ fontFamily: "monospace", fontSize: "7px", color: "rgba(255,255,255,0.12)", letterSpacing: "0.15em" }}>
            IMG_{String(i + 1).padStart(3, "0")}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Film reel placeholder ──────────────────────────── */
const BASE_SRC = "https://www.youtube.com/embed/IZCI-6-Jiu4?si=ZapPeV9vsx0kVEvw";
const PLAY_SRC = `${BASE_SRC}&autoplay=1&mute=1`;

function FilmPlaceholder({ hovered }: { hovered: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState(BASE_SRC);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSrc(entry.isIntersecting ? PLAY_SRC : BASE_SRC);
      },
      { threshold: 0.5 }   // fires when 50% of the player is visible
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {/* Film strip top perfs */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "4px", paddingLeft: "2px" }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} style={{ width: "14px", height: "10px", background: "rgba(255,255,255,0.06)", borderRadius: "1px", flexShrink: 0 }} />
        ))}
      </div>

      {/* YouTube embed */}
      <motion.div
        ref={wrapRef}
        animate={{ opacity: hovered ? 1 : 0.85 }}
        transition={{ duration: 0.4 }}
        style={{
          width: "100%",
          position: "relative",
          aspectRatio: "16/9",
          border: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <iframe
          src={src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        />
      </motion.div>

      {/* Film strip bottom perfs */}
      <div style={{ display: "flex", gap: "6px", marginTop: "4px", paddingLeft: "2px" }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} style={{ width: "14px", height: "10px", background: "rgba(255,255,255,0.06)", borderRadius: "1px", flexShrink: 0 }} />
        ))}
      </div>
    </div>
  );
}

/* ── Individual memory card ─────────────────────────── */
function MemoryCard({ card, index }: { card: MemoryCard; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] as const }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--surface-1)",
        border: "1px solid rgba(255,255,255,0.07)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.3s",
        borderColor: hovered ? "rgba(196,30,58,0.3)" : "rgba(255,255,255,0.07)",
      }}
    >
      {/* Paper grain texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: NOISE_SVG, opacity: 0.05, pointerEvents: "none", zIndex: 0 }} />

      {/* Subtle red scan sweep on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ left: "-30%" }}
            animate={{ left: "130%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "linear" }}
            style={{ position: "absolute", top: 0, bottom: 0, width: "30%", background: "linear-gradient(90deg, transparent, rgba(196,30,58,0.05), transparent)", pointerEvents: "none", zIndex: 1 }}
          />
        )}
      </AnimatePresence>

      {/* Top red accent bar */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.4 }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "var(--red)", transformOrigin: "left", zIndex: 2 }}
      />

      <div style={{ position: "relative", zIndex: 3, padding: "clamp(1.25rem, 3vw, 2rem)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

        {/* ── Header row ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <span style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em" }}>
              {card.fileNum}
            </span>
            <span style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.18em" }}>
              {card.edition}
            </span>
          </div>

          {/* Status badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "3px 8px", border: `1px solid ${statusColour(card.status)}`, opacity: 0.75 }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: statusColour(card.status), display: "inline-block" }} />
            <span style={{ fontFamily: "monospace", fontSize: "7px", letterSpacing: "0.22em", color: statusColour(card.status) }}>
              {card.status}
            </span>
          </div>
        </div>

        {/* ── Redacted decorative lines ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {[72, 55, 38].map((w, i) => (
            <div key={i} style={{ height: "6px", width: `${w}%`, background: "rgba(255,255,255,0.06)", borderRadius: "1px" }} />
          ))}
        </div>

        {/* ── Title ── */}
        <div>
          <h3 style={{ fontFamily: "'Barlow Condensed', 'Oswald', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 0.9, letterSpacing: "0.04em", color: "var(--text)", marginBottom: "0.35rem" }}>
            {card.title}
          </h3>
          <p style={{ fontFamily: "monospace", fontSize: "9px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.18em" }}>
            {card.subtitle.toUpperCase()}
          </p>
        </div>

        {/* ── Media area ── */}
        {card.type === "gallery" && card.imageCount ? (
          <ImagePlaceholders count={card.imageCount} hovered={hovered} />
        ) : (
          <FilmPlaceholder hovered={hovered} />
        )}

        {/* ── Caption ── */}
        <p style={{ fontFamily: "monospace", fontSize: "9px", lineHeight: 1.7, color: "rgba(255,255,255,0.28)", letterSpacing: "0.05em" }}>
          {card.caption}
        </p>

        {/* ── Handwritten-style note ── */}
        <div style={{ borderLeft: "2px solid rgba(196,30,58,0.3)", paddingLeft: "0.75rem" }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "10px", color: "rgba(255,255,255,0.2)", fontStyle: "italic", lineHeight: 1.5 }}>
            {card.note}
          </p>
        </div>

        {/* ── Footer metadata ── */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "7px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.18em" }}>
              {card.coords}
            </span>
            <span style={{ fontFamily: "monospace", fontSize: "7px", color: "rgba(255,255,255,0.12)", letterSpacing: "0.15em" }}>
              TIMESTAMP: {card.timestamp}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px" }}>
            <span style={{ fontFamily: "monospace", fontSize: "7px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.18em" }}>
              {card.classification}
            </span>
            <span style={{ fontFamily: "monospace", fontSize: "18px", color: "rgba(255,255,255,0.04)", lineHeight: 1 }}>
              {card.id}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Section ────────────────────────────────────────── */
export default function ArchivedMemories() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="archive"
      className="w-full py-24 md:py-32 relative"
      style={{ background: "var(--bg)", marginTop: "clamp(4rem, 10vw, 8rem)" }}
    >
      {/* Subtle aged paper grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: 1,
        }}
      />
      {/* Global noise grain */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: NOISE_SVG, opacity: 0.04, pointerEvents: "none" }} />

      {/* Centered content */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", paddingLeft: "clamp(1.5rem, 6vw, 5rem)", paddingRight: "clamp(1.5rem, 6vw, 5rem)", position: "relative", zIndex: 1 }}>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "4rem", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", textAlign: "center", width: "100%", maxWidth: "56rem" }}
        >
          {/* Label */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ height: "1px", width: "2.5rem", background: "var(--red)" }} />
            <span className="label-classified">ARCHIVE // NLDS'25</span>
            <div style={{ height: "1px", width: "2.5rem", background: "var(--red)" }} />
          </div>

          {/* Headline */}
          <h2
            className="font-display leading-[0.88] tracking-[0.03em]"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "var(--text)" }}
          >
            ARCHIVED
            <br />
            MEMORIES
          </h2>

          {/* Subtext */}
          <p style={{ maxWidth: "36rem", fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 300, lineHeight: 1.7 }}>
            Recovered records from the NLDS'25 field operations. Moments, milestones, and memories — archived for the next generation of operatives.
          </p>

          {/* Redacted metadata row */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginTop: "0.5rem" }}>
            <span style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em" }}>EDITION: NLDS'25</span>
            <div style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)" }} />
            <span style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em" }}>STATUS: DECLASSIFIED</span>
            <div style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)" }} />
            <span style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.2em" }}>FILES: 03</span>
          </div>
        </motion.div>

        {/* ── Cards grid ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            width: "100%",
            maxWidth: "72rem",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {MEMORIES.map((card, i) => (
            <MemoryCard key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* ── Footer note ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
        >
          <div style={{ height: "1px", width: "3rem", background: "rgba(255,255,255,0.08)" }} />
          <p style={{ fontFamily: "monospace", fontSize: "8px", color: "rgba(255,255,255,0.15)", letterSpacing: "0.22em", textAlign: "center" }}>
            RECORDS DECLASSIFIED — AIESEC IN SRI LANKA // ARCHIVE DIVISION
          </p>
        </motion.div>

      </div>
    </section>
  );
}
