import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { getAllPosts, getPost } from "@/lib/blog";
import { buildMetadata } from "@/lib/metadata";
import { blogPostJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { formatDate, cn } from "@/lib/utils";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          blogPostJsonLd(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <div className="mx-auto max-w-6xl px-6 pt-36 pb-24 md:pt-44">
        <Reveal y={12}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            All posts
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_240px]">
          <article className="min-w-0">
            <header>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-subtle">
                <time dateTime={post.date}>
                  {formatDate(post.date, { day: "numeric" })}
                </time>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3" aria-hidden />
                  {post.readingMinutes} min read
                </span>
              </div>
              <h1 className="font-display mt-4 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                <TextReveal text={post.title} />
              </h1>
              <Reveal delay={0.25} y={12}>
                <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                  {post.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </Reveal>
            </header>

            <Reveal delay={0.35}>
              <div className="prose-blog mt-10 border-t border-border pt-10">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSlug, rehypeHighlight]}
                >
                  {post.content}
                </Markdown>
              </div>
            </Reveal>
          </article>

          {/* Table of contents */}
          {post.toc.length > 0 ? (
            <aside className="hidden lg:block">
              <nav
                aria-label="Table of contents"
                className="sticky top-28 rounded-2xl border border-border p-5"
              >
                <p className="font-mono text-[11px] tracking-[0.2em] text-subtle uppercase">
                  On this page
                </p>
                <ul className="mt-4 space-y-2.5 border-l border-border">
                  {post.toc.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className={cn(
                          "-ml-px block border-l border-transparent text-[13px] leading-snug text-muted transition-colors hover:border-accent hover:text-foreground",
                          heading.depth === 2 ? "pl-4" : "pl-7 text-subtle",
                        )}
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          ) : null}
        </div>
      </div>
    </>
  );
}
