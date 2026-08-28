import type { Metadata } from "next";
import { Suspense } from "react";
import ConfirmationView from "@/components/store/ConfirmationView";

export const metadata: Metadata = {
  title: "Order Confirmed — NLDS'26 | AIESEC in Sri Lanka",
  description: "Your NLDS'26 merchandise order has been received.",
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  return (
    <main>
      <Suspense>
        <ConfirmationView />
      </Suspense>
    </main>
  );
}
