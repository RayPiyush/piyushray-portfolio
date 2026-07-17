import type { ComponentType } from "react";
import type { IconType } from "react-icons";

/** Icon component type accepted across configs (react-icons or lucide). */
export type Icon = IconType | ComponentType<{ className?: string }>;

export type SkillLevel = "Expert" | "Advanced" | "Proficient" | "Familiar";

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: Icon;
  /** Brand hex used for icon tint and hover glow. */
  color: string;
  years: number;
  level: SkillLevel;
  description: string;
  /** Slugs of projects (from projects.ts) where this skill was used. */
  projects?: string[];
}

export type SkillCategory =
  | "Languages"
  | "Backend"
  | "AI"
  | "Frontend"
  | "Cloud"
  | "DevOps"
  | "Database"
  | "Messaging"
  | "Security"
  | "Architecture"
  | "Testing"
  | "Tools";

export type ProjectStatus = "Live" | "In Development" | "Archived" | "Open Source";

export interface ProjectLink {
  github?: string;
  demo?: string;
  caseStudy?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  status: ProjectStatus;
  featured: boolean;
  timeline: string;
  techStack: string[];
  features: string[];
  challenges: string[];
  results: string[];
  /** Plain-text architecture overview rendered as a styled diagram block. */
  architecture?: string[];
  links: ProjectLink;
  /** Optional cover image path (public/). Falls back to a branded gradient. */
  image?: string;
  /** Optional demo video URL. */
  video?: string;
  /** Long-form case study paragraphs. */
  caseStudy?: string[];
}

export interface ExperienceItem {
  company: string;
  companyUrl?: string;
  /** Short monogram shown in the timeline node (stands in for a logo). */
  logo?: string;
  role: string;
  type: "Full-time" | "Internship" | "Contract" | "Freelance";
  location: string;
  start: string; // ISO date
  end?: string; // undefined = present
  summary: string;
  achievements: string[];
  tech: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  field: string;
  start: string;
  end: string;
  grade?: string;
  highlights?: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  /** Optional expiry (ISO "YYYY-MM") shown alongside the issue date. */
  expires?: string;
  credentialId?: string;
  url?: string;
  skills: string[];
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
  icon?: Icon;
  metric?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: Icon;
  username: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
  description: string;
}
