import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
}

/**
 * CSS-driven infinite marquee (zero JS). Content is duplicated once;
 * the duplicate is aria-hidden so screen readers hear it a single time.
 * Pauses on hover and collapses to a static row for reduced motion.
 */
export function Marquee({ children, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        "[mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
    >
      <div className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
        <div className="flex shrink-0 gap-6">{children}</div>
        <div className="flex shrink-0 gap-6 motion-reduce:hidden" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
