/**
 * HERITAGE SIGNAL — theme & chart settings
 * Data: src/projects/heritage-signal/data/heritage-inscriptions.json
 */
export const heritageSignalTheme = {
  margin: { top: 32, right: 16, bottom: 56, left: 100 },
  height: 440,
  cellGap: 2,

  /** Heatmap color ramp (low → high inscription count) */
  colorRange: ["#fff6ef", "#fec00f", "#c2432c", "#0a0a0a"],

  transitionMs: 450,

  chartTitle: "World Heritage Inscriptions by Region",
  chartSubtitle: "UNESCO listings per decade · six world regions",
  footnote:
    "Click a cell to highlight it. Brighter cells indicate more new inscriptions that decade.",
} as const;

export type HeritageSignalTheme = typeof heritageSignalTheme;
