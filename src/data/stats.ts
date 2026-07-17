import { certifications } from "./certifications";
import { yearsOfExperience } from "./profile";
import { projects } from "./projects";

/**
 * ── EDIT ME ── Headline numbers on the home page.
 * The first three are derived automatically from other configs.
 */
export const stats = [
  { value: yearsOfExperience, suffix: "+", label: "Years of experience" },
  { value: projects.length, suffix: "", label: "Projects shipped" },
  { value: certifications.length, suffix: "", label: "Certifications" },
  { value: 600, suffix: "+", label: "DSA problems solved" },
];
