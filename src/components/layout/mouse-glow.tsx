"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient radial glow that trails the cursor across the whole page.
 * Pure transform updates on a fixed element — no re-renders, no layout work.
 * Disabled automatically for touch devices and reduced-motion users.
 */
export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    function onMove(e: PointerEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function tick() {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      el!.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      raf =
        Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5
          ? requestAnimationFrame(tick)
          : 0;
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 size-[600px] rounded-full opacity-0 blur-3xl transition-opacity duration-700 dark:opacity-100"
      style={{
        background: "radial-gradient(circle, rgb(99 102 241 / 0.07) 0%, transparent 70%)",
      }}
    />
  );
}
