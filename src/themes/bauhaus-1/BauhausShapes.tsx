type BlockColor = "red" | "yellow" | "blue";

const GRID: BlockColor[][] = [
  ["red", "yellow", "blue", "red"],
  ["blue", "red", "yellow", "blue"],
  ["yellow", "blue", "red", "yellow"],
  ["red", "yellow", "blue", "red"],
];

function BauhausBlock({ color }: { color: BlockColor }) {
  return <span className={`bauhaus-block bauhaus-block--${color}`} />;
}

/** 4×4 colored-square grid with long shadows — Bauhaus 1 motif */
export function BauhausShapes({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bauhaus-mosaic pointer-events-none grid grid-cols-4 gap-3 ${className}`}
      aria-hidden
    >
      {GRID.flat().map((color, i) => (
        <BauhausBlock key={i} color={color} />
      ))}
    </div>
  );
}

export function BauhausBlockAccent({
  color,
  className = "",
}: {
  color: BlockColor;
  className?: string;
}) {
  return <span className={`bauhaus-block bauhaus-block--sm bauhaus-block--${color} ${className}`} />;
}
