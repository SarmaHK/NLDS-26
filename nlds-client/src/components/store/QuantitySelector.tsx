"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export default function QuantitySelector({
  value,
  min = 1,
  max = 99,
  onChange,
}: QuantitySelectorProps) {
  const decrease = () => {
    if (value > min) onChange(value - 1);
  };
  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex flex-col gap-2">
      <span
        className="font-classified"
        style={{ fontSize: "10px", letterSpacing: "0.22em", color: "var(--text-muted)" }}
      >
        QUANTITY
      </span>
      <div
        className="flex items-center"
        style={{
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.02)",
          display: "inline-flex",
          width: "fit-content",
        }}
      >
        <button
          onClick={decrease}
          disabled={value <= min}
          aria-label="Decrease quantity"
          className="flex items-center justify-center transition-colors"
          style={{
            width: 44,
            height: 44,
            fontSize: "1.1rem",
            color: value <= min ? "rgba(255,255,255,0.2)" : "var(--text)",
            background: "transparent",
            border: "none",
            cursor: value <= min ? "not-allowed" : "pointer",
            borderRight: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          −
        </button>

        <div
          className="flex items-center justify-center"
          style={{ width: 52, height: 44 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={value}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="font-classified tabular"
              style={{ fontSize: "14px", letterSpacing: "0.1em", color: "var(--text)" }}
            >
              {String(value).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>

        <button
          onClick={increase}
          disabled={value >= max}
          aria-label="Increase quantity"
          className="flex items-center justify-center transition-colors"
          style={{
            width: 44,
            height: 44,
            fontSize: "1.1rem",
            color: value >= max ? "rgba(255,255,255,0.2)" : "var(--text)",
            background: "transparent",
            border: "none",
            cursor: value >= max ? "not-allowed" : "pointer",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
