import { ExternalLink, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/motion/reveal";

function duration(start: string, end?: string) {
  const from = new Date(start);
  const to = end ? new Date(end) : new Date();
  const months =
    (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [
    years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : "",
    rest > 0 ? `${rest} mo${rest > 1 ? "s" : ""}` : "",
  ].filter(Boolean);
  return parts.join(" ");
}

/** Vertical career timeline rendered from experience.ts. */
export function ExperienceTimeline() {
  return (
    <ol className="relative space-y-8 border-l border-border pl-8 md:space-y-10 md:pl-12">
      {experience.map((item, index) => {
        const isCurrent = !item.end;
        return (
          <li key={`${item.company}-${item.role}`} className="relative">
            <Reveal delay={index * 0.06}>
              {/* Timeline node with company monogram */}
              <span
                aria-hidden
                className="font-display absolute top-5 -left-[49px] flex size-9 items-center justify-center rounded-xl border border-border bg-surface-raised text-[11px] font-bold text-accent shadow-soft md:-left-[65px]"
              >
                {item.logo}
              </span>

              <Card className="transition-all duration-300 hover:border-strong hover:shadow-raised">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {item.role}
                    </h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                      {item.companyUrl ? (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-accent"
                        >
                          {item.company}
                          <ExternalLink className="size-3" aria-hidden />
                        </a>
                      ) : (
                        <span className="font-medium text-foreground">
                          {item.company}
                        </span>
                      )}
                      <span aria-hidden>·</span>
                      <span>{item.type}</span>
                      <span aria-hidden>·</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3" aria-hidden />
                        {item.location}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    {isCurrent ? (
                      <Badge variant="success" size="sm">
                        Current
                      </Badge>
                    ) : null}
                    <p className="mt-1.5 font-mono text-xs text-subtle">
                      {formatDate(item.start)} —{" "}
                      {item.end ? formatDate(item.end) : "Present"}
                    </p>
                    <p className="font-mono text-[11px] text-subtle">
                      {duration(item.start, item.end)}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">{item.summary}</p>

                <ul className="mt-4 space-y-2">
                  {item.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex gap-3 text-sm leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[9px] size-1 shrink-0 rounded-full bg-accent"
                      />
                      {achievement}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {item.tech.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </Card>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
