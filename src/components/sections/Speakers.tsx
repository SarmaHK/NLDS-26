import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { speakers } from "@/data/speakers";

/** Speakers grid section */
export default function Speakers() {
    if (speakers.length === 0) {
        return (
            <section id="speakers" className="py-24 lg:py-32 bg-zinc-900">
                <Container>
                    <SectionHeading
                        eyebrow="Speakers"
                        title="Inspiring Voices"
                        subtitle="Speaker lineup coming soon."
                    />
                </Container>
            </section>
        );
    }

    return (
        <section id="speakers" className="py-24 lg:py-32 bg-zinc-900">
            <Container>
                <ScrollReveal>
                    <SectionHeading
                        eyebrow="Speakers"
                        title="Inspiring Voices"
                        subtitle="Thought leaders shaping the conversation."
                    />
                </ScrollReveal>

                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {speakers.map((speaker, i) => (
                        <ScrollReveal key={speaker.id} delay={i * 0.08}>
                            <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
                                <div className="w-16 h-16 rounded-full bg-white/10 mb-4 overflow-hidden">
                                    {/* next/image goes here when images are available */}
                                </div>
                                <p className="text-white font-semibold">{speaker.name}</p>
                                <p className="text-white/50 text-sm">{speaker.title}</p>
                                <p className="text-[var(--color-accent)] text-xs mt-1">{speaker.organization}</p>
                                {speaker.sessionTitle && (
                                    <p className="text-white/40 text-xs mt-3 italic">"{speaker.sessionTitle}"</p>
                                )}
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}
