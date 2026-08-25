import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RegistrationForm from "@/components/register/RegistrationForm";

export const metadata: Metadata = {
    title: "Register — NLDS'26 | AIESEC in Sri Lanka",
    description:
        "Accept the mission. Register as a delegate for NLDS 2026 — National Leadership Development Seminar by AIESEC in Sri Lanka. 09–11 October 2026.",
};

export default function RegisterPage() {
    return (
        <main>
            <PageHero
                label="DELEGATE REGISTRATION"
                fileNo="NLDS-2026-REG"
                title="ACCEPT THE"
                subtitle="MISSION"
                description="Complete your dossier to secure your place at NLDS 2026. Every field is a step closer to the mission."
            />
            <RegistrationForm />
        </main>
    );
}
