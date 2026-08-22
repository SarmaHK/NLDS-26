import Hero from "@/components/hero/Hero";
import AboutEvent from "@/components/sections/AboutEvent";
import EventDetails from "@/components/sections/EventDetails";
import Speakers from "@/components/sections/Speakers";
import Agenda from "@/components/sections/Agenda";
import ConferenceTeam from "@/components/sections/ConferenceTeam";
import PartnersSection from "@/components/sections/PartnersSection";
import RegistrationCTA from "@/components/sections/RegistrationCTA";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata();

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutEvent />
      <EventDetails />
      {/* <ThemeReveal /> — add when theme is announced */}
      <Speakers />
      <Agenda />
      <ConferenceTeam />
      <PartnersSection />
      <RegistrationCTA />
    </>
  );
}
