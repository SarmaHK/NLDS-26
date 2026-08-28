"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, AlertCircle } from "lucide-react";

import { useCart } from "@/lib/store/cartStore";
import { submitOrder } from "@/lib/store/mockOrderService";
import type { OrderPayload, OrderItem } from "@/lib/store/types";

import OrderSummary from "@/components/store/OrderSummary";
import PaymentDetails from "@/components/store/PaymentDetails";
import ReceiptUpload from "@/components/store/ReceiptUpload";

// ─── Zod schema ───────────────────────────────────────────────────────────────

const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name is required (min 2 characters)")
    .max(100),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  mobileNumber: z
    .string()
    .min(9, "Please enter a valid mobile number")
    .max(15)
    .regex(/^[+\d\s\-()]+$/, "Invalid mobile number format"),
  entity: z
    .string()
    .min(2, "Entity / organisation is required")
    .max(100),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

// ─── Field Component ────────────────────────────────────────────────────────

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}

function FormField({ id, label, error, children, hint }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-sans font-medium uppercase tracking-wide"
        style={{ fontSize: "11px", letterSpacing: "0.14em", color: error ? "var(--red)" : "var(--text-muted)" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <div className="flex items-center gap-1.5 mt-0.5">
          <AlertCircle size={11} style={{ color: "var(--red)", flexShrink: 0 }} />
          <span style={{ fontSize: "11px", color: "var(--red)" }}>{error}</span>
        </div>
      )}
      {hint && !error && (
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>{hint}</span>
      )}
    </div>
  );
}

// ─── Section Header ──────────────────────────────────────────────────────────

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div
      className="flex items-center gap-4 pb-5 mb-6"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <span
        className="font-classified"
        style={{ fontSize: "9px", letterSpacing: "0.22em", color: "var(--red)", opacity: 0.6 }}
      >
        {number}
      </span>
      <span
        className="font-classified"
        style={{ fontSize: "11px", letterSpacing: "0.28em", color: "var(--text-muted)" }}
      >
        {title}
      </span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.04)" }} />
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isBuyNow = searchParams.get("mode") === "buynow";

  const { buyNowSession, items, subtotal, clearCart, setBuyNow } = useCart();

  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptError, setReceiptError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  // If buy-now but no session, or if cart but no items, redirect to store
  useEffect(() => {
    if (isBuyNow && !buyNowSession) {
      router.replace("/store");
    } else if (!isBuyNow && items.length === 0) {
      router.replace("/store");
    }
  }, [isBuyNow, buyNowSession, items, router]);

  const onSubmit = async (data: CheckoutFormData) => {
    // Validate receipt
    if (!receiptFile) {
      setReceiptError("Payment receipt is required to complete the mission.");
      return;
    }
    setReceiptError("");
    setSubmitError("");

    // Build order items
    let orderItems: OrderItem[] = [];
    let total = 0;

    if (isBuyNow && buyNowSession) {
      const item: OrderItem = {
        productId: buyNowSession.product.id,
        name: buyNowSession.product.name,
        itemCode: buyNowSession.product.itemCode,
        size: buyNowSession.size,
        quantity: buyNowSession.quantity,
        unitPrice: buyNowSession.product.price,
        totalPrice: buyNowSession.product.price * buyNowSession.quantity,
      };
      orderItems = [item];
      total = item.totalPrice;
    } else {
      orderItems = items.map((i) => ({
        productId: i.productId,
        name: i.name,
        itemCode: i.itemCode,
        size: i.size,
        quantity: i.quantity,
        unitPrice: i.price,
        totalPrice: i.price * i.quantity,
      }));
      total = subtotal;
    }

    const payload: OrderPayload = {
      customer: {
        fullName: data.fullName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        entity: data.entity,
      },
      items: orderItems,
      subtotal: total,
      total,
      receiptFile,
      paymentStatus: "PENDING_VERIFICATION",
    };

    setIsSubmitting(true);
    try {
      const result = await submitOrder(payload);
      if (result.success) {
        // Clear state
        if (isBuyNow) {
          setBuyNow(null);
        } else {
          clearCart();
        }
        // Navigate to confirmation
        router.push(
          `/store/confirmation?orderId=${encodeURIComponent(result.orderId)}&name=${encodeURIComponent(data.fullName)}&total=${total}`
        );
      } else {
        setSubmitError("Submission failed. Please try again.");
      }
    } catch {
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--bg)", paddingTop: "4rem", paddingBottom: "8rem" }}
    >
      {/* Grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 md:px-10">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <div style={{ height: 1, width: "1.5rem", background: "var(--red)" }} />
            <span className="label-classified">CHECKOUT</span>
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              letterSpacing: "0.04em",
              lineHeight: 0.88,
              color: "var(--text)",
              marginBottom: "0.75rem",
            }}
          >
            MISSION
            <br />
            <span style={{ color: "var(--red)" }}>AUTHORIZATION</span>
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", fontWeight: 300, lineHeight: 1.7 }}>
            Provide your details to complete the request.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 xl:gap-12">
          {/* ── LEFT: Form ──── */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col gap-8"
            >
              {/* SECTION 1: Customer details */}
              <div
                style={{
                  background: "#0a0a0c",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "1.75rem",
                }}
              >
                <SectionHeader number="01" title="OPERATIVE DETAILS" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField id="fullName" label="Full Name *" error={errors.fullName?.message}>
                    <input
                      id="fullName"
                      className="reg-field"
                      placeholder="John Doe"
                      aria-invalid={!!errors.fullName}
                      {...register("fullName")}
                    />
                  </FormField>

                  <FormField id="email" label="Email Address *" error={errors.email?.message}>
                    <input
                      id="email"
                      type="email"
                      className="reg-field"
                      placeholder="agent@example.com"
                      aria-invalid={!!errors.email}
                      {...register("email")}
                    />
                  </FormField>

                  <FormField id="mobileNumber" label="Mobile Number *" error={errors.mobileNumber?.message} hint="+94 7X XXX XXXX">
                    <input
                      id="mobileNumber"
                      type="tel"
                      className="reg-field"
                      placeholder="+94 77 000 0000"
                      aria-invalid={!!errors.mobileNumber}
                      {...register("mobileNumber")}
                    />
                  </FormField>

                  <FormField id="entity" label="Entity / Organisation *" error={errors.entity?.message} hint="Your AIESEC entity, university, or external organisation">
                    <input
                      id="entity"
                      className="reg-field"
                      placeholder="AIESEC in Colombo North"
                      aria-invalid={!!errors.entity}
                      {...register("entity")}
                    />
                  </FormField>
                </div>
              </div>

              {/* SECTION 2: Payment details */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <PaymentDetails />
              </motion.div>

              {/* SECTION 3: Receipt upload */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <ReceiptUpload
                  file={receiptFile}
                  onChange={(f) => { setReceiptFile(f); if (f) setReceiptError(""); }}
                  error={receiptError}
                />
              </motion.div>

              {/* Submit error */}
              <AnimatePresence>
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 px-4 py-3"
                    style={{ background: "rgba(196,30,58,0.06)", border: "1px solid rgba(196,30,58,0.2)" }}
                  >
                    <AlertCircle size={14} style={{ color: "var(--red)" }} />
                    <span style={{ fontSize: "12px", color: "var(--red)" }}>{submitError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-mission flex items-center justify-center gap-2 w-full"
                style={{
                  padding: "18px 32px",
                  fontSize: "13px",
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
                id="checkout-submit"
              >
                {isSubmitting ? (
                  <>
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                    TRANSMITTING...
                  </>
                ) : (
                  <>
                    SUBMIT MISSION REQUEST
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <p
                className="font-classified text-center"
                style={{ fontSize: "9px", letterSpacing: "0.18em", color: "rgba(255,255,255,0.15)" }}
              >
                RECEIPT REQUIRED · BANK TRANSFER ONLY · ORDERS PROCESSED AFTER VERIFICATION
              </p>
            </motion.div>
          </form>

          {/* ── RIGHT: Order Summary ──── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <span
              className="font-classified"
              style={{ fontSize: "10px", letterSpacing: "0.28em", color: "var(--text-ghost)" }}
            >
              ORDER SUMMARY
            </span>
            <OrderSummary buyNow={isBuyNow ? buyNowSession : null} />
          </motion.div>
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
