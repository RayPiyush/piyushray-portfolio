"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "glass relative flex size-10 items-center justify-center rounded-full",
        "text-muted transition-all duration-300 hover:text-foreground hover:border-strong",
        className,
      )}
    >
      {/* Render both icons to avoid hydration mismatch; CSS picks the visible one. */}
      <Sun className="size-[18px] scale-100 rotate-0 transition-all duration-500 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-[18px] scale-0 rotate-90 transition-all duration-500 dark:scale-100 dark:rotate-0" />
    </button>
  );
}
