import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, FileText, Image, BarChart3, Shield, ScrollText } from 'lucide-react';
import { getCurrentAdmin } from '@/lib/auth/session';
import LogoutButton from '../auth/LogoutButton';
import { redirect } from 'next/navigation';

const navLinkBase = "flex items-center gap-3 px-3 py-[7px] text-[13px] transition-colors";
const navLinkIdle = `${navLinkBase} text-[var(--text-muted)] hover:text-[var(--text-dim)] hover:bg-[var(--surface-2)]`;

export default async function AdminSidebar() {
    const admin = await getCurrentAdmin();
    if (!admin) redirect('/login');

    const isSuper = admin.role === "SUPER_ADMIN";
    const perms = admin.permissions;

    const canReg = isSuper || perms.includes("VIEW_REGISTRATIONS");
    const canCV = isSuper || perms.includes("VIEW_CV");
    const canPhoto = isSuper || perms.includes("VIEW_PROFILE_PHOTO");
    const canStats = isSuper || perms.includes("VIEW_ANALYTICS");

    const roleLabel = isSuper ? "Super Admin" : "OC Viewer";
    const initials = isSuper ? "SA" : "OC";

    return (
        <aside className="w-[var(--sidebar-w)] h-screen bg-[var(--surface-1)] border-r border-[var(--border)] flex flex-col fixed top-0 left-0 z-20">

            {/* Brand */}
            <div className="h-14 flex items-center px-5 border-b border-[var(--border)] shrink-0">
                <div>
                    <span className="font-display text-xl tracking-[0.15em] text-[var(--text-main)] leading-none">NLDS</span>
                    <span className="font-mono text-[10px] text-[var(--text-ghost)] ml-2 tracking-widest">// MISSION CONTROL</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-6 no-scrollbar">

                <div>
                    <p className="label-section px-3 mb-2">Overview</p>
                    <Link href="/dashboard" className={navLinkIdle}>
                        <LayoutDashboard size={15} strokeWidth={1.5} />
                        <span>Dashboard</span>
                    </Link>
                </div>

                {canReg && (
                    <div>
                        <p className="label-section px-3 mb-2">Operations</p>
                        <Link href="/registrations" className={navLinkIdle}>
                            <Users size={15} strokeWidth={1.5} />
                            <span>Registrations</span>
                        </Link>
                    </div>
                )}

                {(canCV || canPhoto) && (
                    <div>
                        <p className="label-section px-3 mb-2">Files</p>
                        {canCV && (
                            <Link href="/cvs" className={navLinkIdle}>
                                <FileText size={15} strokeWidth={1.5} />
                                <span>CVs</span>
                            </Link>
                        )}
                        {canPhoto && (
                            <Link href="/photos" className={navLinkIdle}>
                                <Image size={15} strokeWidth={1.5} />
                                <span>Photos</span>
                            </Link>
                        )}
                    </div>
                )}

                {canStats && (
                    <div>
                        <p className="label-section px-3 mb-2">Analytics</p>
                        <Link href="/analytics" className={navLinkIdle}>
                            <BarChart3 size={15} strokeWidth={1.5} />
                            <span>Reports</span>
                        </Link>
                    </div>
                )}

                {isSuper && (
                    <div>
                        <p className="label-section px-3 mb-2">Administration</p>
                        <Link href="/access" className={navLinkIdle}>
                            <Shield size={15} strokeWidth={1.5} />
                            <span>OC Access</span>
                        </Link>
                        <Link href="/audit" className={navLinkIdle}>
                            <ScrollText size={15} strokeWidth={1.5} />
                            <span>Audit Logs</span>
                        </Link>
                    </div>
                )}

            </nav>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-[var(--border)] shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 shrink-0 bg-[var(--surface-2)] border border-[var(--border-strong)] flex items-center justify-center rounded-sm">
                            <span className="font-display text-[10px] text-[var(--red)]">{initials}</span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-[12px] font-medium text-[var(--text-dim)] truncate">{roleLabel}</p>
                            <p className="font-mono text-[9px] text-[var(--text-ghost)] truncate">{admin.email}</p>
                        </div>
                    </div>
                    <LogoutButton />
                </div>
            </div>
        </aside>
    );
}
