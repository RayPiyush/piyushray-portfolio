"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { projectCategories, projects } from "@/data/projects";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

/** Searchable, filterable project grid over projects.ts. */
export function ProjectsExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = category === "All" || project.category === category;
      const haystack =
        `${project.title} ${project.tagline} ${project.description} ${project.techStack.join(" ")}`.toLowerCase();
      return matchesCategory && (!q || haystack.includes(q));
    });
  }, [query, category]);

  return (
    <div>
      <div className="mb-10 space-y-5">
        <div className="relative max-w-md">
          <Search
            className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-subtle"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects by name or tech…"
            aria-label="Search projects"
            className="pl-11"
          />
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200",
                category === cat
                  ? "border-accent bg-accent text-accent-foreground shadow-glow"
                  : "glass text-muted hover:border-strong hover:text-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-6 font-mono text-xs text-subtle" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </p>

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center text-sm text-muted">
          Nothing matches “{query}” — try another search or category.
        </div>
      ) : (
        <motion.ul
          layout={!reduceMotion}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.li
                key={project.slug}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
