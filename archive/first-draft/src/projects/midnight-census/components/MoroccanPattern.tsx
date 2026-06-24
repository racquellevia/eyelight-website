/** SVG zellige / rug motifs — use as backgrounds or chart wallpaper */
export function MoroccanPattern({
  id,
  palette = "saffron",
  className = "",
  opacity = 0.12,
}: {
  id: string;
  palette?: keyof typeof PALETTES;
  className?: string;
  opacity?: number;
}) {
  const p = PALETTES[palette] ?? PALETTES.saffron;

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={`diamond-${id}`}
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="48" height="48" fill={p.bg} />
          <path d="M0 24 L24 0 L48 24 L24 48 Z" fill={p.a} opacity={opacity * 2} />
          <path d="M12 24 L24 12 L36 24 L24 36 Z" fill={p.b} opacity={opacity * 2.5} />
          <circle cx="24" cy="24" r="4" fill={p.c} opacity={opacity * 3} />
        </pattern>
        <pattern
          id={`star-${id}`}
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          <rect width="64" height="64" fill="transparent" />
          <path
            d="M32 4 L36 24 L56 28 L36 32 L32 52 L28 32 L8 28 L28 24 Z"
            fill={p.c}
            opacity={opacity * 1.5}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#diamond-${id})`} />
      <rect width="100%" height="100%" fill={`url(#star-${id})`} />
    </svg>
  );
}

const PALETTES = {
  saffron: { bg: "#e8a317", a: "#c45c26", b: "#9b2335", c: "#2e3a87" },
  teal: { bg: "#1a6b6b", a: "#d4af37", b: "#c45c26", c: "#f5e6d3" },
  ruby: { bg: "#9b2335", a: "#e8a317", b: "#5c1a3e", c: "#1a6b6b" },
  indigo: { bg: "#2e3a87", a: "#d4af37", b: "#9b2335", c: "#e8a317" },
  terracotta: { bg: "#c45c26", a: "#1a6b6b", b: "#d4af37", c: "#5c1a3e" },
} as const;

export function RugBorder({ children }: { children: React.ReactNode }) {
  return (
    <div className="midnight-census__chart-rug-border">
      <div className="midnight-census__chart-frame">{children}</div>
    </div>
  );
}
