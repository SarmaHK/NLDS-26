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
    badge?: number;
}

export default function SidebarLink({ href, iconName, label, badge }: SidebarLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href || pathname?.startsWith(`${href}/`);

    const navLinkBase = "flex items-center gap-3.5 px-4 py-[11px] text-[13px] font-medium transition-all rounded-[14px] outline-none select-none";

    // Extremely refined Dribbble-like colors. Very dim for idle to feel flat, stark bold background for active.
    const navLinkIdle = `${navLinkBase} text-[var(--text-dim)] hover:text-white hover:bg-[rgba(255,255,255,0.03)]`;
    const navLinkActive = `${navLinkBase} text-white bg-[var(--red)] shadow-sm`;

    const Icon = ICON_MAP[iconName];

    return (
        <Link href={href} className={isActive ? navLinkActive : navLinkIdle} style={{ display: 'flex', width: '100%' }}>
            {Icon && <Icon size={17} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-white' : 'text-[var(--text-ghost)]'} />}
            <span className="flex-1 text-left tracking-wide truncate pr-2">{label}</span>
            {badge !== undefined && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full shrink-0 ${isActive ? 'bg-black/20 text-white' : 'bg-[rgba(255,255,255,0.05)] text-[var(--text-ghost)]'}`}>
                    {badge}
                </span>
            )}
        </Link>
    );
}
