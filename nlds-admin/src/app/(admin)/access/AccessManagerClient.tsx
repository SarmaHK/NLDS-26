"use client";

import React, { useState } from 'react';
import { Shield, Plus, X, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

export type AdminDTO = {
    id: string;
    email: string;
    role: string;
    isActive: boolean;
    lastLoginAt: string | null;
    createdAt: string;
    permissions: string[];
}

const ALL_PERMISSIONS = [
    { id: "VIEW_REGISTRATIONS", label: "View Registrations" },
    { id: "VIEW_PERSONAL_INFO", label: "View Personal Information" },
    { id: "VIEW_AIESEC_INFO", label: "View AIESEC Information" },
    { id: "VIEW_CV", label: "View CVs" },
    { id: "VIEW_PROFILE_PHOTO", label: "View Profile Photos" },
    { id: "UPDATE_STATUS", label: "Update Registration Status" },
    { id: "VIEW_ANALYTICS", label: "View Analytics" },
    { id: "EXPORT_DATA", label: "Export Registration Data" },
    { id: "VIEW_AUDIT_LOGS", label: "View Audit Logs" },
];

export default function AccessManagerClient({ initialAdmins }: { initialAdmins: AdminDTO[] }) {
    const router = useRouter();
    const [showCreate, setShowCreate] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [busyCreate, setBusyCreate] = useState(false);
    const [createError, setCreateError] = useState("");

    const [selected, setSelected] = useState<AdminDTO | null>(null);
    const [localPerms, setLocalPerms] = useState<string[]>([]);
    const [busyPerms, setBusyPerms] = useState(false);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreateError("");
        setBusyCreate(true);
        try {
            const res = await fetch("/api/admin/rbac/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: newEmail, password: newPassword })
            });
            const data = await res.json();
            if (res.ok) {
                setShowCreate(false);
                setNewEmail("");
                setNewPassword("");
                window.location.reload();
            } else {
                setCreateError(data.error || "Failed.");
            }
        } catch { setCreateError("Network error."); }
        setBusyCreate(false);
    };

    const openPerms = (admin: AdminDTO) => {
        if (admin.role === "SUPER_ADMIN") return;
        setSelected(admin);
        setLocalPerms([...admin.permissions]);
    };

    const togglePerm = (id: string) => {
        setLocalPerms(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
    };

    const savePerms = async () => {
        if (!selected) return;
        setBusyPerms(true);
        await fetch("/api/admin/rbac/permissions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ targetId: selected.id, permissions: localPerms })
        });
        setBusyPerms(false);
        setSelected(null);
        window.location.reload();
    };

    const toggleActive = async (admin: AdminDTO) => {
        if (admin.role === "SUPER_ADMIN") return;
        if (!confirm(`${admin.isActive ? 'Deactivate' : 'Activate'} ${admin.email}?`)) return;
        await fetch("/api/admin/rbac/status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ targetId: admin.id, isActive: !admin.isActive })
        });
        window.location.reload();
    };

    return (
        <>
            {/* Action bar */}
            <div className="flex items-center justify-between mb-5">
                <p className="text-meta flex items-center gap-2">
                    <Shield size={14} strokeWidth={1.5} />
                    {initialAdmins.length} registered operator(s)
                </p>
                <button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2">
                    <Plus size={14} /> New OC Member
                </button>
            </div>

            {/* Table */}
            <div className="border border-[var(--border)] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Agent</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Permissions</th>
                                <th>Last Login</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {initialAdmins.map(a => (
                                <tr key={a.id} className={!a.isActive ? 'opacity-40' : ''}>
                                    <td>
                                        <span className="text-[var(--text)]">{a.email}</span>
                                        <span className="block font-mono text-[10px] text-[var(--text-ghost)] mt-0.5">
                                            {a.id.slice(0, 8)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${a.role === 'SUPER_ADMIN' ? 'badge-super' : ''}`}>
                                            {a.role === 'SUPER_ADMIN' ? 'SUPER ADMIN' : 'OC VIEWER'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${a.isActive ? 'badge-active' : 'badge-inactive'}`}>
                                            {a.isActive ? 'ACTIVE' : 'INACTIVE'}
                                        </span>
                                    </td>
                                    <td>
                                        {a.role === "SUPER_ADMIN"
                                            ? <span className="text-meta">All</span>
                                            : <span className="text-meta">{a.permissions.length}</span>
                                        }
                                    </td>
                                    <td className="font-mono text-[12px] text-[var(--text-ghost)]">
                                        {a.lastLoginAt ? new Date(a.lastLoginAt).toLocaleDateString() : '—'}
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        {a.role !== "SUPER_ADMIN" && (
                                            <div className="flex gap-2 justify-end">
                                                <button onClick={() => openPerms(a)} className="btn-ghost">Permissions</button>
                                                <button onClick={() => toggleActive(a)} className="btn-ghost" style={{ color: a.isActive ? 'var(--status-rejected)' : 'var(--status-accepted)' }}>
                                                    {a.isActive ? 'Suspend' : 'Restore'}
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Modal */}
            {showCreate && (
                <div className="modal-overlay">
                    <div className="modal-panel max-w-[400px] p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-card-title">New OC Member</h2>
                            <button onClick={() => setShowCreate(false)} className="text-[var(--text-ghost)] hover:text-[var(--text)]">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleCreate} className="space-y-4">
                            {createError && (
                                <div className="border border-[var(--border-red)] bg-[rgba(196,30,58,0.06)] px-3 py-2">
                                    <p className="font-mono text-[11px] text-[var(--red)]">{createError}</p>
                                </div>
                            )}
                            <div>
                                <label className="label-classified block mb-1.5">Email</label>
                                <input required type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)}
                                    disabled={busyCreate} className="admin-input" placeholder="member@aiesec.lk" />
                            </div>
                            <div>
                                <label className="label-classified block mb-1.5">Password</label>
                                <input required type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                                    disabled={busyCreate} className="admin-input" placeholder="Min. 8 characters"
                                    style={{ fontFamily: 'var(--font-mono)' }} />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowCreate(false)}
                                    className="btn-secondary flex-1" disabled={busyCreate}>Cancel</button>
                                <button type="submit" className="btn-primary flex-1" disabled={busyCreate}>
                                    {busyCreate ? 'Creating...' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Permissions Modal */}
            {selected && (
                <div className="modal-overlay">
                    <div className="modal-panel max-w-[520px] p-6 max-h-[85vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-1">
                            <h2 className="text-card-title">Edit Permissions</h2>
                            <button onClick={() => setSelected(null)} className="text-[var(--text-ghost)] hover:text-[var(--text)]">
                                <X size={18} />
                            </button>
                        </div>
                        <p className="text-meta mb-6">{selected.email}</p>

                        <div className="space-y-2 mb-6">
                            {ALL_PERMISSIONS.map(p => {
                                const active = localPerms.includes(p.id);
                                return (
                                    <label key={p.id}
                                        className={`flex items-center gap-3 px-4 py-3 border cursor-pointer transition-colors
                                            ${active ? 'border-[var(--border-red)] bg-[rgba(196,30,58,0.04)]' : 'border-[var(--border)] hover:border-[var(--border-strong)]'}`}
                                    >
                                        <input type="checkbox" checked={active} onChange={() => togglePerm(p.id)}
                                            className="sr-only" />
                                        <div className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0
                                            ${active ? 'border-[var(--red)] bg-[var(--red)]' : 'border-[var(--text-ghost)]'}`}>
                                            {active && <span className="text-white text-[9px] font-bold leading-none">✓</span>}
                                        </div>
                                        <div>
                                            <span className={`block text-[12px] font-medium ${active ? 'text-[var(--text)]' : 'text-[var(--text-dim)]'}`}>
                                                {p.label}
                                            </span>
                                            <span className="block font-mono text-[9px] text-[var(--text-ghost)] tracking-wider mt-0.5">
                                                {p.id}
                                            </span>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>

                        <div className="flex gap-3 border-t border-[var(--border)] pt-4">
                            <button onClick={() => setSelected(null)} className="btn-secondary flex-1" disabled={busyPerms}>
                                Cancel
                            </button>
                            <button onClick={savePerms} className="btn-primary flex-1 flex items-center justify-center gap-2" disabled={busyPerms}>
                                <Save size={13} /> {busyPerms ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
