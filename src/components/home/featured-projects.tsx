import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";

export function FeaturedProjects() {
  return (
    <section
      aria-labelledby="featured-projects-heading"
      className="mx-auto max-w-5xl px-6 py-24"
    >
      <SectionHeading
        eyebrow="Selected work"
        title="Projects built to production standards"
        description="Systems handling real traffic, real money, and real users — each one a case study in trade-offs."
      />
      <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" interval={0.12}>
        {featuredProjects.map((project) => (
          <StaggerItem key={project.slug} className="h-full">
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal className="mt-12 flex justify-center">
        <Link href="/projects" className={buttonVariants({ variant: "outline" })}>
          View all projects
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </Reveal>
    </section>
  );
}
