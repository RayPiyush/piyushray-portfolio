import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";

export default function NotFound() {
  return (
    <section
      aria-label="Page not found"
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6"
    >
      <div className="bg-aurora absolute inset-0" aria-hidden />
      <div
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]"
        aria-hidden
      />
      <div className="relative text-center">
        <p className="text-gradient animate-gradient-pan font-display text-8xl font-bold tracking-tight md:text-9xl">
          404
        </p>
        <h1 className="font-display mt-6 text-2xl font-semibold tracking-tight md:text-3xl">
          <TextReveal text="This route was never deployed" />
        </h1>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            The page you&apos;re looking for doesn&apos;t exist, moved, or is still on a
            feature branch somewhere. Let&apos;s get you back to stable.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className={buttonVariants({ variant: "accent" })}>
              <ArrowLeft className="size-4" aria-hidden />
              Back to home
            </Link>
            <Link href="/projects" className={buttonVariants({ variant: "outline" })}>
              <Compass className="size-4" aria-hidden />
              Explore projects
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
