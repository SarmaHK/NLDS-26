import React from 'react';

export function PageHeader({ title, description }: { title: string; description?: string }) {
    return (
        <div className="pb-6 border-b border-[var(--border)]">
            <h1 className="text-page-title">{title}</h1>
            {description && <p className="text-meta mt-2">{description}</p>}
        </div>
    );
}

export function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-section-title">{title}</h2>
            {action}
        </div>
    );
}

export function StatusBadge({ status }: { status: string }) {
    const map: Record<string, string> = {
        SUBMITTED: 'badge-submitted', UNDER_REVIEW: 'badge-review',
        ACCEPTED: 'badge-accepted', REJECTED: 'badge-rejected',
        CANCELLED: 'badge-cancelled', ACTIVE: 'badge-active',
        INACTIVE: 'badge-inactive', SUPER_ADMIN: 'badge-super',
    };
    return <span className={`badge ${map[status] || ''}`}>{status.replace(/_/g, ' ')}</span>;
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
    return (
        <div className="empty-state">
            <p className="text-section-title">{title}</p>
            {description && <p className="text-meta mt-1">{description}</p>}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
    return (
        <div className="empty-state">
            <p className="text-section-title" style={{ color: 'var(--red)' }}>Data Retrieval Failed</p>
            <p className="text-meta mt-1">{message || 'The requested intelligence could not be retrieved.'}</p>
            {onRetry && <button onClick={onRetry} className="btn-secondary mt-4">Try Again</button>}
        </div>
    );
}

export function AccessDenied() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <p className="text-system mb-3" style={{ color: 'var(--red)' }}>ACCESS RESTRICTED</p>
                <h2 className="font-display text-3xl tracking-wider text-[var(--text)] mb-2">CLEARANCE INSUFFICIENT</h2>
                <p className="text-meta">You do not have authorization to access this section.</p>
            </div>
        </div>
    );
}

export function LoadingSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="space-y-3 animate-pulse">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="h-12 bg-[var(--surface-2)] border border-[var(--border)]" style={{ opacity: 1 - i * 0.12 }} />
            ))}
        </div>
    );
}

export function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
    return (
        <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder || 'Search...'}
            className="admin-input max-w-[320px]"
        />
    );
}

export function FilterSelect({ label, value, onChange, options }: {
    label: string; value: string; onChange: (v: string) => void;
    options: { value: string; label: string }[];
}) {
    return (
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className="admin-input"
            style={{ maxWidth: 180, paddingRight: 32, appearance: 'none', cursor: 'pointer' }}
            aria-label={label}
        >
            <option value="">{label}</option>
            {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
    );
}

export function InfoRow({ label, value, mono }: { label: string; value: string | null | undefined; mono?: boolean }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 py-2.5 border-b border-[var(--border)]">
            <span className="text-meta w-[180px] shrink-0">{label}</span>
            <span className={`text-[var(--text-dim)] text-[13px] ${mono ? 'font-mono text-[12px]' : ''}`}>
                {value || '—'}
            </span>
        </div>
    );
}

export function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (p: number) => void }) {
    return (
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
            <p className="text-meta">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
                <button onClick={() => onPageChange(page - 1)} disabled={page <= 1} className="btn-ghost">Prev</button>
                <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} className="btn-ghost">Next</button>
            </div>
        </div>
    );
}
