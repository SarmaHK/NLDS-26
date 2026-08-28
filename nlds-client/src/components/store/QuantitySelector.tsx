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
    <div className="flex flex-col gap-2 text-left items-start" style={{ textAlign: "left", alignItems: "flex-start" }}>
      <span
        className="font-classified"
        style={{ fontSize: "9.5px", letterSpacing: "0.22em", color: "var(--text-muted)", textAlign: "left" }}
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
          className="flex items-center justify-center transition-colors w-[28px] sm:w-[38px] h-[28px] sm:h-[36px] text-[0.85rem] sm:text-[1.05rem]"
          style={{
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
          className="flex items-center justify-center w-[34px] sm:w-[44px] h-[28px] sm:h-[36px]"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={value}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.15 }}
              className="font-classified tabular text-[11px] sm:text-[13.5px]"
              style={{ letterSpacing: "0.1em", color: "var(--text)" }}
            >
              {String(value).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>

        <button
          onClick={increase}
          disabled={value >= max}
          aria-label="Increase quantity"
          className="flex items-center justify-center transition-colors w-[28px] sm:w-[38px] h-[28px] sm:h-[36px] text-[0.85rem] sm:text-[1.05rem]"
          style={{
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
