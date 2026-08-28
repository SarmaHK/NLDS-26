"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/store/cartStore";
import CartItem from "@/components/store/CartItem";

export default function CartDrawer() {
  const { items, itemCount, subtotal, isCartOpen, closeCart, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[150]"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(3px)" }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[151] flex flex-col"
            style={{
              width: "min(420px, 100vw)",
              background: "#0a0a0c",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.6)",
            }}
            aria-label="Mission Inventory"
            role="dialog"
          >
            {/* Top red line */}
            <div
              className="absolute top-0 left-0 right-0 h-[1px]"
              style={{ background: "linear-gradient(90deg, var(--red), transparent 70%)", opacity: 0.5 }}
            />

            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 flex-shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={16} style={{ color: "var(--red)" }} />
                <div>
                  <h2
                    className="font-classified"
                    style={{ fontSize: "11px", letterSpacing: "0.28em", color: "var(--text)" }}
                  >
                    MISSION INVENTORY
                  </h2>
                  <p
                    className="font-classified"
                    style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--text-ghost)", marginTop: 2 }}
                  >
                    ITEMS: {String(itemCount).padStart(2, "0")}
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="flex items-center justify-center w-9 h-9 transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.35)", background: "transparent", border: "none", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Items area */}
            <div className="flex-1 overflow-y-auto px-6" style={{ minHeight: 0 }}>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 py-16 text-center">
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ShoppingBag size={22} style={{ color: "rgba(255,255,255,0.15)" }} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span
                      className="font-classified"
                      style={{ fontSize: "11px", letterSpacing: "0.24em", color: "rgba(255,255,255,0.3)" }}
                    >
                      INVENTORY EMPTY
                    </span>
                    <span
                      className="font-sans"
                      style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.2)", fontWeight: 300 }}
                    >
                      Add items to begin your mission.
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <AnimatePresence>
                    {items.map((item) => (
                      <CartItem
                        key={`${item.productId}-${item.size ?? ""}`}
                        item={item}
                      />
                    ))}
                  </AnimatePresence>

                  {/* Clear cart */}
                  {items.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="font-classified mt-3 mb-2 transition-colors hover:text-white"
                      style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
                    >
                      CLEAR ALL
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="flex-shrink-0 px-6 py-5 flex flex-col gap-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                {/* Totals */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-classified"
                      style={{ fontSize: "9px", letterSpacing: "0.22em", color: "var(--text-ghost)" }}
                    >
                      ITEMS
                    </span>
                    <span
                      className="font-classified tabular"
                      style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)" }}
                    >
                      {String(itemCount).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mission-line opacity-30" />
                  <div className="flex items-center justify-between">
                    <span
                      className="font-classified"
                      style={{ fontSize: "10px", letterSpacing: "0.22em", color: "var(--text-muted)" }}
                    >
                      TOTAL
                    </span>
                    <span
                      className="font-display"
                      style={{ fontSize: "1.4rem", letterSpacing: "0.04em", color: "var(--text)" }}
                    >
                      LKR {subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <Link
                  href="/store/checkout"
                  onClick={closeCart}
                  className="btn-mission w-full flex items-center justify-center gap-2"
                  style={{ padding: "15px 20px", fontSize: "12px" }}
                  id="cart-checkout-cta"
                >
                  PROCEED TO CHECKOUT
                  <ArrowRight size={14} />
                </Link>
                <button
                  onClick={closeCart}
                  className="btn-ghost w-full flex items-center justify-center"
                  style={{ padding: "12px 20px", fontSize: "12px" }}
                >
                  CONTINUE SHOPPING
                </button>

                {/* Legal note */}
                <p
                  className="font-classified text-center"
                  style={{ fontSize: "8px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.12)" }}
                >
                  BANK TRANSFER REQUIRED · RECEIPT UPLOAD MANDATORY
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
