import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { certifications } from "@/data/certifications";
import { profile } from "@/data/profile";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/home/cta-band";

export const metadata = buildMetadata({
  title: "Certifications",
  description: `Professional certifications held by ${profile.name} — AWS, Kubernetes, Kafka, and Java credentials with verification links.`,
  path: "/certifications",
});

export default function CertificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Certifications"
        title="Credentials, verified"
        description="Formal certifications that back up the hands-on experience. Each links to its verification page."
        crumbs={[{ name: "Certifications", path: "/certifications" }]}
      />
      <section aria-label="Certifications list" className="mx-auto max-w-5xl px-6 pb-24">
        <Stagger className="grid gap-5 md:grid-cols-2">
          {certifications.map((cert) => (
            <StaggerItem key={`${cert.title}-${cert.issuer}`} className="h-full">
              <Card className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:border-strong hover:shadow-raised">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <BadgeCheck className="size-5" aria-hidden />
                  </span>
                  <span className="text-right font-mono text-xs text-subtle">
                    {formatDate(cert.date)}
                    {cert.expires ? (
                      <span className="block text-[10px]">
                        expires {formatDate(cert.expires)}
                      </span>
                    ) : null}
                  </span>
                </div>
                <h2 className="font-display mt-4 text-base font-semibold tracking-tight">
                  {cert.title}
                </h2>
                <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                {cert.credentialId ? (
                  <p className="mt-2 font-mono text-[11px] text-subtle">
                    Credential ID: {cert.credentialId}
                  </p>
                ) : null}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-accent transition-colors hover:underline"
                  >
                    Verify credential
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                ) : null}
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <CtaBand />
    </>
  );
}
