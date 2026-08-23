import type { Metadata } from "next";
import PageHero      from "@/components/ui/PageHero";
import AlliesSection from "@/components/sections/AlliesSection";

export const metadata: Metadata = {
  title: "Partners — NLDS'26 | AIESEC in Sri Lanka",
  description:
    "Strategic allies powering NLDS'26 — National Leadership Development Seminar 2026 by AIESEC in Sri Lanka.",
};

export default function PartnersPage() {
  return (
    <main>
      <PageHero
        label="STRATEGIC SUPPORT"
        fileNo="NLDS-2026-ALLIES"
        title="MISSION"
        subtitle="ALLIES"
        description="No mission succeeds alone. Our strategic partners provide the infrastructure, resources, and reach that make NLDS'26 possible."
      />
      <AlliesSection />
    </main>
  );
}
