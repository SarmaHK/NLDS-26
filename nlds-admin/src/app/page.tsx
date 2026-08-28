export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="font-display text-6xl tracking-wider text-red">
          NLDS 2026
        </h1>
        <p className="font-classified text-text-dim text-sm">
          MISSION CONTROL INTERFACE
        </p>
        <div className="pt-8">
          <button className="btn-mission">
            INITIATE SECURE LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}
