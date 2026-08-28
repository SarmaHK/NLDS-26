"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface OrderConfirmationProps {
  orderId: string;
  customerName: string;
  total: number;
}

export default function OrderConfirmation({
  orderId,
  customerName,
  total,
}: OrderConfirmationProps) {
  return (
    <div
      className="relative flex flex-col items-center justify-center text-center"
      style={{
        background: "var(--bg)",
        minHeight: "60vh",
        paddingTop: "4rem",
        paddingBottom: "6rem",
      }}
    >
      {/* Red ambient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background: "radial-gradient(ellipse, rgba(196,30,58,1) 0%, transparent 70%)",
          filter: "blur(120px)",
          opacity: 0.06,
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto px-6 flex flex-col items-center gap-8">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              border: "1px solid rgba(196,30,58,0.3)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(196,30,58,0.06)",
            }}
          >
            <CheckCircle size={32} style={{ color: "var(--red)" }} />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3"
        >
          {/* Label */}
          <div className="flex items-center gap-3">
            <div style={{ height: 1, width: "1.5rem", background: "var(--red)" }} />
            <span className="label-classified">TRANSMISSION COMPLETE</span>
            <div style={{ height: 1, width: "1.5rem", background: "var(--red)" }} />
          </div>

          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              letterSpacing: "0.04em",
              lineHeight: 0.88,
              color: "var(--text)",
            }}
          >
            MISSION REQUEST
            <br />
            <span style={{ color: "var(--red)" }}>RECEIVED</span>
          </h1>

          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--text-muted)",
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: "28rem",
            }}
          >
            Your order has been successfully transmitted. We will verify your payment receipt and process your order.
          </p>
        </motion.div>

        {/* Order details panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            width: "100%",
            background: "#0a0a0c",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Top red line */}
          <div
            style={{ height: 1, background: "linear-gradient(90deg, var(--red), transparent 60%)", opacity: 0.5 }}
          />

          <div className="px-6 py-5 flex flex-col gap-4">
            {[
              { label: "ORDER ID", value: orderId, accent: true },
              { label: "CUSTOMER", value: customerName },
              { label: "TOTAL", value: `LKR ${total.toLocaleString()}` },
              { label: "PAYMENT STATUS", value: "PENDING VERIFICATION", dimRed: true },
            ].map(({ label, value, accent, dimRed }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 py-2"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              >
                <span
                  className="font-classified"
                  style={{ fontSize: "9px", letterSpacing: "0.25em", color: "var(--text-ghost)" }}
                >
                  {label}
                </span>
                <span
                  className={`font-classified tabular ${accent ? "font-display" : ""}`}
                  style={{
                    fontSize: accent ? "1rem" : "12px",
                    letterSpacing: accent ? "0.04em" : "0.1em",
                    color: dimRed ? "rgba(196,30,58,0.7)" : "var(--text)",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}

            <p
              className="font-classified text-center pt-1"
              style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)" }}
            >
              KEEP YOUR ORDER ID FOR FUTURE REFERENCE.
            </p>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 w-full"
        >
          <Link
            href="/store"
            className="btn-mission flex items-center justify-center gap-2 flex-1"
            style={{ padding: "14px 20px", fontSize: "12px" }}
            id="confirmation-return-store"
          >
            <ShoppingBag size={14} />
            RETURN TO STORE
          </Link>
          <Link
            href="/"
            className="btn-ghost flex items-center justify-center gap-2 flex-1"
            style={{ padding: "14px 20px", fontSize: "12px" }}
            id="confirmation-return-home"
          >
            <ArrowLeft size={14} />
            RETURN HOME
          </Link>
        </motion.div>

        {/* Classification footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <div style={{ width: "3rem", height: 1, background: "rgba(255,255,255,0.06)" }} />
          <span
            className="font-classified"
            style={{ fontSize: "9px", letterSpacing: "0.25em", color: "rgba(255,255,255,0.2)" }}
          >
            NLDS&apos;26 // AIESEC IN SRI LANKA
          </span>
        </motion.div>
      </div>
    </div>
  );
}
