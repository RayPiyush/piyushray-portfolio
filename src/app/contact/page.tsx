import { Clock, Mail, MapPin } from "lucide-react";
import { faqs } from "@/data/faqs";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { buildMetadata } from "@/lib/metadata";
import { faqJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHeader } from "@/components/shared/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${profile.name} — open to conversations about engineering roles, consulting, and collaboration. Based in ${profile.location}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <PageHeader
        eyebrow="Contact"
        title="Let's build something together"
        description="Whether it's a role, a hard technical problem, or just a good conversation about systems — my inbox is open."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section aria-label="Contact options" className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <Card className="h-full p-8">
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Send a message
              </h2>
              <p className="mt-2 mb-8 text-sm text-muted">
                I usually reply within 24–48 hours on weekdays.
              </p>
              <ContactForm />
            </Card>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.1}>
              <Card className="space-y-5">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="text-xs text-subtle">Email</p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm font-medium transition-colors hover:text-accent"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="text-xs text-subtle">Location</p>
                    <p className="text-sm font-medium">{profile.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="text-xs text-subtle">Availability</p>
                    <p className="flex items-center gap-2 text-sm font-medium">
                      {profile.availability.open ? (
                        <>
                          <span className="relative flex size-2" aria-hidden>
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                            <span className="relative inline-flex size-2 rounded-full bg-success" />
                          </span>
                          {profile.availability.label}
                        </>
                      ) : (
                        "Not currently looking"
                      )}
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.2}>
              <Card>
                <h2 className="font-display text-sm font-semibold tracking-tight">
                  Elsewhere on the internet
                </h2>
                <ul className="mt-4 grid grid-cols-2 gap-2">
                  {socials.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2.5 rounded-xl border border-border px-3 py-2.5 transition-all duration-200 hover:border-strong hover:bg-surface"
                      >
                        <social.icon
                          className="size-4 text-muted transition-colors group-hover:text-accent"
                          aria-hidden
                        />
                        <span className="min-w-0">
                          <span className="block text-xs font-medium">{social.name}</span>
                          <span className="block truncate text-[10px] text-subtle">
                            @{social.username}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq" className="mx-auto max-w-3xl px-6 pb-24">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked"
          align="center"
          className="mb-10"
        />
        <Stagger className="space-y-4">
          {faqs.map((faq) => (
            <StaggerItem key={faq.question}>
              <details className="glass group rounded-2xl px-6 py-5 transition-colors open:border-strong">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden
                    className="text-lg text-subtle transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{faq.answer}</p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
