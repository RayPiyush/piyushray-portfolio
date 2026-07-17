import { profile, yearsOfExperience } from "@/data/profile";
import { cn } from "@/lib/utils";

/**
 * Decorative floating "editor" window in the hero, rendered entirely on the
 * server with hand-tinted tokens — zero client JS. Floats via CSS keyframes.
 */
export function CodeWindow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "glass ring-hairline animate-float-slow rounded-2xl shadow-raised select-none",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-subtle">engineer.java</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed">
        <code>
          <span className="text-[#a5b0ff]">const</span>{" "}
          <span className="text-[#8fd8f2]">engineer</span>{" "}
          <span className="text-muted">=</span> <span className="text-muted">{"{"}</span>
          {"\n"}
          {"  "}
          <span className="text-foreground">name</span>
          <span className="text-muted">:</span>{" "}
          <span className="text-[#7ee0c0]">&quot;{profile.name}&quot;</span>
          <span className="text-muted">,</span>
          {"\n"}
          {"  "}
          <span className="text-foreground">focus</span>
          <span className="text-muted">:</span> <span className="text-muted">[</span>
          <span className="text-[#7ee0c0]">&quot;distributed-systems&quot;</span>
          <span className="text-muted">,</span>{" "}
          <span className="text-[#7ee0c0]">&quot;web&quot;</span>
          <span className="text-muted">],</span>
          {"\n"}
          {"  "}
          <span className="text-foreground">experience</span>
          <span className="text-muted">:</span>{" "}
          <span className="text-[#f2c9a0]">{yearsOfExperience}</span>
          <span className="text-muted">,</span>{" "}
          <span className="text-subtle">{"// years"}</span>
          {"\n"}
          {"  "}
          <span className="text-foreground">ships</span>
          <span className="text-muted">:</span>{" "}
          <span className="text-[#a5b0ff]">async</span>{" "}
          <span className="text-muted">() =&gt;</span>{" "}
          <span className="text-[#8fd8f2]">quality</span>
          <span className="text-muted">,</span>
          {"\n"}
          <span className="text-muted">{"}"}</span>
          <span className="text-muted">;</span>
          <span className="ml-1 inline-block h-3.5 w-1.5 animate-caret bg-accent align-middle" />
        </code>
      </pre>
    </div>
  );
}
