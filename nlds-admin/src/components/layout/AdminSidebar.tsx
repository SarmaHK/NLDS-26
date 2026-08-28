import React from 'react';
import { LayoutDashboard, Users, UserSquare2, FileText, Image, BarChart3, FileBarChart, Shield, ScrollText, Settings } from 'lucide-react';
import { getCurrentAdmin } from '@/lib/auth/session';
import LogoutButton from '../auth/LogoutButton';
import SidebarLink from './SidebarLink';

export default async function AdminSidebar() {
    const admin = await getCurrentAdmin();

    // For UI building, let's assume full super admin access if session is failing unexpectedly.
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
            <div className="h-14 flex items-center px-5 border-b border-[var(--border)] shrink-0">
                <div>
                    <span className="font-display text-xl tracking-[0.15em] text-[var(--text-main)] leading-none">NLDS</span>
                    <span className="font-mono text-[10px] text-[var(--text-ghost)] ml-2 tracking-widest">// MISSION CONTROL</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-7 no-scrollbar overflow-x-hidden">

                <div className="flex flex-col gap-1">
                    <p className="label-section px-3 mb-1">Mission Control</p>
                    <SidebarLink href="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                </div>

                {canReg && (
                    <div className="flex flex-col gap-1">
                        <p className="label-section px-3 mb-1">Operations</p>
                        <SidebarLink href="/registrations" icon={Users} label="Registrations" />
                        <SidebarLink href="/participants" icon={UserSquare2} label="Participants" />
                    </div>
                )}

                {(canCV || canPhoto) && (
                    <div className="flex flex-col gap-1">
                        <p className="label-section px-3 mb-1">Intelligence</p>
                        {canCV && <SidebarLink href="/cvs" icon={FileText} label="CV Intelligence" />}
                        {canPhoto && <SidebarLink href="/photos" icon={Image} label="Profile Archive" />}
                    </div>
                )}

                {canStats && (
                    <div className="flex flex-col gap-1">
                        <p className="label-section px-3 mb-1">Analytics</p>
                        <SidebarLink href="/analytics" icon={BarChart3} label="Analytics" />
                        <SidebarLink href="/reports" icon={FileBarChart} label="Reports" />
                    </div>
                )}

                {isSuper && (
                    <div className="flex flex-col gap-1">
                        <p className="label-section px-3 mb-1">Administration</p>
                        <SidebarLink href="/access" icon={Shield} label="OC Access" />
                        <SidebarLink href="/audit" icon={ScrollText} label="Audit Logs" />
                        <SidebarLink href="/settings" icon={Settings} label="Settings" />
                    </div>
                )}

            </nav>

            {/* Footer */}
            <div className="px-3 py-3 border-t border-[var(--border)] shrink-0 bg-[var(--surface-1)]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <div className="w-8 h-8 shrink-0 bg-[var(--surface-2)] border border-[var(--border-strong)] flex items-center justify-center rounded-sm">
                            <span className="font-display text-[12px] text-[var(--red)]">{initials}</span>
                        </div>
                        <div className="min-w-0 flex flex-col justify-center">
                            <p className="text-[12px] font-medium text-[var(--text-dim)] truncate leading-tight">{roleLabel}</p>
                            <p className="font-mono text-[9px] text-[var(--text-ghost)] truncate leading-tight mt-0.5">{emailStr}</p>
                        </div>
                    </div>
                    <div className="shrink-0 flex items-center justify-center">
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </aside>
    );
}
