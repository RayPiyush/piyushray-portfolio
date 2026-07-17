"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Base delay in seconds before the first word animates. */
  delay?: number;
  as?: "h1" | "h2" | "p" | "span";
}

/** Word-by-word masked text reveal for headlines. */
export function TextReveal({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  // Screen readers get the plain text; the animated copy is decorative.
  return (
    <Tag className={cn("inline-block", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-block">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden pb-1 align-bottom"
          >
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.6,
                delay: delay + i * 0.045,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
