"use client"

import { motion } from "motion/react"
import { BriefcaseBusiness, GraduationCap } from "lucide-react"

import { CurrentFocus } from "@/components/sections/about/current-focus"
import { Badge } from "@/components/ui/badge"
import { journey } from "@/data/about"
import { reveal } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

export function JourneyChapters({ active }: { active: number }) {
  return (
    <ol className="flex flex-col">
      {journey.map((stop, i) => {
        const work = stop.kind === "Work"
        const Icon = work ? BriefcaseBusiness : GraduationCap
        const last = i === journey.length - 1
        const dim = active >= 0 && active !== i
        const filled = active > i
        const spotlight = cn(
          "transition-opacity duration-500",
          dim && "lg:opacity-35 lg:group-hover:opacity-100"
        )

        return (
          <motion.li
            key={stop.title}
            data-journey={i}
            {...reveal(i * 0.05, { duration: 0.8 })}
            className="group relative grid grid-cols-[1.5rem_1fr] gap-x-5 sm:grid-cols-[9rem_1.5rem_1fr] sm:gap-x-6"
          >
            <div
              className={cn(
                "col-start-2 row-start-1 flex flex-wrap items-center gap-x-3 gap-y-2 pb-3 sm:col-start-1 sm:flex-col sm:items-start sm:pb-0",
                spotlight
              )}
            >
              <span className="font-mono text-xs text-primary">
                {stop.period}
              </span>
              <Badge
                variant={work ? "default" : "outline"}
                className={cn(
                  "h-6 gap-1.5 px-2 font-mono text-[0.5625rem] font-normal tracking-widest uppercase [&>svg]:size-3!",
                  !work &&
                    "border-primary/50 bg-transparent text-primary dark:bg-transparent"
                )}
              >
                <Icon />
                {work ? "Experience" : "Education"}
              </Badge>
            </div>

            <div
              aria-hidden
              className="relative col-start-1 row-span-2 row-start-1 flex justify-center sm:col-start-2"
            >
              {!last && (
                <>
                  <Separator
                    orientation="vertical"
                    className="absolute top-4 bottom-0"
                  />
                  <span
                    className={cn(
                      "absolute top-4 bottom-0 w-px origin-top bg-primary transition-transform duration-700 ease-smooth",
                      filled ? "scale-y-100" : "scale-y-0"
                    )}
                  />
                </>
              )}
              <span
                className={cn(
                  "relative z-10 mt-1 size-3 border-2 border-primary transition-all duration-500",
                  work ? "bg-primary" : "bg-background",
                  active === i &&
                    "scale-125 shadow-[0_0_0_4px_color-mix(in_oklch,var(--primary)_20%,transparent)]"
                )}
              >
                {stop.current && (
                  <span className="absolute inset-0 animate-ping bg-primary opacity-50" />
                )}
              </span>
            </div>

            <div
              className={cn(
                "col-start-2 flex flex-col gap-2 sm:col-start-3 sm:row-start-1",
                last ? "pb-0" : "pb-12",
                spotlight
              )}
            >
              <h4 className="text-xl sm:text-2xl">{stop.title}</h4>
              <p className="text-sm text-muted-foreground">{stop.place}</p>
              <p className="mt-1 text-sm text-pretty text-muted-foreground sm:text-[0.9375rem]">
                {stop.text}
              </p>
              {stop.current && (
                <CurrentFocus period={stop.period} focus={stop.focus} />
              )}
            </div>
          </motion.li>
        )
      })}
    </ol>
  )
}
