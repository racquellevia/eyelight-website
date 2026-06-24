import Link from "next/link";
import type { ProjectMeta } from "@/types/project";

export function ProjectDetail({
  project,
  children,
}: {
  project: ProjectMeta;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <Link
        href="/projects"
        className="text-sm text-ink/50 hover:text-rust"
      >
        ← All projects
      </Link>

      <header className="mt-6 max-w-3xl border-b border-ink/10 pb-8">
        <p className="section-label">
          {project.category} · {project.year}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          {project.title}
        </h1>
        <p className="mt-2 text-sm text-ink/55">{project.subtitle}</p>
        <p className="mt-4 text-base leading-relaxed text-ink/75">
          {project.excerpt}
        </p>
        <p className="mt-4 text-sm text-ink/50">
          <span className="font-medium text-ink/70">Data source:</span>{" "}
          {project.dataSource}
        </p>
      </header>

      <section className="mt-10 vis-container">
        <div className="vis-container-inner">{children}</div>
      </section>

      <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-8">
        <p className="max-w-md text-sm leading-relaxed text-ink/65">
          Want a visualization like this for your organization? We design custom
          pipelines, aesthetics, and interaction patterns for your audience.
        </p>
        <Link href="/contact" className="btn-primary shrink-0">
          Start a conversation
        </Link>
      </footer>
    </article>
  );
}
