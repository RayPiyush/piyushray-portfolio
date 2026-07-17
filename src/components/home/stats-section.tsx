import { stats } from "@/data/stats";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function StatsSection() {
  return (
    <section aria-label="Career statistics" className="border-y border-border">
      <Stagger className="mx-auto grid max-w-5xl grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
        {stats.map((stat) => (
          <StaggerItem
            key={stat.label}
            className="flex flex-col items-center gap-1 px-6 py-10"
          >
            <span className="font-display text-4xl font-semibold tracking-tight text-foreground">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-center text-xs text-subtle">{stat.label}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
