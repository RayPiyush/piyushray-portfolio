import Link from "next/link";
import { ArrowUpRight, GitBranch } from "lucide-react";
import type { Project } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/components/ui/tag";
import { TiltCard } from "@/components/motion/tilt-card";
import { cn } from "@/lib/utils";

/** Deterministic gradient per project so covers look intentional without images. */
function coverGradient(slug: string) {
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) % 360;
  const h1 = hash;
  const h2 = (hash + 60) % 360;
  return `linear-gradient(135deg, hsl(${h1} 65% 55% / 0.25), hsl(${h2} 70% 50% / 0.12))`;
}

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <TiltCard className={cn("h-full", className)}>
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${project.title} — ${project.tagline}`}
        className="group glass ring-hairline flex h-full flex-col overflow-hidden rounded-2xl shadow-soft transition-all duration-300 hover:border-strong hover:shadow-raised"
      >
        {/* Cover */}
        <div
          className="relative flex h-40 items-end overflow-hidden p-5"
          style={{ background: coverGradient(project.slug) }}
        >
          <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
          <span
            aria-hidden
            className="font-display absolute top-4 left-5 text-5xl font-bold tracking-tight text-foreground/10 transition-transform duration-500 group-hover:scale-105"
          >
            {project.title.slice(0, 2)}
          </span>
          <div className="relative flex w-full items-center justify-between">
            <Badge variant={project.status === "Live" ? "success" : "accent"} size="sm">
              {project.status}
            </Badge>
            <span className="glass flex size-8 items-center justify-center rounded-full text-muted transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 font-mono text-[11px] text-subtle">
            <GitBranch className="size-3" aria-hidden />
            {project.category}
          </div>
          <h3 className="font-display mt-2 text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
            {project.tagline}
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
            {project.techStack.length > 4 ? (
              <Tag>+{project.techStack.length - 4}</Tag>
            ) : null}
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
