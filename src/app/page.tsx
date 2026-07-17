import dynamic from "next/dynamic";
import { Hero } from "@/components/home/hero";
import { StatsSection } from "@/components/home/stats-section";

// Below-the-fold sections load lazily to keep first paint lean.
const SkillsMarquee = dynamic(() =>
  import("@/components/home/skills-marquee").then((m) => m.SkillsMarquee),
);
const FeaturedProjects = dynamic(() =>
  import("@/components/home/featured-projects").then((m) => m.FeaturedProjects),
);
const WidgetsStrip = dynamic(() =>
  import("@/components/home/widgets-strip").then((m) => m.WidgetsStrip),
);
const CtaBand = dynamic(() => import("@/components/home/cta-band").then((m) => m.CtaBand));

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
