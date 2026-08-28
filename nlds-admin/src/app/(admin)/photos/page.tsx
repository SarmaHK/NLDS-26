import React from 'react';
import Link from 'next/link';
import { mockPhotos } from '@/data/mock';
import { PageHeader, EmptyState } from '@/components/ui';
import { Camera } from 'lucide-react';

export default function PhotosPage() {
    return (
        <div className="space-y-[var(--section-gap)] animate-fade-in-up max-w-[1200px]">
            <PageHeader title="PROFILE ARCHIVE" description="Participant profile image management." />

            {mockPhotos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[var(--card-gap)]">
                    {mockPhotos.map(photo => (
                        <div key={photo.id} className="card p-0 overflow-hidden hover:border-[var(--red)] transition-colors group cursor-pointer">
                            <div className="aspect-square bg-[var(--surface-2)] flex items-center justify-center relative">
                                <Camera size={24} className="text-[var(--text-ghost)]" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <span className="btn-primary" style={{ height: 28, padding: '0 12px', fontSize: 10 }}>View</span>
                                </div>
                            </div>
                            <div className="p-3 border-t border-[var(--border)]">
                                <p className="text-[12px] font-medium text-[var(--text)] truncate">{photo.participantName}</p>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-system">{photo.entity}</p>
                                    <p className="font-mono text-[9px] text-[var(--text-ghost)]">{new Date(photo.uploadedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState title="No Photos Found" description="No participants have uploaded profile photos yet." />
            )}
        </div>
    );
}
