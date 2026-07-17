import dynamic from "next/dynamic";
import { Hero } from "@/components/home/hero";
import { StatsSection } from "@/components/home/stats-section";
import { SkillsMarquee } from "@/components/home/skills-marquee";
import { FeaturedProjects } from "@/components/home/featured-projects";

// Below-the-fold sections load lazily to keep first paint lean.
const WidgetsStrip = dynamic(() =>
  import("@/components/home/widgets-strip").then((m) => m.WidgetsStrip),
);
const CtaBand = dynamic(() =>
  import("@/components/home/cta-band").then((m) => m.CtaBand),
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <SkillsMarquee />
      <FeaturedProjects />
      <WidgetsStrip />
      <CtaBand />
    </>
  );
}
