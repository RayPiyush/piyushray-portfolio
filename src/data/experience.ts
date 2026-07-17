import type { EducationItem, ExperienceItem } from "./types";

/**
 * ── EDIT ME ── Career timeline, newest first.
 * `logo` is a short monogram rendered in the timeline node — replace with
 * real logo images later by extending the Timeline component if desired.
 */
export const experience: ExperienceItem[] = [
  {
    company: "Tata Consultancy Services",
    companyUrl: "https://www.tcs.com",
    logo: "TCS",
    role: "Backend Developer",
    type: "Full-time",
    location: "Noida, India",
    start: "2024-09-01",
    summary:
      "Building Java and Spring Boot microservices — batch processing, persistence, and API design on Azure.",
    achievements: [
      "Migrated Talend-based batch jobs to Spring Batch on Azure using chunk-oriented processing and multithreading, adding retry and skip handling for reliable, restartable runs",
      "Built persistence with Spring Data JPA over MySQL, introducing composite indexes and pagination to speed up high-volume list queries",
      "Designed REST endpoints across multiple Spring Boot microservices with DTO mapping and standardized global exception handling for clean, consistent API contracts",
      "Extracted modules from a monolithic codebase into independent Spring Boot services, enabling isolated builds and deployments and improving maintainability",
      "Tuned Azure Redis cache patterns (TTLs, eviction policy) and right-sized the cache tier with the team to lower infrastructure cost",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "Spring Batch",
      "Spring Data JPA",
      "MySQL",
      "Redis",
      "Azure",
      "Microservices",
    ],
  },
  {
    company: "ITJOBXS",
    logo: "IX",
    role: "Web Developer Intern",
    type: "Internship",
    location: "Mumbai, India",
    start: "2023-08-01",
    end: "2023-10-31",
    summary:
      "Built SEO-focused, server-rendered web pages with Next.js and TypeScript.",
    achievements: [
      "Built SEO-optimized web pages with Next.js and TypeScript using server-side rendering and image optimization for faster, discoverable pages",
      "Modeled the PostgreSQL schema with Prisma using indexed, normalized relations to support efficient queries",
      "Rebuilt layouts with Tailwind CSS for mobile-first responsiveness across breakpoints",
    ],
    tech: ["React", "Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
  },
];

/** ── EDIT ME ── Education, newest first. */
export const education: EducationItem[] = [
  {
    institution: "Techno Main Salt Lake",
    degree: "Bachelor of Technology",
    field: "Information Technology",
    start: "2020-08-01",
    end: "2024-06-30",
    grade: "8.38 / 10 CGPA",
    highlights: [
      "Kolkata, India",
      "Core coursework: data structures & algorithms, databases, operating systems, computer networks",
    ],
  },
];
