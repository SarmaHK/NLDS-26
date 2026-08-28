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

    const navLinkBase = "flex items-center gap-4 px-4 py-[14px] text-[13px] font-medium transition-colors w-full rounded-2xl";
    const navLinkIdle = `${navLinkBase} text-[var(--text-dim)] hover:text-[var(--text-main)] hover:bg-[var(--surface-2)]`;
    const navLinkActive = `${navLinkBase} text-white bg-[var(--red)] shadow-[0_8px_16px_rgba(196,30,58,0.25)]`;

    const Icon = ICON_MAP[iconName];

    return (
        <Link href={href} className={isActive ? navLinkActive : navLinkIdle}>
            {Icon && <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-white' : 'text-[var(--text-muted)]'} />}
            <span className="flex-1 text-left">{label}</span>
            {badge !== undefined && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isActive ? 'bg-black/20 text-white' : 'bg-[var(--surface-2)] text-[var(--text-ghost)]'}`}>
                    {badge}
                </span>
            )}
        </Link>
    );
}
