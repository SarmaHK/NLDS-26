import React from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-bg">
            <AdminSidebar />
            <main
                className="flex-1 min-h-screen"
                style={{
                    marginLeft: 'var(--sidebar-w)',
                    padding: 'var(--page-py) var(--page-px)',
                }}
            >
                {children}
            </main>
        </div>
    );
}
