"use client";

interface SizeSelectorProps {
  sizes: string[];
  selected: string | null;
  onChange: (size: string) => void;
}

export default function SizeSelector({
  sizes,
  selected,
  onChange,
}: SizeSelectorProps) {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span
          className="font-classified"
          style={{ fontSize: "10px", letterSpacing: "0.22em", color: "var(--text-muted)" }}
        >
          SELECT SIZE
        </span>
        {selected && (
          <span
            className="font-classified"
            style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--red)" }}
          >
            {selected}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isActive = selected === size;
          return (
            <button
              key={size}
              onClick={() => onChange(size)}
              className="transition-all duration-200"
              style={{
                minWidth: 48,
                height: 44,
                padding: "0 12px",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.14em",
                fontWeight: 500,
                color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                background: isActive ? "rgba(196,30,58,0.12)" : "rgba(255,255,255,0.02)",
                border: isActive
                  ? "1px solid var(--red)"
                  : "1px solid rgba(255,255,255,0.12)",
                cursor: "pointer",
                boxShadow: isActive
                  ? "0 0 12px rgba(196,30,58,0.15), inset 0 0 8px rgba(196,30,58,0.04)"
                  : "none",
              }}
              aria-pressed={isActive}
              aria-label={`Size ${size}`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
