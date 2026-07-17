import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { profile, yearsOfExperience } from "@/data/profile";
import { primarySocials } from "@/data/socials";
import { buttonVariants } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { ParticleField } from "./particle-field";
import { CodeWindow } from "./code-window";

/** Landing hero — server component composing client motion primitives. */
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
          {/* Availability + company */}
          <Reveal y={16}>
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
          </Reveal>

          {/* Headline */}
          <h1 className="mt-8 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            <TextReveal text="I build resilient systems" delay={0.1} />{" "}
            <span className="text-gradient animate-gradient-pan">
              <TextReveal text="and refined experiences." delay={0.45} />
            </span>
          </h1>

          <Reveal delay={0.7} y={16}>
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
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.85} y={16}>
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
          </Reveal>

          {/* Socials */}
          <Reveal delay={1} y={12}>
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
          </Reveal>
        </div>

        {/* Floating editor card */}
        <Reveal delay={0.5} y={32} className="hidden lg:block">
          <CodeWindow />
        </Reveal>
      </div>
    </section>
  );
}
