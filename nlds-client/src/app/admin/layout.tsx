import { redirect } from "next/navigation";
import { getAdminContext } from "@/lib/backend/security/admin-context";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    // Top-Level interception mapping enforcing absolute boundary natively on server component phase
    const admin = await getAdminContext();

    if (!admin) {
        redirect("/admin/login"); // Fallbacks to local authentication implementation natively
    }

    return (
        <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans">
            {/* Minimalist Professional Top Navigation */}
            <header className="w-full bg-[#111] border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <h2 className="font-bebas text-xl text-white tracking-widest">
                        NLDS <span className="text-[var(--red)]">ADMIN</span>
                    </h2>
                    <nav className="hidden md:flex gap-4">
                        <a href="/admin" className="text-xs text-[#a3a3a3] hover:text-white uppercase tracking-wider">Dashboard</a>
                        <a href="/admin/registrations" className="text-xs text-[#a3a3a3] hover:text-white uppercase tracking-wider">Registrations</a>
                    </nav>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-[#a3a3a3]">
                    <span>[ {admin.role} ]</span>
                    {/* Basic implementation placeholder since complex Auth layout isn't required */}
                </div>
            </header>

            <main className="flex-1 w-full max-w-7xl mx-auto p-6 md:p-8">
                {children}
            </main>
        </div>
    );
}
