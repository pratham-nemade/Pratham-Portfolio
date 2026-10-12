import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

const P = ["1110", "1001", "1110", "1000", "1000"]
const N = ["1001", "1101", "1011", "1001", "1001"]
const ROWS = P.map((p, i) => `${p}0${N[i]}`)
const CELL = 14
const GAP = 2

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#5f4193",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
        {ROWS.map((row, r) => (
          <div key={r} style={{ display: "flex", gap: GAP }}>
            {row.split("").map((bit, c) => (
              <div
                key={c}
                style={{
                  width: CELL,
                  height: CELL,
                  background: bit === "1" ? "#f7f6fc" : "transparent",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>,
    size
  )
}
