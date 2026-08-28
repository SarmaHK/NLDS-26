import React from 'react';
import Link from 'next/link';
import { mockRegistrations } from '@/data/mock';
import { StatusBadge, InfoRow } from '@/components/ui';
import { notFound } from 'next/navigation';

export default async function RegistrationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const reg = mockRegistrations.find(r => r.id === id);
    if (!reg) notFound();

    return (
        <div className="space-y-[var(--section-gap)] animate-fade-in-up max-w-[900px]">

            {/* Header */}
            <div className="pb-6 border-b border-[var(--border)]">
                <div className="flex items-center gap-2 mb-1">
                    <Link href="/registrations" className="text-meta hover:text-[var(--text-dim)] transition-colors">← Registrations</Link>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3">
                    <div>
                        <p className="text-system mb-1">Registration</p>
                        <h1 className="text-page-title">{reg.referenceCode}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <StatusBadge status={reg.status} />
                        <button className="btn-primary">Update Status</button>
                    </div>
                </div>
            </div>

            {/* Personal Intel */}
            <section>
                <h2 className="text-section-title mb-3">Personal Intel</h2>
                <div className="card" style={{ padding: 0 }}>
                    <div className="px-6 py-1">
                        <InfoRow label="Full Name" value={reg.participantName} />
                        <InfoRow label="Email" value={reg.participantEmail} />
                        <InfoRow label="Entity" value={reg.entity} />
                        <InfoRow label="Gender" value="Male" />
                        <InfoRow label="Date of Birth" value="2002-05-15" />
                        <InfoRow label="NIC / Passport" value="200215603456V" mono />
                        <InfoRow label="Phone" value="+94 71 234 5678" mono />
                    </div>
                </div>
            </section>

            {/* AIESEC Intel */}
            <section>
                <h2 className="text-section-title mb-3">AIESEC Intel</h2>
                <div className="card" style={{ padding: 0 }}>
                    <div className="px-6 py-1">
                        <InfoRow label="Entity" value={reg.entity} />
                        <InfoRow label="AIESEC Email" value={reg.aiesecEmail} mono />
                        <InfoRow label="Current Position" value={reg.currentPosition} />
                        <InfoRow label="Participant Type" value={reg.participantType} />
                    </div>
                </div>
            </section>

            {/* Mission Details */}
            <section>
                <h2 className="text-section-title mb-3">Mission Details</h2>
                <div className="card" style={{ padding: 0 }}>
                    <div className="px-6 py-1">
                        <InfoRow label="Food Preference" value={reg.foodPreference} />
                        <InfoRow label="Medical Conditions" value={reg.medicalConditions} />
                        <InfoRow label="Readiness Level" value={reg.readinessLevel} />
                        <InfoRow label="Mission Goal" value={reg.missionGoal} />
                        <InfoRow label="Additional Info" value={reg.additionalInfo} />
                    </div>
                </div>
            </section>

            {/* Guardian Intel */}
            <section>
                <h2 className="text-section-title mb-3">Guardian Intel</h2>
                <div className="card" style={{ padding: 0 }}>
                    <div className="px-6 py-1">
                        <InfoRow label="Guardian Name" value={reg.guardianName} />
                        <InfoRow label="Guardian Contact" value={reg.guardianContact} mono />
                    </div>
                </div>
            </section>

            {/* Files */}
            <section>
                <h2 className="text-section-title mb-3">Files</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--card-gap)]">
                    <div className="card flex items-center justify-between">
                        <div>
                            <p className="text-card-title">Profile Photo</p>
                            <p className="text-meta mt-1">{reg.hasPhoto ? 'Uploaded' : 'Not uploaded'}</p>
                        </div>
                        {reg.hasPhoto && <button className="btn-ghost">View</button>}
                    </div>
                    <div className="card flex items-center justify-between">
                        <div>
                            <p className="text-card-title">Curriculum Vitae</p>
                            <p className="text-meta mt-1">{reg.hasCv ? 'PDF uploaded' : 'Not uploaded'}</p>
                        </div>
                        {reg.hasCv && <button className="btn-ghost">View</button>}
                    </div>
                </div>
            </section>

            {/* Audit Timeline */}
            <section>
                <h2 className="text-section-title mb-3">Audit Timeline</h2>
                <div className="card">
                    <div className="space-y-4">
                        {[
                            { action: 'Registration Created', time: reg.createdAt },
                            { action: 'Registration Submitted', time: reg.submittedAt },
                            { action: 'Last Updated', time: reg.updatedAt },
                        ].map((e, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-1.5 h-1.5 bg-[var(--text-ghost)] rounded-full shrink-0" />
                                <div className="flex-1">
                                    <p className="text-[13px] text-[var(--text-dim)]">{e.action}</p>
                                    <p className="font-mono text-[11px] text-[var(--text-ghost)]">{new Date(e.time).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
