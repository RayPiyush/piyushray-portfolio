import { profile } from "./profile";

/**
 * ── EDIT ME ── Site-wide SEO configuration.
 * Set `siteUrl` to your production domain before deploying —
 * canonical URLs, sitemap, robots, OG images, and JSON-LD all derive from it.
 */
export const seo = {
  /** ⚠ Set this to your real domain when you deploy (e.g. your Vercel URL
   *  or custom domain) — canonicals, sitemap, OG, and JSON-LD derive from it. */
  siteUrl: "https://piyushray.vercel.app",
  siteName: `${profile.name} — ${profile.role}`,
  defaultTitle: `${profile.name} · ${profile.role}`,
  titleTemplate: `%s · ${profile.name}`,
  description: `${profile.name} is a ${profile.role.toLowerCase()} specializing in distributed systems, cloud-native backend services, and premium web experiences. Explore projects, experience, and writing.`,
  keywords: [
    profile.name,
    "Software Engineer",
    "Backend Engineer",
    "Full Stack Developer",
    "Distributed Systems",
    "Spring Boot",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Delhi NCR",
  ],
  twitterHandle: "@piyush08_ray",
  locale: "en_US",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, seo.siteUrl).toString();
}
