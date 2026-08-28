/**
 * NLDS'26 Store — Mock Order Service
 *
 * This service layer handles order submission.
 * Currently uses a mock implementation (simulates a network request).
 *
 * TO CONNECT TO A REAL BACKEND:
 *   Replace the body of `submitOrder` with an actual fetch() / axios call.
 *   The function signature and types remain the same — the UI will work unchanged.
 *
 * Example real implementation:
 *   const res = await fetch("/api/store/orders", {
 *     method: "POST",
 *     body: formData,   // include receipt file + JSON fields
 *   });
 *   const data = await res.json();
 *   return { success: true, orderId: data.orderId, message: "Order received." };
 */

import type { OrderPayload, OrderResult } from "@/lib/store/types";

/** Generate a mock order ID in the format NLDS26-XXXXXX */
function generateOrderId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "NLDS26-";
  for (let i = 0; i < 6; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

/**
 * Submit an order.
 *
 * @param payload - The complete order payload including customer details,
 *                  items, totals, and receipt file.
 * @returns OrderResult with success flag, order ID, and message.
 */
export async function submitOrder(payload: OrderPayload): Promise<OrderResult> {
  // ── MOCK IMPLEMENTATION ───────────────────────────────────────────────────
  // Simulates a 1.5-second network request and always succeeds.
  // In production, replace this with a real API call.

  console.log("[MockOrderService] Submitting order:", {
    customer: payload.customer,
    itemCount: payload.items.length,
    total: payload.total,
    receiptFileName: payload.receiptFile?.name,
  });

  await new Promise<void>((resolve) => setTimeout(resolve, 1500));

  const orderId = generateOrderId();

  console.log("[MockOrderService] Order accepted:", orderId);

  return {
    success: true,
    orderId,
    message: "MISSION REQUEST RECEIVED. YOUR ORDER HAS BEEN SUCCESSFULLY TRANSMITTED.",
  };
  // ── END MOCK ──────────────────────────────────────────────────────────────
}
