import {
  SiGithub,
  SiLeetcode,
  SiGeeksforgeeks,
  SiHackerrank,
  SiX,
} from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import type { SocialLink } from "./types";

/** ── EDIT ME ── Social profiles rendered in the hero, footer, and contact page. */
export const socials: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/RayPiyush",
    icon: SiGithub,
    username: "RayPiyush",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/piyus1208/",
    icon: FaLinkedinIn,
    username: "piyus1208",
  },
  {
    name: "Twitter",
    url: "https://x.com/piyush08_ray",
    icon: SiX,
    username: "piyush08_ray",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/mepiyush_0_8_1_2/",
    icon: SiLeetcode,
    username: "mepiyush_0_8_1_2",
  },
  {
    name: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/profile/piyushkumarroy50",
    icon: SiGeeksforgeeks,
    username: "piyushkumarroy50",
  },
  {
    name: "HackerRank",
    url: "https://www.hackerrank.com/profile/piyush_ray_08",
    icon: SiHackerrank,
    username: "piyush_ray_08",
  },
];

/** Primary profiles surfaced in compact spots (hero, footer bottom). */
export const primarySocials = socials.slice(0, 3);
