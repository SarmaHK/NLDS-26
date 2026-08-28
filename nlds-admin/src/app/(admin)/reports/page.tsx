import React from 'react';
import { PageHeader } from '@/components/ui';
import { Download, FileBarChart } from 'lucide-react';

export default function ReportsPage() {
    const reports = [
        { title: 'Registration Summary', desc: 'Complete dump of all registration data including status and intel.', type: 'CSV' },
        { title: 'Participant Roster', desc: 'Filtered list of all accepted participants for logistical planning.', type: 'CSV' },
        { title: 'Entity Distribution', desc: 'Aggregated metrics organized by LC/University.', type: 'PDF' },
        { title: 'Status Report', desc: 'Delegates pending review or missing information.', type: 'CSV' },
    ];

    return (
        <div className="space-y-[var(--section-gap)] animate-fade-in-up max-w-[1200px]">
            <PageHeader title="REPORTS" description="Generate operational summaries and data exports." />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--card-gap)]">
                {reports.map((r, i) => (
                    <div key={i} className="card flex flex-col hover:border-[var(--red)] transition-colors">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center shrink-0">
                                <FileBarChart size={18} className="text-[var(--text-ghost)]" />
                            </div>
                            <span className="badge badge-submitted">{r.type}</span>
                        </div>
                        <div>
                            <h3 className="text-card-title mb-1">{r.title}</h3>
                            <p className="text-body min-h-[48px]">{r.desc}</p>
                        </div>
                        <div className="flex gap-3 mt-6 pt-4 border-t border-[var(--border)]">
                            <button className="btn-secondary flex-1">Generate</button>
                            <button className="btn-primary flex items-center justify-center gap-2" style={{ padding: '0 16px' }}>
                                <Download size={14} /> Download
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
