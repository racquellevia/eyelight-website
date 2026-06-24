import type { ReactNode } from "react";

/** Flat geometric 4×3 grid — Bauhaus 2 hero motif */

function Cell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`b2-cell ${className}`}>{children}</div>;
}

export function BauhausMosaic({ className = "" }: { className?: string }) {
  return (
    <div className={`b2-mosaic pointer-events-none ${className}`} aria-hidden>
      {/* row 1 */}
      <Cell className="b2-bg-yellow">
        <span className="b2-shape b2-arc-tl b2-fill-ink" />
        <span className="b2-shape b2-circle b2-fill-cream" style={{ width: "55%", height: "55%", left: "8%", top: "22%" }} />
        <span className="b2-shape b2-circle b2-fill-red" style={{ width: "22%", height: "22%", right: "18%", bottom: "20%" }} />
      </Cell>
      <Cell className="b2-bg-cream">
        <span className="b2-shape b2-arc-br b2-fill-green" />
        <span className="b2-shape b2-circle b2-fill-ink" style={{ width: "38%", height: "38%", left: "6%", top: "6%" }} />
      </Cell>
      <Cell className="b2-bg-ink">
        <span className="b2-shape b2-semicircle-t b2-fill-yellow" />
        <span className="b2-shape b2-circle b2-fill-cream" style={{ width: "42%", height: "42%", left: "29%", top: "29%" }} />
      </Cell>
      <Cell className="b2-bg-cream">
        <span className="b2-shape b2-circle b2-fill-salmon" style={{ width: "52%", height: "52%", left: "-8%", top: "24%" }} />
        <span className="b2-shape b2-circle b2-fill-blue" style={{ width: "44%", height: "44%", right: "-6%", top: "8%" }} />
        <span className="b2-shape b2-circle b2-fill-ink" style={{ width: "30%", height: "30%", right: "18%", bottom: "12%" }} />
      </Cell>

      {/* row 2 */}
      <Cell className="b2-bg-green">
        <span className="b2-shape b2-circle b2-fill-cream" style={{ width: "68%", height: "68%", left: "16%", top: "16%" }} />
      </Cell>
      <Cell className="b2-bg-blue">
        <span className="b2-shape b2-semicircle-l b2-fill-cream" />
        <span className="b2-shape b2-arc-tr b2-fill-red" />
      </Cell>
      <Cell className="b2-bg-cream">
        <span className="b2-shape b2-ring b2-ring-yellow" style={{ width: "72%", height: "72%", left: "14%", top: "14%" }} />
        <span className="b2-shape b2-circle b2-fill-ink" style={{ width: "28%", height: "28%", left: "36%", top: "36%" }} />
      </Cell>
      <Cell className="b2-bg-salmon">
        <span className="b2-shape b2-semicircle-b b2-fill-ink" />
        <span className="b2-shape b2-circle b2-fill-yellow" style={{ width: "34%", height: "34%", right: "12%", top: "12%" }} />
      </Cell>

      {/* row 3 */}
      <Cell className="b2-bg-yellow">
        <span className="b2-shape b2-circle b2-fill-green" style={{ width: "58%", height: "58%", right: "8%", bottom: "8%" }} />
        <span className="b2-shape b2-tri-tr b2-fill-ink" />
      </Cell>
      <Cell className="b2-bg-cream">
        <span className="b2-shape b2-half-l b2-fill-red" />
        <span className="b2-shape b2-half-r b2-fill-blue" />
      </Cell>
      <Cell className="b2-bg-ink">
        <span className="b2-shape b2-circle b2-fill-cream" style={{ width: "46%", height: "46%", left: "27%", top: "27%" }} />
        <span className="b2-shape b2-ring b2-ring-yellow" style={{ width: "78%", height: "78%", left: "11%", top: "11%" }} />
      </Cell>
      <Cell className="b2-bg-red">
        <span className="b2-shape b2-arc-bl b2-fill-cream" />
        <span className="b2-shape b2-circle b2-fill-yellow" style={{ width: "36%", height: "36%", right: "10%", top: "10%" }} />
      </Cell>
    </div>
  );
}

const ACCENT_PATTERNS = ["pillar-a", "pillar-b", "pillar-c"] as const;

export function GeometricAccent({
  index = 0,
  className = "",
}: {
  index?: number;
  className?: string;
}) {
  const pattern = ACCENT_PATTERNS[index % ACCENT_PATTERNS.length];
  return <span className={`b2-accent b2-accent--${pattern} ${className}`} aria-hidden />;
}
