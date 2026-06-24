import Link from "next/link";
import type { ProjectMeta } from "@/types/project";

const categoryColors: Record<ProjectMeta["category"], string> = {
  civic: "bg-amber/80 text-ink",
  cultural: "bg-rust/15 text-ink",
  environmental: "bg-rust text-cream",
};

export function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="retro-card group block rounded-sm p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`rounded-sm px-2 py-0.5 text-xs font-medium capitalize ${categoryColors[project.category]}`}
        >
          {project.category}
        </span>
        <span className="text-xs text-ink/40">{project.year}</span>
      </div>

      <h3 className="mt-4 text-lg font-semibold tracking-tight group-hover:text-rust">
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-ink/55">{project.subtitle}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink/70 line-clamp-3">
        {project.excerpt}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-sm bg-ink/5 px-2 py-0.5 text-xs text-ink/55"
          >
            {tag}
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm font-medium text-rust">Explore visualization →</p>
    </Link>
  );
}
