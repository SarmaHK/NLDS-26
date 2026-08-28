import React from 'react';
import Link from 'next/link';
import { mockParticipants, mockRegistrations } from '@/data/mock';
import { InfoRow, StatusBadge } from '@/components/ui';
import { notFound } from 'next/navigation';

export default async function ParticipantProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const p = mockParticipants.find(x => x.id === id);
    if (!p) notFound();

    const regs = mockRegistrations.filter(r => r.participantId === id);

    return (
        <div className="space-y-[var(--section-gap)] animate-fade-in-up max-w-[900px]">

            {/* Header */}
            <div className="pb-6 border-b border-[var(--border)]">
                <Link href="/participants" className="text-meta hover:text-[var(--text-dim)] transition-colors mb-3 inline-block">← Participants</Link>
                <div className="flex flex-col sm:flex-row gap-6 items-start mt-2">
                    {/* Mock profile photo */}
                    <div className="w-24 h-24 bg-[var(--surface-2)] border border-[var(--border-strong)] flex items-center justify-center shrink-0">
                        {p.profilePhoto ? (
                            <span className="text-meta">IMG</span>
                        ) : (
                            <span className="text-meta">No Photo</span>
                        )}
                    </div>
                    <div>
                        <p className="text-system mb-1">Participant Profile</p>
                        <h1 className="text-page-title">{p.fullName}</h1>
                        <p className="text-meta mt-2">{p.entity} — {p.currentPosition}</p>
                    </div>
                </div>
            </div>

            <section>
                <h2 className="text-section-title mb-3">Personal Information</h2>
                <div className="card" style={{ padding: 0 }}>
                    <div className="px-6 py-1">
                        <InfoRow label="Preferred Name" value={p.preferredName} />
                        <InfoRow label="National ID / Passport" value={p.nationalId} mono />
                        <InfoRow label="Email" value={p.personalEmail} />
                        <InfoRow label="Phone" value={p.phone} mono />
                        <InfoRow label="Date of Birth" value={p.dateOfBirth} mono />
                        <InfoRow label="Gender" value={p.gender} />
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-section-title mb-3">AIESEC Information</h2>
                <div className="card" style={{ padding: 0 }}>
                    <div className="px-6 py-1">
                        <InfoRow label="Participant Type" value={p.participantType} />
                        <InfoRow label="AIESEC Email" value={p.aiesecEmail} mono />
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-section-title mb-3">Registration History</h2>
                {regs.length === 0 ? (
                    <div className="card text-center py-8"><p className="text-meta">No registrations found.</p></div>
                ) : (
                    <div className="border border-[var(--border)] overflow-hidden">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Reference</th>
                                    <th>Submitted</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'right' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {regs.map(r => (
                                    <tr key={r.id}>
                                        <td className="font-mono text-[12px]">{r.referenceCode}</td>
                                        <td className="font-mono text-[12px] text-[var(--text-ghost)]">{new Date(r.submittedAt).toLocaleDateString()}</td>
                                        <td><span className="text-meta">{r.participantType}</span></td>
                                        <td><StatusBadge status={r.status} /></td>
                                        <td style={{ textAlign: 'right' }}>
                                            <Link href={`/registrations/${r.id}`} className="btn-ghost">View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

        </div>
    );
}
