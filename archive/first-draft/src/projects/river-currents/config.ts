/**
 * RIVER CURRENTS — Project theme & visualization settings
 * -------------------------------------------------------
 * Edit colors, margins, and stream opacity here.
 *
 * Data: src/projects/river-currents/data/streamflow.json
 * Source: USGS NWIS daily mean discharge (Colorado River basin stations)
 */
export const riverCurrentsTheme = {
  margin: { top: 24, right: 24, bottom: 48, left: 56 },
  height: 420,

  /** Stream layer colors (one per gauge station) */
  stationColors: [
    "#fec00f",
    "#c2432c",
    "#0a0a0a",
    "#fff6ef",
  ],

  /** Area opacity & stroke */
  areaOpacity: 0.85,
  strokeWidth: 1.5,

  transitionMs: 500,

  chartTitle: "Monthly Mean Discharge (cfs)",
  chartSubtitle: "USGS gauges · Colorado River basin · 2015–2024",
  yAxisLabel: "Cubic feet per second",
  footnote:
    "Drag the timeline to focus a year range. Streams stack to show combined basin rhythm.",
} as const;

export type RiverCurrentsTheme = typeof riverCurrentsTheme;
