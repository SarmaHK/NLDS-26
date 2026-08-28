"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
}

export default function SidebarLink({ href, icon: Icon, label }: SidebarLinkProps) {
    const pathname = usePathname();

    // Basic active check: if pathname starts with href, or exact match
    const isActive = pathname === href || pathname?.startsWith(`${href}/`);

    const navLinkBase = "flex items-center gap-3 px-3 py-[7px] text-[13px] transition-colors rounded-sm";
    const navLinkIdle = `${navLinkBase} text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--surface-2)]`;
    const navLinkActive = `${navLinkBase} text-[var(--red)] bg-[rgba(196,30,58,0.06)] border border-[rgba(196,30,58,0.2)] font-medium`;

    return (
        <Link href={href} className={isActive ? navLinkActive : navLinkIdle}>
            <Icon size={15} strokeWidth={isActive ? 2 : 1.5} className={isActive ? 'text-[var(--red)]' : ''} />
            <span>{label}</span>
        </Link>
    );
}
