# Customization Guide

Everything visitor-facing is driven by typed config files in `src/data/` and markdown in `content/blog/`. You should never need to edit a component to change content.

## 1. Identity — `src/data/profile.ts`

```ts
name: "Your Name",
initials: "YN",          // logo monogram (navbar, footer, favicon text)
role: "Software Engineer",
headline / subheadline,   // hero copy
company: { name, url },
location, email,
availability: { open: true, label: "Open to new opportunities" },
careerStart: "2021-07-01" // "X+ years" is computed from this — never hardcoded
resumeUrl: "/resume.pdf",
bio: [...],               // about-page paragraphs
values / goals / journey  // about-page sections
```

Changing `initials` here updates the navbar and footer automatically; also update `public/icon.svg` and the text in `src/app/apple-icon.tsx` to match.

## 2. SEO — `src/data/seo.ts`

**Before deploying, set `siteUrl` to your production domain.** Canonicals, the sitemap, robots.txt, OG URLs, RSS, and JSON-LD all derive from it. Also update `twitterHandle` and `keywords`.

## 3. Skills — `src/data/skills.ts`

Add/remove entries in the `skills` array. Each entry:

```ts
{
  name: "Rust",
  category: "Languages",        // one of the 11 categories in SkillCategory
  icon: SiRust,                 // any react-icons or lucide component
  color: "#f74c00",             // brand tint for the icon + level bar
  years: 2,
  level: "Proficient",          // Expert | Advanced | Proficient | Familiar
  description: "One line about how you use it.",
  projects: ["project-slug"],   // optional links to projects.ts slugs
}
```

The Skills page grid, filters, home marquee (`Expert`/`Advanced` only), resume preview, and command palette all update automatically.

## 4. Projects — `src/data/projects.ts`

Each project powers a card, a full case-study page at `/projects/[slug]`, structured data, and the sitemap. Required fields: `slug`, `title`, `tagline`, `description`, `category`, `status`, `featured`, `timeline`, `techStack`, `features`, `challenges`, `results`, `links`. Optional: `architecture` (rendered as a numbered flow diagram), `caseStudy` (long-form paragraphs), `image`, `video`.

`featured: true` puts a project on the home page. Cards get a deterministic gradient cover from the slug — supply `image` later if you want real screenshots (add the host to `next.config.ts` `remotePatterns` if remote).

## 5. Experience & education — `src/data/experience.ts`

Newest first. `end` omitted = "Present" + a Current badge. `logo` is a 1–2 letter monogram shown in the timeline node. Duration ("2 yrs 3 mos") is computed.

## 6. Blog — `content/blog/*.md`

Drop a markdown file in with frontmatter:

```md
---
title: "Post title"
description: "One-sentence summary (used for SEO + cards)."
date: "2026-07-01"
tags: ["systems", "performance"]
---

## Your first heading
```

Reading time, table of contents (from `##`/`###` headings), syntax highlighting, RSS entry, sitemap entry, and BlogPosting JSON-LD are all automatic.

## 7. Everything else

- **Certifications / Achievements / FAQs** — plain arrays in their respective files; the pages render whatever is there.
- **Navigation** — `src/data/nav.ts`. `navItems` = navbar; `secondaryNavItems` = footer + command palette; both feed the sitemap.
- **Home stats** — `src/data/stats.ts` (first three derive from other configs).
- **Resume PDF** — replace `public/resume.pdf`. The `/resume` page preview renders live from configs, so it never goes stale.

## 8. Changing the look

All design tokens live in `src/app/globals.css`:

- Colors: edit the CSS variables under `:root` (light) and `.dark` (dark).
- The accent is `--accent` + `--glow`; the animated gradient stops are in the `text-gradient` utility.
- Fonts: swap the three `next/font` imports in `src/app/layout.tsx`; the variables flow through `--font-sans`, `--font-display`, `--font-mono`.
- Radii, shadows, and animation timings are in the `@theme` block.

See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for the full token reference.
