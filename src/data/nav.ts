import type { NavItem } from "./types";

/** Main navigation — drives the navbar, command palette, sitemap, and footer. */
export const navItems: NavItem[] = [
  { label: "About", href: "/about", description: "Story, journey, and values" },
  { label: "Skills", href: "/skills", description: "Technologies and expertise" },
  { label: "Experience", href: "/experience", description: "Career timeline" },
  { label: "Projects", href: "/projects", description: "Selected work and case studies" },
  { label: "Blog", href: "/blog", description: "Writing on engineering" },
  { label: "Contact", href: "/contact", description: "Get in touch" },
];

/** Secondary pages — command palette + footer + sitemap only. */
export const secondaryNavItems: NavItem[] = [
  { label: "Achievements", href: "/achievements", description: "Milestones and wins" },
  {
    label: "Certifications",
    href: "/certifications",
    description: "Credentials and courses",
  },
  { label: "Resume", href: "/resume", description: "Preview and download" },
  { label: "Privacy", href: "/privacy", description: "Privacy policy" },
];

export const allNavItems = [
  { label: "Home", href: "/", description: "Back to the start" },
  ...navItems,
  ...secondaryNavItems,
];
