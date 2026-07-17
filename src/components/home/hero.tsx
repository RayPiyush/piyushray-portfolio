import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { profile, yearsOfExperience } from "@/data/profile";
import { primarySocials } from "@/data/socials";
import { buttonVariants } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { ParticleField } from "./particle-field";
import { CodeWindow } from "./code-window";

/**
 * Server-rendered word-by-word headline reveal using CSS animations only.
 * Words stay visible from the first frame (soft rise, no clipping mask) so
 * the headline is painted — and LCP-counted — immediately at first paint.
 */
function HeadlineReveal({ text, delay }: { text: string; delay: number }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-block">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="animate-rise-word inline-block pb-1 align-bottom will-change-transform"
            style={{ animationDelay: `${delay + i * 0.045}s` }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </>
  );
}

/** CSS fade-up wrapper for hero blocks — visible pre-hydration. */
function FadeUp({
  delay,
  className,
  children,
}: {
  delay: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="animate-fade-up" style={{ animationDelay: `${delay}s` }}>
        {children}
      </div>
    </div>
  );
}

/** Landing hero — server component; entrances are pure CSS for fast LCP. */
export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-label="Introduction">
      {/* Ambient background layers */}
      <div className="bg-aurora absolute inset-0" aria-hidden />
      <div
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
        aria-hidden
      />
      <ParticleField className="absolute inset-0 size-full" />

      <div className="relative mx-auto grid max-w-5xl gap-14 px-6 pt-40 pb-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:pt-48 lg:pb-32">
        <div>
          {/* Availability + location */}
          <FadeUp delay={0}>
            <div className="flex flex-wrap items-center gap-3">
              {profile.availability.open ? (
                <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-muted">
                  <span className="relative flex size-2" aria-hidden>
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-success" />
                  </span>
                  {profile.availability.label}
                </span>
              ) : null}
              <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-muted">
                <MapPin className="size-3 text-accent" aria-hidden />
                {profile.location}
              </span>
            </div>
          </FadeUp>

          {/* Headline */}
          <h1 className="mt-8 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            <HeadlineReveal text="I build resilient systems" delay={0.05} />{" "}
            <span className="text-gradient animate-gradient-pan">
              <HeadlineReveal text="and refined experiences." delay={0.25} />
            </span>
          </h1>

          <FadeUp delay={0.3}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {profile.name} — {profile.role}
              {profile.company ? (
                <>
                  {" at "}
                  <a
                    href={profile.company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    {profile.company.name}
                  </a>
                </>
              ) : null}
              , with {yearsOfExperience}+ years turning hard problems into elegant,
              production-grade software.
            </p>
          </FadeUp>

          {/* CTAs */}
          <FadeUp delay={0.45}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="/projects"
                  className={buttonVariants({ variant: "accent", size: "lg" })}
                >
                  Explore my work
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  href={profile.resumeUrl}
                  download
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  <Download className="size-4" aria-hidden />
                  Resume
                </a>
              </Magnetic>
            </div>
          </FadeUp>

          {/* Socials */}
          <FadeUp delay={0.6}>
            <ul className="mt-10 flex items-center gap-2" aria-label="Social profiles">
              {primarySocials.map((social) => (
                <li key={social.name}>
                  <Magnetic strength={0.35}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.name} — @${social.username}`}
                      className="glass flex size-11 items-center justify-center rounded-full text-muted transition-all duration-300 hover:border-strong hover:text-foreground hover:shadow-glow"
                    >
                      <social.icon className="size-[17px]" aria-hidden />
                    </a>
                  </Magnetic>
                </li>
              ))}
              <li aria-hidden className="ml-2 h-px w-12 bg-border-strong" />
              <li className="font-mono text-xs text-subtle">stay connected</li>
            </ul>
          </FadeUp>
        </div>

        {/* Floating editor card */}
        <FadeUp delay={0.35} className="hidden lg:block">
          <CodeWindow />
        </FadeUp>
      </div>
    </section>
  );
}
