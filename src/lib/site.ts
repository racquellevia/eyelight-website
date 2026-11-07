export const site = {
  name: "Eyelight Labs",
  legalName: "Eyelight Labs, LLC",
  tagline: "Data visualization & design studio",
  headlineLines: [
    "We translate complex data into visual stories",
    "people remember.",
  ] as const,
  description:
    "Eyelight Labs crafts intuitive, memorable data visualizations for civic, cultural, and environmental storytelling. We provide rigorous analysis and humanist framing, so your audience can see what your data means and act on it.",
  email: "hello@eyelightlabs.com",
  pillars: [
    {
      title: "Humanist framing",
      body: "Numbers describe lives, ecosystems, and shared infrastructure. We design for empathy without sacrificing rigor.",
    },
    {
      title: "Scientific integrity",
      body: "We document sources, uncertainty, and methodology. Beautiful charts still owe the public a truthful scale.",
    },
    {
      title: "Artistic craft",
      body: "Typography, color, and motion are arguments. We treat every axis label as part of the story.",
    },
  ],
  clients: [
    {
      name: "NYC Department of Health and Mental Hygiene",
      shortName: "NYC Health",
      logo: "/clients/nyc-dohmh.svg",
      url: "https://www.nyc.gov/site/doh/data/data-home.page",
      logoWidth: 200,
      logoHeight: 56,
    },
    {
      name: "IEEE VIS 2026",
      shortName: "IEEE VIS",
      logo: "/clients/ieeevis.svg",
      url: "https://ieeevis.org/year/2026/welcome/",
      logoWidth: 56,
      logoHeight: 56,
    },
  ],
} as const;
