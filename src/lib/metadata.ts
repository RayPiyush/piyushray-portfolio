import type { Metadata } from "next";
import { absoluteUrl } from "@/data/seo";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
}

/** Consistent per-page metadata: canonical URL, OG, and Twitter cards. */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: { title, description, url, type },
    twitter: { card: "summary_large_image", title, description },
  };
}
