import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format an ISO-ish date string ("2024-06") for display. */
export function formatDate(date: string, opts: Intl.DateTimeFormatOptions = {}) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    ...opts,
  });
}

/** Full years elapsed since a given ISO date — used for "years of experience". */
export function yearsSince(isoDate: string) {
  const ms = Date.now() - new Date(isoDate).getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24 * 365.25)));
}

/** Slugify a heading for anchor links. */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Estimated reading time in minutes for a block of text. */
export function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 220));
}
