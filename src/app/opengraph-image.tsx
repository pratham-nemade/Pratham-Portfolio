import { ImageResponse } from "next/og"

import { siteConfig } from "@/config/site"

export const alt = `${siteConfig.name}, ${siteConfig.role}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const colors = {
  background: "#141319",
  foreground: "#e5e3ed",
  muted: "#a8a3b5",
  primary: "#bc9cff",
  border: "#2f2c35",
}

export default function OpengraphImage() {
  const [first, last] = siteConfig.name.split(" ")

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: colors.background,
        backgroundImage: `linear-gradient(to right, ${colors.border} 1px, transparent 1px), linear-gradient(to bottom, ${colors.border} 1px, transparent 1px)`,
        backgroundSize: "52px 52px",
        color: colors.foreground,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 64,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: colors.primary,
            color: colors.background,
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          PN
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: colors.primary,
          }}
        >
          {siteConfig.role}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 132,
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: -6,
        }}
      >
        <span>{first}</span>
        <span style={{ color: colors.primary, marginLeft: 120 }}>{last}</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 26,
          color: colors.muted,
        }}
      >
        <span>Fintech and SaaS products people rely on</span>
        <span>{siteConfig.location}</span>
      </div>
    </div>,
    size
  )
}
