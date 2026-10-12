"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

import { pad2 } from "@/lib/format"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const TOTAL_SECTIONS = 6

const DIGITS: Record<string, string[]> = {
  "0": ["111", "101", "101", "101", "111"],
  "1": ["010", "110", "010", "010", "111"],
  "2": ["111", "001", "111", "100", "111"],
  "3": ["111", "001", "111", "001", "111"],
  "4": ["101", "101", "111", "001", "001"],
  "5": ["111", "100", "111", "001", "111"],
  "6": ["111", "100", "111", "101", "111"],
  "7": ["111", "001", "001", "001", "001"],
  "8": ["111", "101", "111", "101", "111"],
  "9": ["111", "101", "111", "001", "111"],
}

const rand = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

function PixelNumber({ value, on }: { value: string; on: boolean }) {
  return (
    <span aria-hidden className="flex gap-1">
      {value.split("").map((d, di) => (
        <span key={di} className="grid grid-cols-3 gap-px">
          {(DIGITS[d] ?? DIGITS["0"])
            .join("")
            .split("")
            .map((bit, i) => {
              const k = di * 15 + i
              const lit = bit === "1"
              return (
                <span
                  key={i}
                  style={{ transitionDelay: on ? `${rand(k) * 450}ms` : "0ms" }}
                  className={cn(
                    "size-1.5 transition-colors duration-300",
                    lit ? (on ? "bg-primary" : "bg-primary/15") : "bg-border/40"
                  )}
                />
              )
            })}
        </span>
      ))}
    </span>
  )
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#/*+<>"

function useDecode(text: string, run: boolean, skip: boolean) {
  const [out, setOut] = useState(text)
  useEffect(() => {
    if (!run || skip) return
    let frame = 0
    const frames = 16
    const id = setInterval(() => {
      frame++
      const settled = Math.floor((frame / frames) * text.length)
      setOut(
        text
          .split("")
          .map((c, i) =>
            c === " " || i < settled
              ? c
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          )
          .join("")
      )
      if (frame >= frames) {
        clearInterval(id)
        setOut(text)
      }
    }, 35)
    return () => clearInterval(id)
  }, [run, skip, text])
  return out
}

export function SectionHeader({
  index,
  title,
  note,
  className,
}: {
  index: number
  title: string
  note?: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const reduce = useReducedMotion() ?? false
  const on = inView || reduce
  const decoded = useDecode(title.toUpperCase(), inView, reduce)

  return (
    <div
      ref={ref}
      className={cn(
        "mb-10 flex items-center gap-4 font-mono text-[0.6875rem] tracking-[0.3em] text-muted-foreground uppercase sm:mb-12 lg:mb-4 lg:tall:mb-8",
        className
      )}
    >
      <PixelNumber value={pad2(index)} on={on} />
      <span className="sr-only">
        Section {index}: {title}
      </span>

      <span aria-hidden className="whitespace-nowrap text-foreground">
        {decoded}
      </span>

      <Separator className="relative min-w-6 flex-1">
        <motion.span
          initial={false}
          animate={{ width: on ? "100%" : "0%" }}
          transition={{ duration: reduce ? 0 : 1.4, delay: 0.15, ease: EASE }}
          className="absolute inset-y-0 left-0 bg-linear-to-r from-primary/80 via-primary/30 to-transparent"
        >
          <span className="absolute top-1/2 right-0 size-1.5 -translate-y-1/2 bg-primary" />
        </motion.span>
      </Separator>

      <span aria-hidden className="hidden items-center gap-3 sm:flex">
        {note && <span>{note}</span>}
        <span className="tracking-widest">
          <span className="text-primary">{pad2(index)}</span> /{" "}
          {pad2(TOTAL_SECTIONS)}
        </span>
      </span>
    </div>
  )
}
