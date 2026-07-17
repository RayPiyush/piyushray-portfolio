import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { readingTime, slugify } from "./utils";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingMinutes: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  toc: { id: string; text: string; depth: 2 | 3 }[];
}

/**
 * Blog posts live as markdown files in content/blog/*.md with frontmatter:
 * title, description, date (YYYY-MM-DD), tags. Drop a file in — it appears
 * on /blog, in the sitemap, and in the RSS feed automatically.
 */
export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title ?? "Untitled"),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        readingMinutes: readingTime(content),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  // Extract h2/h3 headings for the table of contents.
  const toc: BlogPost["toc"] = [];
  for (const line of content.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (match?.[1] && match[2]) {
      toc.push({
        id: slugify(match[2]),
        text: match[2],
        depth: match[1].length as 2 | 3,
      });
    }
  }

  return {
    slug,
    title: String(data.title ?? "Untitled"),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: readingTime(content),
    content,
    toc,
  };
}
