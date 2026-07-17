"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { useCommandPalette } from "./command-palette-context";

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { open: openPalette } = useCommandPalette();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation (state adjustment during render).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Main navigation"
        className={cn(
          "flex w-full max-w-5xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-500 md:px-5",
          scrolled || mobileOpen
            ? "glass shadow-soft"
            : "border border-transparent bg-transparent",
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-lg font-display text-base font-semibold tracking-tight"
          aria-label={`${profile.name} — home`}
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent font-mono text-xs font-bold text-accent-foreground shadow-glow transition-transform duration-300 group-hover:scale-105">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.firstName}</span>
          <span className="hidden font-mono text-xs text-subtle sm:inline">
            /{profile.role.toLowerCase().replace(/\s+/g, "-")}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-200",
                    active ? "text-foreground" : "text-muted hover:text-foreground",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="nav-pill"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 400, damping: 34 }
                      }
                      className="absolute inset-0 rounded-full bg-surface border border-border"
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette (Ctrl+K)"
            className="glass hidden h-10 items-center gap-2 rounded-full px-3.5 text-xs text-muted transition-colors hover:text-foreground hover:border-strong md:flex"
          >
            <Command className="size-3.5" aria-hidden />
            <span className="font-mono">⌘K</span>
          </button>
          <ThemeToggle />
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="glass flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground md:hidden"
          >
            {mobileOpen ? (
              <X className="size-[18px]" />
            ) : (
              <Menu className="size-[18px]" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass absolute top-full right-4 left-4 mt-2 rounded-2xl p-3 shadow-raised md:hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex flex-col rounded-xl px-4 py-3 transition-colors",
                        active
                          ? "bg-surface text-foreground"
                          : "text-muted hover:bg-surface hover:text-foreground",
                      )}
                    >
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-xs text-subtle">{item.description}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
