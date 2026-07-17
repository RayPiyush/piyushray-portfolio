import type { Faq } from "./types";
import { profile } from "./profile";

/**
 * ── EDIT ME ── FAQs rendered on the contact page and emitted as
 * FAQPage structured data for rich snippets.
 */
export const faqs: Faq[] = [
  {
    question: `Is ${profile.firstName} available for new opportunities?`,
    answer: profile.availability.open
      ? "Yes — currently open to discussing backend and full-stack engineering roles. The fastest way to reach out is the contact form or a direct email."
      : "Not actively looking right now, but always happy to connect for interesting conversations.",
  },
  {
    question: "What kind of work does he specialize in?",
    answer:
      "Backend engineering with Java and Spring Boot — microservices, Spring Batch processing, and REST APIs on Azure — plus full-stack work with React, Next.js, and TypeScript, and growing expertise in agentic AI.",
  },
  {
    question: "Does he take on freelance or side projects?",
    answer:
      "Selectively — particularly backend APIs, Next.js sites, and AI-powered tools. Reach out with a short brief and timeline.",
  },
  {
    question: "Where is he based, and does he work remotely?",
    answer: `Based in ${profile.location}, comfortable with remote, hybrid, and async-first teams across time zones.`,
  },
  {
    question: "How quickly does he respond to messages?",
    answer:
      "Usually within 24–48 hours on weekdays. LinkedIn and email are checked most frequently.",
  },
];
