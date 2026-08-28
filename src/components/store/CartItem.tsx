"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useCart } from "@/lib/store/cartStore";
import type { CartItem as CartItemType } from "@/lib/store/types";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQty } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12 }}
      transition={{ duration: 0.25 }}
      className="flex gap-3 py-4"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      {/* Product image */}
      <div
        className="flex-shrink-0 relative overflow-hidden"
        style={{ width: 64, height: 80, background: "#0c0c0f", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        {item.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div style={{ width: 24, height: 24, border: "1px solid rgba(196,30,58,0.3)", borderRadius: "50%" }} />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className="font-display truncate"
            style={{ fontSize: "0.9rem", letterSpacing: "0.04em", color: "var(--text)", lineHeight: 1.1 }}
          >
            {item.name}
          </p>
          <button
            onClick={() => removeItem(item.productId, item.size)}
            aria-label={`Remove ${item.name}`}
            className="flex-shrink-0 transition-colors hover:text-red-400"
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.25)", padding: 4 }}
          >
            <Trash2 size={14} />
          </button>
        </div>

        <span
          className="font-classified"
          style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--text-ghost)" }}
        >
          {item.itemCode}
          {item.size && <> · SIZE: {item.size}</>}
        </span>

        <div className="flex items-center justify-between mt-auto pt-1">
          {/* Qty controls */}
          <div className="flex items-center" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <button
              onClick={() => updateQty(item.productId, item.size, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
              className="flex items-center justify-center"
              style={{
                width: 28,
                height: 28,
                fontSize: "0.9rem",
                color: item.quantity <= 1 ? "rgba(255,255,255,0.15)" : "var(--text)",
                background: "transparent",
                border: "none",
                borderRight: "1px solid rgba(255,255,255,0.08)",
                cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
              }}
            >
              −
            </button>
            <span
              className="font-classified tabular flex items-center justify-center"
              style={{ width: 32, height: 28, fontSize: "11px", color: "var(--text)" }}
            >
              {item.quantity}
            </span>
            <button
              onClick={() => updateQty(item.productId, item.size, item.quantity + 1)}
              aria-label="Increase quantity"
              className="flex items-center justify-center"
              style={{
                width: 28,
                height: 28,
                fontSize: "0.9rem",
                color: "var(--text)",
                background: "transparent",
                border: "none",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>

          {/* Price */}
          <span
            className="font-classified tabular"
            style={{ fontSize: "12px", letterSpacing: "0.08em", color: "var(--text)" }}
          >
            LKR {(item.price * item.quantity).toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
