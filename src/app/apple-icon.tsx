import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon generated at build time from the brand monogram. */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6d76f6 0%, #8b93ff 100%)",
        color: "#0a0a12",
        fontSize: 72,
        fontWeight: 700,
        fontFamily: "sans-serif",
        borderRadius: 36,
      }}
    >
      {profile.initials}
    </div>,
    size,
  );
}
