import React from 'react';
import { getCurrentAdmin } from '@/lib/auth/session';
import LogoutButton from '../auth/LogoutButton';
import SidebarLink, { IconName } from './SidebarLink';
import { Search, ArrowLeft, MoreHorizontal, CloudUpload } from 'lucide-react';

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
        <aside className="w-[300px] h-screen bg-[var(--surface-1)] border-r border-[var(--border)] flex flex-col fixed top-0 left-0 z-20">

            {/* Profile Section */}
            <div className="pt-8 px-8 pb-6 shrink-0 flex items-center justify-between">
                <div className="flex items-center gap-3.5 min-w-0 pr-4">
                    <div className="w-[44px] h-[44px] shrink-0 rounded-full bg-[var(--surface-2)] border border-[rgba(255,255,255,0.05)] flex items-center justify-center relative shadow-sm">
                        <span className="font-display text-[15px] text-[var(--red)] tracking-wider mt-0.5">{initials}</span>
                        <div className="absolute top-0 right-0 w-3 h-3 bg-[#10b981] rounded-full border-2 border-[var(--surface-1)] shadow-sm"></div>
                    </div>
                    <div className="min-w-0 flex flex-col justify-center gap-0.5">
                        <p className="text-[13px] font-semibold text-white truncate capitalize leading-none tracking-wide">{displayName}</p>
                        <p className="font-sans text-[11px] text-[var(--text-ghost)] truncate leading-none tracking-wide">{roleLabel}</p>
                    </div>
                </div>
                <button className="w-[30px] h-[30px] rounded-full bg-[rgba(255,255,255,0.03)] text-[var(--text-ghost)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.08)] hover:text-white transition-all shrink-0 border border-[rgba(255,255,255,0.02)]">
                    <ArrowLeft size={14} strokeWidth={2} />
                </button>
            </div>

            {/* Search Bar */}
            <div className="px-8 pb-6 shrink-0 border-b border-[rgba(255,255,255,0.03)]">
                <div className="h-[42px] rounded-[14px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] flex items-center px-4 gap-3 focus-within:border-[var(--red)] focus-within:bg-[rgba(255,255,255,0.04)] transition-all">
                    <Search size={16} className="text-[var(--text-ghost)]" />
                    <input type="text" placeholder="Search..." className="bg-transparent border-none text-[13px] text-white placeholder-[var(--text-ghost)] w-full outline-none" />
                </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6 stylish-scrollbar">
                <div className="flex flex-col gap-0.5">
                    <SidebarLink href="/dashboard" iconName="LayoutDashboard" label="Dashboard" />
                </div>

                {canReg && (
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center justify-between px-3 mb-1 mt-2">
                            <span className="text-[10px] font-bold text-[var(--text-ghost)] uppercase tracking-[0.15em]">Operations</span>
                            <MoreHorizontal size={14} className="text-[rgba(255,255,255,0.1)]" />
                        </div>
                        <SidebarLink href="/registrations" iconName="Users" label="Registrations" badge={128} />
                        <SidebarLink href="/participants" iconName="UserSquare2" label="Participants" />
                    </div>
                )}

                {(canCV || canPhoto) && (
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center justify-between px-3 mb-1 mt-2">
                            <span className="text-[10px] font-bold text-[var(--text-ghost)] uppercase tracking-[0.15em]">Intelligence</span>
                            <MoreHorizontal size={14} className="text-[rgba(255,255,255,0.1)]" />
                        </div>
                        {canCV && <SidebarLink href="/cvs" iconName="FileText" label="CV Intelligence" />}
                        {canPhoto && <SidebarLink href="/photos" iconName="Image" label="Profile Archive" badge={12} />}
                    </div>
                )}

                {canStats && (
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center justify-between px-3 mb-1 mt-2">
                            <span className="text-[10px] font-bold text-[var(--text-ghost)] uppercase tracking-[0.15em]">Analytics</span>
                            <MoreHorizontal size={14} className="text-[rgba(255,255,255,0.1)]" />
                        </div>
                        <SidebarLink href="/analytics" iconName="BarChart3" label="Analytics" />
                        <SidebarLink href="/reports" iconName="FileBarChart" label="Reports" />
                    </div>
                )}

                {isSuper && (
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center justify-between px-3 mb-1 mt-2">
                            <span className="text-[10px] font-bold text-[var(--text-ghost)] uppercase tracking-[0.15em]">Admin</span>
                            <span className="text-[9px] font-bold text-[var(--red)] uppercase tracking-wider bg-[rgba(196,30,58,0.1)] px-1.5 py-0.5 rounded">Restricted</span>
                        </div>
                        <SidebarLink href="/access" iconName="Shield" label="OC Access" />
                        <SidebarLink href="/audit" iconName="ScrollText" label="Audit Logs" />
                        <SidebarLink href="/settings" iconName="Settings" label="Settings" />
                    </div>
                )}
            </nav>

            {/* Bottom Box */}
            <div className="p-6 shrink-0 bg-gradient-to-t from-[var(--surface-1)] to-transparent border-t border-[rgba(255,255,255,0.02)]">
                <div className="w-full h-[88px] border border-dashed border-[rgba(255,255,255,0.1)] rounded-[20px] bg-[rgba(255,255,255,0.01)] flex flex-col items-center justify-center gap-2 hover:border-[var(--text-ghost)] hover:bg-[rgba(255,255,255,0.03)] transition-all cursor-pointer relative group">
                    <CloudUpload size={20} className="text-[var(--text-ghost)] group-hover:-translate-y-0.5 transition-transform" />
                    <span className="text-[11px] font-medium text-[var(--text-ghost)] group-hover:text-white transition-colors">Secure Transmission</span>

                    <div className="absolute top-2.5 right-2.5 bg-[#0a0a0c] rounded-full p-[3px] border border-[rgba(255,255,255,0.05)] shadow-sm hover:scale-105 transition-transform">
                        <LogoutButton />
                    </div>
                </div>
            </div>

        </aside>
    );
}
