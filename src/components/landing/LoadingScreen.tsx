import loadingGif from "@/assets/logofor E and C_.png";

interface Props {
  progress: number;
  visible: boolean;
}

export function LoadingScreen({ progress, visible }: Props) {
  // SVG path length for the curly wave line (we animate stroke-dashoffset)
  // Path is a wavy/curly decorative line, ~600px wide
  const TOTAL_LENGTH = 620;
  const dashOffset = TOTAL_LENGTH - (progress / 100) * TOTAL_LENGTH;

  return (
    <div
      aria-hidden={!visible}
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 800ms ease",
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
    >
      {/* GIF Logo */}
      <img
        src={loadingGif}
        alt="E & C Loading"
        className="h-36 w-auto md:h-44 mb-10 select-none"
        draggable={false}
      />

      {/* Curly / wavy SVG progress bar */}
      <div className="relative w-72 md:w-96 flex flex-col items-center">
        <svg
          viewBox="0 0 320 36"
          className="w-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Track — faint grey wavy line */}
          <path
            d="M0 18 C20 4, 40 4, 60 18 S100 32, 120 18 S160 4, 180 18 S220 32, 240 18 S280 4, 300 18 S320 32, 320 18"
            stroke="oklch(0.85 0.005 80)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Gold fill — animated */}
          <path
            d="M0 18 C20 4, 40 4, 60 18 S100 32, 120 18 S160 4, 180 18 S220 32, 240 18 S280 4, 300 18 S320 32, 320 18"
            stroke="oklch(0.72 0.13 70)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              strokeDasharray: TOTAL_LENGTH,
              strokeDashoffset: dashOffset,
              transition: "stroke-dashoffset 220ms ease",
            }}
          />

          {/* Glowing dot at progress tip */}
          <circle
            cx={Math.max(2, (progress / 100) * 320)}
            cy={
              // approximate y on the wave at current progress
              18 + Math.sin(((progress / 100) * 320 * Math.PI) / 60) * 14
            }
            r="3.5"
            fill="oklch(0.72 0.13 70)"
            style={{ filter: "drop-shadow(0 0 4px oklch(0.72 0.13 70 / 0.8))", transition: "cx 220ms ease, cy 220ms ease" }}
          />
        </svg>

        {/* Ornamental flanking dashes */}
        <div className="mt-4 flex items-center gap-3">
          <span className="h-px w-6 bg-[oklch(0.72_0.13_70)]/40" />
          <span className="text-[10px] tracking-[0.45em] text-[oklch(0.48_0.012_80)] font-mono tabular-nums">
            {String(Math.round(progress)).padStart(3, "0")}%
          </span>
          <span className="h-px w-6 bg-[oklch(0.72_0.13_70)]/40" />
        </div>

        {/* Subtitle */}
        <p className="mt-3 text-[9px] uppercase tracking-[0.4em] text-[oklch(0.65_0.012_80)]">
          Loading experience
        </p>
      </div>
    </div>
  );
}
