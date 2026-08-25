"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Lock } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  scrollTo?: string;   // smooth-scroll to this element ID on the homepage
  locked?: boolean;
  external?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/", scrollTo: "mission" },
  { label: "CONFERENCE TEAM", href: "/team" },
  { label: "PARTNERS", href: "/partners" },
  { label: "STORE", href: "/store" },
  { label: "ROOM ALLOCATION", href: "/delegates", locked: true },
];

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close mobile menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function handleNavClick(
    e: React.MouseEvent,
    link: NavLink,
    closeMobile?: () => void
  ) {
    if (link.scrollTo) {
      e.preventDefault();
      closeMobile?.();
      if (pathname === "/") {
        smoothScrollTo(link.scrollTo);
      } else {
        // Navigate to homepage first, then scroll after mount
        router.push(`/#${link.scrollTo}`);
      }
    } else {
      closeMobile?.();
    }
  }

  return (
    <>
      {/* ── Main Navbar ─────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 4.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{
          background: "rgba(6,6,8,0.94)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-6 md:px-10 flex items-center justify-between h-[76px] sm:h-[82px] md:h-[88px] lg:h-[94px]">

          {/* ── Logo ───────── */}
          <Link href="/" className="flex items-center no-underline flex-shrink-0" id="nav-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Logos/NLDS 2026.png"
              alt="NLDS 2026"
              className="h-14 sm:h-16 md:h-18 lg:h-20 w-auto max-w-[190px] sm:max-w-[220px] md:max-w-[250px] lg:max-w-[280px] object-contain transition-transform duration-300 hover:scale-105"
              style={{ filter: "brightness(1.1) drop-shadow(0 0 14px rgba(196,30,58,0.28))" }}
            />
          </Link>

          {/* ── Desktop Nav links ─── */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-9" aria-label="Main navigation">
            {NAV_LINKS.map((link) =>
              link.locked ? (
                <div
                  key={link.label}
                  title="Opens on event day"
                  className="flex items-center gap-1.5 px-4 py-2 cursor-not-allowed select-none"
                >
                  <Lock size={10} className="flex-shrink-0" style={{ color: "rgba(255,255,255,0.4)" }} />
                  <span className="font-classified text-[10px] tracking-[0.24em] text-white/40">
                    {link.label}
                  </span>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="relative flex items-center px-4 py-2 no-underline group"
                  id={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <span
                    className="font-classified text-[10px] tracking-[0.24em] text-white transition-colors duration-200 group-hover:text-[var(--red)]"
                  >
                    {link.label}
                  </span>
                  {/* Hover underline only */}
                  <span
                    className="absolute bottom-0 left-4 right-4 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: "var(--red)", boxShadow: "0 0 8px var(--red)" }}
                  />
                </Link>
              )
            )}
          </nav>

          {/* ── Desktop CTA ──── */}
          <div className="hidden lg:block flex-shrink-0">
            <Link
              href="/register"
              className="btn-mission"
              style={{ fontSize: "10px", padding: "12px 24px" }}
              id="nav-cta"
            >
              ACCEPT THE MISSION →
            </Link>
          </div>

          {/* ── Mobile hamburger ─── */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="lg:hidden flex items-center justify-center w-12 h-12 -mr-1.5 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle menu"
            id="nav-menu-toggle"
          >
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </motion.header>

      {/* ── Mobile Fullscreen Menu ───────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[99] flex flex-col lg:hidden"
            style={{
              background: "rgba(6,6,8,0.97)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Corner marks */}
            {["top-6 left-6 corner-tl", "top-6 right-6 corner-tr",
              "bottom-6 left-6 corner-bl", "bottom-6 right-6 corner-br"].map((cls, i) => (
                <div key={i} className={`absolute z-10 w-5 h-5 border-white/10 ${cls}`} />
              ))}

            {/* Header row */}
            <div
              className="flex items-center justify-between px-5 sm:px-6 h-[76px] sm:h-[82px] md:h-[88px] flex-shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Logos/NLDS 2026.png"
                alt="NLDS 2026"
                className="h-14 sm:h-16 w-auto max-w-[190px] sm:max-w-[220px] object-contain"
              />
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white/80 hover:text-white transition-colors w-12 h-12 flex items-center justify-center -mr-1.5 cursor-pointer"
                aria-label="Close menu"
              >
                <X size={30} />
              </button>
            </div>

            {/* Classification strip */}
            <div className="px-6 py-3 flex-shrink-0">
              <p className="font-classified text-[8px] tracking-[0.3em] text-white/18">
                CLASSIFICATION: TOP SECRET // AIESEC IN SRI LANKA
              </p>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-6 gap-1 overflow-y-auto">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.locked ? (
                    <div
                      className="flex items-center justify-between py-4 select-none"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-classified text-[8px] text-white/15 w-5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="font-display tracking-[0.05em]"
                          style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: "rgba(255,255,255,0.2)" }}
                        >
                          {link.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Lock size={10} style={{ color: "rgba(255,255,255,0.18)" }} />
                        <span className="font-classified text-[8px] text-white/18 tracking-[0.15em]">
                          EVENT DAY
                        </span>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link, () => setMenuOpen(false))}
                      className="flex items-center gap-3 py-4 group no-underline"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    >
                      <span className="font-classified text-[8px] text-white/15 w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="font-display tracking-[0.05em] transition-colors group-hover:text-[var(--red)]"
                        style={{
                          fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                          color: "rgba(255,255,255,0.8)",
                        }}
                      >
                        {link.label}
                      </span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="px-6 pb-10 flex-shrink-0">
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="btn-mission w-full justify-center"
                style={{ display: "flex", fontSize: "10px" }}
                id="mobile-cta"
              >
                ACCEPT THE MISSION →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
