"use client";

import { useCart } from "@/lib/store/cartStore";
import type { BuyNowSession } from "@/lib/store/types";
import type { CartItem } from "@/lib/store/types";

interface OrderSummaryProps {
  buyNow?: BuyNowSession | null;
}

interface DisplayItem {
  name: string;
  itemCode: string;
  size: string | null;
  quantity: number;
  unitPrice: number;
  total: number;
}

export default function OrderSummary({ buyNow }: OrderSummaryProps) {
  const { items, subtotal } = useCart();

  let displayItems: DisplayItem[] = [];
  let displayTotal = 0;

  if (buyNow) {
    const item: DisplayItem = {
      name: buyNow.product.name,
      itemCode: buyNow.product.itemCode,
      size: buyNow.size,
      quantity: buyNow.quantity,
      unitPrice: buyNow.product.price,
      total: buyNow.product.price * buyNow.quantity,
    };
    displayItems = [item];
    displayTotal = item.total;
  } else {
    displayItems = items.map((i: CartItem) => ({
      name: i.name,
      itemCode: i.itemCode,
      size: i.size,
      quantity: i.quantity,
      unitPrice: i.price,
      total: i.price * i.quantity,
    }));
    displayTotal = subtotal;
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
          MISSION INVENTORY
        </span>
      </div>

      {/* Items */}
      <div className="px-5 py-3 flex flex-col">
        {displayItems.length === 0 ? (
          <p
            className="font-classified py-4 text-center"
            style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)" }}
          >
            NO ITEMS FOUND
          </p>
        ) : (
          displayItems.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-start py-3"
              style={{ borderBottom: i < displayItems.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
            >
              <div className="flex flex-col gap-1 flex-1 min-w-0 pr-3">
                <span
                  className="font-display"
                  style={{ fontSize: "0.95rem", letterSpacing: "0.04em", lineHeight: 1.1, color: "var(--text)" }}
                >
                  {item.name}
                </span>
                <div className="flex flex-wrap gap-2 mt-0.5">
                  <span
                    className="font-classified"
                    style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--text-ghost)" }}
                  >
                    {item.itemCode}
                  </span>
                  {item.size && (
                    <span
                      className="font-classified"
                      style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--text-ghost)" }}
                    >
                      SIZE: {item.size}
                    </span>
                  )}
                  <span
                    className="font-classified"
                    style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--text-ghost)" }}
                  >
                    QTY: {String(item.quantity).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <span
                className="font-classified tabular flex-shrink-0"
                style={{ fontSize: "12px", letterSpacing: "0.08em", color: "var(--text)" }}
              >
                LKR {item.total.toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Total */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}
      >
        <span
          className="font-classified"
          style={{ fontSize: "10px", letterSpacing: "0.24em", color: "var(--text-muted)" }}
        >
          TOTAL
        </span>
        <span
          className="font-display"
          style={{ fontSize: "1.5rem", letterSpacing: "0.04em", color: "var(--text)" }}
        >
          LKR {displayTotal.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
