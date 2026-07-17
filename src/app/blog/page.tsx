import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { profile } from "@/data/profile";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import { Tag } from "@/components/ui/tag";
import { Card } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Reveal } from "@/components/motion/reveal";

export const metadata = buildMetadata({
  title: "Blog",
  description: `Writing by ${profile.name} on distributed systems, backend engineering, and the craft of building software that lasts.`,
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes from the trenches"
        description="Long-form writing on distributed systems, performance, and engineering craft — lessons paid for in production."
        crumbs={[{ name: "Blog", path: "/blog" }]}
      />
      <section aria-label="Blog posts" className="mx-auto max-w-3xl px-6 pb-24">
        {posts.length === 0 ? (
          <Card className="p-12 text-center text-sm text-muted">
            First post is being written — subscribe to the{" "}
            <a href="/feed.xml" className="text-accent hover:underline">
              RSS feed
            </a>{" "}
            to catch it.
          </Card>
        ) : (
          <Stagger className="space-y-5">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group glass ring-hairline block rounded-2xl p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-strong hover:shadow-raised"
                >
                  <div className="flex items-center gap-3 font-mono text-xs text-subtle">
                    <time dateTime={post.date}>
                      {formatDate(post.date, { day: "numeric" })}
                    </time>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" aria-hidden />
                      {post.readingMinutes} min read
                    </span>
                  </div>
                  <h2 className="font-display mt-3 flex items-start justify-between gap-4 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {post.title}
                    <ArrowUpRight
                      className="mt-1 size-4 shrink-0 text-subtle transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      aria-hidden
                    />
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {post.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <Reveal className="mt-12">
          <Card className="bg-aurora flex flex-col items-center gap-3 p-8 text-center">
            <h2 className="font-display text-lg font-semibold tracking-tight">
              Newsletter — coming soon
            </h2>
            <p className="max-w-md text-sm text-muted">
              Deep dives on systems engineering, straight to your inbox. Until then, the{" "}
              <a href="/feed.xml" className="text-accent hover:underline">
                RSS feed
              </a>{" "}
              has everything the moment it ships.
            </p>
          </Card>
        </Reveal>
      </section>
    </>
  );
}
