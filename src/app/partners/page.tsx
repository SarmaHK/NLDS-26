import { createMetadata } from "@/lib/metadata";
import PartnersSection from "@/components/sections/PartnersSection";

export const metadata = createMetadata({
    title: "Partners",
    description: "Meet the organizations and sponsors supporting NLDS 2026.",
    path: "/partners",
});

export default function PartnersPage() {
    return (
        <div className="pt-20">
            <PartnersSection />
        </div>
    );
}
