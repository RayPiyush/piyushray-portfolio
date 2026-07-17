"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight ambient particle field on a single <canvas>.
 * Deliberately used instead of a 3D library: the same atmospheric depth
 * at ~1KB of JS, keeping the Lighthouse performance budget intact.
 * Skips entirely for reduced-motion users.
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    interface Particle {
      x: number;
      y: number;
      z: number; // depth 0..1 — controls size, speed, opacity
      vx: number;
      vy: number;
    }

    let particles: Particle[] = [];

    function resize() {
      const rect = canvas!.parentElement?.getBoundingClientRect();
      if (!rect) return;
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(70, Math.floor((width * height) / 22000));
      particles = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          vx: (Math.random() - 0.5) * (0.08 + z * 0.18),
          vy: -(0.04 + z * 0.14),
        };
      });
    }

    function isDark() {
      return document.documentElement.classList.contains("dark");
    }

    function tick() {
      ctx!.clearRect(0, 0, width, height);
      const dark = isDark();

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) {
          p.y = height + 4;
          p.x = Math.random() * width;
        }
        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;

        const alpha = (dark ? 0.35 : 0.22) * (0.3 + p.z * 0.7);
        const radius = 0.6 + p.z * 1.6;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = dark
          ? `rgba(160, 168, 255, ${alpha})`
          : `rgba(79, 70, 229, ${alpha})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    tick();

    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    // Pause rendering when the hero is off-screen.
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(raf);
      }
    });
    visibility.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      visibility.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
