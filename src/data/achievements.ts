import { LuCode, LuMedal, LuRocket, LuTrophy } from "react-icons/lu";
import type { Achievement } from "./types";

/** ── EDIT ME ── Milestones and wins, newest first. */
export const achievements: Achievement[] = [
  {
    title: "600+ DSA problems solved",
    description:
      "611 problems solved on LeetCode — 318 Medium and 68 Hard — built through consistent daily practice.",
    date: "Ongoing",
    icon: LuCode,
    metric: "611 solved",
  },
  {
    title: "Top 20% in LeetCode contests",
    description:
      "Contest rating of 1638 across 29 rated contests, placing in the top ~19% of competitive programmers globally.",
    date: "Ongoing",
    icon: LuTrophy,
    metric: "Rating 1638",
  },
  {
    title: "Databricks Certified Data Engineer Associate",
    description:
      "Industry certification covering Spark, Delta Lake, and production data pipelines on Databricks.",
    date: "Jul 2026",
    icon: LuMedal,
    metric: "Valid to 2028",
  },
  {
    title: "Legacy batch migration shipped at TCS",
    description:
      "Migrated Talend-based batch jobs to restartable, fault-tolerant Spring Batch workloads on Azure — with retry and skip handling for reliable production runs.",
    date: "TCS",
    icon: LuRocket,
    metric: "In production",
  },
];
