"use client"

import { useRef, useState } from "react"
import { motion } from "motion/react"
import { useLenis } from "lenis/react"

import { scrollToSection } from "@/components/providers/smooth-scroll"
import { SkillIcon } from "@/components/sections/skills/skill-icon"
import { AccentText } from "@/components/shared/accent-text"
import { Container, sectionPad } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { skillGroups, skillsIntro } from "@/data/skills"
import { pad2 } from "@/lib/format"
import { reveal } from "@/lib/motion"
import { cn } from "@/lib/utils"
import type { SkillGroup } from "@/types"

const ALL_TOOLS = skillGroups.flatMap((g) => g.items)

const LAYOUT: Record<string, string> = {
  intro: "lg:col-span-4",
  frontend: "lg:col-span-8",
  platform: "lg:col-span-5",
  ui: "lg:col-span-3",
  realtime: "lg:col-span-4",
  backend: "lg:col-span-5",
  tools: "lg:col-span-7",
}

const label =
  "font-mono text-[0.5625rem] tracking-[0.3em] text-muted-foreground uppercase"

const tileClass =
  "group/tile relative h-full gap-0 overflow-hidden border bg-linear-to-b from-card to-card/50 py-0 text-sm ring-0 transition-colors duration-300 hover:border-primary/40 data-[active=true]:border-primary/60"

function GlowCard({
  active,
  className,
  children,
}: {
  active?: boolean
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <Card
      ref={ref}
      data-active={active}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        ref.current?.style.setProperty("--x", `${e.clientX - r.left}px`)
        ref.current?.style.setProperty("--y", `${e.clientY - r.top}px`)
      }}
      className={cn(tileClass, className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/tile:opacity-100 group-data-[active=true]/tile:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--x, 50%) var(--y, 0%), color-mix(in oklch, var(--primary) 12%, transparent), transparent 70%)",
        }}
      />
      {children}
    </Card>
  )
}

function Glyph({ glyph }: { glyph: string[] }) {
  return (
    <span aria-hidden className="grid w-fit shrink-0 grid-cols-5 gap-0.5">
      {glyph
        .join("")
        .split("")
        .map((c, i) => (
          <span
            key={i}
            style={{
              transitionDelay: `${((i % 5) + Math.floor(i / 5)) * 20}ms`,
            }}
            className={cn(
              "size-1.5 transition-colors duration-300",
              c === "1"
                ? "bg-muted-foreground/40 group-hover/tile:bg-primary group-data-[active=true]/tile:bg-primary"
                : "bg-border/50 group-hover/tile:bg-primary/15 group-data-[active=true]/tile:bg-primary/15"
            )}
          />
        ))}
    </span>
  )
}

function IntroTile({
  active,
  onActive,
}: {
  active: string | null
  onActive: (id: string | null) => void
}) {
  const lenis = useLenis()

  return (
    <motion.div {...reveal(0.05)} className={LAYOUT.intro}>
      <GlowCard className="border-primary/30 from-primary/10 to-card/50">
        <div className="relative flex h-full flex-col gap-5 p-5 sm:p-6">
          <div className="flex flex-col gap-3">
            <span className={cn(label, "text-primary")}>At a glance</span>
            <h2 className="text-4xl leading-none font-bold tracking-[-0.04em]">
              <AccentText text={skillsIntro.title} />
            </h2>
            <p className="text-pretty text-muted-foreground">
              {skillsIntro.text}
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <div className="flex items-baseline justify-between">
              <span className="font-heading text-3xl font-bold tracking-tight">
                {ALL_TOOLS.length}
                <span className="ml-1.5 text-sm font-medium text-muted-foreground">
                  tools
                </span>
              </span>
              <span className={label}>{skillGroups.length} areas</span>
            </div>
            <div aria-hidden className="flex h-2 gap-0.5">
              {skillGroups.map((g) => (
                <span
                  key={g.id}
                  style={{ flexGrow: g.items.length }}
                  className={cn(
                    "transition-colors duration-300",
                    active === g.id
                      ? "bg-primary"
                      : active
                        ? "bg-primary/20"
                        : "bg-primary/50"
                  )}
                />
              ))}
            </div>
            <ul className="flex flex-col">
              {skillGroups.map((g, i) => (
                <li key={g.id}>
                  <Button
                    variant="ghost"
                    onPointerEnter={(e) =>
                      e.pointerType === "mouse" && onActive(g.id)
                    }
                    onPointerLeave={() => onActive(null)}
                    onFocus={() => onActive(g.id)}
                    onBlur={() => onActive(null)}
                    onClick={() =>
                      scrollToSection(lenis, `#skill-${g.id}`, { duration: 1 })
                    }
                    className={cn(
                      "h-8 w-full justify-between gap-3 rounded-none px-1.5 text-sm font-normal hover:bg-primary/10",
                      active === g.id && "bg-primary/10 text-foreground"
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="font-mono text-[0.625rem] text-primary">
                        {pad2(i + 1)}
                      </span>
                      {g.title}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">
                      {g.items.length}
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}

function AreaTile({
  group,
  index,
  active,
  onActive,
}: {
  group: SkillGroup
  index: number
  active: boolean
  onActive: (id: string | null) => void
}) {
  const featured = group.id === "frontend"
  return (
    <motion.div
      {...reveal(0.1 + index * 0.05)}
      id={`skill-${group.id}`}
      className={LAYOUT[group.id]}
      onPointerEnter={() => onActive(group.id)}
      onPointerLeave={() => onActive(null)}
    >
      <GlowCard active={active}>
        <div className="relative flex h-full flex-col gap-4 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs text-primary">
                {pad2(index + 1)}
              </span>
              <h3 className="text-2xl font-semibold tracking-tight">
                {group.title}
              </h3>
              <span className={label}>{pad2(group.items.length)} tools</span>
            </div>
            <Glyph glyph={group.glyph} />
          </div>

          <p className="text-pretty text-muted-foreground">
            {group.description}
          </p>

          {featured ? (
            <ul className="grid flex-1 auto-rows-fr grid-cols-2 gap-px border bg-border sm:grid-cols-4">
              {group.items.map((s) => (
                <li
                  key={s.name}
                  className="flex flex-col justify-between gap-3 bg-background/70 p-3.5 transition-colors duration-300 hover:bg-primary/8 dark:bg-background/50"
                >
                  <span className="grid size-9 place-items-center border text-primary">
                    <SkillIcon name={s.icon} className="size-4.5" />
                  </span>
                  <span className="text-sm font-medium">{s.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((s) => (
                <Badge
                  key={s.name}
                  variant="outline"
                  className="h-9 gap-2 bg-background/60 px-3 text-[0.8125rem] font-normal text-foreground/90 dark:bg-background/40 [&>svg]:size-4!"
                >
                  <SkillIcon name={s.icon} className="text-primary" />
                  {s.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </GlowCard>
    </motion.div>
  )
}

export function Skills() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="skills" className={cn("relative scroll-mt-14", sectionPad)}>
      <Container>
        <SectionHeader index={3} title="Skills" note="The toolkit" />

        <div className="grid grid-cols-[minmax(0,1fr)] gap-3 lg:grid-cols-12 tall:gap-4">
          <IntroTile active={active} onActive={setActive} />
          {skillGroups.map((g, i) => (
            <AreaTile
              key={g.id}
              group={g}
              index={i}
              active={active === g.id}
              onActive={setActive}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
