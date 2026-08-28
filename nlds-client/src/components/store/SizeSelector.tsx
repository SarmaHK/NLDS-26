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
    <div className="flex flex-col gap-2.5 w-full text-left" style={{ textAlign: "left" }}>
      <div className="flex items-center justify-between w-full" style={{ marginBottom: "0.25rem" }}>
        <span
          className="font-classified"
          style={{ fontSize: "9.5px", letterSpacing: "0.22em", color: "var(--text-muted)", textAlign: "left" }}
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

      <div className="flex flex-wrap gap-1 sm:gap-1.5">
        {sizes.map((size) => {
          const isActive = selected === size;
          return (
            <button
              key={size}
              onClick={() => onChange(size)}
              className="transition-all duration-200 flex items-center justify-center min-w-[32px] sm:min-w-[40px] h-[28px] sm:h-[36px] px-1.5 sm:px-2.5 text-[9.5px] sm:text-[11px]"
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.12em",
                fontWeight: 500,
                color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                background: isActive ? "rgba(196,30,58,0.15)" : "rgba(255,255,255,0.03)",
                border: isActive
                  ? "1px solid var(--red)"
                  : "1px solid rgba(255,255,255,0.12)",
                cursor: "pointer",
                boxShadow: isActive
                  ? "0 0 8px rgba(196,30,58,0.25), inset 0 0 4px rgba(196,30,58,0.1)"
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
