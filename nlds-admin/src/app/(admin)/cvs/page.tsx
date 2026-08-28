import React from 'react';
import Link from 'next/link';
import { mockCvs } from '@/data/mock';
import { PageHeader, EmptyState } from '@/components/ui';
import { FileText } from 'lucide-react';

export default function CvsPage() {
    return (
        <div className="space-y-[var(--section-gap)] animate-fade-in-up max-w-[1200px]">
            <PageHeader title="CV INTELLIGENCE" description="Review participant CV submissions." />

            {mockCvs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[var(--card-gap)]">
                    {mockCvs.map(cv => (
                        <div key={cv.id} className="card flex flex-col gap-4 hover:border-[var(--red)] transition-colors">
                            <div className="flex items-start justify-between">
                                <div className="w-10 h-10 bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center shrink-0">
                                    <FileText size={18} className="text-[var(--text-muted)]" />
                                </div>
                                <span className="badge badge-submitted">{cv.fileType}</span>
                            </div>
                            <div>
                                <p className="text-card-title truncate" title={cv.participantName}>{cv.participantName}</p>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-meta">{cv.entity}</p>
                                    <p className="font-mono text-[10px] text-[var(--text-ghost)]">{new Date(cv.uploadedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="pt-2 mt-auto border-t border-[var(--border)]">
                                <Link href={`/registrations/${mockCvs.find(x => x.id === cv.id)?.registrationRef}`} className="btn-secondary w-full">View Submission</Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState title="No CVs Found" description="No participants have uploaded CVs yet." />
            )}
        </div>
    );
}
