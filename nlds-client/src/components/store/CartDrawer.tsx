"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, ArrowRight, ShieldCheck, Trash2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/store/cartStore";
import CartItem from "@/components/store/CartItem";

export default function CartDrawer() {
  const { items, itemCount, subtotal, isCartOpen, closeCart, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and listen for Escape key when cart is open
  useEffect(() => {
    if (!isCartOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCart();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  if (!mounted) return null;

  const drawerContent = (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop with high z-index (z-[300]) to cover Navbar completely on mobile */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[300]"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
            onClick={closeCart}
          />

          {/* Drawer with z-[301] */}
          <motion.aside
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            data-lenis-prevent-touch
            className="fixed top-0 right-0 bottom-0 z-[301] flex flex-col w-full sm:max-w-[410px]"
            style={{
              background: "#0a0a0c",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.9), 0 0 0 1px rgba(196,30,58,0.12)",
            }}
            aria-label="Mission Inventory Drawer"
            role="dialog"
          >
            {/* Top red accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, var(--red), transparent 70%)", opacity: 0.8 }}
            />

            {/* Header with enlarged icons, bold typography, and generous gaps */}
            <div
              className="flex items-center justify-between px-6 py-5 sm:px-7 sm:py-6 flex-shrink-0"
              style={{
                background: "rgba(10,10,12,0.99)",
                backdropFilter: "blur(16px)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex items-center gap-4 sm:gap-4.5">
                <div
                  className="flex items-center justify-center flex-shrink-0 rounded-md"
                  style={{
                    width: 46,
                    height: 46,
                    background: "rgba(196,30,58,0.15)",
                    border: "1px solid rgba(196,30,58,0.4)",
                    boxShadow: "0 0 16px rgba(196,30,58,0.22)",
                  }}
                >
                  <ShoppingBag size={22} style={{ color: "var(--red)" }} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <h2
                      className="font-display tracking-[0.06em] text-white"
                      style={{ fontSize: "1.4rem", lineHeight: 1 }}
                    >
                      MISSION INVENTORY
                    </h2>
                    <span
                      className="font-classified font-bold"
                      style={{
                        fontSize: "9.5px",
                        letterSpacing: "0.15em",
                        color: "var(--red)",
                        background: "rgba(196,30,58,0.18)",
                        padding: "2.5px 8px",
                        borderRadius: "2px",
                        border: "1px solid rgba(196,30,58,0.35)",
                      }}
                    >
                      {String(itemCount).padStart(2, "0")} UNITS
                    </span>
                  </div>
                  <p
                    className="font-classified"
                    style={{ fontSize: "9.5px", letterSpacing: "0.22em", color: "var(--text-muted)" }}
                  >
                    STATUS // CLASSIFIED LOADOUT
                  </p>
                </div>
              </div>

              <button
                onClick={closeCart}
                aria-label="Close cart drawer"
                className="flex items-center justify-center rounded-md transition-all duration-200 hover:text-white ml-3"
                style={{
                  width: 44,
                  height: 44,
                  color: "#ffffff",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  cursor: "pointer",
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Items scroll area with generous 28px top padding & clean item gaps */}
            <div
              data-lenis-prevent
              data-lenis-prevent-touch
              className="flex-1 overflow-y-auto px-5 sm:px-7"
              style={{
                minHeight: 0,
                paddingTop: "28px",
                paddingBottom: "24px",
              }}
            >
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 py-20 text-center">
                  <div
                    style={{
                      width: 74,
                      height: 74,
                      border: "1px dashed rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <ShoppingBag size={30} style={{ color: "rgba(255,255,255,0.25)" }} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span
                      className="font-classified font-bold"
                      style={{ fontSize: "12px", letterSpacing: "0.24em", color: "rgba(255,255,255,0.5)" }}
                    >
                      NO GEAR DEPLOYED
                    </span>
                    <span
                      className="font-sans"
                      style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.3)", fontWeight: 300 }}
                    >
                      Select equipment from the catalog to begin.
                    </span>
                  </div>
                  <button
                    onClick={closeCart}
                    className="btn-ghost flex items-center gap-2 mt-2"
                    style={{ padding: "11px 20px", fontSize: "11.5px" }}
                  >
                    BROWSE STORE
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {/* Section Label with margin */}
                  <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--red)" }} />
                      <span className="font-classified font-medium" style={{ fontSize: "9px", letterSpacing: "0.24em", color: "var(--text-ghost)" }}>
                        DEPLOYED ASSETS
                      </span>
                    </div>
                    <span className="font-classified text-[9px] tracking-[0.2em] text-white/40">
                      COUNT: {itemCount}
                    </span>
                  </div>

                  {/* Items list with generous vertical gap */}
                  <div className="flex flex-col gap-3.5">
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <CartItem
                          key={`${item.productId}-${item.size ?? ""}`}
                          item={item}
                        />
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Clear cart action */}
                  {items.length > 0 && (
                    <div className="flex justify-end items-center pt-3 pb-1 border-t border-white/[0.06] mt-2">
                      <button
                        onClick={clearCart}
                        className="font-classified flex items-center gap-1.5 transition-colors hover:text-red-400 cursor-pointer"
                        style={{
                          fontSize: "9px",
                          letterSpacing: "0.18em",
                          color: "rgba(255,255,255,0.35)",
                          background: "transparent",
                          border: "none",
                          padding: "4px 0",
                        }}
                      >
                        <Trash2 size={13} />
                        CLEAR ALL ASSETS
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer / Summary Breakdown (without false venue pickup line) */}
            {items.length > 0 && (
              <div
                className="flex-shrink-0 px-5 py-4 sm:px-6 sm:py-5 flex flex-col gap-3.5"
                style={{
                  background: "rgba(10,10,12,0.98)",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 -10px 30px rgba(0,0,0,0.5)",
                }}
              >
                {/* Financial Breakdown */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-classified"
                      style={{ fontSize: "9px", letterSpacing: "0.22em", color: "var(--text-ghost)" }}
                    >
                      SUBTOTAL ({itemCount} {itemCount === 1 ? "ITEM" : "ITEMS"})
                    </span>
                    <span
                      className="font-classified tabular"
                      style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)" }}
                    >
                      LKR {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="mission-line opacity-30 my-1" />

                  <div className="flex items-baseline justify-between">
                    <span
                      className="font-classified font-bold"
                      style={{ fontSize: "10.5px", letterSpacing: "0.24em", color: "var(--text)" }}
                    >
                      TOTAL PAYABLE
                    </span>
                    <span
                      className="font-display"
                      style={{ fontSize: "1.5rem", letterSpacing: "0.04em", color: "var(--text)" }}
                    >
                      LKR {subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-2">
                  <Link
                    href="/store/checkout"
                    onClick={closeCart}
                    className="btn-mission w-full flex items-center justify-center gap-2"
                    style={{ padding: "13px 18px", fontSize: "11.5px" }}
                    id="cart-checkout-cta"
                  >
                    PROCEED TO CHECKOUT
                    <ArrowRight size={13} />
                  </Link>

                  <button
                    onClick={closeCart}
                    className="btn-ghost w-full flex items-center justify-center"
                    style={{ padding: "10px 18px", fontSize: "11px" }}
                  >
                    CONTINUE BROWSING
                  </button>
                </div>

                {/* Tactical security footnote */}
                <div className="flex items-center justify-center gap-1.5 pt-0.5">
                  <ShieldCheck size={11} style={{ color: "rgba(255,255,255,0.3)" }} />
                  <p
                    className="font-classified text-center"
                    style={{ fontSize: "7.5px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.25)" }}
                  >
                    SECURE ORDER · BANK TRANSFER PROOF REQUIRED
                  </p>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(drawerContent, document.body);
}
