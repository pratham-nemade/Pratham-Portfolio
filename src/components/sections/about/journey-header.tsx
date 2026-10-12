"use client"

import { Fragment } from "react"
import { motion } from "motion/react"

import { Separator } from "@/components/ui/separator"
import { journey } from "@/data/about"
import { reveal } from "@/lib/motion"
import { cn } from "@/lib/utils"

const phases = [
  { verb: "Learn", stops: ["B.E. in IT"] },
  { verb: "Build", stops: ["Masai School"] },
  { verb: "Ship", stops: ["Sunbase", "Hyperface"] },
]

export function JourneyHeader({ active }: { active: number }) {
  const activeShort = active >= 0 ? journey[active]?.short : undefined
  const current = phases.findIndex((p) =>
    activeShort ? p.stops.includes(activeShort) : false
  )

  return (
    <motion.div {...reveal()} className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <h3 className="text-3xl sm:text-4xl">The Journey</h3>

        <ol
          aria-label="Phases"
          className="flex items-center gap-3 font-mono text-[0.625rem] tracking-[0.25em] uppercase"
        >
          {phases.map((phase, i) => {
            const on = i === current
            const passed = current > i
            return (
              <Fragment key={phase.verb}>
                {i > 0 && (
                  <li
                    aria-hidden
                    className="relative h-px w-8 bg-border sm:w-12"
                  >
                    <span
                      className={cn(
                        "absolute inset-0 origin-left bg-primary transition-transform duration-500",
                        current >= i ? "scale-x-100" : "scale-x-0"
                      )}
                    />
                  </li>
                )}
                <li
                  aria-current={on ? "step" : undefined}
                  className={cn(
                    "flex items-center gap-2 transition-colors duration-300",
                    on
                      ? "text-foreground"
                      : passed
                        ? "text-muted-foreground"
                        : "text-muted-foreground/50"
                  )}
                >
                  <span
                    className={cn(
                      "transition-colors duration-300",
                      on || passed ? "text-primary" : undefined
                    )}
                  >
                    0{i + 1}
                  </span>
                  {phase.verb}
                </li>
              </Fragment>
            )
          })}
        </ol>
      </div>
      <Separator />
    </motion.div>
  )
}
