"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { ArrowDown, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/config/site"
import { journey, portrait } from "@/data/about"
import { startYear } from "@/lib/format"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function PortraitCard({ active }: { active: number }) {
  const stop = active >= 0 ? journey[active] : null

  return (
    <Card className="gap-0 border py-0 text-sm shadow-[0_40px_80px_-50px_color-mix(in_oklch,var(--primary)_45%,transparent)] ring-0">
      <div className="relative aspect-4/5 overflow-hidden lg:aspect-auto lg:h-[min(calc(100svh-17rem),60rem)] lg:min-h-80">
        <Image
          src={portrait.src}
          alt={portrait.alt}
          fill
          sizes="(min-width: 1024px) 480px, 448px"
          style={{
            objectPosition: `${portrait.focus.x * 100}% ${portrait.focus.y * 100}%`,
          }}
          className="object-cover"
        />

        <Badge className="absolute top-4 left-4 h-6 gap-1.5 border-white/20 bg-black/35 px-2.5 font-mono text-[0.5625rem] font-normal tracking-[0.2em] text-white uppercase backdrop-blur-md [&>svg]:size-3!">
          <MapPin />
          Based in {siteConfig.location.split(",")[0]}
        </Badge>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/35 to-transparent px-5 pt-24 pb-5 text-white">
          <p className="font-heading text-2xl font-semibold tracking-tight">
            {siteConfig.name}
          </p>
          <div className="mt-1 flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.3em] text-white/75 uppercase">
            <Separator className="bg-primary data-horizontal:w-5" />
            {siteConfig.role}
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-[1fr_auto] gap-5 p-5">
        <div className="flex min-w-0 flex-col justify-between gap-2">
          <div className="relative h-11 overflow-hidden">
            <motion.span
              key={stop ? startYear(stop.period) : "hi"}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="block font-heading text-4xl leading-[1.2] font-bold tracking-tight text-primary"
            >
              {stop ? startYear(stop.period) : "Hi."}
            </motion.span>
          </div>
          <div className="relative h-10 overflow-hidden">
            <motion.div
              key={stop?.title ?? "intro"}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-0"
            >
              {stop ? (
                <>
                  <p className="truncate text-sm font-semibold">{stop.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {stop.place}
                  </p>
                </>
              ) : (
                <>
                  <p className="truncate text-sm font-semibold">
                    Nice to meet you.
                  </p>
                  <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                    Scroll to follow the journey
                    <ArrowDown className="size-3 animate-bounce motion-reduce:animate-none" />
                  </p>
                </>
              )}
            </motion.div>
          </div>
        </div>

        <ol className="relative flex flex-col justify-between gap-1.5 border-l pl-4">
          <span
            aria-hidden
            className="absolute top-1.5 -left-px w-px bg-primary transition-[height] duration-700 ease-smooth"
            style={{
              height:
                active < 0
                  ? "0%"
                  : `calc(${(active / (journey.length - 1)) * 100}% - ${(active / (journey.length - 1)) * 0.75}rem)`,
            }}
          />
          {journey.map((j, i) => {
            const on = i === active
            const passed = active >= 0 && i <= active
            return (
              <li
                key={j.title}
                aria-current={on ? "step" : undefined}
                className={cn(
                  "relative flex items-center gap-2 font-mono text-[0.625rem] tracking-wider whitespace-nowrap uppercase transition-colors duration-300",
                  on
                    ? "text-foreground"
                    : passed
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-[-1.22rem] size-1.5 transition-all duration-300",
                    on
                      ? "scale-150 bg-primary"
                      : passed
                        ? "bg-primary/60"
                        : "bg-border"
                  )}
                />
                <span className={on ? "text-primary" : undefined}>
                  {startYear(j.period)}
                </span>
                {j.short}
              </li>
            )
          })}
        </ol>
      </div>
    </Card>
  )
}
