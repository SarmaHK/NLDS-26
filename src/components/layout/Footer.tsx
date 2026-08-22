import Link from "next/link";
import { SOCIAL_LINKS, SITE_FULL_NAME } from "@/lib/constants";
import { navLinks } from "@/data/navigation";

const socialLinks = [
    {
        href: SOCIAL_LINKS.instagram,
        label: "Instagram",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        ),
    },
    {
        href: SOCIAL_LINKS.linkedin,
        label: "LinkedIn",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        href: SOCIAL_LINKS.facebook,
        label: "Facebook",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
        ),
    },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-zinc-950 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <p className="text-white font-bold text-2xl tracking-tight">
                            NLDS <span className="text-[var(--color-accent)]">2026</span>
                        </p>
                        <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                            {SITE_FULL_NAME} — organized by AIESEC in Sri Lanka.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            {socialLinks.map((s) => (
                                <Link
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    {s.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-4">
                        <p className="text-white/30 text-xs uppercase tracking-widest font-medium">
                            Navigation
                        </p>
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/50 hover:text-white text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* AIESEC */}
                    <div className="space-y-4">
                        <p className="text-white/30 text-xs uppercase tracking-widest font-medium">
                            Organized by
                        </p>
                        <p className="text-white/70 text-sm">AIESEC in Sri Lanka</p>
                        <p className="text-white/40 text-xs leading-relaxed">
                            AIESEC is a global platform for young people to explore and develop their leadership potential.
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-white/30 text-xs">
                        © {year} NLDS 2026. All rights reserved.
                    </p>
                    <p className="text-white/20 text-xs">
                        Dream Bigger, Achieve Together.
                    </p>
                </div>
            </div>
        </footer>
    );
}
