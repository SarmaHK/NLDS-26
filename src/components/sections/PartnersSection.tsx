import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { partners, partnerTierConfig, PartnerTier } from "@/data/partners";
import Link from "next/link";

/** Partners/sponsors grid — publicly visible */
export default function PartnersSection() {
    const tiers = Object.entries(partnerTierConfig)
        .sort((a, b) => a[1].order - b[1].order)
        .map(([tier, config]) => ({
            tier: tier as PartnerTier,
            label: config.label,
            partners: partners.filter((p) => p.tier === tier),
        }))
        .filter((t) => t.partners.length > 0);

    return (
        <section id="partners" className="py-24 lg:py-32 bg-zinc-950">
            <Container>
                <ScrollReveal>
                    <SectionHeading
                        eyebrow="Our Partners"
                        title="Supported By"
                        subtitle="Organizations that make NLDS 2026 possible."
                    />
                </ScrollReveal>

                {tiers.length === 0 ? (
                    <ScrollReveal delay={0.2}>
                        <p className="mt-16 text-center text-white/40 text-sm">
                            Partner announcements coming soon.
                        </p>
                    </ScrollReveal>
                ) : (
                    <div className="mt-16 space-y-16">
                        {tiers.map((tier) => (
                            <div key={tier.tier}>
                                <p className="text-center text-white/30 text-xs uppercase tracking-widest mb-8">
                                    {tier.label}
                                </p>
                                <div className="flex flex-wrap justify-center gap-6">
                                    {tier.partners.map((partner) => (
                                        <Link
                                            key={partner.id}
                                            href={partner.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 min-w-[140px]"
                                        >
                                            {/* next/image for logo goes here */}
                                            <span className="text-white/60 text-sm font-medium text-center">
                                                {partner.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
}
