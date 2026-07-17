import { marqueeSkills } from "@/data/skills";
import { Marquee } from "@/components/motion/marquee";

/** Infinite scrolling strip of core technologies. */
export function SkillsMarquee() {
  return (
    <section aria-label="Core technologies" className="py-16">
      <p className="mb-8 text-center font-mono text-xs tracking-[0.25em] text-subtle uppercase">
        Technologies I work with daily
      </p>
      <Marquee>
        {marqueeSkills.map((skill) => (
          <span
            key={skill.name}
            className="glass flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm text-muted"
          >
            <skill.icon
              className="size-4 shrink-0"
              style={{ color: skill.color }}
              aria-hidden
            />
            {skill.name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
