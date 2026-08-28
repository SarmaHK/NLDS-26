"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/store/cartStore";
import ProductGallery from "@/components/store/ProductGallery";
import SizeSelector from "@/components/store/SizeSelector";
import QuantitySelector from "@/components/store/QuantitySelector";
import type { Product } from "@/data/merchandise";
import { X, ShoppingBag, ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem, setBuyNow, openCart } = useCart();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState<"added" | null>(null);
  const [sizeError, setSizeError] = useState(false);

  // Reset state when product changes
  const handleClose = () => {
    setSelectedSize(null);
    setQuantity(1);
    setToast(null);
    setSizeError(false);
    onClose();
  };

  const requiresSize = product ? product.sizes.length > 0 : false;

  function validateSize(): boolean {
    if (requiresSize && !selectedSize) {
      setSizeError(true);
      return false;
    }
    setSizeError(false);
    return true;
  }

  function handleAddToCart() {
    if (!product || !validateSize()) return;
    addItem(product, selectedSize, quantity);
    setToast("added");
    setTimeout(() => setToast(null), 2500);
  }

  function handleBuyNow() {
    if (!product || !validateSize()) return;
    setBuyNow({ product, size: selectedSize, quantity });
    handleClose();
    router.push("/store/checkout?mode=buynow");
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200]"
            style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(4px)" }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[201] inset-0 flex items-center justify-center p-4 md:p-6 pointer-events-none"
          >
            <div
              className="relative w-full max-w-[780px] max-h-[88vh] overflow-y-auto pointer-events-auto"
              style={{
                background: "#0a0a0c",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 30px 70px rgba(0,0,0,0.85), 0 0 0 1px rgba(196,30,58,0.1)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle top red accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: "linear-gradient(90deg, var(--red), transparent 60%)", opacity: 0.5 }}
              />

              {/* Header bar */}
              <div
                className="flex items-center justify-between px-5 py-3.5 sticky top-0 z-10"
                style={{
                  background: "rgba(10,10,12,0.98)",
                  backdropFilter: "blur(12px)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--red)", opacity: 0.8 }} />
                  <span className="font-classified" style={{ fontSize: "9.5px", letterSpacing: "0.28em", color: "var(--text-muted)" }}>
                    ITEM FILE
                  </span>
                  <span className="font-classified" style={{ fontSize: "9.5px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}>
                    // {product.itemCode}
                  </span>
                </div>
                <button
                  onClick={handleClose}
                  aria-label="Close product file"
                  className="flex items-center justify-center w-8 h-8 transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.4)", background: "transparent", border: "none", cursor: "pointer" }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-[310px_1fr] gap-0">
                {/* Left — Gallery */}
                <div
                  className="p-5 sm:p-6 flex flex-col justify-center"
                  style={{ borderRight: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <ProductGallery images={product.images} productName={product.name} />
                </div>

                {/* Right — Details */}
                <div className="p-5 sm:p-6 flex flex-col gap-4 justify-between">
                  {/* Top Block: Badges & Title */}
                  <div className="flex flex-col gap-2.5">
                    {/* Classification tags */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-classified" style={{ fontSize: "8.5px", letterSpacing: "0.24em", color: "var(--text-ghost)" }}>
                        ITEM // {product.itemCode}
                      </span>
                      <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                      <span className="font-classified" style={{ fontSize: "8.5px", letterSpacing: "0.22em", color: product.available ? "var(--red)" : "rgba(255,255,255,0.3)" }}>
                        {product.available ? "● AVAILABLE" : "● OUT OF STOCK"}
                      </span>
                      {product.badge && (
                        <>
                          <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                          <span
                            className="font-classified font-medium"
                            style={{
                              fontSize: "8px",
                              letterSpacing: "0.18em",
                              color: "#fff",
                              background: "var(--red)",
                              padding: "2px 7px",
                            }}
                          >
                            {product.badge}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Product name & subtitle */}
                    <div>
                      <h2
                        className="font-display"
                        style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)", letterSpacing: "0.04em", lineHeight: 1.05, color: "var(--text)" }}
                      >
                        {product.name}
                      </h2>
                      <p
                        className="font-classified"
                        style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--text-muted)", marginTop: "0.35rem" }}
                      >
                        OFFICIAL ISSUE
                      </p>
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.6, fontWeight: 300 }}>
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span
                        className="font-classified"
                        style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--text-ghost)" }}
                      >
                        PRICE:
                      </span>
                      <span
                        className="font-display"
                        style={{ fontSize: "1.65rem", letterSpacing: "0.04em", color: "var(--text)" }}
                      >
                        LKR {product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mission-line my-1 opacity-50" />

                  {/* Middle Block: Size & Quantity */}
                  <div className="flex flex-col gap-3.5">
                    {/* Size selector */}
                    {requiresSize && (
                      <div>
                        <SizeSelector
                          sizes={product.sizes}
                          selected={selectedSize}
                          onChange={(s) => { setSelectedSize(s); setSizeError(false); }}
                        />
                        {sizeError && (
                          <motion.p
                            initial={{ opacity: 0, y: -3 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-classified mt-1.5"
                            style={{ fontSize: "8.5px", letterSpacing: "0.18em", color: "var(--red)" }}
                          >
                            ⚠ PLEASE SELECT A SIZE
                          </motion.p>
                        )}
                      </div>
                    )}

                    {/* Quantity */}
                    <QuantitySelector value={quantity} onChange={setQuantity} />
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex flex-col gap-2.5 pt-2">
                    <button
                      onClick={handleBuyNow}
                      className="btn-mission w-full flex items-center justify-center gap-2"
                      style={{ padding: "13px 20px", fontSize: "12px" }}
                      id={`buynow-${product.id}`}
                    >
                      BUY NOW
                      <ArrowRight size={14} />
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="btn-ghost w-full flex items-center justify-center gap-2"
                      style={{ padding: "11px 20px", fontSize: "12px" }}
                      id={`addtocart-${product.id}`}
                    >
                      <ShoppingBag size={14} />
                      ADD TO CART
                    </button>
                  </div>

                  {/* Toast confirmation */}
                  <AnimatePresence>
                    {toast === "added" && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="flex items-center gap-2 px-3.5 py-2.5"
                        style={{
                          background: "rgba(196,30,58,0.08)",
                          border: "1px solid rgba(196,30,58,0.25)",
                        }}
                      >
                        <Check size={13} style={{ color: "var(--red)" }} />
                        <span className="font-classified" style={{ fontSize: "8.5px", letterSpacing: "0.2em", color: "var(--text)" }}>
                          ITEM ADDED TO MISSION INVENTORY ✓
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
