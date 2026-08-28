"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { mockParticipants } from '@/data/mock';
import { PageHeader, SearchInput, FilterSelect, EmptyState, Pagination } from '@/components/ui';

const ENTITY_OPTIONS = ['UoM', 'USJ', 'SLIIT', 'UoK', 'NSBM'].map(e => ({ value: e, label: e }));

export default function ParticipantsPage() {
    const [search, setSearch] = useState('');
    const [entityFilter, setEntityFilter] = useState('');
    const [page, setPage] = useState(1);
    const PER_PAGE = 10;

    const filtered = mockParticipants.filter(p => {
        if (search && !p.fullName.toLowerCase().includes(search.toLowerCase()) &&
            !p.nationalId.toLowerCase().includes(search.toLowerCase())) return false;
        if (entityFilter && p.entity !== entityFilter) return false;
        return true;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const currentPage = Math.min(page, totalPages);
    const pageData = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

    return (
        <div className="space-y-[var(--section-gap)] animate-fade-in-up max-w-[1200px]">
            <PageHeader title="PARTICIPANTS" description="NLDS 2026 participant intelligence." />

            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                <SearchInput value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search name or ID..." />
                <FilterSelect label="Entity" value={entityFilter} onChange={v => { setEntityFilter(v); setPage(1); }} options={ENTITY_OPTIONS} />
                {(search || entityFilter) && (
                    <button onClick={() => { setSearch(''); setEntityFilter(''); setPage(1); }} className="btn-ghost text-[var(--red)]">Clear</button>
                )}
            </div>

            <p className="text-meta">{filtered.length} participant(s) found</p>

            {filtered.length > 0 ? (
                <>
                    <div className="border border-[var(--border)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Participant</th>
                                        <th>National ID</th>
                                        <th>Entity</th>
                                        <th>Phone</th>
                                        <th>Registrations</th>
                                        <th style={{ textAlign: 'right' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map(p => (
                                        <tr key={p.id}>
                                            <td>
                                                <span className="text-[var(--text)]">{p.fullName}</span>
                                                <span className="block font-mono text-[10px] text-[var(--text-ghost)] mt-0.5">{p.personalEmail}</span>
                                            </td>
                                            <td className="font-mono text-[12px] text-[var(--text-muted)]">{p.nationalId}</td>
                                            <td className="text-[var(--text-muted)]">{p.entity}</td>
                                            <td className="font-mono text-[12px] text-[var(--text-dim)]">{p.phone}</td>
                                            <td><span className="text-meta">{p.registrationCount}</span></td>
                                            <td style={{ textAlign: 'right' }}>
                                                <Link href={`/participants/${p.id}`} className="btn-ghost">View</Link>
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
                <EmptyState title="No Participants Found" description="Try adjusting your search filters." />
            )}
        </div>
    );
}
