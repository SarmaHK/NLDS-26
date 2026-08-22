"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    isScrolled
                        ? "bg-black/80 backdrop-blur-md border-b border-white/10"
                        : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 shrink-0">
                            <span className="text-white font-bold text-xl tracking-tight">
                                NLDS<span className="text-[var(--color-accent)]"> 2026</span>
                            </span>
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navLinks
                                .filter((l) => !l.isCTA)
                                .map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-200 rounded-md hover:bg-white/5"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                        </nav>

                        {/* CTA + Hamburger */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="/register"
                                className="hidden lg:inline-flex items-center px-5 py-2 text-sm font-semibold text-black bg-white rounded-full hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300"
                            >
                                Register
                            </Link>
                            <button
                                onClick={() => setMenuOpen(true)}
                                className="lg:hidden p-2 text-white/70 hover:text-white"
                                aria-label="Open navigation menu"
                            >
                                <Menu size={22} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
}
