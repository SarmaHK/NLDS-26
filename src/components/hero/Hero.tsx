import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Countdown from "@/components/ui/Countdown";
import { eventData } from "@/data/event";

/**
 * Hero — full-screen cinematic opening section.
 * Implementation: Phase 4 (Core UI) → Phase 6 (Animation).
 */
export default function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
        >
            {/* Background — to be replaced with cinematic imagery/video */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black" />

            <Container className="relative z-10 py-32 text-center">
                {/* Eyebrow */}
                <p className="text-[var(--color-accent)] text-xs uppercase tracking-[0.3em] font-semibold mb-6">
                    AIESEC in Sri Lanka presents
                </p>

                {/* Title */}
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-none mb-6">
                    NLDS<br />
                    <span className="text-[var(--color-accent)]">2026</span>
                </h1>

                {/* Tagline */}
                <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                    {eventData.tagline}
                </p>

                {/* Countdown */}
                <div className="mb-12">
                    <Countdown targetDate={eventData.startDate} />
                </div>

                {/* CTAs */}
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <Button href="/register" size="lg" variant="primary">
                        Register Now
                    </Button>
                    <Button href="/store" size="lg" variant="ghost">
                        Buy Merch
                    </Button>
                </div>
            </Container>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
                <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
            </div>
        </section>
    );
}
