import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { agendaItems, agendaDays } from "@/data/agenda";

/** 3-day agenda section */
export default function Agenda() {
    return (
        <section id="agenda" className="py-24 lg:py-32 bg-zinc-950">
            <Container>
                <ScrollReveal>
                    <SectionHeading
                        eyebrow="Schedule"
                        title="The Journey"
                        subtitle="Three days of sessions, workshops, and unforgettable experiences."
                    />
                </ScrollReveal>

                {agendaItems.length === 0 ? (
                    <ScrollReveal delay={0.2}>
                        <p className="mt-16 text-center text-white/40 text-sm">
                            Full schedule coming soon. Stay tuned.
                        </p>
                    </ScrollReveal>
                ) : (
                    <div className="mt-16 space-y-12">
                        {agendaDays.map((day) => {
                            const dayItems = agendaItems.filter((i) => i.day === day.day);
                            return (
                                <div key={day.day}>
                                    <h3 className="text-white/70 text-sm uppercase tracking-widest mb-6 font-medium">
                                        {day.label} — {day.date}
                                    </h3>
                                    <div className="space-y-3">
                                        {dayItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex gap-6 p-5 rounded-xl bg-white/5 border border-white/10"
                                            >
                                                <div className="w-24 shrink-0">
                                                    <p className="text-[var(--color-accent)] text-sm font-mono">{item.time}</p>
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{item.title}</p>
                                                    {item.description && (
                                                        <p className="text-white/50 text-sm mt-1">{item.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Container>
        </section>
    );
}
