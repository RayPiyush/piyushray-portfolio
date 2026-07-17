import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/shared/page-header";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { CtaBand } from "@/components/home/cta-band";

export const metadata = buildMetadata({
  title: "Projects",
  description: `${projects.length} projects by ${profile.name} — distributed systems, developer tools, and full-stack products, each with a full case study.`,
  path: "/projects",
  keywords: projects.flatMap((p) => p.techStack),
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Work that carries real traffic"
        description="Every project here is a case study — the problem, the architecture, the trade-offs, and the measured results."
        crumbs={[{ name: "Projects", path: "/projects" }]}
      />
      <section aria-label="All projects" className="mx-auto max-w-5xl px-6 pb-24">
        <ProjectsExplorer />
      </section>
      <CtaBand />
    </>
  );
}
