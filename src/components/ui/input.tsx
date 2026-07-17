import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const fieldClasses = [
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm",
  "text-foreground placeholder:text-subtle",
  "transition-colors duration-200",
  "hover:border-strong focus:border-accent focus:outline-none",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
].join(" ");

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClasses, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea className={cn(fieldClasses, "min-h-32 resize-y", className)} {...props} />
  );
}
