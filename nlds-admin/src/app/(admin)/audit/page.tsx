"use client";

import React, { useState } from 'react';
import { PageHeader, EmptyState, Pagination, FilterSelect } from '@/components/ui';
import { mockAuditLogs } from '@/data/mock';

const ACTION_OPTIONS = [
    { value: 'STATUS_UPDATED', label: 'Status Updated' },
    { value: 'ADMIN_CREATED', label: 'Admin Created' },
    { value: 'PERMISSION_GRANTED', label: 'Permission Granted' },
    { value: 'ADMIN_DEACTIVATED', label: 'Admin Deactivated' },
];

export default function AuditLogsPage() {
    const [actionFilter, setActionFilter] = useState('');
    const [page, setPage] = useState(1);
    const PER_PAGE = 15;

    const filtered = mockAuditLogs.filter(log => {
        if (actionFilter && log.action !== actionFilter) return false;
        return true;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const currentPage = Math.min(page, totalPages);
    const pageData = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    return (
        <div className="space-y-[var(--section-gap)] animate-fade-in-up max-w-[1200px]">
            <PageHeader title="AUDIT LOGS" description="System activity and administrative history." />

            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
                <div className="flex gap-2">
                    <FilterSelect label="Action Type" value={actionFilter} onChange={v => { setActionFilter(v); setPage(1); }} options={ACTION_OPTIONS} />
                    {actionFilter && <button onClick={() => { setActionFilter(''); setPage(1); }} className="btn-ghost text-[var(--red)]">Clear</button>}
                </div>
                <p className="text-meta">{filtered.length} log(s) found</p>
            </div>

            {filtered.length > 0 ? (
                <>
                    <div className="border border-[var(--border)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Timestamp</th>
                                        <th>Actor</th>
                                        <th>Action</th>
                                        <th>Target</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map(log => (
                                        <tr key={log.id}>
                                            <td className="font-mono text-[11px] text-[var(--text-ghost)] whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</td>
                                            <td>
                                                <span className="text-[12px] text-[var(--text)]">{log.actorEmail}</span>
                                                <span className={`block font-mono text-[9px] mt-0.5 ${log.actorRole === 'SUPER_ADMIN' ? 'text-[var(--red)]' : 'text-[var(--text-muted)]'}`}>
                                                    {log.actorRole}
                                                </span>
                                            </td>
                                            <td><span className="font-mono text-[10px] text-[var(--text-dim)] px-2 py-1 bg-[var(--surface-2)] border border-[var(--border)]">{log.action}</span></td>
                                            <td>
                                                <span className="text-[11px] text-[var(--text-muted)]">{log.targetType}</span>
                                                <span className="block font-mono text-[10px] text-[var(--text-ghost)] mt-0.5">{log.targetId}</span>
                                            </td>
                                            <td className="text-[12px] text-[var(--text-dim)] max-w-[300px] truncate" title={log.details}>{log.details}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
                </>
            ) : (
                <EmptyState title="No Logs Found" description="No audit data matches your current filters." />
            )}
        </div>
    );
}
