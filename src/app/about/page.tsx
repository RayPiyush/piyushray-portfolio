import { Briefcase, Compass, GraduationCap, Sparkles } from "lucide-react";
import { education } from "@/data/experience";
import { profile, yearsOfExperience } from "@/data/profile";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/home/cta-band";

export const metadata = buildMetadata({
  title: "About",
  description: `The story, values, and journey of ${profile.name} — ${profile.role} with ${yearsOfExperience}+ years of experience building production software.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Engineer by craft, builder by nature"
        description={`${profile.role}${profile.company ? ` at ${profile.company.name}` : ""}, based in ${profile.location}. This is the longer story behind the work.`}
        crumbs={[{ name: "About", path: "/about" }]}
      />

      {/* Story */}
      <section aria-labelledby="story" className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 id="story" className="sr-only">
              My story
            </h2>
            <Stagger className="space-y-6">
              {profile.bio.map((paragraph) => (
                <StaggerItem key={paragraph.slice(0, 24)}>
                  <p className="text-base leading-relaxed text-muted md:text-lg">
                    {paragraph}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.2}>
            <Card className="space-y-5">
              <div className="flex items-start gap-3">
                <Briefcase className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="text-xs text-subtle">Current role</p>
                  <p className="text-sm font-medium">
                    {profile.role}
                    {profile.company ? ` · ${profile.company.name}` : ""}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="text-xs text-subtle">Experience</p>
                  <p className="text-sm font-medium">
                    {yearsOfExperience}+ years in production engineering
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Compass className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="text-xs text-subtle">Focus</p>
                  <p className="text-sm font-medium">
                    Distributed systems · Cloud-native · Web
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Journey timeline */}
      <section aria-labelledby="journey" className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading
          eyebrow="The journey"
          title="From first program to production systems"
        />
        <ol className="relative space-y-10 border-l border-border pl-8 md:pl-10">
          {profile.journey.map((step, index) => (
            <li key={step.year} className="relative">
              <Reveal delay={index * 0.05}>
                <span
                  aria-hidden
                  className="absolute top-1 -left-[41px] flex size-5 items-center justify-center rounded-full border border-accent/40 bg-background md:-left-[49px]"
                >
                  <span className="size-2 rounded-full bg-accent" />
                </span>
                <p className="font-mono text-xs tracking-widest text-accent uppercase">
                  {step.year}
                </p>
                <h3 className="font-display mt-1.5 text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Education */}
      <section aria-labelledby="education" className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading eyebrow="Education" title="Where the foundations were laid" />
        <Stagger className="space-y-5">
          {education.map((item) => (
            <StaggerItem key={item.institution}>
              <Card className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <GraduationCap className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {item.institution}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted">
                      {item.degree}, {item.field}
                    </p>
                    {item.highlights ? (
                      <ul className="mt-3 space-y-1.5">
                        {item.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-2 text-sm leading-relaxed text-muted"
                          >
                            <span
                              aria-hidden
                              className="mt-2 size-1 shrink-0 rounded-full bg-accent"
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
                <div className="shrink-0 text-left md:text-right">
                  <p className="font-mono text-xs text-subtle">
                    {formatDate(item.start, { month: undefined })} —{" "}
                    {formatDate(item.end, { month: undefined })}
                  </p>
                  {item.grade ? (
                    <p className="mt-1 text-sm font-medium text-foreground">
                      {item.grade}
                    </p>
                  ) : null}
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Values + goals */}
      <section aria-labelledby="values" className="mx-auto max-w-5xl px-6 py-16">
        <SectionHeading
          eyebrow="Values"
          title="What I optimize for"
          description="Four principles that shape how I write code, review PRs, and work with teams."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2">
          {profile.values.map((value) => (
            <StaggerItem key={value.title} className="h-full">
              <Card className="h-full">
                <h3 className="font-display text-base font-semibold tracking-tight text-accent">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12">
          <Card className="bg-aurora">
            <h3 className="font-display text-base font-semibold tracking-tight">
              Where I&apos;m headed
            </h3>
            <ul className="mt-4 space-y-2.5">
              {profile.goals.map((goal) => (
                <li key={goal} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {goal}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
