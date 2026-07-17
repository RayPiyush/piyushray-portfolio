import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { buildMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/shared/page-header";
import { SkillsExplorer } from "@/components/skills/skills-explorer";
import { CtaBand } from "@/components/home/cta-band";

export const metadata = buildMetadata({
  title: "Skills",
  description: `The full technology matrix of ${profile.name}: ${skills.length}+ skills across languages, backend, frontend, cloud, DevOps, databases, messaging, security, and architecture.`,
  path: "/skills",
  keywords: skills.map((s) => s.name),
});

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="A toolbox built in production"
        description="Every skill below has shipped real software. Levels reflect honest self-assessment — search or filter to explore."
        crumbs={[{ name: "Skills", path: "/skills" }]}
      />
      <section aria-label="Skill matrix" className="mx-auto max-w-5xl px-6 pb-24">
        <SkillsExplorer />
      </section>
      <CtaBand />
    </>
  );
}
