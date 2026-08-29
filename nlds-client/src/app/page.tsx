import Hero from "@/components/hero/Hero";
import MissionBriefing from "@/components/sections/MissionBriefing";
import CountdownSection from "@/components/sections/CountdownSection";
import ArchivedMemories from "@/components/sections/ArchivedMemories";
import AcceptMission from "@/components/sections/AcceptMission";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MissionBriefing />
      <CountdownSection />
      <ArchivedMemories />
      <AcceptMission />
    </main>
  );
}
