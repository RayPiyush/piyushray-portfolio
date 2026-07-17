"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Compass,
  FileText,
  FolderGit2,
  Moon,
  Search,
  Sparkles,
  Sun,
  Wrench,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { allNavItems } from "@/data/nav";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { socials } from "@/data/socials";
import { cn } from "@/lib/utils";
import { useCommandPalette } from "./command-palette-context";

interface CommandItem {
  id: string;
  group: string;
  label: string;
  hint?: string;
  keywords: string;
  action: () => void;
}

/** Ctrl/Cmd+K command palette — navigate pages, search projects & skills, switch theme. */
export function CommandPalette() {
  const { isOpen, close } = useCommandPalette();
  const router = useRouter();
  const { setTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const items = useMemo<CommandItem[]>(
    () => [
      ...allNavItems.map((item) => ({
        id: `nav-${item.href}`,
        group: "Pages",
        label: item.label,
        hint: item.description,
        keywords: `${item.label} ${item.description}`,
        action: () => router.push(item.href),
      })),
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        group: "Projects",
        label: p.title,
        hint: p.tagline,
        keywords: `${p.title} ${p.tagline} ${p.techStack.join(" ")} ${p.category}`,
        action: () => router.push(`/projects/${p.slug}`),
      })),
      ...skills.map((s) => ({
        id: `skill-${s.name}`,
        group: "Skills",
        label: s.name,
        hint: `${s.category} · ${s.level}`,
        keywords: `${s.name} ${s.category} ${s.level} ${s.description}`,
        action: () => router.push("/skills"),
      })),
      ...socials.map((s) => ({
        id: `social-${s.name}`,
        group: "Socials",
        label: s.name,
        hint: `@${s.username}`,
        keywords: `${s.name} ${s.username} social profile`,
        action: () => window.open(s.url, "_blank", "noopener,noreferrer"),
      })),
      {
        id: "theme-dark",
        group: "Theme",
        label: "Switch to dark theme",
        keywords: "dark theme mode night",
        action: () => setTheme("dark"),
      },
      {
        id: "theme-light",
        group: "Theme",
        label: "Switch to light theme",
        keywords: "light theme mode day",
        action: () => setTheme("light"),
      },
    ],
    [router, setTheme],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 12);
    return items.filter((item) => item.keywords.toLowerCase().includes(q)).slice(0, 12);
  }, [items, query]);

  // Reset search state whenever the palette opens or the query changes
  // (state adjustment during render — avoids cascading effect renders).
  const [prevOpen, setPrevOpen] = useState(isOpen);
  if (prevOpen !== isOpen) {
    setPrevOpen(isOpen);
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
    }
  }
  const [prevQuery, setPrevQuery] = useState(query);
  if (prevQuery !== query) {
    setPrevQuery(query);
    setActiveIndex(0);
  }

  // Focus the input once the dialog is mounted.
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [isOpen]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  function runItem(item: CommandItem) {
    close();
    item.action();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[activeIndex];
      if (item) runItem(item);
    }
  }

  // Keep the active option scrolled into view.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const groupIcons: Record<string, typeof Compass> = {
    Pages: Compass,
    Projects: FolderGit2,
    Skills: Wrench,
    Socials: Sparkles,
    Theme: Sun,
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 px-4 pt-[14vh] backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-raised"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="size-4 shrink-0 text-subtle" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, projects, skills…"
                aria-label="Search commands"
                className="h-13 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-subtle"
              />
              <kbd className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-subtle">
                ESC
              </kbd>
            </div>

            <ul
              ref={listRef}
              role="listbox"
              aria-label="Search results"
              className="max-h-[46vh] overflow-y-auto p-2"
            >
              {filtered.length === 0 ? (
                <li className="px-4 py-10 text-center text-sm text-subtle">
                  No results for “{query}”
                </li>
              ) : (
                filtered.map((item, index) => {
                  const Icon = groupIcons[item.group] ?? FileText;
                  const isDark = item.id === "theme-dark";
                  const ThemeIcon = isDark ? Moon : Icon;
                  return (
                    <li key={item.id} role="option" aria-selected={index === activeIndex}>
                      <button
                        type="button"
                        data-index={index}
                        onClick={() => runItem(item)}
                        onMouseMove={() => setActiveIndex(index)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                          index === activeIndex
                            ? "bg-accent-soft text-foreground"
                            : "text-muted",
                        )}
                      >
                        <ThemeIcon
                          className={cn(
                            "size-4 shrink-0",
                            index === activeIndex ? "text-accent" : "text-subtle",
                          )}
                          aria-hidden
                        />
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="truncate text-sm">{item.label}</span>
                          {item.hint ? (
                            <span className="truncate text-xs text-subtle">
                              {item.hint}
                            </span>
                          ) : null}
                        </span>
                        <span className="shrink-0 font-mono text-[10px] tracking-wider text-subtle uppercase">
                          {item.group}
                        </span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
