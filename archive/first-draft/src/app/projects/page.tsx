import type { Metadata } from "next";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/projects-registry";

export const metadata: Metadata = {
  title: "Projects",
  description: "Interactive data visualization portfolio by Eyelight Labs.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-14">
      <SectionHeading
        label="Portfolio"
        title="Data visualization projects"
        description="Each project lives in its own folder under src/projects/ with documented config, data, and D3 components — ready for you to extend or restyle."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
