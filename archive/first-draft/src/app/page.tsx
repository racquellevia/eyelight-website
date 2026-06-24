import Link from "next/link";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TerminalPanel } from "@/components/ui/TerminalPanel";
import { getFeaturedProjects } from "@/lib/projects-registry";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <p className="section-label mb-4">Data visualization design studio</p>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl md:leading-[1.1]">
            We translate complex data into{" "}
            <span className="text-rust">visual stories</span> people feel and
            remember.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70 md:text-lg">
            {siteConfig.description} Rigorous analysis, humanist framing,
            retro-futurist craft.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/projects" className="btn-primary">
              View projects
            </Link>
            <Link href="/contact" className="btn-secondary">
              Request a quote
            </Link>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-4 border-t border-ink/10 pt-10 md:grid-cols-4">
            {[
              { label: "Focus", value: "Civic · Cultural · Environmental" },
              { label: "Method", value: "D3.js & open science" },
              { label: "Deliverables", value: "Interactive · Print · Install" },
              { label: "Based in", value: "Remote-first, US" },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-medium uppercase tracking-wider text-ink/45">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <SectionHeading
          label="Featured work"
          title="Interactive data art, built for the public record"
          description="Explore projects using EPA air quality, USGS streamflow, UNESCO heritage data, and personal scrollytelling — each designed for you to remix colors, typography, and interaction."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="border-t border-ink/10 bg-amber/15">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <TerminalPanel title="Eyelight Labs">
            <p className="text-base leading-relaxed md:text-lg">
              “Data is never neutral — but it can be legible, beautiful, and
              accountable.” We partner with researchers, journalists,
              municipalities, and cultural institutions to design visual systems
              that honor both statistical truth and human context.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block text-sm font-medium text-rust hover:underline"
            >
              About Eyelight Labs →
            </Link>
          </TerminalPanel>
        </div>
      </section>
    </>
  );
}
