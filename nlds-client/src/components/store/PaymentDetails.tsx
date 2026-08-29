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
      className="rounded-[4px] overflow-hidden"
      style={{
        background: "#0a0a0c",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 sm:px-8 sm:py-6 flex items-center gap-3"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.015)",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            background: "var(--red)",
            borderRadius: "50%",
            boxShadow: "0 0 10px rgba(196,30,58,0.5)",
          }}
        />
        <span
          className="font-classified font-bold"
          style={{
            fontSize: "11px",
            letterSpacing: "0.26em",
            color: "#ffffff",
          }}
        >
          PAYMENT AUTHORIZATION
        </span>
      </div>

      {/* Instructions */}
      <div
        className="px-6 py-5 sm:px-8 sm:py-6"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.01)",
        }}
      >
        <p
          style={{
            fontSize: "0.88rem",
            color: "var(--text-muted)",
            lineHeight: 1.75,
            fontWeight: 300,
          }}
        >
          Complete the bank transfer using the details below. Upload your
          payment receipt in the next section to finalize the mission request.
        </p>
      </div>

      {/* Bank details with generous spacing */}
      <div className="px-6 py-7 sm:px-8 sm:py-8 flex flex-col gap-6">
        {[
          { label: "BANK NAME", value: PAYMENT_CONFIG.bankName },
          { label: "ACCOUNT NAME", value: PAYMENT_CONFIG.accountName },
          { label: "BRANCH", value: PAYMENT_CONFIG.branch },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-1.5">
            <span
              className="font-classified"
              style={{
                fontSize: "9.5px",
                letterSpacing: "0.24em",
                color: "var(--text-ghost)",
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: "1.05rem",
                color: "#ffffff",
                fontWeight: 400,
                letterSpacing: "0.02em",
              }}
            >
              {value}
            </span>
          </div>
        ))}

        {/* Account number with copy */}
        <div
          className="flex flex-col gap-2.5 py-6"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span
            className="font-classified"
            style={{
              fontSize: "9.5px",
              letterSpacing: "0.24em",
              color: "var(--text-ghost)",
            }}
          >
            ACCOUNT NUMBER
          </span>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span
              className="font-classified tabular"
              style={{
                fontSize: "1.25rem",
                color: "#ffffff",
                letterSpacing: "0.1em",
                fontWeight: 600,
              }}
            >
              {PAYMENT_CONFIG.accountNumber}
            </span>
            <button
              onClick={copyAccountNumber}
              aria-label="Copy account number"
              className="flex items-center gap-2 px-4 py-2 rounded-[3px] transition-all"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: copied ? "#ffffff" : "rgba(255,255,255,0.7)",
                background: copied
                  ? "rgba(196,30,58,0.25)"
                  : "rgba(255,255,255,0.05)",
                border: `1px solid ${copied ? "rgba(196,30,58,0.5)" : "rgba(255,255,255,0.15)"}`,
                cursor: "pointer",
                flexShrink: 0,
              }}
              id="copy-account-number"
            >
              {copied ? (
                <>
                  <Check size={12} style={{ color: "var(--red)" }} />
                  COPIED ✓
                </>
              ) : (
                <>
                  <Copy size={12} />
                  COPY
                </>
              )}
            </button>
          </div>
        </div>

        {/* Payment reference */}
        <div className="flex flex-col gap-2 pt-1">
          <span
            className="font-classified"
            style={{
              fontSize: "9.5px",
              letterSpacing: "0.24em",
              color: "var(--text-ghost)",
            }}
          >
            PAYMENT REFERENCE
          </span>
          <p
            style={{
              fontSize: "0.88rem",
              color: "var(--text-muted)",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            {PAYMENT_CONFIG.referenceFormat}
          </p>
          <div className="mt-1">
            <span
              className="font-classified font-bold inline-block"
              style={{
                fontSize: "10.5px",
                letterSpacing: "0.14em",
                color: "var(--red)",
                background: "rgba(196,30,58,0.12)",
                border: "1px solid rgba(196,30,58,0.3)",
                padding: "4px 10px",
                borderRadius: "2px",
              }}
            >
              e.g. {PAYMENT_CONFIG.referenceExample}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
