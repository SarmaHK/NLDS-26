"use client";

import { useEffect, useState } from "react";

/* ─── Countdown Logic ─── */
function getTimeRemaining(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

const LAUNCH_DATE = "2026-08-26T00:00:00+05:30";

export default function HomePage() {
  const [time, setTime] = useState(getTimeRemaining(LAUNCH_DATE));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setTime(getTimeRemaining(LAUNCH_DATE)), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "DAYS", value: time.days },
    { label: "HOURS", value: time.hours },
    { label: "MINS", value: time.minutes },
    { label: "SECS", value: time.seconds },
  ];

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">

      {/* ─── Film Grain Overlay ─── */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          animation: "grain 8s steps(10) infinite",
        }}
      />

      {/* ─── Scanline ─── */}
      <div
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
        }}
      />

      {/* ─── Moving Scanline Bar ─── */}
      <div
        className="pointer-events-none fixed left-0 right-0 z-40 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,87,255,0.15), transparent)",
          animation: "scanline 4s linear infinite",
        }}
      />

      {/* ─── Background Radial ─── */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,87,255,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,87,255,0.2), transparent)" }}
        />
      </div>

      {/* ─── Grid Lines ─── */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ─── Content ─── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">

        {/* Top Classification Bar */}
        <div className="animate-fade-in delay-200 mb-12 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-red-500/60" />
            <span className="text-red-400/80 text-[10px] tracking-[0.35em] font-medium uppercase">
              Classified
            </span>
            <div className="h-[1px] w-8 bg-red-500/60" />
          </div>
          <span className="text-white/20 text-[10px] tracking-[0.25em] uppercase">
            AIESEC in Sri Lanka • Digital Division
          </span>
        </div>

        {/* NLDS Title */}
        <h1 className="animate-fade-in-up delay-300">
          <span
            className="block text-[clamp(4rem,15vw,10rem)] font-black tracking-[-0.04em] leading-[0.85]"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.5) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "flicker 5s ease-in-out infinite",
            }}
          >
            NLDS
          </span>
          <span
            className="block text-[clamp(3rem,12vw,8rem)] font-black tracking-[-0.04em] leading-[0.85] mt-1"
            style={{
              background: "linear-gradient(180deg, #0057FF 0%, #003399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            2026
          </span>
        </h1>

        {/* Divider */}
        <div className="animate-fade-in delay-500 my-8 flex items-center gap-4 w-full max-w-xs">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
          <div
            className="w-2 h-2 rotate-45 border border-white/30"
            style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
          />
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
        </div>

        {/* Tagline */}
        <p
          className="animate-fade-in-up delay-600 text-white/50 text-sm md:text-base tracking-[0.15em] uppercase font-light"
        >
          National Leadership Development Seminar
        </p>

        {/* Mission Status */}
        <div className="animate-fade-in-up delay-700 mt-10 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            <span className="text-amber-300/80 text-xs tracking-[0.2em] uppercase font-medium">
              Mission Briefing In Progress
            </span>
          </div>
        </div>

        {/* Countdown */}
        <div className="animate-fade-in-up delay-1000 mt-14">
          <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase mb-6 font-medium">
            Deployment Countdown
          </p>
          <div className="flex items-center gap-3 sm:gap-6">
            {units.map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-3 sm:gap-6">
                <div className="flex flex-col items-center">
                  <div
                    className="relative px-3 sm:px-5 py-3 sm:py-4 rounded-lg border border-white/10 bg-white/[0.02] min-w-[60px] sm:min-w-[80px]"
                    style={{
                      boxShadow: "0 0 20px rgba(0,87,255,0.05), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    <span className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tabular-nums leading-none tracking-tight">
                      {mounted ? String(unit.value).padStart(2, "0") : "00"}
                    </span>
                  </div>
                  <span className="text-white/25 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase mt-2 font-medium">
                    {unit.label}
                  </span>
                </div>
                {i < units.length - 1 && (
                  <span className="text-white/15 text-xl sm:text-2xl font-light mb-5">:</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="animate-fade-in delay-1500 mt-16 flex flex-col items-center gap-4">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p className="text-white/15 text-[10px] tracking-[0.2em] uppercase">
            Dream Bigger • Achieve Together
          </p>
        </div>
      </div>

      {/* ─── Corner Marks ─── */}
      {/* Top-Left */}
      <div className="absolute top-6 left-6 z-10 animate-fade-in delay-1000">
        <div className="w-6 h-6 border-l border-t border-white/15" />
      </div>
      {/* Top-Right */}
      <div className="absolute top-6 right-6 z-10 animate-fade-in delay-1000">
        <div className="w-6 h-6 border-r border-t border-white/15" />
      </div>
      {/* Bottom-Left */}
      <div className="absolute bottom-6 left-6 z-10 animate-fade-in delay-1200">
        <div className="w-6 h-6 border-l border-b border-white/15" />
      </div>
      {/* Bottom-Right */}
      <div className="absolute bottom-6 right-6 z-10 animate-fade-in delay-1200">
        <div className="w-6 h-6 border-r border-b border-white/15" />
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 animate-fade-in delay-2000">
        <div className="flex items-center justify-between px-8 py-4">
          <span className="text-white/10 text-[9px] tracking-[0.15em] uppercase font-mono">
            SYS.NLDS_26
          </span>
          <span className="text-white/10 text-[9px] tracking-[0.15em] uppercase font-mono">
            AIESEC // SRI LANKA
          </span>
        </div>
      </div>
    </main>
  );
}
