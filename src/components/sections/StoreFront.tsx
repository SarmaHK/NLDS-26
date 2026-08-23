"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const MERCH_ITEMS = [
  {
    id:    "01",
    name:  "MISSION T-SHIRT",
    desc:  "Premium cotton. Mission Impossible graphic. NLDS'26 edition.",
    price: "TBA",
    badge: "SIGNATURE",
    available: false,
  },
  {
    id:    "02",
    name:  "OPERATIVE HOODIE",
    desc:  "Heavyweight fleece. Classified embroidery. Limited run.",
    price: "TBA",
    badge: "LIMITED",
    available: false,
  },
  {
    id:    "03",
    name:  "CLASSIFIED CAP",
    desc:  "Structured 6-panel. Embroidered logo. Adjustable fit.",
    price: "TBA",
    badge: "HEADWEAR",
    available: false,
  },
  {
    id:    "04",
    name:  "MISSION TOTE BAG",
    desc:  "Heavy-duty canvas. NLDS'26 print. Functional and stylish.",
    price: "TBA",
    badge: "CARRY",
    available: false,
  },
  {
    id:    "05",
    name:  "INTEL NOTEBOOK",
    desc:  "Hardcover. Classified cover print. 200 blank mission pages.",
    price: "TBA",
    badge: "STATIONERY",
    available: false,
  },
  {
    id:    "06",
    name:  "OPERATIVE BADGE",
    desc:  "Enamel pin. NLDS'26 insignia. Collect all editions.",
    price: "TBA",
    badge: "ACCESSORY",
    available: false,
  },
];

function ProductCard({ item, index }: { item: typeof MERCH_ITEMS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden"
      style={{ border: "1px solid var(--border)", background: "var(--surface-1)" }}
    >
      {/* Product image placeholder */}
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{ aspectRatio: "1/1", background: "var(--surface-2)" }}
      >
        {/* Centered logo watermark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/Logos/NLDS 2026.png"
          alt=""
          className="w-1/2 h-auto object-contain opacity-[0.06]"
          style={{ filter: "grayscale(1)" }}
        />

        {/* Coming soon overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "rgba(6,6,8,0.3)" }}
        >
          <span
            className="font-classified text-[9px] tracking-[0.25em] px-3 py-1.5"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(6,6,8,0.6)",
              color: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            COMING SOON
          </span>
        </div>

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span
            className="font-classified text-[8px] tracking-[0.18em] px-2 py-1"
            style={{
              background: "rgba(6,6,8,0.75)",
              border: "1px solid var(--border)",
              backdropFilter: "blur(8px)",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            {item.badge}
          </span>
        </div>

        {/* Item number */}
        <span
          className="absolute bottom-3 right-3 font-display text-5xl"
          style={{ color: "rgba(255,255,255,0.03)" }}
        >
          {item.id}
        </span>
      </div>

      {/* Info */}
      <div className="p-5" style={{ borderTop: "1px solid var(--border)" }}>
        <h3
          className="font-display leading-none tracking-[0.04em] text-white mb-2"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
        >
          {item.name}
        </h3>
        <p className="font-classified text-[9px] leading-relaxed text-white/30 mb-4">
          {item.desc.toUpperCase()}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-classified text-[10px] tracking-[0.15em] text-white/40">
            PRICE: {item.price}
          </span>
          <button
            disabled
            className="font-classified text-[9px] tracking-[0.18em] px-3 py-1.5 cursor-not-allowed"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.18)",
            }}
          >
            NOTIFY ME
          </button>
        </div>
      </div>

      {/* Hover bottom accent */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: "var(--red)" }}
      />
    </motion.div>
  );
}

export default function StoreFront() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="store"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "var(--bg)" }}
    >
      {/* Grid */}
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

        {/* Coming soon banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 p-5 flex items-center gap-4"
          style={{
            border: "1px solid rgba(196,30,58,0.2)",
            background: "rgba(196,30,58,0.03)",
          }}
        >
          <span className="animate-blink w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--red)" }} />
          <p className="font-classified text-[10px] tracking-[0.22em] text-white/40">
            STORE LAUNCHING SOON — ITEMS LISTED ARE SUBJECT TO AVAILABILITY AND FINAL PRICING.
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px"
          style={{ border: "1px solid var(--border)" }}>
          {MERCH_ITEMS.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Notify section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 p-8 text-center"
          style={{ border: "1px solid var(--border)" }}
        >
          <p className="font-classified text-[10px] tracking-[0.25em] text-white/35 mb-2">
            STORE NOTIFICATION
          </p>
          <p className="font-classified text-[9px] text-white/20 mb-6">
            BE THE FIRST TO KNOW WHEN ITEMS GO LIVE
          </p>
          <a
            href="mailto:nlds@aiesec.lk?subject=NLDS'26 Store Notification"
            className="btn-ghost inline-flex"
          >
            CONTACT FOR UPDATES →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
