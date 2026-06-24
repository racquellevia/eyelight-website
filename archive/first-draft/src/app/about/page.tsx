import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TerminalPanel } from "@/components/ui/TerminalPanel";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.legalName} — data visualization design studio.`,
};

const principles = [
  {
    title: "Scientific integrity",
    body: "We document sources, uncertainty, and methodology. Beautiful charts still owe the public a truthful scale.",
  },
  {
    title: "Humanist framing",
    body: "Numbers describe lives, ecosystems, and shared infrastructure. We design for empathy without sacrificing rigor.",
  },
  {
    title: "Artistic craft",
    body: "Typography, color, and motion are arguments. We treat every axis label as part of the story.",
  },
  {
    title: "Modular systems",
    body: "Projects ship as editable configs and components — so your team can refresh data and aesthetics without a rewrite.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-14">
      <SectionHeading
        label="About"
        title={siteConfig.legalName}
        description={siteConfig.tagline}
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <TerminalPanel title="Who we are">
          <div className="space-y-4 text-sm leading-relaxed text-ink/80">
            <p>
              Eyelight Labs is a data visualization design studio for teams who
              need the public to <em>see</em> what the data means. We work at the
              intersection of analysis, editorial judgment, and interactive art —
              building portfolio pieces, dashboards, print graphics, and
              installation-scale experiences.
            </p>
            <p>
              Our stack favors open science: D3.js, public civic and environmental
              datasets, and transparent pipelines you can audit and extend. Every
              seeded project in this site includes a README explaining how to
              change colors, swap data sources, and tune interactions.
            </p>
            <p>
              Whether you are a city planner communicating air quality trends, a
              museum interpreting cultural attendance, or a nonprofit tracking
              watershed health — we help you make the invisible legible.
            </p>
          </div>
          <Link href="/contact" className="btn-primary mt-6">
            Work with us
          </Link>
        </TerminalPanel>

        <TerminalPanel title="What we deliver">
          <ul className="space-y-2 text-sm">
            {[
              "Exploratory & explanatory visualizations",
              "Custom D3/React interaction design",
              "Data pipeline architecture & documentation",
              "Design systems for recurring reporting",
              "Workshops for in-house data teams",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-rust">▸</span>
                {item}
              </li>
            ))}
          </ul>
        </TerminalPanel>
      </div>

      <section className="mt-14">
        <h2 className="text-lg font-semibold">Studio principles</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {principles.map((p) => (
            <li key={p.title} className="retro-card rounded-sm p-6">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
