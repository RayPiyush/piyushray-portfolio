# SEO Guide

## What is automated

Everything below is generated from `src/data/seo.ts` + the content configs — no manual tag editing:

| Feature                                           | Source                                            |
| ------------------------------------------------- | ------------------------------------------------- |
| Titles (`%s · Name` template) + meta descriptions | `buildMetadata()` per page                        |
| Canonical URLs                                    | `seo.siteUrl` + page path                         |
| Open Graph + Twitter cards                        | root layout + per-page metadata                   |
| OG image (1200×630, branded)                      | `src/app/opengraph-image.tsx`, generated at build |
| `sitemap.xml` (pages + projects + posts)          | `src/app/sitemap.ts`                              |
| `robots.txt`                                      | `src/app/robots.ts`                               |
| RSS feed (`/feed.xml`)                            | `src/app/feed.xml/route.ts`                       |
| PWA manifest                                      | `src/app/manifest.ts`                             |

### Structured data (JSON-LD)

| Schema                                | Where                    |
| ------------------------------------- | ------------------------ |
| `Person` (with `sameAs` social links) | every page (root layout) |
| `WebSite`                             | every page               |
| `BreadcrumbList`                      | every inner page         |
| `SoftwareSourceCode`                  | each project page        |
| `BlogPosting`                         | each blog post           |
| `FAQPage`                             | contact page             |

## Ranking playbook

1. **Own your name.** The `Person` schema + consistent `sameAs` links across GitHub/LinkedIn/X teach Google the entity "you". Use the same display name everywhere.
2. **Submit the sitemap** in Google Search Console and Bing Webmaster Tools on day one.
3. **Write.** Blog posts targeting long-tail technical queries ("kafka consumer lag fix") are the highest-leverage ranking asset a personal site has. Each post ships with correct metadata automatically.
4. **Earn links.** Put the site URL in your GitHub profile, LinkedIn, X bio, conference bios, and package.json `author` fields of your open-source work.
5. **Keep descriptions honest and ≤160 chars** — they're your ad copy in the SERP. Every page's description lives next to its content config.
6. **Performance is ranking.** The site ships statically generated with self-hosted fonts; keep it that way — avoid adding third-party scripts to `layout.tsx`.

## Verifying

- [Rich Results Test](https://search.google.com/test/rich-results) — paste any page URL; expect Person, Breadcrumb, and FAQ detections.
- `View Source` → search `application/ld+json` to inspect emitted schemas.
- [Schema validator](https://validator.schema.org) for the full graph.
