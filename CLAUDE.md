# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # dev server at http://localhost:3000
npm run build         # production build (Turbopack) — also runs the TypeScript check
npm run start         # serve the production build
npm run lint          # ESLint (flat config, eslint-config-next + strict react-hooks rules)
npm run format        # Prettier
npx tsc --noEmit      # type-check only (faster than a full build)
```

There is no test suite. Verification = clean build + lint + hitting routes on the dev server.

## Architecture

Next.js 16 App Router, TypeScript strict, Tailwind CSS v4, Framer Motion. All pages are statically generated except `/feed.xml`.

**The core invariant: content is configuration.** Every visitor-facing string lives in `src/data/*` (typed via `src/data/types.ts`) or `content/blog/*.md` — never hardcode names, numbers, or copy in components. Data files fan out widely: e.g. `projects.ts` drives the cards, `/projects/[slug]` case-study pages, `generateStaticParams`, JSON-LD, sitemap, and the command palette; `profile.careerStart` auto-computes "X+ years" everywhere via `yearsOfExperience`. When adding a page, register it in `src/data/nav.ts` (which feeds navbar/footer/command palette/sitemap).

**Real vs. placeholder content:** `profile.ts` holds the user's real details (Piyush Ray, Delhi NCR, career start 2024, employer private — `profile.company` is `null` and hero/about/JSON-LD conditionally omit it; keep that null-handling when touching those). `experience.ts`, `projects.ts`, `skills.ts` (year counts), `testimonials.ts`, `certifications.ts`, `achievements.ts`, social usernames, and `seo.ts siteUrl` are still invented placeholders — don't present them as real history.

**Design system** lives entirely in `src/app/globals.css`: Tailwind v4 CSS-first `@theme` block + semantic CSS variables switched by `.dark` (class-driven via next-themes, dark default). Components reference only semantic tokens (`bg-surface`, `text-muted`, `border-strong`, `glass`, `bg-aurora`, `text-gradient`) — never raw hex. Docs: `docs/DESIGN_SYSTEM.md`.

**Server/client split:** server components by default; `"use client"` only for interaction/motion. Motion primitives (`components/motion/`: Reveal, Stagger, TextReveal, Magnetic, TiltCard, AnimatedCounter) are client wrappers that server pages compose. Every animation must respect `prefers-reduced-motion` (`useReducedMotion` or the CSS media query). Deliberate constraint: no Three.js — the hero uses a ~1KB canvas particle field (`components/home/particle-field.tsx`) to protect the Lighthouse-100 budget.

**SEO plumbing:** per-page metadata via `buildMetadata()` (`src/lib/metadata.ts`); JSON-LD builders in `src/lib/jsonld.ts` rendered through `components/seo/json-ld.tsx`; sitemap/robots/manifest/OG image/RSS are all code-generated in `src/app/`. Everything derives from `src/data/seo.ts` — `siteUrl` must be set to the real domain before deploying.

**Blog:** drop a `.md` file with `title/description/date/tags` frontmatter into `content/blog/` — listing, reading time, TOC (from `##`/`###`), syntax highlighting, RSS, sitemap, and BlogPosting JSON-LD are automatic (`src/lib/blog.ts`).

## Gotchas

- **Icon libraries:** the installed `lucide-react` (v1.x) has no brand icons (`Github` doesn't exist — use `react-icons/si`), and `react-icons`'s simple-icons set lacks `SiAmazonwebservices` (use `FaAws` from `react-icons/fa`). Verify exports exist before adding icons.
- **React hooks lint is strict:** `react-hooks/set-state-in-effect` errors on synchronous `setState` inside effects. Use the render-time state-adjustment pattern instead (see `navbar.tsx` / `command-palette.tsx` for the `prevX !== x` pattern).
- `params` in dynamic routes is a Promise (Next 16) — `await params` in pages and `generateMetadata`.
