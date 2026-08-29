"use client";

import { useCart } from "@/lib/store/cartStore";
import { ShoppingBag } from "lucide-react";

export default function CartBadge() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      aria-label={`Open cart, ${itemCount} items`}
      className="relative flex items-center gap-1.5 px-4 py-2 group transition-colors"
      style={{ background: "transparent", border: "none", cursor: "pointer" }}
      id="nav-cart-badge"
    >
      <ShoppingBag
        size={14}
        className="transition-colors group-hover:text-[var(--red)]"
        style={{ color: "rgba(255,255,255,0.7)" }}
      />
      <span
        className="font-classified transition-colors group-hover:text-[var(--red)]"
        style={{
          fontSize: "11px",
          letterSpacing: "0.24em",
          color: "rgba(255,255,255,0.7)",
        }}
      >
        CART
      </span>
      {itemCount > 0 && (
        <span
          className="font-classified tabular"
          style={{
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "var(--red)",
          }}
        >
          [{String(itemCount).padStart(2, "0")}]
        </span>
      )}
    </button>
  );
}
