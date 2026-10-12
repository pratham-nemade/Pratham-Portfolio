"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"
import type { Project } from "@/types"

export function SystemDiagram({ project }: { project: Project }) {
  const { nodes, edges } = project.system
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-10% 0px" })
  const reduce = useReducedMotion()
  const [focus, setFocus] = useState<string | null>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ w: width, h: height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const focused = focus ? byId[focus] : null
  const linked = (id: string) =>
    !focus ||
    id === focus ||
    edges.some(
      (e) =>
        (e.from === focus && e.to === id) || (e.to === focus && e.from === id)
    )

  return (
    <div className="flex h-full flex-col">
      <div
        ref={ref}
        onPointerLeave={() => setFocus(null)}
        className="relative hidden aspect-5/3 w-full md:block lg:aspect-auto lg:min-h-0 lg:flex-1"
      >
        {size.w > 0 && (
          <svg
            aria-hidden
            viewBox={`0 0 ${size.w} ${size.h}`}
            className="absolute inset-0 size-full"
          >
            {edges.map((e, i) => {
              const a = byId[e.from]
              const b = byId[e.to]
              const on = focus && (e.from === focus || e.to === focus)
              return (
                <motion.line
                  key={`${e.from}-${e.to}`}
                  x1={(a.x / 100) * size.w}
                  y1={(a.y / 100) * size.h}
                  x2={(b.x / 100) * size.w}
                  y2={(b.y / 100) * size.h}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.2 + i * 0.08,
                    ease: EASE,
                  }}
                  strokeWidth={on ? 1.5 : 1}
                  className={cn(
                    "transition-[stroke,opacity] duration-300",
                    on
                      ? "stroke-primary"
                      : focus
                        ? "stroke-border opacity-50"
                        : "stroke-muted-foreground/35"
                  )}
                />
              )
            })}
          </svg>
        )}

        {inView &&
          !reduce &&
          edges.map((e, i) => {
            const a = byId[e.from]
            const b = byId[e.to]
            return (
              <motion.span
                key={`p-${e.from}-${e.to}`}
                aria-hidden
                initial={{ left: `${a.x}%`, top: `${a.y}%`, opacity: 0 }}
                animate={{
                  left: [`${a.x}%`, `${b.x}%`],
                  top: [`${a.y}%`, `${b.y}%`],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.4,
                  delay: 1 + i * 0.45,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  ease: "easeInOut",
                }}
                className={cn(
                  "absolute z-10 size-1.5 -translate-1/2 bg-primary transition-opacity duration-300",
                  focus && e.from !== focus && e.to !== focus && "invisible"
                )}
              />
            )
          })}

        {edges.map((e) => {
          const a = byId[e.from]
          const b = byId[e.to]
          const on = focus && (e.from === focus || e.to === focus)
          return (
            <Badge
              key={`l-${e.from}-${e.to}`}
              aria-hidden
              variant="outline"
              style={{
                left: `${(a.x + b.x) / 2}%`,
                top: `${(a.y + b.y) / 2}%`,
              }}
              className={cn(
                "absolute z-10 h-5 -translate-1/2 border-primary/40 bg-card px-1.5 font-mono text-[0.5625rem] font-normal tracking-widest text-primary uppercase transition-opacity duration-300 dark:bg-card",
                on ? "opacity-100" : "opacity-0"
              )}
            >
              {e.label}
            </Badge>
          )
        })}

        {nodes.map((n, i) => {
          const on = n.id === focus
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              className="absolute z-20 w-36 -translate-1/2 lg:w-32 xl:w-40"
            >
              <Button
                variant="outline"
                onPointerEnter={() => setFocus(n.id)}
                onFocus={() => setFocus(n.id)}
                onBlur={() => setFocus(null)}
                aria-describedby={on ? `${project.slug}-caption` : undefined}
                className={cn(
                  "h-auto w-full cursor-pointer flex-col items-stretch gap-0.5 px-3 py-2 text-left whitespace-normal transition-[background-color,border-color,opacity] duration-300 focus-visible:ring-0 active:translate-y-0",
                  on
                    ? "border-primary bg-[color-mix(in_oklch,var(--primary)_12%,var(--card))] hover:bg-[color-mix(in_oklch,var(--primary)_12%,var(--card))] dark:bg-[color-mix(in_oklch,var(--primary)_12%,var(--card))] dark:hover:bg-[color-mix(in_oklch,var(--primary)_12%,var(--card))]"
                    : "bg-card hover:border-primary/50 hover:bg-card dark:bg-card dark:hover:bg-card",
                  !linked(n.id) && "opacity-35"
                )}
              >
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <span
                    aria-hidden
                    className={cn(
                      "size-1.5 shrink-0 transition-colors",
                      on ? "bg-primary" : "bg-primary/50"
                    )}
                  />
                  {n.label}
                </span>
                <span className="truncate pl-3.5 font-mono text-[0.5625rem] font-normal tracking-wider text-muted-foreground uppercase">
                  {n.tech}
                </span>
              </Button>
            </motion.div>
          )
        })}
      </div>

      <Separator className="hidden md:block" />
      <div
        id={`${project.slug}-caption`}
        aria-live="polite"
        className="hidden min-h-16 items-center gap-4 bg-card/60 px-5 py-3 md:flex"
      >
        <Badge
          variant={focused ? "default" : "outline"}
          className="h-6 shrink-0 px-2 font-mono text-[0.5625rem] font-normal tracking-[0.2em] uppercase"
        >
          {focused ? focused.label : "How it works"}
        </Badge>
        <span className="text-sm text-pretty text-muted-foreground">
          {focused
            ? focused.detail
            : "Point at any part to see what it does and what it talks to."}
        </span>
      </div>

      <Separator className="md:hidden" />
      <ol className="flex flex-col md:hidden">
        {nodes.map((n) => (
          <li
            key={n.id}
            className="flex gap-3 border-t px-5 py-3.5 first:border-t-0"
          >
            <span aria-hidden className="mt-1.5 size-1.5 shrink-0 bg-primary" />
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="flex flex-wrap items-baseline gap-x-2 text-sm font-semibold">
                {n.label}
                <span className="font-mono text-[0.5625rem] font-normal tracking-wider text-muted-foreground uppercase">
                  {n.tech}
                </span>
              </span>
              <span className="text-sm text-pretty text-muted-foreground">
                {n.detail}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
