"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/data/merchandise";

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, index, onClick }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onClick(product)}
      className="relative cursor-pointer group"
      style={{ display: "flex", flexDirection: "column" }}
      role="button"
      aria-label={`View ${product.name}`}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(product); }}
    >
      {/* Card container */}
      <motion.div
        animate={{
          y: hovered ? -4 : 0,
          boxShadow: hovered
            ? "0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(196,30,58,0.25)"
            : "0 4px 12px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "var(--surface-1)",
          border: "1px solid transparent",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Image area */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "3/4", background: "#0c0c0f" }}
        >
          {/* Scanline shimmer on hover */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            initial={{ opacity: 0, x: "-30%" }}
            animate={hovered ? { opacity: 1, x: "130%" } : { opacity: 0, x: "-30%" }}
            transition={{ duration: 0.7, ease: "linear" }}
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
              width: "60%",
            }}
          />

          {/* Item code top-left */}
          <div
            className="absolute top-3 left-3 z-10"
            style={{
              padding: "3px 8px",
              background: "rgba(6,6,8,0.85)",
              backdropFilter: "blur(4px)",
            }}
          >
            <span
              className="font-classified"
              style={{ fontSize: "8px", letterSpacing: "0.22em", color: "var(--text-muted)" }}
            >
              {product.itemCode}
            </span>
          </div>

          {/* Badge top-right */}
          {product.badge && (
            <div
              className="absolute top-3 right-3 z-10"
              style={{
                padding: "3px 8px",
                background: "var(--red)",
              }}
            >
              <span
                className="font-classified"
                style={{ fontSize: "8px", letterSpacing: "0.18em", color: "#fff" }}
              >
                {product.badge}
              </span>
            </div>
          )}

          {/* Product image */}
          {product.images[0] ? (
            <motion.img
              src={product.images[0]}
              alt={product.name}
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover"
              style={{ display: "block" }}
            />
          ) : (
            /* Placeholder */
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              {/* Classified visual */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  border: "1px solid rgba(196,30,58,0.2)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: 28, height: 28, border: "1px solid rgba(196,30,58,0.4)", borderRadius: "50%", position: "relative" }}>
                  <div style={{ position: "absolute", top: "50%", left: "-8px", right: "-8px", height: 1, background: "rgba(196,30,58,0.3)" }} />
                  <div style={{ position: "absolute", left: "50%", top: "-8px", bottom: "-8px", width: 1, background: "rgba(196,30,58,0.3)" }} />
                </div>
              </div>
              <span className="font-classified" style={{ fontSize: "9px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.15)" }}>
                IMAGE CLASSIFIED
              </span>
            </div>
          )}

          {/* Red bottom accent on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: "var(--red)", transformOrigin: "left" }}
          />
        </div>

        {/* Card body */}
        <div className="flex flex-col gap-3 p-4" style={{ flex: 1 }}>
          {/* Status row */}
          <div className="flex items-center justify-between">
            <span
              className="font-classified"
              style={{ fontSize: "9px", letterSpacing: "0.22em", color: "var(--text-ghost)" }}
            >
              OFFICIAL ISSUE
            </span>
            <span
              className="font-classified"
              style={{
                fontSize: "9px",
                letterSpacing: "0.22em",
                color: product.available ? "var(--red)" : "rgba(255,255,255,0.25)",
              }}
            >
              {product.available ? "● AVAILABLE" : "● SOLD OUT"}
            </span>
          </div>

          {/* Product name */}
          <h3
            className="font-display"
            style={{
              fontSize: "1.3rem",
              letterSpacing: "0.04em",
              lineHeight: 1,
              color: "var(--text)",
            }}
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p
            style={{
              fontSize: "0.78rem",
              color: "var(--text-muted)",
              lineHeight: 1.5,
              fontWeight: 300,
              flex: 1,
            }}
          >
            {product.shortDescription}
          </p>

          {/* Price */}
          <div
            className="font-display"
            style={{
              fontSize: "1.4rem",
              letterSpacing: "0.04em",
              color: "var(--text)",
            }}
          >
            LKR {product.price.toLocaleString()}
          </div>

          {/* CTA */}
          <motion.div
            animate={{
              opacity: hovered ? 1 : 0.5,
              x: hovered ? 0 : -4,
            }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2"
            style={{ marginTop: "0.25rem" }}
          >
            <span
              className="font-classified"
              style={{ fontSize: "10px", letterSpacing: "0.22em", color: "var(--red)" }}
            >
              VIEW ITEM →
            </span>
          </motion.div>
        </div>
      </motion.div>
    </motion.article>
  );
}
