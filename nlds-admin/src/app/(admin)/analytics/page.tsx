import React from 'react';
import { PageHeader, SectionHeader } from '@/components/ui';
import { mockDailyRegistrations, mockEntityDistribution, mockDashboardStats } from '@/data/mock';

export default function AnalyticsPage() {
    const maxBar = Math.max(...mockDailyRegistrations.map(d => d.count));
    const maxEntity = Math.max(...mockEntityDistribution.map(d => d.count));

    return (
        <div className="space-y-[var(--section-gap)] animate-fade-in-up max-w-[1200px]">
            <PageHeader title="ANALYTICS" description="Operational statistics and distribution metrics." />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--section-gap)]">

                {/* Left Column */}
                <div className="space-y-[var(--section-gap)]">
                    <section>
                        <SectionHeader title="Registration Growth (14 Days)" action={<button className="btn-ghost">Export PNG</button>} />
                        <div className="card h-[280px] flex items-end gap-2 pt-8">
                            {mockDailyRegistrations.map((d, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                    <span className="text-[10px] font-mono text-[var(--text-ghost)] group-hover:text-[var(--text)] transition-colors">{d.count}</span>
                                    <div
                                        className="w-full bg-[var(--surface-3)] border border-[var(--border)] group-hover:bg-[var(--red)] group-hover:border-[var(--red)] transition-all"
                                        style={{ height: `${(d.count / (maxBar || 1)) * 180}px` }}
                                    />
                                    <span className="text-[9px] font-mono text-[var(--text-muted)] whitespace-nowrap -rotate-45 mt-2 origin-top-left group-hover:text-[var(--red)] transition-colors">{d.date}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <SectionHeader title="Status Distribution" />
                        <div className="grid grid-cols-2 gap-[var(--card-gap)]">
                            <div className="card-stat">
                                <p className="text-system">ACCEPTED</p>
                                <p className="font-display text-4xl" style={{ color: 'var(--status-accepted)' }}>{mockDashboardStats.accepted}</p>
                            </div>
                            <div className="card-stat">
                                <p className="text-system">REJECTED</p>
                                <p className="font-display text-4xl" style={{ color: 'var(--status-rejected)' }}>{mockDashboardStats.rejected}</p>
                            </div>
                            <div className="card-stat">
                                <p className="text-system">UNDER REVIEW</p>
                                <p className="font-display text-4xl" style={{ color: 'var(--status-review)' }}>{mockDashboardStats.underReview}</p>
                            </div>
                            <div className="card-stat">
                                <p className="text-system">SUBMITTED</p>
                                <p className="font-display text-4xl" style={{ color: 'var(--status-submitted)' }}>{mockDashboardStats.submitted}</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="space-y-[var(--section-gap)]">
                    <section>
                        <SectionHeader title="Entity Distribution" action={<button className="btn-ghost">Export PNG</button>} />
                        <div className="card">
                            <div className="space-y-4">
                                {mockEntityDistribution.map(d => (
                                    <div key={d.entity}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[12px] font-medium text-[var(--text)]">{d.entity}</span>
                                            <span className="font-mono text-[11px] text-[var(--text-dim)]">{d.count}</span>
                                        </div>
                                        <div className="w-full h-2 bg-[var(--surface-2)] overflow-hidden">
                                            <div
                                                className="h-full bg-[var(--text-muted)] group-hover:bg-[var(--text)] transition-all"
                                                style={{ width: `${(d.count / (maxEntity || 1)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
}
