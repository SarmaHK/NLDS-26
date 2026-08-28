import React from 'react';

const stats = [
    { label: "Total Registrations", value: "842", color: "var(--text)" },
    { label: "Submitted", value: "128", color: "var(--status-submitted)" },
    { label: "Under Review", value: "45", color: "var(--status-review)" },
    { label: "Accepted", value: "620", color: "var(--status-accepted)" },
    { label: "Rejected", value: "24", color: "var(--status-rejected)" },
    { label: "Cancelled", value: "25", color: "var(--status-cancelled)" },
];

const recentRows = [
    { id: "NLDS26-0842", name: "Nethmi Jayawardena", entity: "UoM", status: "SUBMITTED", date: "28 Aug 2026" },
    { id: "NLDS26-0841", name: "Kavindu Dissanayake", entity: "USJ", status: "UNDER_REVIEW", date: "28 Aug 2026" },
    { id: "NLDS26-0840", name: "Dinuka Samarasekara", entity: "SLIIT", status: "ACCEPTED", date: "27 Aug 2026" },
    { id: "NLDS26-0839", name: "Isuri Wickramasinghe", entity: "UoK", status: "ACCEPTED", date: "27 Aug 2026" },
    { id: "NLDS26-0838", name: "Ravindu Perera", entity: "NSBM", status: "REJECTED", date: "26 Aug 2026" },
];

function StatusBadge({ status }: { status: string }) {
    const map: Record<string, string> = {
        SUBMITTED: "badge-submitted",
        UNDER_REVIEW: "badge-review",
        ACCEPTED: "badge-accepted",
        REJECTED: "badge-rejected",
        CANCELLED: "badge-cancelled",
    };
    return (
        <span className={`badge ${map[status] || ''}`}>
            {status.replace('_', ' ')}
        </span>
    );
}

export default function DashboardPage() {
    return (
        <div className="space-y-[var(--section-gap)] animate-fade-in-up max-w-[1200px]">

            {/* Page Header */}
            <div className="pb-6 border-b border-[var(--border)]">
                <h1 className="text-page-title">DASHBOARD</h1>
                <p className="text-meta mt-2">Operations overview — mock data for UI development.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[var(--card-gap)]">
                {stats.map((s, i) => (
                    <div key={i} className="card-stat">
                        <p className="text-system">{s.label}</p>
                        <p className="font-display text-[36px] leading-none tabular" style={{ color: s.color, fontVariantNumeric: 'tabular-nums' }}>
                            {s.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Recent Registrations */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-section-title">Recent Registrations</h2>
                    <button className="btn-ghost">View All</button>
                </div>

                <div className="border border-[var(--border)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Reference</th>
                                    <th>Name</th>
                                    <th>Entity</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentRows.map((row, i) => (
                                    <tr key={i}>
                                        <td className="font-mono text-[12px] text-[var(--text-muted)]">{row.id}</td>
                                        <td className="text-[var(--text)]">{row.name}</td>
                                        <td className="text-[var(--text-muted)]">{row.entity}</td>
                                        <td><StatusBadge status={row.status} /></td>
                                        <td className="font-mono text-[12px] text-[var(--text-ghost)]">{row.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Quick Actions & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--card-gap)]">

                <div className="card">
                    <h3 className="text-section-title mb-5">Quick Protocols</h3>
                    <div className="flex flex-col gap-3">
                        <button className="btn-secondary w-full">Start Review Batch</button>
                        <button className="btn-secondary w-full">Export Registrations</button>
                    </div>
                </div>

                <div className="card">
                    <h3 className="text-section-title mb-5">Recent Activity</h3>
                    <div className="empty-state" style={{ padding: '32px 16px' }}>
                        <p className="text-meta">No recent activity to display.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
