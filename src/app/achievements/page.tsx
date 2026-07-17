import { Award } from "lucide-react";
import { achievements } from "@/data/achievements";
import { profile } from "@/data/profile";
import { buildMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/home/cta-band";

export const metadata = buildMetadata({
  title: "Achievements",
  description: `Awards, milestones, and recognitions earned by ${profile.name} — from national hackathon wins to open-source milestones.`,
  path: "/achievements",
});

export default function AchievementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Achievements"
        title="Milestones worth remembering"
        description="Recognition earned along the way — competitive programming, hackathons, open source, and engineering awards."
        crumbs={[{ name: "Achievements", path: "/achievements" }]}
      />
      <section aria-label="Achievements list" className="mx-auto max-w-5xl px-6 pb-24">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon ?? Award;
            return (
              <StaggerItem key={achievement.title} className="h-full">
                <Card className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:border-strong hover:shadow-raised">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-subtle">
                      {achievement.date}
                    </span>
                  </div>
                  <h2 className="font-display mt-4 text-base font-semibold tracking-tight">
                    {achievement.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {achievement.description}
                  </p>
                  {achievement.metric ? (
                    <div className="mt-4">
                      <Badge variant="accent" size="sm">
                        {achievement.metric}
                      </Badge>
                    </div>
                  ) : null}
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>
      <CtaBand />
    </>
  );
}
