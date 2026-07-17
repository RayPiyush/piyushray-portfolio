import { yearsSince } from "@/lib/utils";

/**
 * ── EDIT ME ─────────────────────────────────────────────────────────
 * Everything about you lives here. Changing this file updates the
 * hero, about page, resume, metadata, and structured data everywhere.
 */
export const profile = {
  name: "Piyush Ray",
  firstName: "Piyush",
  /** Short handle used for the logo monogram and PWA short name. */
  initials: "PR",
  role: "Software Engineer",
  headline: "I build resilient backend systems and refined web experiences.",
  /** One-liner under the headline. */
  subheadline:
    "Software engineer focused on distributed systems, cloud-native architecture, and product-quality backend engineering.",
  /** Set to { name, url } to show your employer in the hero, about page,
   *  and structured data — or null to keep it private. */
  company: null as { name: string; url: string } | null,
  location: "Delhi NCR, India",
  email: "piyushkumarroy50@gmail.com",
  availability: {
    /** Toggles the pulsing status pill in the hero + contact page. */
    open: true,
    label: "Open to new opportunities",
  },
  /** Used to auto-compute "X+ years of experience" everywhere.
   *  Set to mid-2024 (counting internship + full-time experience) so the
   *  site displays "2+ years"; exact role dates live in experience.ts. */
  careerStart: "2024-07-01",
  resumeUrl: "/resume.pdf",
  bio: [
    "I'm a software engineer who cares about the whole stack — from the shape of an API and the guarantees of a message queue, to the easing curve on a button hover. I currently build backend services and the interfaces that sit on top of them.",
    "My happy place is the intersection of correctness and craft: systems that stay up under load, and products that feel effortless to use. I write code that the next engineer can read, and I sweat the details users never consciously notice but always feel.",
    "Outside of work you'll find me solving problems on LeetCode, writing about system design, and learning distributed systems in depth.",
  ],
  values: [
    {
      title: "Craftsmanship",
      description:
        "Software is read far more than it is written. I optimize for clarity, correctness, and the next engineer.",
    },
    {
      title: "Ownership",
      description:
        "I take features from ambiguous idea to production metrics — and stay accountable after the deploy.",
    },
    {
      title: "Leverage",
      description:
        "Good tooling, automation, and documentation multiply a team. I invest in them relentlessly.",
    },
    {
      title: "Empathy",
      description:
        "Users, teammates, reviewers, on-call engineers — every decision serves a person, not just a metric.",
    },
  ],
  goals: [
    "Design and operate systems that serve millions of users reliably.",
    "Grow into a senior engineer who raises the bar for an entire team.",
    "Keep writing and sharing so the ladder stays down behind me.",
  ],
  journey: [
    {
      year: "2020",
      title: "Wrote my first real program",
      description:
        "Started engineering college and fell in love with problem solving — data structures by day, side projects by night.",
    },
    {
      year: "2023",
      title: "First internship → first production code",
      description:
        "Shipped my first feature used by real customers and learned what 'production-ready' actually means.",
    },
    {
      year: "2024",
      title: "Full-time software engineer",
      description:
        "Joined a product team building backend services — distributed systems became my core craft.",
    },
    {
      year: "2025",
      title: "Growing ownership",
      description:
        "Taking features end-to-end: design docs, implementation, rollout, and the on-call that follows.",
    },
    {
      year: "Now",
      title: "Building and writing",
      description:
        "Deepening expertise in event-driven architecture and sharing what I learn along the way.",
    },
  ],
} as const;

/** Auto-computed — never hardcode this number in the UI. */
export const yearsOfExperience = yearsSince(profile.careerStart);
