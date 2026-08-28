import React from 'react';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center max-w-sm">
        <p className="text-system mb-4">NLDS 2026</p>
        <h1 className="font-display text-6xl tracking-wider text-text-main mb-2">
          MISSION<br />CONTROL
        </h1>
        <p className="text-meta mb-10">
          Operational Admin Access Point
        </p>
        <Link href="/login" className="btn-primary" style={{ height: 44, padding: '0 36px', fontSize: 13 }}>
          INITIATE SECURE LOGIN
        </Link>
        <p className="text-system mt-12 leading-relaxed">
          Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
