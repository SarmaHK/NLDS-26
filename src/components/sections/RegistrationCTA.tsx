import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import Countdown from "@/components/ui/Countdown";
import { eventData } from "@/data/event";

/** Final CTA section before footer */
export default function RegistrationCTA() {
    return (
        <section id="register" className="py-32 bg-black relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-accent)]/5 to-transparent" />

            <Container className="relative z-10 text-center">
                <ScrollReveal>
                    <SectionHeading
                        eyebrow="Registration Open"
                        title="Secure Your Spot"
                        subtitle="Join 250+ future leaders at NLDS 2026. Limited spots available."
                    />
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                    <div className="mt-12 mb-12">
                        <p className="text-white/40 text-xs uppercase tracking-widest mb-6">
                            Registration closes in
                        </p>
                        <Countdown targetDate={eventData.registrationDeadline} />
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.25}>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <Button href="/register" size="lg" variant="primary">
                            Register Now
                        </Button>
                        <Button href="/store" size="lg" variant="ghost">
                            Shop Merch
                        </Button>
                    </div>
                </ScrollReveal>
            </Container>
        </section>
    );
}
