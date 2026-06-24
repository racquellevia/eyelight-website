/**
 * MIDNIGHT CENSUS — theme, narrative steps, asset paths
 * Edit colors, copy, and photo paths here.
 */
export const midnightCensusTheme = {
  colors: {
    cream: "#f5e6d3",
    terracotta: "#c45c26",
    saffron: "#e8a317",
    ruby: "#9b2335",
    teal: "#1a6b6b",
    indigo: "#2e3a87",
    gold: "#d4af37",
    plum: "#5c1a3e",
    ink: "#1a1209",
  },

  chart: {
    height: 320,
    margin: { top: 24, right: 24, bottom: 40, left: 48 },
  },

  /**
   * Optional real cockroach photos — drop files in public/projects/midnight-census/photos/
   * Set `enabled: true` once you've added the file. SVG sprites are used until then.
   */
  roachPhotos: [
    {
      id: "roach-a",
      src: "/projects/midnight-census/photos/roach-kitchen.jpg",
      enabled: false,
      alt: "Cockroach near kitchen tile",
    },
    {
      id: "roach-b",
      src: "/projects/midnight-census/photos/roach-baseboard.jpg",
      enabled: false,
      alt: "Cockroach along baseboard",
    },
    {
      id: "roach-c",
      src: "/projects/midnight-census/photos/roach-rug-edge.jpg",
      enabled: false,
      alt: "Cockroach at rug edge",
    },
  ],
} as const;

export type MidnightCensusTheme = typeof midnightCensusTheme;
