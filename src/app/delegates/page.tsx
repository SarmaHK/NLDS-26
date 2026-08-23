import type { Metadata } from "next";
import RoomAllocationSection from "@/components/sections/RoomAllocationSection";

export const metadata: Metadata = {
  title: "Room Allocation — NLDS'26 | AIESEC in Sri Lanka",
  description:
    "Room allocation for NLDS'26 delegates. Access opens on the event day — 09 October 2026.",
};

export default function DelegatesPage() {
  return (
    <main>
      <RoomAllocationSection />
    </main>
  );
}
