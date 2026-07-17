import type { Project } from "./types";

/**
 * ── EDIT ME ── Your projects.
 * Each entry powers a card on /projects, a full case-study page at
 * /projects/[slug], structured data, the sitemap, and the command palette.
 */
export const projects: Project[] = [
  {
    slug: "hotel-rating-service",
    title: "Hotel Rating Service",
    tagline: "Spring Cloud microservices system with gateway, discovery, and config",
    description:
      "A distributed hotel-rating platform built as six cooperating Spring Boot services — API Gateway, User, Hotel, and Rating services behind a service registry with centralized configuration. A hands-on implementation of the microservices patterns I use professionally.",
    category: "Backend / Microservices",
    status: "Open Source",
    featured: true,
    timeline: "2026",
    techStack: [
      "Java",
      "Spring Boot",
      "Spring Cloud",
      "Microservices",
      "Eureka",
      "REST APIs",
    ],
    features: [
      "API Gateway as the single entry point, routing requests to backend services",
      "Independent User, Hotel, and Rating services with their own data and deployments",
      "Service discovery via a central registry so services find each other at runtime",
      "Externalized configuration through a dedicated Config Server",
    ],
    challenges: [
      "Designing service boundaries so user, hotel, and rating concerns stay decoupled",
      "Handling inter-service communication and aggregating data across services",
      "Keeping configuration consistent across six independently run services",
    ],
    results: [
      "A complete, runnable reference implementation of the Spring Cloud stack",
      "Mirrors the monolith-to-microservices work I do at TCS in a self-contained project",
    ],
    architecture: [
      "Client → API Gateway → routed to UserService / HotelService / RatingService",
      "All services register with ServiceRegistry (Eureka) for discovery",
      "ConfigServer serves centralized configuration to every service at startup",
      "RatingService aggregates with Hotel and User data for combined responses",
    ],
    links: {
      github: "https://github.com/RayPiyush/HotelRatingService",
    },
    caseStudy: [
      "At work I extract modules from a monolith into Spring Boot services; this project is the same discipline practiced end-to-end on my own time. Every piece of the Spring Cloud puzzle — gateway, discovery, config — is wired by hand rather than inherited from an existing codebase.",
      "The most instructive part was inter-service data aggregation: a rating is meaningless without its hotel and user, which forces you to confront the real trade-offs of distributed data early.",
    ],
  },
  {
    slug: "quickai",
    title: "QuickAI",
    tagline: "Full-stack AI toolkit with a deployed Node backend",
    description:
      "An AI-powered web application with a React client and Node.js server, deployed on Vercel. Users access AI tools through a clean interface backed by server-side AI integrations.",
    category: "Full Stack / AI",
    status: "Live",
    featured: true,
    timeline: "2025",
    techStack: ["JavaScript", "React", "Node.js", "Express", "Vercel", "AI APIs"],
    features: [
      "Client/server architecture with a separately deployed API backend",
      "Server-side AI integrations keeping keys and prompts off the client",
      "Deployed and serving on Vercel",
    ],
    challenges: [
      "Structuring AI calls server-side for security and rate control",
      "Coordinating separate client and server deployments",
    ],
    results: [
      "Live backend deployed on Vercel",
      "Foundation for the agentic-AI work I'm building on now",
    ],
    links: {
      github: "https://github.com/RayPiyush/QuickAI",
      demo: "https://quick-ai-server-kappa.vercel.app",
    },
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    tagline: "The site you're looking at — config-driven and hand-built",
    description:
      "A fully config-driven portfolio built with Next.js App Router, TypeScript, Tailwind CSS v4, and Framer Motion. Lighthouse-100 targets, structured data, PWA-ready — every word of content lives in typed config files.",
    category: "Frontend / Design",
    status: "Live",
    featured: true,
    timeline: "2026",
    techStack: ["TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
    features: [
      "Every word of content lives in typed config files — zero hardcoded data",
      "Design-token system with dark/light themes and reduced-motion support",
      "JSON-LD structured data, sitemap, RSS, and OG images generated automatically",
      "Command palette (Ctrl+K) searching pages, projects, and skills",
    ],
    challenges: [
      "Hitting Lighthouse 100s while keeping rich motion — solved with a ~1KB canvas particle field instead of a 3D library",
    ],
    results: ["You're experiencing the results right now"],
    links: {
      github: "https://github.com/RayPiyush/piyushray-portfolio",
      demo: "https://piyushray.vercel.app",
    },
  },
  {
    slug: "brainly-app",
    title: "Brainly App",
    tagline: "TypeScript + Express REST API backend",
    description:
      "A strictly-typed Express backend written in TypeScript — REST endpoints with custom Express type augmentation, compiled builds, and a clean src/dist project layout.",
    category: "Backend / API",
    status: "Open Source",
    featured: false,
    timeline: "2025",
    techStack: ["TypeScript", "Node.js", "Express"],
    features: [
      "Fully typed Express request/response handling via custom type definitions",
      "Separate compiled output (dist) from source for clean deployments",
    ],
    challenges: ["Augmenting Express's types safely instead of falling back to any"],
    results: ["A reusable template for typed Node backends"],
    links: {
      github: "https://github.com/RayPiyush/BrainlyApp",
    },
  },
  {
    slug: "movie-app",
    title: "Movie App",
    tagline: "React Native movie discovery app with Expo",
    description:
      "A cross-platform mobile app built with Expo and TypeScript, styled with NativeWind (Tailwind for React Native), using file-based routing for screens.",
    category: "Mobile",
    status: "In Development",
    featured: false,
    timeline: "2025",
    techStack: ["TypeScript", "React Native", "Expo", "NativeWind"],
    features: [
      "File-based routing with Expo Router",
      "Utility-first styling on mobile via NativeWind",
      "Runs on Android, iOS, and Expo Go from one codebase",
    ],
    challenges: ["Adapting web styling habits (Tailwind) to native layout constraints"],
    results: ["First cross-platform mobile project — web skills carried to native"],
    links: {
      github: "https://github.com/RayPiyush/MovieApp",
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
