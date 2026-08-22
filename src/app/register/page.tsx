import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = createMetadata({
    title: "Register",
    description: "Register for NLDS 2026 — the flagship leadership conference by AIESEC in Sri Lanka.",
    path: "/register",
});

/**
 * Registration page.
 * Form fields and submission logic to be defined by Del VPs.
 * This page will be updated when registration details are confirmed.
 */
export default function RegisterPage() {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-black">
            <Container>
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-12">
                        <SectionHeading
                            eyebrow="Delegate Registration"
                            title="Register for NLDS 2026"
                            subtitle="Fill in your details to secure your spot at the most impactful leadership conference in Sri Lanka."
                        />
                    </div>

                    {/* Registration form placeholder */}
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <p className="text-white/40 text-sm leading-relaxed">
                            Registration form coming soon.<br />
                            Details will be sent by the Delegate VPs.
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
}
