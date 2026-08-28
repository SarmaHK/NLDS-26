"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    UserSquare2,
    FileText,
    Image as ImageIcon,
    BarChart3,
    FileBarChart,
    Shield,
    ScrollText,
    Settings
} from 'lucide-react';

const ICON_MAP = {
    LayoutDashboard,
    Users,
    UserSquare2,
    FileText,
    Image: ImageIcon,
    BarChart3,
    FileBarChart,
    Shield,
    ScrollText,
    Settings
};

export type IconName = keyof typeof ICON_MAP;

interface SidebarLinkProps {
    href: string;
    iconName: IconName;
    label: string;
}

export default function SidebarLink({ href, iconName, label }: SidebarLinkProps) {
    const pathname = usePathname();

    // Basic active check: if pathname starts with href, or exact match
    const isActive = pathname === href || pathname?.startsWith(`${href}/`);

    const navLinkBase = "flex items-center gap-3 px-3 py-2.5 text-[13px] transition-colors rounded-sm";
    const navLinkIdle = `${navLinkBase} text-[var(--text-muted)] hover:text-[var(--text-dim)] hover:bg-[var(--surface-2)]`;
    const navLinkActive = `${navLinkBase} text-[var(--text-main)] bg-[rgba(196,30,58,0.12)] border-l-2 border-[var(--red)] font-medium`;

    const Icon = ICON_MAP[iconName];

    return (
        <Link href={href} className={isActive ? navLinkActive : navLinkIdle}>
            {Icon && <Icon size={16} strokeWidth={isActive ? 2 : 1.5} className={isActive ? 'text-[var(--red)]' : 'text-[var(--text-ghost)]'} />}
            <span>{label}</span>
        </Link>
    );
}
