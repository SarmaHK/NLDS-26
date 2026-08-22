import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { mainCommittee, organisingCommittee } from "@/data/team";

/** Conference team — MC & OC */
export default function ConferenceTeam() {
    return (
        <section id="team" className="py-24 lg:py-32 bg-black">
            <Container>
                <ScrollReveal>
                    <SectionHeading
                        eyebrow="Conference Team"
                        title="The People Behind NLDS"
                        subtitle="Meet the dedicated team making NLDS 2026 possible."
                    />
                </ScrollReveal>

                {/* MC */}
                {mainCommittee.length > 0 && (
                    <div className="mt-16">
                        <p className="text-white/40 text-xs uppercase tracking-widest mb-8">Main Committee</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {mainCommittee.map((member, i) => (
                                <ScrollReveal key={member.id} delay={i * 0.05}>
                                    <TeamCard member={member} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                )}

                {/* OC */}
                {organisingCommittee.length > 0 && (
                    <div className="mt-16">
                        <p className="text-white/40 text-xs uppercase tracking-widest mb-8">Organising Committee</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                            {organisingCommittee.map((member, i) => (
                                <ScrollReveal key={member.id} delay={i * 0.05}>
                                    <TeamCard member={member} />
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                )}

                {mainCommittee.length === 0 && organisingCommittee.length === 0 && (
                    <ScrollReveal delay={0.2}>
                        <p className="mt-16 text-center text-white/40 text-sm">
                            Team details coming soon.
                        </p>
                    </ScrollReveal>
                )}
            </Container>
        </section>
    );
}

function TeamCard({ member }: { member: import("@/data/team").TeamMember }) {
    return (
        <div className="group text-center p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-white/10 mx-auto mb-3 overflow-hidden">
                {/* next/image goes here */}
            </div>
            <p className="text-white text-sm font-medium">{member.name}</p>
            <p className="text-white/50 text-xs mt-0.5">{member.role}</p>
            {member.university && (
                <p className="text-white/30 text-xs mt-0.5">{member.university}</p>
            )}
        </div>
    );
}
