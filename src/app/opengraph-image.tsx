import { ImageResponse } from "next/og";
import { profile, yearsOfExperience } from "@/data/profile";
import { seo } from "@/data/seo";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded Open Graph card generated at build time. */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "linear-gradient(135deg, #08080d 0%, #10111a 60%, #14122a 100%)",
        color: "#e8eaf0",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "#8b93ff",
            color: "#0a0a12",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          {profile.initials}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#a3abbd" }}>
          {new URL(seo.siteUrl).host}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: -2 }}
        >
          {profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#8b93ff" }}>
          {profile.role} · {yearsOfExperience}+ years
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#a3abbd", maxWidth: 900 }}>
          Distributed systems, cloud-native architecture, and refined web experiences.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          height: 6,
          width: 320,
          borderRadius: 3,
          background: "linear-gradient(90deg, #8b93ff, #22d3ee, #a855f7)",
        }}
      />
    </div>,
    size,
  );
}
