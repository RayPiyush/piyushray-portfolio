"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { skillCategories, skills } from "@/data/skills";
import type { SkillLevel } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const levelWidth: Record<SkillLevel, string> = {
  Expert: "w-full",
  Advanced: "w-3/4",
  Proficient: "w-1/2",
  Familiar: "w-1/4",
};

const levelValue: Record<SkillLevel, number> = {
  Expert: 100,
  Advanced: 75,
  Proficient: 50,
  Familiar: 25,
};

/** Interactive skill matrix — search + category filter over skills.ts. */
export function SkillsExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skills.filter((skill) => {
      const matchesCategory = category === "All" || skill.category === category;
      const matchesQuery =
        !q ||
        `${skill.name} ${skill.category} ${skill.level} ${skill.description}`
          .toLowerCase()
          .includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div>
      {/* Controls */}
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
            placeholder="Search skills…"
            aria-label="Search skills"
            className="pl-11"
          />
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter skills by category"
        >
          {["All", ...skillCategories].map((cat) => (
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

      {/* Results */}
      <p className="mb-6 font-mono text-xs text-subtle" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "skill" : "skills"}
        {category !== "All" ? ` in ${category}` : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center text-sm text-muted">
          No skills match “{query}” — try a different search.
        </div>
      ) : (
        <motion.ul
          layout={!reduceMotion}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <motion.li
                key={skill.name}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <article className="group glass ring-hairline flex h-full flex-col rounded-2xl p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-strong hover:shadow-raised">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="flex size-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${skill.color}1a` }}
                    >
                      <skill.icon
                        className="size-5"
                        style={{ color: skill.color }}
                        aria-hidden
                      />
                    </span>
                    <Badge size="sm">{skill.category}</Badge>
                  </div>
                  <h3 className="font-display mt-4 text-base font-semibold tracking-tight">
                    {skill.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted">
                    {skill.description}
                  </p>

                  {/* Level meter */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-foreground">{skill.level}</span>
                      <span className="font-mono text-subtle">
                        {skill.years} {skill.years === 1 ? "yr" : "yrs"}
                      </span>
                    </div>
                    <div
                      className="mt-1.5 h-1 overflow-hidden rounded-full bg-border"
                      role="meter"
                      aria-label={`${skill.name} proficiency: ${skill.level}`}
                      aria-valuenow={levelValue[skill.level]}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          levelWidth[skill.level],
                        )}
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
                  </div>

                  {skill.projects?.length ? (
                    <p className="mt-3 text-[11px] text-subtle">
                      Used in{" "}
                      {skill.projects.map((slug, i) => (
                        <span key={slug}>
                          {i > 0 ? ", " : ""}
                          <Link
                            href={`/projects/${slug}`}
                            className="text-accent hover:underline"
                          >
                            {slug}
                          </Link>
                        </span>
                      ))}
                    </p>
                  ) : null}
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
