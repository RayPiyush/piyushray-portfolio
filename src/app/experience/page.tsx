import { profile, yearsOfExperience } from "@/data/profile";
import { buildMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/shared/page-header";
import { ExperienceTimeline } from "@/components/experience/timeline";
import { CtaBand } from "@/components/home/cta-band";

export const metadata = buildMetadata({
  title: "Experience",
  description: `${yearsOfExperience}+ years of professional experience: the roles, teams, and shipped outcomes behind ${profile.name}'s engineering career.`,
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Roles, teams, and shipped outcomes"
        description="A timeline of where I've worked and — more importantly — what actually made it to production."
        crumbs={[{ name: "Experience", path: "/experience" }]}
      />
      <section aria-label="Career timeline" className="mx-auto max-w-4xl px-6 pb-24">
        <ExperienceTimeline />
      </section>
      <CtaBand />
    </>
  );
}
