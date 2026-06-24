/** Miró Constellations–inspired decorative composition */

function HitRect({
  x,
  y,
  width,
  height,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return <rect x={x} y={y} width={width} height={height} fill="transparent" />;
}

export function MiroConstellationArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 360"
      className={`m1-constellation-art ${className}`}
      aria-hidden
    >
      <defs>
        <radialGradient id="m1-wash-sky" cx="30%" cy="25%" r="55%">
          <stop offset="0%" stopColor="var(--sky)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--sky)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="m1-wash-rose" cx="75%" cy="60%" r="50%">
          <stop offset="0%" stopColor="var(--rose)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--rose)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="m1-wash-peach" cx="50%" cy="85%" r="45%">
          <stop offset="0%" stopColor="var(--peach)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--peach)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="300" height="360" fill="var(--paper)" pointerEvents="none" />
      <rect width="300" height="360" fill="url(#m1-wash-sky)" pointerEvents="none" />
      <rect width="300" height="360" fill="url(#m1-wash-rose)" pointerEvents="none" />
      <rect width="300" height="360" fill="url(#m1-wash-peach)" pointerEvents="none" />

      <g className="m1-piece m1-piece--web">
        <HitRect x={20} y={30} width={260} height={280} />
        <path
          d="M 48 72 Q 90 40 130 58 T 210 48 T 262 90"
          className="m1-stroke-thin"
          fill="none"
        />
        <path
          d="M 36 140 C 80 120 110 170 150 150 S 230 130 270 160"
          className="m1-stroke-thin"
          fill="none"
        />
        <path d="M 58 220 L 120 200 L 168 228 L 240 210" className="m1-stroke-thin" fill="none" />
        <path d="M 90 100 L 130 130 L 118 180" className="m1-stroke-thin" fill="none" />
        <path d="M 180 100 L 200 150 L 250 130" className="m1-stroke-thin" fill="none" />
      </g>

      <g className="m1-piece m1-piece--blob">
        <path
          d="M 28 248 C 20 220 40 195 68 200 C 95 180 120 210 108 240 C 90 270 50 275 28 248 Z"
          className="m1-fill-ink"
        />
      </g>

      <g className="m1-piece m1-piece--red-dot">
        <HitRect x={200} y={52} width={36} height={36} />
        <circle cx="218" cy="70" r="14" className="m1-fill-red" />
      </g>

      <g className="m1-piece m1-piece--dots">
        <HitRect x={40} y={60} width={200} height={200} />
        <circle cx="52" cy="88" r="4" className="m1-fill-ink" />
        <circle cx="130" cy="58" r="3" className="m1-fill-ink" />
        <circle cx="210" cy="48" r="5" className="m1-fill-ink" />
        <circle cx="262" cy="90" r="3.5" className="m1-fill-ink" />
        <circle cx="58" cy="220" r="4" className="m1-fill-ink" />
        <circle cx="168" cy="228" r="3" className="m1-fill-ink" />
        <circle cx="240" cy="210" r="4.5" className="m1-fill-ink" />
        <circle cx="118" cy="180" r="3" className="m1-fill-red" />
        <circle cx="200" cy="150" r="3.5" className="m1-fill-red" />
      </g>

      <g className="m1-piece m1-piece--star">
        <HitRect x={34} y={118} width={44} height={44} />
        <polygon
          points="56,124 60,138 74,138 63,147 67,161 56,152 45,161 49,147 38,138 52,138"
          className="m1-fill-blue"
        />
      </g>

      <g className="m1-piece m1-piece--crescent">
        <HitRect x={228} y={168} width={48} height={48} />
        <path
          d="M 252 176 A 18 18 0 1 0 252 212 A 12 12 0 1 1 252 176 Z"
          className="m1-fill-blue"
        />
      </g>

      <g className="m1-piece m1-piece--eye">
        <HitRect x={108} y={72} width={72} height={56} />
        <ellipse cx="144" cy="100" rx="28" ry="22" className="m1-fill-ink" />
        <circle cx="144" cy="100" r="14" fill="var(--paper)" />
        <circle cx="144" cy="100" r="8" className="m1-fill-ink" />
        <circle cx="148" cy="96" r="2.5" className="m1-fill-yellow" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`lash-${i}`}
            x1={120 + i * 12}
            y1="78"
            x2={118 + i * 12}
            y2="68"
            className="m1-stroke-thin m1-lash"
            strokeWidth="1.5"
          />
        ))}
      </g>

      <g className="m1-piece m1-piece--eye-sm">
        <HitRect x={218} y={108} width={40} height={36} />
        <circle cx="238" cy="126" r="14" className="m1-fill-ink" />
        <circle cx="238" cy="126" r="7" fill="var(--paper)" />
        <circle cx="238" cy="126" r="4" className="m1-fill-ink" />
      </g>

      <g className="m1-piece m1-piece--triangle">
        <HitRect x={168} y={248} width={36} height={36} />
        <polygon points="186,254 202,278 170,278" className="m1-fill-red" />
      </g>

      <g className="m1-piece m1-piece--spiral">
        <HitRect x={248} y={248} width={44} height={44} />
        <path
          d="M 270 270 A 14 14 0 1 1 256 256 A 8 8 0 1 0 270 270"
          className="m1-stroke-thin"
          fill="none"
        />
      </g>

      <g className="m1-piece m1-piece--whiskers">
        <HitRect x={8} y={168} width={56} height={56} />
        {[0, 1, 2, 3].map((i) => (
          <path
            key={`whisker-${i}`}
            d={`M 18 ${178 + i * 10} Q 4 ${172 + i * 12} 2 ${186 + i * 8}`}
            className="m1-stroke-thin m1-whisker"
            fill="none"
          />
        ))}
      </g>

      <g className="m1-piece m1-piece--cross">
        <HitRect x={138} y={278} width={28} height={36} />
        <line x1="152" y1="282" x2="152" y2="310" className="m1-stroke-thin" strokeWidth="2" />
        <line x1="140" y1="296" x2="164" y2="296" className="m1-stroke-thin" strokeWidth="2" />
        <line x1="146" y1="288" x2="158" y2="304" className="m1-stroke-thin" strokeWidth="1.5" />
        <line x1="158" y1="288" x2="146" y2="304" className="m1-stroke-thin" strokeWidth="1.5" />
      </g>

      <g className="m1-piece m1-piece--swoosh">
        <HitRect x={72} y={300} width={120} height={40} />
        <path
          d="M 80 320 Q 130 300 180 318 Q 200 326 188 338"
          className="m1-stroke-thin"
          fill="none"
          strokeWidth="2.5"
        />
      </g>
    </svg>
  );
}

const ACCENTS = ["star", "dot", "crescent"] as const;

export function MiroAccent({
  index = 0,
  className = "",
}: {
  index?: number;
  className?: string;
}) {
  const pattern = ACCENTS[index % ACCENTS.length];
  return <span className={`m1-accent m1-accent--${pattern} ${className}`} aria-hidden />;
}
