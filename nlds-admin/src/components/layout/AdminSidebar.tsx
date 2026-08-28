import React from 'react';
import { getCurrentAdmin } from '@/lib/auth/session';
import LogoutButton from '../auth/LogoutButton';
import SidebarLink, { IconName } from './SidebarLink';

interface NavSection {
    title: string;
    links: { href: string; iconName: IconName; label: string }[];
}

export default async function AdminSidebar() {
    const admin = await getCurrentAdmin();

    const isSuper = admin ? admin.role === "SUPER_ADMIN" : true;
    const perms = admin ? admin.permissions : [];

    const canReg = isSuper || perms.includes("VIEW_REGISTRATIONS");
    const canCV = isSuper || perms.includes("VIEW_CV");
    const canPhoto = isSuper || perms.includes("VIEW_PROFILE_PHOTO");
    const canStats = isSuper || perms.includes("VIEW_ANALYTICS");

    const roleLabel = isSuper ? "Super Admin" : "OC Viewer";
    const initials = isSuper ? "SA" : "OC";
    const emailStr = admin ? admin.email : 'local@dev';

    return (
        <aside className="w-[var(--sidebar-w)] h-screen bg-[var(--surface-1)] border-r border-[var(--border)] flex flex-col fixed top-0 left-0 z-20 overflow-hidden">

            {/* Brand */}
            <div className="h-16 flex items-center px-6 border-b border-[var(--border)] shrink-0">
                <div className="flex items-baseline">
                    <span className="font-display text-2xl tracking-[0.15em] text-[var(--text-main)] leading-none mt-1">NLDS</span>
                    <span className="font-mono text-[10px] text-[var(--text-ghost)] ml-2 tracking-widest">// MISSION CONTROL</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-8 no-scrollbar overflow-x-hidden">

                <div className="flex flex-col gap-1.5">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-ghost)] px-2 mb-2">Platform</p>
                    <SidebarLink href="/dashboard" iconName="LayoutDashboard" label="Dashboard" />
                </div>

                {canReg && (
                    <div className="flex flex-col gap-1.5">
                        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-ghost)] px-2 mb-2">Operations</p>
                        <SidebarLink href="/registrations" iconName="Users" label="Registrations" />
                        <SidebarLink href="/participants" iconName="UserSquare2" label="Participants" />
                    </div>
                )}

                {(canCV || canPhoto) && (
                    <div className="flex flex-col gap-1.5">
                        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-ghost)] px-2 mb-2">Intelligence</p>
                        {canCV && <SidebarLink href="/cvs" iconName="FileText" label="CV Intelligence" />}
                        {canPhoto && <SidebarLink href="/photos" iconName="Image" label="Profile Archive" />}
                    </div>
                )}

                {canStats && (
                    <div className="flex flex-col gap-1.5">
                        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-ghost)] px-2 mb-2">Analytics</p>
                        <SidebarLink href="/analytics" iconName="BarChart3" label="Analytics" />
                        <SidebarLink href="/reports" iconName="FileBarChart" label="Reports" />
                    </div>
                )}

                {isSuper && (
                    <div className="flex flex-col gap-1.5">
                        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-ghost)] px-2 mb-2">Administration</p>
                        <SidebarLink href="/access" iconName="Shield" label="OC Access" />
                        <SidebarLink href="/audit" iconName="ScrollText" label="Audit Logs" />
                        <SidebarLink href="/settings" iconName="Settings" label="Settings" />
                    </div>
                )}

            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-[var(--border)] shrink-0 bg-[var(--surface-1)]">
                <div className="flex items-center justify-between bg-[var(--surface-2)] border border-[var(--border-strong)] p-2 rounded-sm">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 shrink-0 bg-[var(--surface-1)] border border-[var(--border-strong)] flex items-center justify-center rounded-sm">
                            <span className="font-display text-[12px] text-[var(--red)]">{initials}</span>
                        </div>
                        <div className="min-w-0 flex flex-col justify-center">
                            <p className="text-[12px] font-medium text-[var(--text-dim)] truncate leading-none mb-1">{roleLabel}</p>
                            <p className="font-mono text-[9px] text-[var(--text-ghost)] truncate leading-none">{emailStr}</p>
                        </div>
                    </div>
                    <div className="shrink-0 pl-2 border-l border-[var(--border)] flex items-center justify-center">
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </aside>
    );
}
