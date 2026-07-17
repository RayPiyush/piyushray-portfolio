import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Base surface card — glassmorphic, hairline border, soft elevation.
 * Compose with TiltCard (components/motion) for interactive 3D hover.
 */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass ring-hairline rounded-2xl p-6 shadow-soft",
        "transition-all duration-300",
        className,
      )}
      {...props}
    />
  );
}

export function CardHoverable({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <Card
      className={cn(
        "hover:border-strong hover:shadow-raised hover:-translate-y-1",
        className,
      )}
      {...props}
    />
  );
}
