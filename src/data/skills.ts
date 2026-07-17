import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiOpenjdk,
  SiFastapi,
  SiApachekafka,
  SiSpringboot,
  SiSpring,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiPrisma,
  SiJunit5,
  SiGit,
  SiPostman,
  SiDocker,
  SiKubernetes,
  SiDatabricks,
  SiVercel,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { LuBrainCircuit, LuDatabase, LuNetwork, LuServer } from "react-icons/lu";
import type { Skill, SkillCategory } from "./types";

/**
 * ── EDIT ME ── Your skill matrix.
 * Add, remove, or edit entries here — the Skills page, home marquee,
 * and command palette all render from this single list automatically.
 */
export const skills: Skill[] = [
  // ── Languages ────────────────────────────────────────────────────
  {
    name: "Java",
    category: "Languages",
    icon: SiOpenjdk,
    color: "#f89820",
    years: 2,
    level: "Advanced",
    description: "Primary backend language — collections, streams, and concurrency in daily production work.",
  },
  {
    name: "TypeScript",
    category: "Languages",
    icon: SiTypescript,
    color: "#3178c6",
    years: 2,
    level: "Proficient",
    description: "Typed frontends with Next.js — from my internship to side projects.",
  },
  {
    name: "JavaScript",
    category: "Languages",
    icon: SiJavascript,
    color: "#f7df1e",
    years: 2,
    level: "Proficient",
    description: "The web's lingua franca — comfortable with the runtime and async patterns.",
  },
  {
    name: "Python",
    category: "Languages",
    icon: SiPython,
    color: "#3776ab",
    years: 2,
    level: "Proficient",
    description: "Scripting, automation, and FastAPI services — plus AI experimentation.",
  },
  {
    name: "SQL",
    category: "Languages",
    icon: LuDatabase,
    color: "#22d3ee",
    years: 2,
    level: "Advanced",
    description: "Query design, joins, and index-aware optimization for high-volume tables.",
  },

  // ── Backend ──────────────────────────────────────────────────────
  {
    name: "Spring Boot",
    category: "Backend",
    icon: SiSpringboot,
    color: "#6db33f",
    years: 2,
    level: "Advanced",
    description: "REST microservices with DTO mapping and standardized global exception handling.",
  },
  {
    name: "Spring Batch",
    category: "Backend",
    icon: SiSpring,
    color: "#6db33f",
    years: 1,
    level: "Proficient",
    description: "Chunk-oriented, multithreaded batch jobs with retry/skip handling — migrated from Talend.",
  },
  {
    name: "Spring Data JPA",
    category: "Backend",
    icon: SiSpring,
    color: "#6db33f",
    years: 2,
    level: "Advanced",
    description: "Persistence layers with composite indexes and pagination for high-volume queries.",
  },
  {
    name: "REST API Design",
    category: "Backend",
    icon: LuServer,
    color: "#8b93ff",
    years: 2,
    level: "Advanced",
    description: "Clean, consistent API contracts across multiple production microservices.",
  },
  {
    name: "FastAPI",
    category: "Backend",
    icon: SiFastapi,
    color: "#009688",
    years: 1,
    level: "Proficient",
    description: "Async Python APIs with Pydantic validation — my go-to for AI service backends.",
  },

  // ── AI ───────────────────────────────────────────────────────────
  {
    name: "Agentic AI",
    category: "AI",
    icon: LuBrainCircuit,
    color: "#c084fc",
    years: 1,
    level: "Proficient",
    description: "Building LLM-powered agents — tool use, orchestration, and RAG pipelines.",
  },

  // ── Frontend ─────────────────────────────────────────────────────
  {
    name: "React",
    category: "Frontend",
    icon: SiReact,
    color: "#61dafb",
    years: 2,
    level: "Proficient",
    description: "Component architecture and hooks — production experience since my internship.",
  },
  {
    name: "Next.js",
    category: "Frontend",
    icon: SiNextdotjs,
    color: "#888888",
    years: 2,
    level: "Proficient",
    description: "SEO-optimized, server-rendered pages with image optimization — and this very site.",
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    icon: SiTailwindcss,
    color: "#38bdf8",
    years: 2,
    level: "Proficient",
    description: "Mobile-first responsive layouts across breakpoints.",
  },

  // ── Cloud ────────────────────────────────────────────────────────
  {
    name: "Microsoft Azure",
    category: "Cloud",
    icon: VscAzure,
    color: "#0089d6",
    years: 1,
    level: "Proficient",
    description: "Running batch workloads and tuning Azure Redis for cost and performance.",
  },
  {
    name: "Azure Data Factory",
    category: "Cloud",
    icon: VscAzure,
    color: "#0089d6",
    years: 1,
    level: "Proficient",
    description: "Orchestrating data pipelines alongside Spring Batch workloads.",
  },
  {
    name: "Azure Databricks",
    category: "Cloud",
    icon: SiDatabricks,
    color: "#ff3621",
    years: 1,
    level: "Proficient",
    description: "Spark-based data processing — Databricks Certified Data Engineer Associate.",
  },
  {
    name: "AWS",
    category: "Cloud",
    icon: FaAws,
    color: "#ff9900",
    years: 1,
    level: "Familiar",
    description: "Core services — EC2, S3, and IAM — for side projects and learning.",
  },
  {
    name: "Vercel",
    category: "Cloud",
    icon: SiVercel,
    color: "#888888",
    years: 2,
    level: "Proficient",
    description: "Zero-config deployments for Next.js projects — including this site.",
  },

  // ── DevOps ───────────────────────────────────────────────────────
  {
    name: "Docker",
    category: "DevOps",
    icon: SiDocker,
    color: "#2496ed",
    years: 1,
    level: "Proficient",
    description: "Containerizing Spring Boot services for consistent builds and deploys.",
  },
  {
    name: "Kubernetes",
    category: "DevOps",
    icon: SiKubernetes,
    color: "#326ce5",
    years: 1,
    level: "Familiar",
    description: "Deployments, services, and config management for containerized workloads.",
  },

  // ── Database ─────────────────────────────────────────────────────
  {
    name: "MySQL",
    category: "Database",
    icon: SiMysql,
    color: "#4479a1",
    years: 2,
    level: "Advanced",
    description: "Schema design, composite indexing, and pagination for high-volume list queries.",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    icon: SiPostgresql,
    color: "#4169e1",
    years: 1,
    level: "Proficient",
    description: "Normalized, indexed schema modeling (with Prisma) for efficient queries.",
  },
  {
    name: "Redis",
    category: "Database",
    icon: SiRedis,
    color: "#ff4438",
    years: 1,
    level: "Proficient",
    description: "Cache patterns — TTLs, eviction policies, and right-sizing for cost.",
  },
  {
    name: "Prisma",
    category: "Database",
    icon: SiPrisma,
    color: "#5a67d8",
    years: 1,
    level: "Familiar",
    description: "Type-safe schema modeling and migrations over PostgreSQL.",
  },

  // ── Messaging ────────────────────────────────────────────────────
  {
    name: "Apache Kafka",
    category: "Messaging",
    icon: SiApachekafka,
    color: "#a3abbd",
    years: 1,
    level: "Familiar",
    description: "Event-driven patterns — topics, partitions, and consumer groups.",
  },

  // ── Architecture ─────────────────────────────────────────────────
  {
    name: "Microservices",
    category: "Architecture",
    icon: LuNetwork,
    color: "#8b93ff",
    years: 2,
    level: "Proficient",
    description: "Extracting monolith modules into independently built and deployed services.",
  },

  // ── Testing ──────────────────────────────────────────────────────
  {
    name: "JUnit 5 & Mockito",
    category: "Testing",
    icon: SiJunit5,
    color: "#dc514a",
    years: 2,
    level: "Proficient",
    description: "Unit and slice tests for Spring services.",
  },

  // ── Tools ────────────────────────────────────────────────────────
  {
    name: "Git",
    category: "Tools",
    icon: SiGit,
    color: "#f05032",
    years: 4,
    level: "Advanced",
    description: "Daily driver since college — branching strategies and clean history.",
  },
  {
    name: "Postman",
    category: "Tools",
    icon: SiPostman,
    color: "#ff6c37",
    years: 2,
    level: "Advanced",
    description: "API testing and contract collections for every service I build.",
  },
];

/** Category display order for the Skills page. */
export const skillCategories: SkillCategory[] = [
  "Languages",
  "Backend",
  "AI",
  "Frontend",
  "Cloud",
  "DevOps",
  "Database",
  "Messaging",
  "Architecture",
  "Testing",
  "Tools",
];

export function skillsByCategory(category: SkillCategory) {
  return skills.filter((s) => s.category === category);
}

/** Compact list for the home-page marquee. */
export const marqueeSkills = skills.filter((s) =>
  ["Expert", "Advanced"].includes(s.level),
);
