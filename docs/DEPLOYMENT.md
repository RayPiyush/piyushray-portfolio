# Deployment Guide

The site is a standard Next.js 16 app — fully static-generated except the RSS route — so it deploys anywhere Next.js runs.

## Before every deploy

1. Set `siteUrl` in `src/data/seo.ts` to your production domain.
2. Replace `public/resume.pdf` with your real resume.
3. `npm run build` locally — the build must be clean.

## Vercel (recommended)

1. Push the repo to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repo.
3. Framework preset: **Next.js** (auto-detected). No env vars needed.
4. Deploy. Add your custom domain under **Settings → Domains**.

Every push to `main` redeploys; PRs get preview URLs.

## Netlify

1. [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
2. Build command `npm run build`, publish directory `.next`.
3. Netlify's Next.js runtime is detected automatically (or `npm i -D @netlify/plugin-nextjs` and add it to `netlify.toml`).

## Cloudflare Pages

1. Create a Pages project from the repo.
2. Framework preset: **Next.js** (uses `@cloudflare/next-on-pages` / OpenNext).
3. Build command `npx @cloudflare/next-on-pages@latest`, output `.vercel/output/static`.
4. Add the `nodejs_compat` compatibility flag in project settings.

## AWS Amplify

1. Amplify Console → **Host web app** → connect the repo.
2. Amplify detects Next.js (SSR/WEB_COMPUTE). Default build settings work:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands: ["npm ci"]
    build:
      commands: ["npm run build"]
  artifacts:
    baseDirectory: .next
    files: ["**/*"]
  cache:
    paths: ["node_modules/**/*", ".next/cache/**/*"]
```

## Post-deploy checklist

- [ ] `https://yourdomain.com/sitemap.xml`, `/robots.txt`, `/feed.xml`, `/manifest.webmanifest` respond
- [ ] Submit the sitemap in [Google Search Console](https://search.google.com/search-console)
- [ ] Validate structured data with the [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Check a social share preview (OG image) with [opengraph.xyz](https://www.opengraph.xyz)
- [ ] Run Lighthouse (Chrome DevTools → Lighthouse) on the deployed URL
