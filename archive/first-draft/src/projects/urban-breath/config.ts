/**
 * URBAN BREATH — Project theme & visualization settings
 * ---------------------------------------------------
 * Edit this file to change colors, scales, labels, and layout without
 * touching D3 rendering logic in UrbanBreathChart.tsx.
 *
 * Data: src/projects/urban-breath/data/aqi-cities.json
 * Source: EPA AQS annual summary (representative 2023 medians for demo)
 */
export const urbanBreathTheme = {
  /** Chart dimensions (SVG viewBox scales responsively) */
  width: 720,
  height: 720,
  innerRadius: 80,
  outerRadiusMax: 280,

  /** AQI color scale — map index values to fill colors */
  aqiColors: {
    good: "#fec00f", // 0–50
    moderate: "#fff6ef", // 51–100 (uses cream with stroke)
    sensitive: "#c2432c", // 101–150
    unhealthy: "#0a0a0a", // 151+
  },

  /** Typography inside the chart (CSS variables from layout) */
  labelFont: "var(--font-sans)",
  titleSize: 11,
  valueSize: 10,

  /** Animation */
  transitionMs: 600,

  /** Copy shown beside the chart */
  chartTitle: "Median Air Quality Index by Metro",
  chartSubtitle: "Annual EPA summary · 2023 representative sample",
  footnote:
    "Higher bars indicate worse air quality. Hover a city to inspect readings.",
} as const;

export type UrbanBreathTheme = typeof urbanBreathTheme;
