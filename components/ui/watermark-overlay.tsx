type WatermarkOverlayProps = {
  label?: string;
  subtle?: boolean;
};

export function WatermarkOverlay({
  label = "DonutWorry_GT",
  subtle = true
}: WatermarkOverlayProps) {
  const rows = subtle ? 3 : 4;
  const cols = subtle ? 3 : 4;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-transparent to-cocoa/8" />
      {Array.from({ length: rows * cols }).map((_, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;

        return (
          <span
            key={index}
            className={`absolute text-[10px] font-semibold uppercase tracking-[0.28em] text-white/30 mix-blend-soft-light sm:text-xs ${
              subtle ? "opacity-60" : "opacity-80"
            }`}
            style={{
              left: `${10 + col * (82 / Math.max(cols - 1, 1))}%`,
              top: `${18 + row * (60 / Math.max(rows - 1, 1))}%`,
              transform: "translate(-50%, -50%) rotate(-23deg)"
            }}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
}
