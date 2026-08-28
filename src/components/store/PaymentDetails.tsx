"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { PAYMENT_CONFIG } from "@/lib/store/paymentConfig";

export default function PaymentDetails() {
  const [copied, setCopied] = useState(false);

  async function copyAccountNumber() {
    try {
      await navigator.clipboard.writeText(PAYMENT_CONFIG.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers that don't support clipboard API
      const el = document.createElement("textarea");
      el.value = PAYMENT_CONFIG.accountNumber;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div
      style={{
        background: "#0a0a0c",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center gap-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div style={{ width: 8, height: 8, border: "1px solid var(--red)", borderRadius: "50%" }} />
        <span
          className="font-classified"
          style={{ fontSize: "10px", letterSpacing: "0.28em", color: "var(--text-muted)" }}
        >
          PAYMENT AUTHORIZATION
        </span>
      </div>

      {/* Instructions */}
      <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <p
          style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.7, fontWeight: 300 }}
        >
          Complete the bank transfer using the details below. Upload your payment receipt to finalize the mission request.
        </p>
      </div>

      {/* Bank details */}
      <div className="px-5 py-4 flex flex-col gap-3">
        {[
          { label: "BANK NAME", value: PAYMENT_CONFIG.bankName },
          { label: "ACCOUNT NAME", value: PAYMENT_CONFIG.accountName },
          { label: "BRANCH", value: PAYMENT_CONFIG.branch },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-1">
            <span
              className="font-classified"
              style={{ fontSize: "9px", letterSpacing: "0.25em", color: "var(--text-ghost)" }}
            >
              {label}
            </span>
            <span
              style={{ fontSize: "0.9rem", color: "var(--text)", fontWeight: 400 }}
            >
              {value}
            </span>
          </div>
        ))}

        {/* Account number with copy */}
        <div
          className="flex flex-col gap-1 pt-2 pb-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
        >
          <span
            className="font-classified"
            style={{ fontSize: "9px", letterSpacing: "0.25em", color: "var(--text-ghost)" }}
          >
            ACCOUNT NUMBER
          </span>
          <div className="flex items-center gap-3">
            <span
              className="font-classified tabular flex-1"
              style={{ fontSize: "1rem", color: "var(--text)", letterSpacing: "0.08em" }}
            >
              {PAYMENT_CONFIG.accountNumber}
            </span>
            <button
              onClick={copyAccountNumber}
              aria-label="Copy account number"
              className="flex items-center gap-1.5 px-3 py-1.5 transition-all"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                letterSpacing: "0.2em",
                color: copied ? "var(--red)" : "rgba(255,255,255,0.4)",
                background: copied ? "rgba(196,30,58,0.06)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${copied ? "rgba(196,30,58,0.2)" : "rgba(255,255,255,0.1)"}`,
                cursor: "pointer",
                flexShrink: 0,
              }}
              id="copy-account-number"
            >
              {copied ? (
                <>
                  <Check size={10} />
                  COPIED ✓
                </>
              ) : (
                <>
                  <Copy size={10} />
                  COPY
                </>
              )}
            </button>
          </div>
        </div>

        {/* Payment reference */}
        <div className="flex flex-col gap-1">
          <span
            className="font-classified"
            style={{ fontSize: "9px", letterSpacing: "0.25em", color: "var(--text-ghost)" }}
          >
            PAYMENT REFERENCE
          </span>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6, fontWeight: 300 }}>
            {PAYMENT_CONFIG.referenceFormat}
          </p>
          <span
            className="font-classified"
            style={{ fontSize: "10px", letterSpacing: "0.14em", color: "var(--red)", marginTop: 2 }}
          >
            e.g. {PAYMENT_CONFIG.referenceExample}
          </span>
        </div>
      </div>
    </div>
  );
}
