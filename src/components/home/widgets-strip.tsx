import { Activity, Music, Users } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Card } from "@/components/ui/card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Integration placeholders — swap each card's body for a live widget later
 * (GitHub contributions API, Spotify now-playing, WakaTime, analytics).
 */
const widgets = [
  {
    icon: SiGithub,
    title: "GitHub activity",
    body: "Contribution graph placeholder — wire up the GitHub GraphQL API to render a live heatmap here.",
    footer: "github.com integration",
  },
  {
    icon: Music,
    title: "Now playing",
    body: "Spotify widget placeholder — connect the Spotify Web API to show what's on repeat while I code.",
    footer: "spotify integration",
  },
  {
    icon: Activity,
    title: "Coding activity",
    body: "WakaTime placeholder — surface weekly language and editor breakdowns automatically.",
    footer: "wakatime integration",
  },
  {
    icon: Users,
    title: "Visitors",
    body: "Visitor counter placeholder — plug in your analytics provider for a live count.",
    footer: "analytics integration",
  },
];

export function WidgetsStrip() {
  return (
    <section aria-labelledby="live-widgets" className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading
        eyebrow="Beyond the code"
        title="Live from the workspace"
        description="Future-ready integration slots — each card is wired to become a live widget."
      />
      <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {widgets.map((widget) => (
          <StaggerItem key={widget.title} className="h-full">
            <Card className="flex h-full flex-col gap-3">
              <span className="flex size-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <widget.icon className="size-4" aria-hidden />
              </span>
              <h3 className="font-display text-sm font-semibold">{widget.title}</h3>
              <p className="text-xs leading-relaxed text-muted">{widget.body}</p>
              <p className="mt-auto pt-2 font-mono text-[10px] tracking-wider text-subtle uppercase">
                {widget.footer}
              </p>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
