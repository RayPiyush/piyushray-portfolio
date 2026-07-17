import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Compact tech-stack tag (monospace, subtle). */
export function Tag({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-surface",
        "px-2 py-0.5 font-mono text-[11px] text-muted",
        className,
      )}
      {...props}
    />
  );
}
