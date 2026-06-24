"use client";

import { useCallback, useState } from "react";

/** Classic Bauhaus poster composition — morphs into a bar chart on hover */

export function BauhausPosterArt({ className = "" }: { className?: string }) {
  const [chart, setChart] = useState(false);

  const onEnter = useCallback(() => setChart(true), []);
  const onLeave = useCallback(() => setChart(false), []);

  return (
    <svg
      viewBox="0 0 280 340"
      className={`b5-poster-art ${chart ? "b5-poster-art--chart" : ""} ${className}`}
      aria-hidden
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      tabIndex={0}
      role="img"
      aria-label="Bauhaus composition that becomes a bar chart on hover"
    >
      <rect width="280" height="340" fill="var(--paper)" pointerEvents="none" />

      <g className="b5-piece b5-piece--axis b5-piece--chart-axis" aria-hidden>
        <line x1="18" y1="72" x2="18" y2="280" className="b5-stroke" strokeWidth="3" />
        <line x1="18" y1="280" x2="268" y2="280" className="b5-stroke" strokeWidth="3" />
      </g>

      <g className="b5-piece b5-piece--blue-bar b5-piece--chart-bar">
        <rect width="36" height="108" className="b5-fill-blue" />
      </g>

      <g className="b5-piece b5-piece--red-circle b5-piece--chart-hide">
        <circle cx="14" cy="14" r="14" className="b5-fill-red" />
      </g>

      <g className="b5-piece b5-piece--vline b5-piece--chart-hide">
        <line x1="0" y1="0" x2="0" y2="300" className="b5-stroke" strokeWidth="4" />
      </g>

      <g className="b5-piece b5-piece--hline b5-piece--chart-hide">
        <line x1="0" y1="0" x2="200" y2="0" className="b5-stroke" strokeWidth="4" />
      </g>

      <g className="b5-piece b5-piece--red-cross b5-piece--chart-bar">
        <rect width="110" height="10" className="b5-fill-red" />
      </g>

      <g className="b5-piece b5-piece--red-arc b5-piece--chart-hide">
        <path d="M 0 4 A 52 52 0 0 1 104 4 L 104 56 L 0 56 Z" className="b5-fill-red" />
      </g>

      <g className="b5-piece b5-piece--ladder b5-piece--chart-hide">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line
            key={i}
            x1="0"
            y1={4 + i * 10}
            x2="40"
            y2={4 + i * 10}
            className="b5-stroke"
            strokeWidth="2"
          />
        ))}
      </g>

      <g className="b5-piece b5-piece--yellow-arc b5-piece--chart-bar">
        <path
          d="M 0 4 A 40 40 0 0 0 0 84 L 40 84 L 40 4 Z"
          className="b5-fill-yellow b5-yellow-arc-poster"
        />
        <rect width="24" height="148" className="b5-fill-yellow b5-yellow-arc-chart" />
      </g>

      <g className="b5-piece b5-piece--red-bar b5-piece--chart-bar">
        <rect width="28" height="96" className="b5-fill-red" />
      </g>

      <g className="b5-piece b5-piece--yellow-lines b5-piece--chart-hide">
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`l-${i}`}
            x1="0"
            y1={4 + i * 10}
            x2="24"
            y2={4 + i * 10}
            className="b5-stroke"
            strokeWidth="2"
          />
        ))}
      </g>

      <g className="b5-piece b5-piece--vline-mid b5-piece--chart-hide">
        <line x1="0" y1="0" x2="0" y2="96" className="b5-stroke" strokeWidth="4" />
      </g>

      <g className="b5-piece b5-piece--yellow-block b5-piece--chart-bar">
        <rect width="168" height="52" className="b5-fill-yellow" />
      </g>

      <g className="b5-piece b5-piece--blue-block b5-piece--chart-bar">
        <rect width="168" height="44" className="b5-fill-blue" />
      </g>

      <g className="b5-piece b5-piece--hline-bottom b5-piece--chart-hide">
        <line x1="0" y1="0" x2="240" y2="0" className="b5-stroke" strokeWidth="3" />
      </g>

      <g className="b5-piece b5-piece--vline-bottom b5-piece--chart-hide">
        <line x1="0" y1="0" x2="0" y2="84" className="b5-stroke" strokeWidth="4" />
      </g>

      <g className="b5-piece b5-piece--red-square b5-piece--chart-bar">
        <rect width="52" height="48" className="b5-fill-red" />
      </g>

      <g className="b5-piece b5-piece--bottom-bar b5-piece--chart-hide">
        <rect width="120" height="12" className="b5-fill-ink" />
      </g>
    </svg>
  );
}

const ACCENTS = ["semicircle", "bar", "arc"] as const;

export function GeometricAccent({
  index = 0,
  className = "",
}: {
  index?: number;
  className?: string;
}) {
  const pattern = ACCENTS[index % ACCENTS.length];
  return <span className={`b5-accent b5-accent--${pattern} ${className}`} aria-hidden />;
}
