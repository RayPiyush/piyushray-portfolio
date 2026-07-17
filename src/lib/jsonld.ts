import { faqs } from "@/data/faqs";
import { profile } from "@/data/profile";
import { seo, absoluteUrl } from "@/data/seo";
import { socials } from "@/data/socials";
import type { Project } from "@/data/types";

/**
 * Schema.org JSON-LD builders. Rendered via <script type="application/ld+json">
 * so Google can show rich results (person panel, breadcrumbs, FAQs, projects).
 */

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${seo.siteUrl}/#person`,
    name: profile.name,
    url: seo.siteUrl,
    email: `mailto:${profile.email}`,
    jobTitle: profile.role,
    ...(profile.company
      ? {
          worksFor: {
            "@type": "Organization",
            name: profile.company.name,
            url: profile.company.url,
          },
        }
      : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    description: seo.description,
    sameAs: socials.map((s) => s.url),
    knowsAbout: [
      "Distributed Systems",
      "Backend Engineering",
      "Cloud Architecture",
      "Web Development",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${seo.siteUrl}/#website`,
    url: seo.siteUrl,
    name: seo.siteName,
    description: seo.description,
    publisher: { "@id": `${seo.siteUrl}/#person` },
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    url: absoluteUrl(`/projects/${project.slug}`),
    codeRepository: project.links.github,
    programmingLanguage: project.techStack,
    author: { "@id": `${seo.siteUrl}/#person` },
    keywords: project.techStack.join(", "),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function blogPostJsonLd(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.date,
    keywords: post.tags.join(", "),
    author: { "@id": `${seo.siteUrl}/#person` },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}

/** Serialize a schema object for a <script type="application/ld+json"> tag. */
export function jsonLdScript(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
