import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { ScrollyProjectShell } from "@/components/projects/ScrollyProjectShell";
import { getProject, projects } from "@/lib/projects-registry";
import { HeritageSignalChart } from "@/projects/heritage-signal/components/HeritageSignalChart";
import { MidnightCensusScrolly } from "@/projects/midnight-census/components/MidnightCensusScrolly";
import { RiverCurrentsChart } from "@/projects/river-currents/components/RiverCurrentsChart";
import { UrbanBreathChart } from "@/projects/urban-breath/components/UrbanBreathChart";

const visualizations: Record<string, ComponentType> = {
  "urban-breath": UrbanBreathChart,
  "river-currents": RiverCurrentsChart,
  "heritage-signal": HeritageSignalChart,
  "midnight-census": MidnightCensusScrolly,
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.excerpt,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const Viz = visualizations[slug];
  if (!Viz) notFound();

  if (project.presentation === "scrolly") {
    return (
      <ScrollyProjectShell project={project}>
        <Viz />
      </ScrollyProjectShell>
    );
  }

  return (
    <ProjectDetail project={project}>
      <Viz />
    </ProjectDetail>
  );
}
