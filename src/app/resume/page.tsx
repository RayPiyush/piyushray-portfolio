import { Download, Mail, MapPin } from "lucide-react";
import { certifications } from "@/data/certifications";
import { education, experience } from "@/data/experience";
import { profile, yearsOfExperience } from "@/data/profile";
import { skillCategories, skillsByCategory } from "@/data/skills";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

export const metadata = buildMetadata({
  title: "Resume",
  description: `Resume of ${profile.name} — ${profile.role} with ${yearsOfExperience}+ years of experience. Preview online or download as PDF.`,
  path: "/resume",
});

/**
 * The resume preview renders live from the same configs as the rest of the
 * site — update profile.ts / experience.ts / skills.ts and it stays current.
 */
export default function ResumePage() {
  const resumeSkillCategories = skillCategories.filter(
    (category) => skillsByCategory(category).length > 0,
  );

  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="The one-pager, always current"
        description="This preview is generated live from the site's config files, so it never goes stale. Grab the PDF for the traditional format."
        crumbs={[{ name: "Resume", path: "/resume" }]}
      />

      <section aria-label="Resume preview" className="mx-auto max-w-4xl px-6 pb-24">
        <Reveal className="mb-8 flex justify-center">
          <Magnetic>
            <a
              href={profile.resumeUrl}
              download
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              <Download className="size-4" aria-hidden />
              Download PDF
            </a>
          </Magnetic>
        </Reveal>

        <Reveal>
          <div className="glass ring-hairline overflow-hidden rounded-3xl shadow-raised">
            {/* Resume header */}
            <div className="bg-aurora border-b border-border px-8 py-10 md:px-12">
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                {profile.name}
              </h2>
              <p className="mt-1 text-lg text-accent">{profile.role}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="size-3.5" aria-hidden />
                  {profile.email}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" aria-hidden />
                  {profile.location}
                </span>
                <span>{yearsOfExperience}+ years of experience</span>
              </div>
            </div>

            <div className="space-y-10 px-8 py-10 md:px-12">
              {/* Summary */}
              <section aria-labelledby="resume-summary">
                <h3
                  id="resume-summary"
                  className="font-mono text-xs tracking-[0.25em] text-accent uppercase"
                >
                  Summary
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {profile.subheadline} {profile.bio[0]}
                </p>
              </section>

              {/* Experience */}
              <section aria-labelledby="resume-experience">
                <h3
                  id="resume-experience"
                  className="font-mono text-xs tracking-[0.25em] text-accent uppercase"
                >
                  Experience
                </h3>
                <div className="mt-4 space-y-7">
                  {experience.map((item) => (
                    <div key={`${item.company}-${item.role}`}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-display text-base font-semibold">
                          {item.role} · {item.company}
                        </h4>
                        <span className="font-mono text-xs text-subtle">
                          {formatDate(item.start)} —{" "}
                          {item.end ? formatDate(item.end) : "Present"}
                        </span>
                      </div>
                      <ul className="mt-2.5 space-y-1.5">
                        {item.achievements.slice(0, 3).map((achievement) => (
                          <li
                            key={achievement}
                            className="flex gap-2.5 text-sm leading-relaxed text-muted"
                          >
                            <span
                              aria-hidden
                              className="mt-[9px] size-1 shrink-0 rounded-full bg-accent"
                            />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section aria-labelledby="resume-skills">
                <h3
                  id="resume-skills"
                  className="font-mono text-xs tracking-[0.25em] text-accent uppercase"
                >
                  Skills
                </h3>
                <div className="mt-4 space-y-3">
                  {resumeSkillCategories.map((category) => (
                    <div key={category} className="flex flex-wrap items-baseline gap-2">
                      <span className="w-28 shrink-0 text-xs font-medium text-foreground">
                        {category}
                      </span>
                      <span className="flex flex-wrap gap-1.5">
                        {skillsByCategory(category).map((skill) => (
                          <Tag key={skill.name}>{skill.name}</Tag>
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education + certifications */}
              <div className="grid gap-10 md:grid-cols-2">
                <section aria-labelledby="resume-education">
                  <h3
                    id="resume-education"
                    className="font-mono text-xs tracking-[0.25em] text-accent uppercase"
                  >
                    Education
                  </h3>
                  {education.map((item) => (
                    <div key={item.institution} className="mt-3">
                      <h4 className="text-sm font-semibold">{item.institution}</h4>
                      <p className="mt-0.5 text-sm text-muted">
                        {item.degree}, {item.field}
                      </p>
                      <p className="mt-0.5 font-mono text-xs text-subtle">
                        {formatDate(item.start, { month: undefined })} —{" "}
                        {formatDate(item.end, { month: undefined })}
                        {item.grade ? ` · ${item.grade}` : ""}
                      </p>
                    </div>
                  ))}
                </section>
                <section aria-labelledby="resume-certifications">
                  <h3
                    id="resume-certifications"
                    className="font-mono text-xs tracking-[0.25em] text-accent uppercase"
                  >
                    Certifications
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {certifications.map((cert) => (
                      <li key={cert.title} className="text-sm text-muted">
                        <span className="font-medium text-foreground">{cert.title}</span>
                        <span className="block font-mono text-xs text-subtle">
                          {cert.issuer} · {formatDate(cert.date)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
