import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { eventData } from "@/data/event";

/** About the event section */
export default function AboutEvent() {
    return (
        <section id="about" className="py-24 lg:py-32 bg-zinc-950">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <ScrollReveal direction="left">
                        <SectionHeading
                            eyebrow="About NLDS"
                            title="What is NLDS?"
                            align="left"
                        />
                        <p className="mt-6 text-white/60 text-base leading-relaxed">
                            {eventData.description}
                        </p>
                        <p className="mt-4 text-white/50 text-base leading-relaxed">
                            A platform for AIESECers from across Sri Lanka to connect, expand their networks, and foster the development of the next generation of leaders.
                        </p>
                    </ScrollReveal>

                    {/* Stats grid */}
                    <ScrollReveal direction="right">
                        <div className="grid grid-cols-2 gap-4">
                            {eventData.stats.map((stat, i) => (
                                <div
                                    key={stat.label}
                                    className="p-6 rounded-2xl bg-white/5 border border-white/10"
                                >
                                    <p className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                                        {stat.value}
                                    </p>
                                    <p className="text-white/70 font-medium mt-1">{stat.label}</p>
                                    {stat.description && (
                                        <p className="text-white/40 text-sm mt-1">{stat.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </Container>
        </section>
    );
}
