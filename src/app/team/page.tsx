import type { Metadata } from "next";
import PageHero      from "@/components/ui/PageHero";
import ConferenceTeamSection from "@/components/sections/ConferenceTeamSection";

export const metadata: Metadata = {
  title: "Conference Team — NLDS'26 | AIESEC in Sri Lanka",
  description:
    "Meet the organising committee and main committee behind NLDS'26 — the people making the mission possible.",
};

export default function TeamPage() {
  return (
    <main>
      <PageHero
        label="PERSONNEL FILES"
        fileNo="NLDS-2026-TEAM"
        title="CONFERENCE"
        subtitle="TEAM"
        description="The command. The organizers. The people behind NLDS'26 — making the impossible, possible."
      />
      <ConferenceTeamSection />
    </main>
  );
}
