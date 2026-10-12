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

type Lines = readonly [string, string]

const SPRING = 0.06
const FRICTION = 0.82

export function PixelDisplay({
  lines,
  className,
}: {
  lines: Lines
  className?: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const morphRef = useRef<((l: Lines) => void) | null>(null)
  const latest = useRef(lines)

  useEffect(() => {
    latest.current = lines
    morphRef.current?.(lines)
  }, [lines])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const unmount = mountPixelStage(wrap, canvas, (stage) => {
      let pixels: Pixel[] = []
      const dying = new Set<Pixel>()
      let cell = 5
      let radius = 90
      let first = true

      const morph = (text: Lines) => {
        const { width, height, reduce } = stage
        if (!width || !height) return
        const { targets } = rasterize(text, width, height, {
          indent: width >= 640 && text[1] ? 0.9 : 0,
          cell,
        })
        const alive = pixels.filter((p) => !dying.has(p))
        for (let i = alive.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[alive[i], alive[j]] = [alive[j], alive[i]]
        }
        const next = pixels.filter((p) => dying.has(p))

        targets.forEach((t, i) => {
          let p = alive[i]
          if (!p) {
            const src = alive[Math.floor(Math.random() * alive.length)]
            p = createPixel(
              t,
              reduce
                ? t
                : src
                  ? { x: src.x, y: src.y }
                  : {
                      x: Math.random() * width,
                      y: first
                        ? t.y + (Math.random() - 0.5) * height * 1.6
                        : t.y,
                    }
            )
          }
          p.hx = t.x
          p.hy = t.y
          p.accent = t.accent
          if (reduce) {
            p.x = t.x
            p.y = t.y
          } else if (!first) {
            p.vx += (Math.random() - 0.5) * 18
            p.vy += (Math.random() - 0.5) * 18
          }
          next.push(p)
        })

        for (let i = targets.length; i < alive.length; i++) {
          const p = alive[i]
          const a = Math.random() * Math.PI * 2
          p.hx = p.x + Math.cos(a) * width * 0.4
          p.hy = p.y + Math.sin(a) * height * 0.6
          if (reduce) continue
          dying.add(p)
          next.push(p)
        }

        pixels = next
        first = false
        if (reduce) stage.draw()
      }

      morphRef.current = morph

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
          const { width, height } = stage
          cell = Math.max(3, Math.round(Math.min(height / 64, width / 120)))
          radius = Math.max(60, height * 0.22)
          morph(latest.current)
        },
        update(_now, pointer) {
          let moving = dying.size > 0
          for (const p of pixels) {
            const dead = dying.has(p)
            if (stepPixel(p, dead ? null : pointer, radius, SPRING, FRICTION))
              moving = true
            if (dead) p.alpha *= 0.93
          }
          if (dying.size) {
            pixels = pixels.filter((p) => {
              if (p.alpha > 0.02) return true
              dying.delete(p)
              return false
            })
          }
          return moving
        },
      }
    })

    return () => {
      morphRef.current = null
      unmount()
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className={cn("relative touch-pan-y select-none", className)}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 size-full cursor-crosshair"
      />
    </div>
  )
}
