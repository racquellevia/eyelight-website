/** Circles, grid lines, and triangle fields — Bauhaus 4 hero motif */

function upTriangle(x: number, y: number, size: number) {
  const h = size * 0.866;
  return `${x},${y + h} ${x + size / 2},${y} ${x + size},${y + h}`;
}

function downTriangle(x: number, y: number, size: number) {
  const h = size * 0.866;
  return `${x},${y} ${x + size},${y} ${x + size / 2},${y + h}`;
}

function TriangleField({
  cols,
  rows,
  x,
  y,
  size,
  direction,
}: {
  cols: number;
  rows: number;
  x: number;
  y: number;
  size: number;
  direction: "up" | "down";
}) {
  const points = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const px = x + col * size;
      const py = y + row * size * 0.9;
      points.push(
        <polygon
          key={`${row}-${col}`}
          points={direction === "up" ? upTriangle(px, py, size) : downTriangle(px, py, size)}
          fill="currentColor"
        />,
      );
    }
  }
  return <g className="b4-triangles">{points}</g>;
}

export function BauhausMosaic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 200"
      className={`b4-composition pointer-events-none ${className}`}
      aria-hidden
    >
      <rect width="220" height="200" fill="var(--paper)" />

      {/* grid lines */}
      <line x1="0" y1="54" x2="220" y2="54" className="b4-stroke" strokeWidth="3" />
      <line x1="0" y1="66" x2="220" y2="66" className="b4-stroke" strokeWidth="3" />
      <line x1="16" y1="18" x2="16" y2="72" className="b4-stroke" strokeWidth="3" />
      <line x1="170" y1="8" x2="170" y2="172" className="b4-stroke" strokeWidth="3" />

      {/* overlapping circles */}
      <circle cx="158" cy="78" r="54" className="b4-fill-yellow" />
      <circle cx="68" cy="142" r="48" className="b4-fill-red" />
      <circle cx="108" cy="128" r="36" className="b4-fill-blue" />

      {/* split circle */}
      <defs>
        <clipPath id="b4-split-left">
          <rect x="170" y="157" width="15" height="30" />
        </clipPath>
        <clipPath id="b4-split-right">
          <rect x="185" y="157" width="15" height="30" />
        </clipPath>
      </defs>
      <circle cx="192" cy="172" r="15" className="b4-fill-blue" clipPath="url(#b4-split-left)" />
      <circle cx="192" cy="172" r="15" className="b4-fill-ink" clipPath="url(#b4-split-right)" />

      {/* triangle fields */}
      <g className="b4-fill-ink">
        <TriangleField cols={5} rows={4} x={8} y={118} size={9} direction="up" />
        <TriangleField cols={4} rows={3} x={174} y={14} size={8} direction="down" />
      </g>
    </svg>
  );
}

const ACCENTS = ["yellow", "split", "triangle"] as const;

export function GeometricAccent({
  index = 0,
  className = "",
}: {
  index?: number;
  className?: string;
}) {
  const pattern = ACCENTS[index % ACCENTS.length];
  return <span className={`b4-accent b4-accent--${pattern} ${className}`} aria-hidden />;
}
