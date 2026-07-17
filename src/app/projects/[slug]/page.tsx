import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  CircleCheck,
  Layers,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { getProject, projects } from "@/data/projects";
import { buildMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { buttonVariants } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { CtaBand } from "@/components/home/cta-band";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.title} — ${project.tagline}`,
    description: project.description,
    path: `/projects/${project.slug}`,
    keywords: project.techStack,
    type: "article",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd
        data={[
          projectJsonLd(project),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
        ]}
      />

      <article className="mx-auto max-w-4xl px-6 pt-36 pb-24 md:pt-44">
        {/* Header */}
        <Reveal y={12}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            All projects
          </Link>
        </Reveal>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={project.status === "Live" ? "success" : "accent"}>
              {project.status}
            </Badge>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-subtle">
              <Calendar className="size-3.5" aria-hidden />
              {project.timeline}
            </span>
            <span className="font-mono text-xs text-subtle">{project.category}</span>
          </div>
          <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            <TextReveal text={project.title} />
          </h1>
          <Reveal delay={0.2} y={14}>
            <p className="mt-4 text-lg text-muted md:text-xl">{project.tagline}</p>
          </Reveal>
        </header>

        {/* Links + stack */}
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "primary", size: "sm" })}
              >
                <SiGithub className="size-4" aria-hidden />
                Source code
              </a>
            ) : null}
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Live demo
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            ) : null}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </Reveal>

        {/* Overview */}
        <Reveal className="mt-12">
          <p className="text-base leading-relaxed text-muted md:text-lg">
            {project.description}
          </p>
        </Reveal>

        {/* Case study narrative */}
        {project.caseStudy?.length ? (
          <section aria-labelledby="case-study" className="mt-14">
            <h2
              id="case-study"
              className="font-display text-2xl font-semibold tracking-tight"
            >
              Case study
            </h2>
            <Stagger className="mt-6 space-y-5">
              {project.caseStudy.map((paragraph) => (
                <StaggerItem key={paragraph.slice(0, 24)}>
                  <p className="text-base leading-relaxed text-muted">{paragraph}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        ) : null}

        {/* Architecture */}
        {project.architecture?.length ? (
          <section aria-labelledby="architecture" className="mt-14">
            <h2
              id="architecture"
              className="font-display flex items-center gap-2.5 text-2xl font-semibold tracking-tight"
            >
              <Layers className="size-5 text-accent" aria-hidden />
              Architecture
            </h2>
            <Reveal className="mt-6">
              <Card className="bg-surface-raised font-mono text-[13px] leading-loose">
                <ol className="space-y-2">
                  {project.architecture.map((line, index) => (
                    <li key={line} className="flex gap-4">
                      <span className="shrink-0 text-subtle select-none">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-muted">{line}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            </Reveal>
          </section>
        ) : null}

        {/* Features / Challenges / Results */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <Reveal className="h-full">
            <Card className="h-full">
              <h2 className="font-display flex items-center gap-2 text-base font-semibold">
                <CircleCheck className="size-4 text-success" aria-hidden />
                Features
              </h2>
              <ul className="mt-4 space-y-3">
                {project.features.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1 shrink-0 rounded-full bg-success"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <Card className="h-full">
              <h2 className="font-display flex items-center gap-2 text-base font-semibold">
                <Lightbulb className="size-4 text-warning" aria-hidden />
                Challenges
              </h2>
              <ul className="mt-4 space-y-3">
                {project.challenges.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1 shrink-0 rounded-full bg-warning"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.16} className="h-full">
            <Card className="h-full">
              <h2 className="font-display flex items-center gap-2 text-base font-semibold">
                <TrendingUp className="size-4 text-accent" aria-hidden />
                Results
              </h2>
              <ul className="mt-4 space-y-3">
                {project.results.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </article>

      <CtaBand />
    </>
  );
}
