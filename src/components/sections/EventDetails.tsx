import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { eventData } from "@/data/event";
import { Calendar, MapPin, Clock } from "lucide-react";

export default function EventDetails() {
    const details = [
        {
            icon: Calendar,
            label: "Date",
            value: "October 1–3, 2026",   // Update when finalized
            sub: "3 Days of Leadership",
        },
        {
            icon: MapPin,
            label: "Venue",
            value: eventData.venue.name,
            sub: eventData.venue.city,
        },
        {
            icon: Clock,
            label: "Duration",
            value: "3 Days",
            sub: "Full immersive experience",
        },
    ];

    return (
        <section id="details" className="py-24 lg:py-32 bg-black">
            <Container>
                <ScrollReveal>
                    <SectionHeading
                        eyebrow="Event Details"
                        title="Mark Your Calendar"
                    />
                </ScrollReveal>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {details.map((item, i) => (
                        <ScrollReveal key={item.label} delay={i * 0.1}>
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center group hover:border-[var(--color-accent)]/30 transition-all duration-300">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-accent)]/10 mb-4">
                                    <item.icon size={20} className="text-[var(--color-accent)]" />
                                </div>
                                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{item.label}</p>
                                <p className="text-white font-semibold text-xl">{item.value}</p>
                                <p className="text-white/40 text-sm mt-1">{item.sub}</p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}
