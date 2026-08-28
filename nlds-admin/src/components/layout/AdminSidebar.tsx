import React from 'react';
import { getCurrentAdmin } from '@/lib/auth/session';
import LogoutButton from '../auth/LogoutButton';
import SidebarLink, { IconName } from './SidebarLink';
import { Search, ArrowLeft, MoreHorizontal, LayoutDashboard, CloudUpload } from 'lucide-react';

export default async function AdminSidebar() {
    const admin = await getCurrentAdmin();

    // For UI building, assume full super admin access
    const isSuper = admin ? admin.role === "SUPER_ADMIN" : true;
    const perms = admin ? admin.permissions : [];

    const canReg = isSuper || perms.includes("VIEW_REGISTRATIONS");
    const canCV = isSuper || perms.includes("VIEW_CV");
    const canPhoto = isSuper || perms.includes("VIEW_PROFILE_PHOTO");
    const canStats = isSuper || perms.includes("VIEW_ANALYTICS");

    const roleLabel = isSuper ? "Super Admin" : "OC Viewer";
    const initials = isSuper ? "SA" : "OC";
    const displayName = admin ? admin.email.split('@')[0] : 'local.admin';

    return (
        <aside className="w-[280px] h-screen bg-[var(--surface-1)] border-r border-[var(--border)] flex flex-col fixed top-0 left-0 z-20 overflow-hidden">

            {/* Profile Section (Top as requested by layout reference) */}
            <div className="pt-8 px-6 pb-6 shrink-0 flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-[var(--surface-2)] border-2 border-[var(--border-strong)] flex items-center justify-center relative shadow-lg">
                        <span className="font-display text-[16px] text-[var(--red)]">{initials}</span>
                        <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--surface-1)]"></div>
                    </div>
                    <div className="min-w-0 flex flex-col justify-center">
                        <p className="text-[14px] font-medium text-[var(--text)] truncate capitalize">{displayName}</p>
                        <p className="font-sans text-[11px] text-[var(--text-ghost)] truncate">{roleLabel}</p>
                    </div>
                </div>
                {/* Collapse icon mockup */}
                <button className="w-8 h-8 rounded-full bg-green-600/20 text-green-500 flex items-center justify-center hover:bg-green-600/30 transition-colors shrink-0 cursor-not-allowed">
                    <ArrowLeft size={14} strokeWidth={2.5} />
                </button>
            </div>

            {/* Global Search Mockup */}
            <div className="px-6 pb-6 shrink-0">
                <div className="h-[46px] rounded-full bg-[var(--surface-2)] border border-[var(--border)] flex items-center px-4 gap-3 focus-within:border-[var(--red)] transition-colors">
                    <Search size={16} className="text-[var(--text-ghost)]" />
                    <input type="text" placeholder="Search..." className="bg-transparent border-none text-[13px] text-[var(--text)] placeholder-[var(--text-ghost)] w-full outline-none" />
                </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto px-4 pb-8 space-y-8 no-scrollbar overflow-x-hidden">

                <div className="flex flex-col gap-1.5">
                    <SidebarLink href="/dashboard" iconName="LayoutDashboard" label="Dashboard" />
                </div>

                {canReg && (
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between px-4 mb-2 mt-4">
                            <span className="font-sans text-[11px] font-bold text-[var(--text-ghost)]">OPERATIONS</span>
                            <MoreHorizontal size={14} className="text-[var(--text-ghost)]" />
                        </div>
                        <SidebarLink href="/registrations" iconName="Users" label="Registrations" badge={128} />
                        <SidebarLink href="/participants" iconName="UserSquare2" label="Participants" />
                    </div>
                )}

                {(canCV || canPhoto) && (
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between px-4 mb-2 mt-4">
                            <span className="font-sans text-[11px] font-bold text-[var(--text-ghost)]">INTELLIGENCE</span>
                            <MoreHorizontal size={14} className="text-[var(--text-ghost)]" />
                        </div>
                        {canCV && <SidebarLink href="/cvs" iconName="FileText" label="CV Intelligence" />}
                        {canPhoto && <SidebarLink href="/photos" iconName="Image" label="Profile Archive" badge={12} />}
                    </div>
                )}

                {canStats && (
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between px-4 mb-2 mt-4">
                            <span className="font-sans text-[11px] font-bold text-[var(--text-ghost)]">ANALYTICS</span>
                            <MoreHorizontal size={14} className="text-[var(--text-ghost)]" />
                        </div>
                        <SidebarLink href="/analytics" iconName="BarChart3" label="Analytics" />
                        <SidebarLink href="/reports" iconName="FileBarChart" label="Reports" />
                    </div>
                )}

                {isSuper && (
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between px-4 mb-2 mt-4">
                            <span className="font-sans text-[11px] font-bold text-[var(--text-ghost)]">ADMINISTRATION</span>
                            <span className="font-mono text-[9px] text-[var(--red)] uppercase tracking-wider">Restricted</span>
                        </div>
                        <SidebarLink href="/access" iconName="Shield" label="OC Access" />
                        <SidebarLink href="/audit" iconName="ScrollText" label="Audit Logs" />
                        <SidebarLink href="/settings" iconName="Settings" label="Settings" />
                    </div>
                )}
            </nav>

            {/* Bottom Upload / Action Box Area */}
            <div className="p-6 shrink-0 bg-gradient-to-t from-[var(--surface-1)] to-transparent">
                <div className="w-full h-24 border border-dashed border-[var(--border-strong)] rounded-2xl bg-[var(--surface-2)] flex flex-col items-center justify-center gap-2 hover:border-[var(--red)] hover:bg-[rgba(196,30,58,0.05)] transition-colors cursor-pointer relative group">
                    <CloudUpload size={20} className="text-[var(--red)] group-hover:-translate-y-1 transition-transform" />
                    <span className="text-[10px] font-mono text-[var(--text-ghost)]">Secure Transmission</span>

                    {/* Logout Button overlaid on this box or maybe a dedicated logout corner */}
                    <div className="absolute top-2 right-2">
                        <LogoutButton />
                    </div>
                </div>
            </div>

        </aside>
    );
}
