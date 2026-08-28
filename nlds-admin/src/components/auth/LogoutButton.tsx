"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
    const router = useRouter();
    const handleLogout = async () => {
        await fetch("/api/admin/auth/logout", { method: "POST" });
        router.push("/login");
    };

    return (
        <button
            onClick={handleLogout}
            className="p-1.5 text-[var(--text-ghost)] hover:text-[var(--red)] transition-colors cursor-pointer"
            title="Logout"
        >
            <LogOut size={14} strokeWidth={1.5} />
        </button>
    );
}
