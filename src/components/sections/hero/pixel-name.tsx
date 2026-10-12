"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"
import {
  createPixel,
  mountPixelStage,
  rasterize,
  stepPixel,
  type Pixel,
} from "@/lib/pixel-canvas"

const SPRING = 0.075
const FRICTION = 0.8

export function PixelName({
  lines,
  className,
}: {
  lines: readonly [string, string]
  className?: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    return mountPixelStage(wrap, canvas, (stage) => {
      let pixels: Pixel[] = []
      let delays: number[] = []
      let cell = 5
      let radius = 90
      let born = 0

      return {
        get pixels() {
          return pixels
        },
        get cell() {
          return cell
        },
        get radius() {
          return radius
        },
        layout() {
          const { width, height, reduce } = stage
          const r = rasterize(lines, width, height, {
            indent: width >= 1024 ? 1.4 : width >= 640 ? 1.1 : 0,
            fill: 0.94,
            cell: (size) => Math.max(3, Math.round(size / 46)),
            centerOnPixels: true,
          })
          cell = r.cell
          radius = Math.max(60, r.fontSize * 0.55)
          pixels = r.targets.map((t) =>
            createPixel(
              t,
              reduce
                ? t
                : {
                    x: t.x + (Math.random() - 0.5) * width * 0.6,
                    y: t.y + (Math.random() - 0.5) * height * 1.4,
                  }
            )
          )
          delays = r.targets.map(
            (t) => (t.x / width) * 700 + Math.random() * 250
          )
          born = performance.now()
        },
        update(now, pointer) {
          const age = now - born
          let moving = false
          pixels.forEach((p, i) => {
            if (age < delays[i]) moving = true
            else if (stepPixel(p, pointer, radius, SPRING, FRICTION))
              moving = true
          })
          return moving
        },
      }
    })
  }, [lines])

  return (
    <div
      ref={wrapRef}
      className={cn("relative touch-pan-y select-none", className)}
    >
      <h1 className="sr-only">{lines.join(" ")}</h1>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 size-full cursor-crosshair"
      />
    </div>
  )
}
