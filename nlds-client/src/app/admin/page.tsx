import { getAdminContext } from "@/lib/backend/security/admin-context";
import { prisma } from "@/lib/backend/db/prisma";

export default async function AdminDashboard() {
  const admin = await getAdminContext();
  // Pre-calculated stats mapping generic operations without spilling PII
  const stats = {
    total: await prisma.registration.count(),
    submitted: await prisma.registration.count({
      where: { status: "SUBMITTED" },
    }),
    underReview: await prisma.registration.count({
      where: { status: "UNDER_REVIEW" },
    }),
    accepted: await prisma.registration.count({
      where: { status: "ACCEPTED" },
    }),
  };

  return (
    <div className="flex flex-col gap-8 w-full animate-fade-in text-white font-sans">
      <div>
        <h1 className="text-3xl font-bebas tracking-widest text-white mb-1">
          HQ OVERVIEW
        </h1>
        <p className="text-[#a3a3a3] text-sm">
          Real-time status monitoring for NLDS 2026 operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="TOTAL OPERATIVES" value={stats.total} />
        <StatCard title="AWAITING REVIEW" value={stats.submitted} highlight />
        <StatCard title="IN PROCESSING" value={stats.underReview} />
        <StatCard title="ACCEPTED DOSSIERS" value={stats.accepted} />
      </div>

      {/* Extended modules based on permissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="border border-[var(--border-strong)] p-6 bg-[#0a0a0a]">
          <h3 className="font-mono text-sm text-[var(--red)] tracking-widest mb-4">
            ACTIVE QUEUE
          </h3>
          <p className="text-[#a3a3a3] text-sm mb-6">
            Operations awaiting explicit manual decryption and validation phase.
          </p>
          <a
            href="/admin/registrations"
            className="font-mono text-xs border border-white/20 p-2 hover:bg-white/5 transition-colors"
          >
            OPEN DOSSIERS →
          </a>
        </div>

        {/* Secure rendering block resolving native RBAC permissions mapping */}
        {admin?.permissions.includes("MANAGE_ADMINS") && (
          <div className="border border-[var(--border-strong)] p-6 bg-[#0a0a0a]">
            <h3 className="font-mono text-sm text-[var(--red)] tracking-widest mb-4">
              ADMINISTRATION
            </h3>
            <p className="text-[#a3a3a3] text-sm mb-6">
              Hierarchy and system operations command interface.
            </p>
            <a
              href="/admin/admins"
              className="font-mono text-xs border border-white/20 p-2 hover:bg-white/5 transition-colors"
            >
              MANAGE ACCESS →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  highlight = false,
}: {
  title: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`p-6 border ${highlight ? "border-[var(--red)] bg-[rgba(220,38,38,0.02)]" : "border-[var(--border)] bg-[#050505]"}`}
    >
      <div className="font-classified text-[10px] tracking-widest text-[#a3a3a3] mb-4">
        {title}
      </div>
      <div
        className={`font-bebas text-5xl tracking-widest ${highlight ? "text-[var(--red)]" : "text-white"}`}
      >
        {value}
      </div>
    </div>
  );
}
