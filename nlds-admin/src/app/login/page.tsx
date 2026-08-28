"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === "loading") return;

        setError(null);
        setStatus("loading");

        try {
            const res = await fetch("/api/admin/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Authentication failed.");
                setStatus("idle");
                return;
            }

            setStatus("success");
            router.push("/dashboard");
        } catch {
            setError("Network error. Try again.");
            setStatus("idle");
        }
    };

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center px-4">
            <div className="w-full max-w-[380px]">

                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-system mb-3">NLDS 2026</p>
                    <h1 className="font-display text-4xl tracking-widest text-text-main mb-1">
                        MISSION CONTROL
                    </h1>
                    <p className="text-meta">Admin Access</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {error && (
                        <div className="border border-[var(--border-red)] bg-[rgba(196,30,58,0.06)] px-4 py-3 text-center">
                            <p className="font-mono text-[11px] text-[var(--red)]">{error}</p>
                        </div>
                    )}

                    <div>
                        <label className="label-classified block mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            disabled={status !== "idle"}
                            required
                            className="admin-input"
                            placeholder="agent@aiesec.lk"
                        />
                    </div>

                    <div>
                        <label className="label-classified block mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            disabled={status !== "idle"}
                            required
                            className="admin-input"
                            style={{ fontFamily: 'var(--font-mono)' }}
                            placeholder="••••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status !== "idle"}
                        className="btn-primary w-full"
                        style={{ height: 42, marginTop: 8 }}
                    >
                        {status === "loading" ? "AUTHENTICATING..." : "AUTHENTICATE"}
                    </button>
                </form>

                <p className="text-system text-center mt-10">
                    Unauthorized access is logged.
                </p>
            </div>
        </div>
    );
}
