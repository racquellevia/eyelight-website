/**
 * Project registry — add new visualization projects here.
 */
import type { ProjectMeta } from "@/types/project";

export const projects: ProjectMeta[] = [
  {
    slug: "urban-breath",
    title: "Urban Breath",
    subtitle: "Civic air quality across American metros",
    category: "civic",
    year: 2025,
    excerpt:
      "An interactive radial study of EPA Air Quality Index readings — how cities inhale and exhale through seasons of industry, weather, and policy.",
    featured: true,
    dataSource: "U.S. EPA Air Quality System (AQS) — annual summary statistics",
    tags: ["environment", "public health", "cities"],
  },
  {
    slug: "river-currents",
    title: "River Currents",
    subtitle: "Streamflow rhythms on the Colorado River basin",
    category: "environmental",
    year: 2025,
    excerpt:
      "A flowing streamgraph of USGS daily discharge — tracing snowmelt pulses, drought years, and the quiet mathematics of western water.",
    featured: true,
    dataSource: "USGS National Water Information System — daily streamflow",
    tags: ["water", "climate", "geography"],
  },
  {
    slug: "heritage-signal",
    title: "Heritage Signal",
    subtitle: "UNESCO World Heritage inscriptions by region",
    category: "cultural",
    year: 2025,
    excerpt:
      "A spectral heatmap of new UNESCO listings per decade — mapping how cultural memory accumulates across six world regions.",
    featured: true,
    dataSource: "UNESCO World Heritage Centre — List of World Heritage Sites",
    tags: ["heritage", "culture", "unesco"],
  },
  {
    slug: "midnight-census",
    title: "Midnight Census",
    subtitle: "A scrollytelling ledger of domestic cockroaches",
    category: "cultural",
    year: 2025,
    excerpt:
      "Scroll through bright Moroccan-inspired patterns while evening counts rise and fall — roaches scatter across the page as the chart tells the story of your household visitors.",
    featured: true,
    dataSource: "Personal observation log — replace with your own dated counts",
    tags: ["personal", "scrollytelling", "domestic"],
    presentation: "scrolly",
  },
];

export function getProject(slug: string): ProjectMeta | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): ProjectMeta[] {
  return projects.filter((p) => p.featured);
}
