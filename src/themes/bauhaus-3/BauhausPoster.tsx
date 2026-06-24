import type { ReactNode } from "react";

function Cell({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <div className={`b3-cell ${className}`}>{children}</div>;
}

function Dice({ variant }: { variant: "ink" | "cream" }) {
  return (
    <div className={`b3-dice b3-dice--${variant}`}>
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

/** 3×4 poster grid — rows 3–4 repeat rows 1–2 */
function PosterRow() {
  return (
    <>
      <Cell className="b3-bg-cream">
        <Dice variant="ink" />
      </Cell>
      <Cell className="b3-bg-red">
        <Dice variant="cream" />
      </Cell>
      <Cell className="b3-bg-yellow">
        <span className="b3-shape b3-semicircle-r b3-fill-blue" />
      </Cell>

      <Cell className="b3-bg-blue">
        <span className="b3-shape b3-semicircle-b b3-fill-cream" />
      </Cell>
      <Cell className="b3-bg-cream">
        <span className="b3-shape b3-bar-l b3-fill-red" />
        <span className="b3-shape b3-arc-br b3-fill-ink" />
      </Cell>
      <Cell className="b3-bg-ink">
        <span className="b3-shape b3-circle b3-fill-yellow" />
      </Cell>
    </>
  );
}

export function BauhausMosaic({ className = "" }: { className?: string }) {
  return (
    <div className={`b3-mosaic pointer-events-none ${className}`} aria-hidden>
      <PosterRow />
      <PosterRow />
    </div>
  );
}

const ACCENTS = ["dice", "arc", "bar"] as const;

export function GeometricAccent({
  index = 0,
  className = "",
}: {
  index?: number;
  className?: string;
}) {
  const pattern = ACCENTS[index % ACCENTS.length];
  return <span className={`b3-accent b3-accent--${pattern} ${className}`} aria-hidden />;
}

/** Multicolor label like the poster wordmark */
export function BauhausStripLabel({ text }: { text: string }) {
  const colors = ["ink", "ink", "red", "ink", "ink", "blue", "yellow"] as const;
  return (
    <span className="b3-strip-label" aria-hidden>
      {text.split("").map((char, i) => (
        <span key={`${char}-${i}`} className={`b3-strip-char b3-text-${colors[i % colors.length]}`}>
          {char}
        </span>
      ))}
    </span>
  );
}
