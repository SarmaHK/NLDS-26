import React from 'react';
import { PageHeader, SectionHeader } from '@/components/ui';

export default function SettingsPage() {
    return (
        <div className="space-y-[var(--section-gap)] animate-fade-in-up max-w-[900px]">
            <PageHeader title="SETTINGS" description="System preferences and administrative configuration." />

            <section>
                <SectionHeader title="System Configuration" />
                <div className="card space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                        <div>
                            <p className="text-[13px] font-medium text-[var(--text)]">Registration Status</p>
                            <p className="text-meta">Open or close the public registration portal.</p>
                        </div>
                        <span className="badge badge-accepted">OPEN</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                        <div>
                            <p className="text-[13px] font-medium text-[var(--text)]">Maintenance Mode</p>
                            <p className="text-meta">Take the admin panel offline for non-super admins.</p>
                        </div>
                        <button className="btn-ghost">Enable</button>
                    </div>
                </div>
            </section>

            <section>
                <SectionHeader title="Your Account" />
                <div className="card space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                        <div>
                            <p className="text-[13px] font-medium text-[var(--text)]">Password Reset</p>
                            <p className="text-meta">Update your authentication credentials.</p>
                        </div>
                        <button className="btn-secondary">Change Password</button>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[var(--border)]">
                        <div>
                            <p className="text-[13px] font-medium text-[var(--text)]">Two-Factor Authentication</p>
                            <p className="text-meta">Add an extra layer of security to your account.</p>
                        </div>
                        <span className="badge badge-rejected">NOT CONFIGURED</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
