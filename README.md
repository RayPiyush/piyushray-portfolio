# Personal Portfolio

A premium, config-driven personal portfolio built with **Next.js 16 (App Router)**, **TypeScript (strict)**, **Tailwind CSS v4**, and **Framer Motion**. Dark mode by default, Lighthouse-100 targets, full structured data, PWA-ready — and every word of content lives in typed config files.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
npm run format   # Prettier
```

## Make it yours in 10 minutes

All personal content is configuration — no component edits needed:

| File                         | Controls                                                              |
| ---------------------------- | --------------------------------------------------------------------- |
| `src/data/profile.ts`        | Name, role, company, availability, bio, values, journey               |
| `src/data/socials.ts`        | GitHub, LinkedIn, Twitter/X, LeetCode, GFG, HackerRank                |
| `src/data/skills.ts`         | The full skill matrix (category, icon, color, level, years)           |
| `src/data/projects.ts`       | Projects + case studies (features, challenges, results, architecture) |
| `src/data/experience.ts`     | Career timeline + education                                           |
| `src/data/certifications.ts` | Certifications with verification links                                |
| `src/data/achievements.ts`   | Awards and milestones                                                 |
| `src/data/faqs.ts`           | Contact-page FAQ (also emitted as FAQ rich-snippet data)              |
| `src/data/seo.ts`            | **Set `siteUrl` to your domain before deploying**                     |
| `src/data/nav.ts`            | Navigation structure                                                  |
| `content/blog/*.md`          | Blog posts (markdown + frontmatter)                                   |
| `public/resume.pdf`          | Replace the placeholder with your real resume                         |

Full guides live in [`docs/`](docs):

- [CUSTOMIZATION.md](docs/CUSTOMIZATION.md) — every config field explained
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) — Vercel, Netlify, Cloudflare Pages, AWS Amplify
- [SEO.md](docs/SEO.md) — what's automated and what to do after launch
- [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) — tokens, typography, motion guidelines

## What's inside

**Pages** — Home, About, Skills, Experience, Projects (+ case-study pages), Achievements, Certifications, Resume (live preview + PDF), Blog (+ posts), Contact, Privacy, custom 404.

**Experience layer** — command palette (`Ctrl/⌘+K`) searching pages/projects/skills, magnetic buttons, word-by-word text reveals, 3D tilt cards, scroll progress bar, cursor glow, canvas particle field, skills/projects search + filtering, dark/light themes.

**SEO (all automatic)** — per-page titles/descriptions/canonicals, Open Graph + Twitter cards, generated OG image, JSON-LD (Person, WebSite, BreadcrumbList, SoftwareSourceCode, FAQPage, BlogPosting), `sitemap.xml`, `robots.txt`, RSS feed, PWA manifest.

**Accessibility** — semantic landmarks, skip link, focus-visible rings, ARIA labels on all icon buttons, keyboard-navigable command palette, `prefers-reduced-motion` respected by every animation, WCAG-checked contrast in both themes.

**Performance decisions worth knowing**

- No Three.js: the hero's ambient depth comes from a ~1 KB canvas particle field that pauses off-screen — the premium look without a 600 KB dependency.
- Server components by default; client components only where interaction demands it.
- Below-the-fold home sections are dynamically imported; fonts self-hosted via `next/font`; every page is statically generated.

## Architecture

```
src/
├── app/            # App Router pages, sitemap, robots, manifest, RSS, OG image
├── components/
│   ├── ui/         # Design-system primitives (Button, Badge, Card, Tag, …)
│   ├── motion/     # Animation primitives (Reveal, TextReveal, Magnetic, Tilt, …)
│   ├── layout/     # Navbar, Footer, CommandPalette, ThemeToggle, …
│   ├── home/       # Hero, CodeWindow, ParticleField, Stats, …
│   ├── projects/   # ProjectCard, ProjectsExplorer
│   ├── skills/     # SkillsExplorer
│   ├── experience/ # Timeline
│   ├── contact/    # ContactForm
│   ├── shared/     # PageHeader
│   └── seo/        # JsonLd
├── data/           # ← All content lives here (the "CMS")
└── lib/            # utils, blog pipeline, metadata + JSON-LD builders
content/blog/       # Markdown blog posts
docs/               # Guides
```

## License

Personal project — fork it, customize it, ship it.
