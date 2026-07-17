import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  [
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium",
    "transition-all duration-300 select-none whitespace-nowrap",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-foreground text-background shadow-raised",
          "hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0",
        ],
        accent: [
          "bg-accent text-accent-foreground shadow-raised",
          "hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0",
        ],
        outline: [
          "glass text-foreground",
          "hover:border-strong hover:-translate-y-0.5 active:translate-y-0",
        ],
        ghost: ["text-muted hover:text-foreground hover:bg-surface"],
        link: ["text-accent underline-offset-4 hover:underline p-0 h-auto"],
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
