export type ProjectCategory = "civic" | "cultural" | "environmental";

export type ProjectPresentation = "standard" | "scrolly";

export interface ProjectMeta {
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  year: number;
  excerpt: string;
  featured: boolean;
  dataSource: string;
  tags: string[];
  /** Use "scrolly" for full-bleed scroll-driven experiences */
  presentation?: ProjectPresentation;
}
