"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    {/* Slide-in panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 z-50 h-full w-[min(320px,100vw)] bg-zinc-950 border-l border-white/10 flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <span className="text-white font-bold text-lg">
                                NLDS <span className="text-[var(--color-accent)]">2026</span>
                            </span>
                            <button
                                onClick={onClose}
                                className="p-2 text-white/70 hover:text-white"
                                aria-label="Close menu"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <nav className="flex flex-col py-6 px-4 gap-1 flex-1">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className={cn(
                                            "block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200",
                                            link.isCTA
                                                ? "mt-4 text-center bg-white text-black hover:bg-[var(--color-accent)] hover:text-white"
                                                : "text-white/70 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
