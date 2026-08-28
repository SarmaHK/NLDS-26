import React from 'react';
import Link from 'next/link';
import { mockDashboardStats, mockRegistrations, mockDailyRegistrations } from '@/data/mock';
import { PageHeader, SectionHeader, StatusBadge } from '@/components/ui';

export default function DashboardPage() {
    const stats = [
        { label: 'Total', value: mockDashboardStats.total, color: 'var(--text)' },
        { label: 'Submitted', value: mockDashboardStats.submitted, color: 'var(--status-submitted)' },
        { label: 'Under Review', value: mockDashboardStats.underReview, color: 'var(--status-review)' },
        { label: 'Accepted', value: mockDashboardStats.accepted, color: 'var(--status-accepted)' },
        { label: 'Rejected', value: mockDashboardStats.rejected, color: 'var(--status-rejected)' },
        { label: 'Cancelled', value: mockDashboardStats.cancelled, color: 'var(--status-cancelled)' },
    ];

    const recent = mockRegistrations.slice(0, 8);
    const maxBar = Math.max(...mockDailyRegistrations.map(d => d.count));

    return (
        <div className="space-y-[var(--section-gap)] animate-fade-in-up max-w-[1200px]">
            <PageHeader title="DASHBOARD" description="NLDS 2026 operational overview." />

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[var(--card-gap)]">
                {stats.map((s, i) => (
                    <div key={i} className="card-stat">
                        <p className="text-system">{s.label}</p>
                        <p className="font-display text-[36px] leading-none" style={{ color: s.color, fontVariantNumeric: 'tabular-nums' }}>
                            {s.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Activity Chart */}
            <div>
                <SectionHeader title="Registration Activity (14 Days)" />
                <div className="card" style={{ padding: '24px' }}>
                    <div className="flex items-end gap-[6px]" style={{ height: 140 }}>
                        {mockDailyRegistrations.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <span className="text-[9px] font-mono text-[var(--text-ghost)]">{d.count}</span>
                                <div
                                    className="w-full bg-[var(--red)] transition-all"
                                    style={{ height: `${(d.count / maxBar) * 100}px`, opacity: 0.7 + (d.count / maxBar) * 0.3 }}
                                />
                                <span className="text-[8px] font-mono text-[var(--text-ghost)] whitespace-nowrap">{d.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Registrations */}
            <div>
                <SectionHeader title="Recent Registrations" action={
                    <Link href="/registrations" className="btn-ghost">View All</Link>
                } />
                <div className="border border-[var(--border)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Reference</th>
                                    <th>Participant</th>
                                    <th>Entity</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Submitted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recent.map(r => (
                                    <tr key={r.id}>
                                        <td><Link href={`/registrations/${r.id}`} className="font-mono text-[12px] text-[var(--text-muted)] hover:text-[var(--red)] transition-colors">{r.referenceCode}</Link></td>
                                        <td className="text-[var(--text)]">{r.participantName}</td>
                                        <td className="text-[var(--text-muted)]">{r.entity}</td>
                                        <td><span className="text-meta">{r.participantType}</span></td>
                                        <td><StatusBadge status={r.status} /></td>
                                        <td className="font-mono text-[12px] text-[var(--text-ghost)]">{new Date(r.submittedAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
