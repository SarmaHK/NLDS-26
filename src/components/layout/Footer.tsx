"use client";

import Link from "next/link";

const FOOTER_LINKS = [
  { label: "MISSION",       href: "#mission" },
  { label: "INTELLIGENCE",  href: "#intelligence" },
  { label: "OPERATIVES",    href: "#operatives" },
  { label: "STORE",         href: "/store" },
  { label: "REGISTER",      href: "/register" },
];

const SOCIAL_LINKS = [
  { label: "INSTAGRAM", href: "https://www.instagram.com/aiesec.srilanka/" },
  { label: "LINKEDIN",  href: "https://www.linkedin.com/company/aiesec-in-sri-lanka/" },
  { label: "FACEBOOK",  href: "https://www.facebook.com/AIESECinSriLanka" },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <span className="font-display text-5xl tracking-[0.05em] text-white">
              NLDS<span style={{ color: "var(--red)" }}>'26</span>
            </span>
            <p className="font-classified text-[10px] tracking-[0.2em] leading-relaxed text-white/30">
              NATIONAL LEADERSHIP DEVELOPMENT SEMINAR
              <br />
              AIESEC IN SRI LANKA
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span
                className="animate-blink w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--red)" }}
              />
              <span className="font-classified text-[9px] tracking-[0.25em] text-white/25">
                MISSION STATUS: ACTIVE
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row gap-12">
            <div>
              <p className="label-section mb-5">NAVIGATION</p>
              <ul className="flex flex-col gap-3">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-classified text-[10px] tracking-[0.22em] text-white/30 hover:text-white/70 transition-colors no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="label-section mb-5">FOLLOW</p>
              <ul className="flex flex-col gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-classified text-[10px] tracking-[0.22em] text-white/30 hover:text-white/70 transition-colors no-underline"
                    >
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="label-section mb-5">MISSION DATE</p>
              <div className="flex flex-col gap-1">
                <span className="font-classified text-[10px] tracking-[0.2em] text-white/50">
                  09 — 11 OCTOBER 2026
                </span>
                <span className="font-classified text-[10px] tracking-[0.2em] text-white/25">
                  SRI LANKA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] mb-8" style={{ background: "var(--border)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-classified text-[9px] tracking-[0.2em] text-white/15">
            PROPERTY OF AIESEC IN SRI LANKA — CLASSIFIED
          </p>
          <p className="font-classified text-[9px] tracking-[0.15em] text-white/12">
            © 2026 AIESEC IN SRI LANKA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
