"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import Container from "@/components/ui/Container";

/**
 * Delegates page — room allocation search.
 * Logic: same as NLDS 2025 — search by name from a dataset.
 * Data source: to be configured (CSV / Supabase / JSON).
 */
export default function DelegatesPage() {
    const [query, setQuery] = useState("");

    return (
        <div className="min-h-screen pt-24 pb-16 bg-black">
            <Container>
                <div className="max-w-xl mx-auto text-center">
                    <p className="text-[var(--color-accent)] text-xs uppercase tracking-[0.2em] mb-4">
                        Room Allocation
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Find Your Room
                    </h1>
                    <p className="text-white/50 text-sm mb-10">
                        Enter your name to find your room, roommates, and keyholder.
                    </p>

                    {/* Search */}
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                        />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Start typing your name..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[var(--color-accent)]/50 focus:bg-white/8 transition-all duration-300"
                        />
                    </div>

                    {/* Results placeholder */}
                    {query.length > 0 && (
                        <div className="mt-6 p-8 rounded-xl bg-white/5 border border-white/10 text-white/40 text-sm">
                            Room allocation data coming soon.
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}
