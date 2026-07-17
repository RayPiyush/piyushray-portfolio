import { profile } from "@/data/profile";
import { seo } from "@/data/seo";
import { buildMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/motion/reveal";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${seo.siteUrl} — what data this site collects (very little) and how it's handled.`,
  path: "/privacy",
});

const sections = [
  {
    title: "The short version",
    body: [
      "This is a personal portfolio. It exists to showcase work, not to collect data. No accounts, no tracking pixels, no selling of information — ever.",
    ],
  },
  {
    title: "What this site collects",
    body: [
      "By default, this site collects no personal data. There are no cookies set by the site itself and no third-party advertising trackers.",
      "If privacy-friendly analytics are enabled in the future (e.g. aggregate page views), they will be anonymous, cookie-free, and used only to understand which content is useful.",
    ],
  },
  {
    title: "Contact form",
    body: [
      "The contact form composes an email in your own mail client. Nothing you type is stored on a server by this site. If you send the email, it arrives in my inbox like any other message and is never shared with third parties.",
    ],
  },
  {
    title: "External links",
    body: [
      "Pages link to external services (GitHub, LinkedIn, and others). Those sites have their own privacy policies once you leave this one.",
    ],
  },
  {
    title: "Theme preference",
    body: [
      "Your dark/light theme choice is stored in your browser's localStorage so the site remembers it. It never leaves your device.",
    ],
  },
  {
    title: "Questions",
    body: [
      `If anything here is unclear, email ${profile.email} and I'll answer directly.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Your data, respected"
        description="Last updated July 2026. The policy is short because the data collection is basically zero."
        crumbs={[{ name: "Privacy", path: "/privacy" }]}
      />
      <section aria-label="Privacy policy" className="mx-auto max-w-3xl px-6 pb-24">
        <div className="space-y-10">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={index * 0.04}>
              <h2 className="font-display text-xl font-semibold tracking-tight">
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="mt-3 text-sm leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
