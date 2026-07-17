import { breadcrumbJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  /** Breadcrumb trail — Home is prepended automatically. */
  crumbs: { name: string; path: string }[];
}

/** Standard inner-page hero with breadcrumb structured data. */
export function PageHeader({ eyebrow, title, description, crumbs }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, ...crumbs])} />
      <div className="bg-aurora absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-6 pt-36 pb-16 md:pt-44 md:pb-20">
        <Reveal y={12}>
          <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">
            {eyebrow}
          </p>
        </Reveal>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          <TextReveal text={title} delay={0.1} />
        </h1>
        <Reveal delay={0.35} y={14}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted text-pretty md:text-lg">
            {description}
          </p>
        </Reveal>
      </div>
    </header>
  );
}
