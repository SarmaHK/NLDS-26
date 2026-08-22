import { createMetadata } from "@/lib/metadata";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export const metadata = createMetadata({
    title: "Merch Store",
    description: "Shop the official NLDS 2026 merchandise.",
    path: "/store",
});

/**
 * Merch store page.
 * Product data and cart logic to be implemented in Phase 5.
 */
export default function StorePage() {
    return (
        <div className="min-h-screen pt-24 pb-16 bg-black">
            <Container>
                <div className="text-center mb-16">
                    <SectionHeading
                        eyebrow="Official Store"
                        title="NLDS 2026 Merch"
                        subtitle="Carry the NLDS spirit everywhere you go."
                    />
                </div>

                {/* Products grid — placeholder */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="p-6 rounded-2xl bg-white/5 border border-white/10"
                        >
                            <div className="aspect-square rounded-xl bg-white/5 mb-4" />
                            <p className="text-white font-medium">Coming Soon</p>
                            <p className="text-white/40 text-sm mt-1">Details will be announced</p>
                            <Button className="mt-4 w-full" variant="ghost" size="sm" disabled>
                                Add to Cart
                            </Button>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
