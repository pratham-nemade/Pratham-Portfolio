"use client"

import { useSyncExternalStore } from "react"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { daysBetween, startDate } from "@/lib/format"

const noop = () => () => {}

export function CurrentFocus({
  period,
  focus,
}: {
  period: string
  focus?: string
}) {
  const start = startDate(period)
  const day = useSyncExternalStore(
    noop,
    () => (start ? daysBetween(start, new Date()) + 1 : null),
    () => null
  )

  return (
    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
      <Badge
        variant="outline"
        className="h-6 gap-1.5 border-primary/40 bg-primary/10 px-2 font-mono text-[0.5625rem] tracking-widest text-primary uppercase dark:bg-primary/10"
      >
        <span className="relative flex size-1.5">
          <span className="absolute inset-0 animate-ping bg-primary opacity-60" />
          <span className="relative size-1.5 bg-primary" />
        </span>
        Now
      </Badge>

      {focus && <span className="text-foreground/85">{focus}</span>}

      {start && day !== null && (
        <>
          <Separator orientation="vertical" className="h-3.5!" />
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                tabIndex={0}
                className="cursor-pointer font-mono text-xs text-muted-foreground tabular-nums outline-none focus-visible:text-foreground"
              >
                Day {day}
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={6}>
              In the role since{" "}
              {start.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </TooltipContent>
          </Tooltip>
        </>
      )}
    </div>
  )
}
