import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import CheckoutForm from "@/components/store/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout — NLDS'26 | AIESEC in Sri Lanka",
  description:
    "Complete your NLDS'26 merchandise order. Submit your mission request.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <main>
      <PageHero
        label="MISSION AUTHORIZATION"
        fileNo="NLDS-2026-CHECKOUT"
        title="CHECKOUT"
        description="Provide your details to complete the request."
      />
      <Suspense>
        <CheckoutForm />
      </Suspense>
    </main>
  );
}
