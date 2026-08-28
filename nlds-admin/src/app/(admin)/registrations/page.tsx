"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { mockRegistrations } from '@/data/mock';
import { PageHeader, StatusBadge, SearchInput, FilterSelect, EmptyState, Pagination } from '@/components/ui';

const STATUS_OPTIONS = [
    { value: 'SUBMITTED', label: 'Submitted' },
    { value: 'UNDER_REVIEW', label: 'Under Review' },
    { value: 'ACCEPTED', label: 'Accepted' },
    { value: 'REJECTED', label: 'Rejected' },
    { value: 'CANCELLED', label: 'Cancelled' },
];

const ENTITY_OPTIONS = ['UoM', 'USJ', 'SLIIT', 'UoK', 'NSBM', 'IIT', 'KDU', 'UoJ'].map(e => ({ value: e, label: e }));
const TYPE_OPTIONS = [{ value: 'NEWBIE', label: 'Newbie' }, { value: 'OLDBIE', label: 'Oldbie' }];
const PER_PAGE = 10;

export default function RegistrationsPage() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [entityFilter, setEntityFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        return mockRegistrations.filter(r => {
            if (search && !r.participantName.toLowerCase().includes(search.toLowerCase()) &&
                !r.referenceCode.toLowerCase().includes(search.toLowerCase()) &&
                !r.participantEmail.toLowerCase().includes(search.toLowerCase())) return false;
            if (statusFilter && r.status !== statusFilter) return false;
            if (entityFilter && r.entity !== entityFilter) return false;
            if (typeFilter && r.participantType !== typeFilter) return false;
            return true;
        });
    }, [search, statusFilter, entityFilter, typeFilter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const currentPage = Math.min(page, totalPages);
    const pageData = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    const clearFilters = () => { setSearch(''); setStatusFilter(''); setEntityFilter(''); setTypeFilter(''); setPage(1); };

    return (
        <div className="space-y-[var(--section-gap)] animate-fade-in-up max-w-[1200px]">
            <PageHeader title="REGISTRATIONS" description="Review and manage NLDS 2026 participant registrations." />

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                <SearchInput value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search name, reference, email..." />
                <div className="flex gap-2 flex-wrap">
                    <FilterSelect label="Status" value={statusFilter} onChange={v => { setStatusFilter(v); setPage(1); }} options={STATUS_OPTIONS} />
                    <FilterSelect label="Entity" value={entityFilter} onChange={v => { setEntityFilter(v); setPage(1); }} options={ENTITY_OPTIONS} />
                    <FilterSelect label="Type" value={typeFilter} onChange={v => { setTypeFilter(v); setPage(1); }} options={TYPE_OPTIONS} />
                </div>
                {(search || statusFilter || entityFilter || typeFilter) && (
                    <button onClick={clearFilters} className="btn-ghost text-[var(--red)]">Clear</button>
                )}
            </div>

            {/* Results count */}
            <p className="text-meta">{filtered.length} registration(s) found</p>

            {/* Table */}
            {filtered.length > 0 ? (
                <>
                    <div className="border border-[var(--border)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Reference</th>
                                        <th>Participant</th>
                                        <th>Entity</th>
                                        <th>Type</th>
                                        <th>Submitted</th>
                                        <th>Status</th>
                                        <th style={{ textAlign: 'right' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map(r => (
                                        <tr key={r.id}>
                                            <td className="font-mono text-[12px] text-[var(--text-muted)]">{r.referenceCode}</td>
                                            <td>
                                                <span className="text-[var(--text)]">{r.participantName}</span>
                                                <span className="block font-mono text-[10px] text-[var(--text-ghost)] mt-0.5">{r.participantEmail}</span>
                                            </td>
                                            <td className="text-[var(--text-muted)]">{r.entity}</td>
                                            <td><span className="text-meta">{r.participantType}</span></td>
                                            <td className="font-mono text-[12px] text-[var(--text-ghost)]">{new Date(r.submittedAt).toLocaleDateString()}</td>
                                            <td><StatusBadge status={r.status} /></td>
                                            <td style={{ textAlign: 'right' }}>
                                                <Link href={`/registrations/${r.id}`} className="btn-ghost">View</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
                </>
            ) : (
                <EmptyState
                    title="No Registrations Found"
                    description="No registrations match the current filters."
                    action={<button onClick={clearFilters} className="btn-secondary">Clear Filters</button>}
                />
            )}
        </div>
    );
}
