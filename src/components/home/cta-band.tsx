import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { buttonVariants } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";

/** Closing call-to-action band reused across pages. */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-heading" className="mx-auto max-w-5xl px-6 pb-24">
      <Reveal>
        <div className="glass ring-hairline bg-aurora relative overflow-hidden rounded-3xl px-8 py-16 text-center shadow-raised md:py-20">
          <div className="bg-grid absolute inset-0 opacity-50" aria-hidden />
          <div className="relative">
            <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">
              {profile.availability.open ? profile.availability.label : "Let's talk"}
            </p>
            <h2
              id="cta-heading"
              className="font-display mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-balance md:text-4xl"
            >
              Have a hard problem worth solving together?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
              I&apos;m always up for conversations about distributed systems, product
              engineering, and roles where craft matters.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <Link
                  href="/contact"
                  className={buttonVariants({ variant: "accent", size: "lg" })}
                >
                  <Mail className="size-4" aria-hidden />
                  Start a conversation
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/about"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  More about me
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
