"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "motion/react"
import { useLenis } from "lenis/react"
import { ArrowUpRight, Lock, Monitor, Workflow } from "lucide-react"

import { scrollToSection } from "@/components/providers/smooth-scroll"
import { SystemDiagram } from "@/components/sections/projects/system-diagram"
import { GithubIcon } from "@/components/shared/brand-icons"
import { Container, sectionPad } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { WindowDots } from "@/components/shared/window-dots"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { projects } from "@/data/projects"
import { pad2 } from "@/lib/format"
import { EASE, reveal } from "@/lib/motion"
import { PROJECT_HASH } from "@/lib/project-link"
import { cn } from "@/lib/utils"
import type { Project } from "@/types"

type View = "system" | "interface"

const label =
  "font-mono text-[0.5625rem] tracking-[0.3em] text-muted-foreground uppercase"

const hostOf = (url?: string) => {
  if (!url) return ""
  try {
    return new URL(url).host
  } catch {
    return url
  }
}

function Story({ project }: { project: Project }) {
  const item = (i: number) =>
    ({
      initial: { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: i * 0.06, ease: EASE },
    }) as const

  return (
    <div className="flex h-full flex-col gap-6 p-6 sm:p-8 lg:gap-4 lg:p-5 tall:gap-7 tall:p-8">
      <motion.div {...item(0)} className="flex flex-col gap-2 tall:gap-3">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="h-6 border-primary/40 bg-primary/10 px-2 font-mono text-[0.5625rem] font-normal tracking-widest text-primary uppercase dark:bg-primary/10"
          >
            {project.role}
          </Badge>
          <span className={label}>{project.year}</span>
        </div>
        <h3 className="text-4xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-4xl tall:text-5xl">
          {project.name}
        </h3>
        <p className="text-muted-foreground">{project.tagline}</p>
      </motion.div>

      <motion.div {...item(1)} className="flex flex-col gap-3 tall:gap-4">
        <div className="flex flex-col gap-1.5">
          <span className={label}>The problem</span>
          <p className="text-sm text-pretty text-muted-foreground sm:text-[0.9375rem]">
            {project.problem}
          </p>
        </div>
        <Separator />
        <div className="flex flex-col gap-1.5">
          <span className={label}>What I built</span>
          <p className="text-sm text-pretty sm:text-[0.9375rem]">
            {project.solution}
          </p>
        </div>
      </motion.div>

      <motion.dl
        {...item(2)}
        className="grid grid-cols-3 gap-px border bg-border"
      >
        {project.facts.map((f) => (
          <div
            key={f.label}
            className="flex flex-col gap-1 bg-card p-3 lg:p-2.5 tall:p-3"
          >
            <dt className="order-2 text-xs leading-snug text-pretty text-muted-foreground">
              {f.label}
            </dt>
            <dd className="order-1 font-heading text-2xl font-bold tracking-tight text-primary lg:text-xl tall:text-2xl">
              {f.value}
            </dd>
          </div>
        ))}
      </motion.dl>

      <motion.div
        {...item(3)}
        className="mt-auto flex flex-col gap-3 tall:gap-4"
      >
        <ul aria-label="Built with" className="flex flex-wrap gap-1">
          {project.stack.map((t) => (
            <li key={t}>
              <Badge
                variant="outline"
                className="h-5 px-1.5 font-mono text-[0.5625rem] font-normal tracking-wider text-muted-foreground uppercase"
              >
                {t}
              </Badge>
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-2 gap-2">
          {project.links.live && (
            <Button asChild className="group h-10 justify-between px-4 text-sm">
              <a href={project.links.live} target="_blank" rel="noreferrer">
                Live site
                <ArrowUpRight className="size-4! transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          )}
          {project.links.github && (
            <Button
              asChild
              variant="outline"
              className="h-10 justify-between px-4 text-sm"
            >
              <a href={project.links.github} target="_blank" rel="noreferrer">
                Source code
                <GithubIcon className="size-4!" />
              </a>
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function Interface({ project }: { project: Project }) {
  const href = project.links.live ?? project.links.github
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex h-full items-center p-5 sm:p-8"
    >
      <Card className="w-full gap-0 border bg-background py-0 shadow-soft ring-0">
        <Button
          asChild
          variant="ghost"
          className="group h-auto w-full flex-col items-stretch gap-0 p-0 font-normal whitespace-normal hover:bg-transparent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset active:not-aria-[haspopup]:translate-y-0"
        >
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.name}`}
          >
            <span className="flex h-9 items-center gap-3 border-b px-3">
              <WindowDots />
              <span className="flex h-5 min-w-0 flex-1 items-center justify-center gap-1.5 bg-muted/50 px-3 font-mono text-[0.625rem] text-muted-foreground">
                <Lock className="size-3 shrink-0 text-primary/70" />
                <span className="truncate">{hostOf(href)}</span>
              </span>
              <ArrowUpRight className="size-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
            </span>
            <span className="relative block aspect-1920/940 overflow-hidden">
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-top transition-transform duration-1000 ease-smooth group-hover:scale-[1.03]"
              />
            </span>
          </a>
        </Button>
      </Card>
    </motion.div>
  )
}

export function Projects() {
  const lenis = useLenis()
  const [value, setValue] = useState(projects[0].slug)
  const [view, setView] = useState<View>("system")

  useEffect(() => {
    const fromHash = () => {
      const slug = window.location.hash.startsWith(PROJECT_HASH)
        ? window.location.hash.slice(PROJECT_HASH.length)
        : null
      if (!slug || !projects.some((p) => p.slug === slug)) return
      setValue(slug)
      scrollToSection(lenis, "#projects")
    }
    const id = requestAnimationFrame(fromHash)
    window.addEventListener("hashchange", fromHash)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener("hashchange", fromHash)
    }
  }, [lenis])

  const select = (slug: string) => {
    setValue(slug)
    window.history.replaceState(null, "", `${PROJECT_HASH}${slug}`)
  }

  return (
    <section
      id="projects"
      className={cn(
        "relative scroll-mt-14 lg:flex lg:h-svh lg:min-h-152 lg:flex-col",
        sectionPad
      )}
    >
      <Container className="lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
        <h2 className="sr-only">Projects</h2>
        <SectionHeader index={4} title="Projects" note="Selected work" />

        <motion.div
          {...reveal(0.1)}
          className="lg:flex lg:min-h-0 lg:flex-1 lg:flex-col"
        >
          <Tabs
            value={value}
            onValueChange={select}
            className="gap-0 lg:min-h-0 lg:flex-1"
          >
            <div className="flex flex-col gap-4 border-b sm:flex-row sm:items-end sm:justify-between">
              <TabsList
                variant="line"
                aria-label="Projects"
                className="h-auto! w-full justify-start gap-0 overflow-x-auto p-0 sm:w-auto"
              >
                {projects.map((p, i) => (
                  <TabsTrigger
                    key={p.slug}
                    value={p.slug}
                    className="h-auto flex-none gap-2.5 border-0 px-4 py-3 text-base font-normal text-muted-foreground after:-bottom-px! after:bg-primary first:pl-0 hover:text-foreground focus-visible:ring-0 focus-visible:outline-none sm:px-5 lg:py-2.5 data-active:text-foreground dark:data-active:text-foreground tall:py-3"
                  >
                    <span className="font-mono text-[0.625rem] text-primary">
                      {pad2(i + 1)}
                    </span>
                    <span className="font-heading font-semibold tracking-tight">
                      {p.name}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <ToggleGroup
                type="single"
                value={view}
                onValueChange={(v) => v && setView(v as View)}
                aria-label="View"
                spacing={0}
                className="mb-3 hidden sm:flex"
              >
                {(
                  [
                    ["system", "System", Workflow],
                    ["interface", "Interface", Monitor],
                  ] as const
                ).map(([v, text, Icon]) => (
                  <ToggleGroupItem
                    key={v}
                    value={v}
                    variant="outline"
                    className="h-8 gap-2 px-3 text-sm font-normal text-muted-foreground hover:text-foreground data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  >
                    <Icon className="size-3.5" />
                    {text}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            {projects.map((p) => (
              <TabsContent
                key={p.slug}
                value={p.slug}
                className="mt-6 text-sm lg:mt-4 lg:min-h-0 tall:mt-6"
              >
                <Card className="gap-0 overflow-hidden border py-0 text-sm shadow-[0_40px_80px_-50px_color-mix(in_oklch,var(--primary)_45%,transparent)] ring-0 lg:grid lg:h-full lg:grid-cols-12">
                  <div className="lg:col-span-6 lg:min-h-0 lg:overflow-y-auto xl:col-span-5">
                    <Story project={p} />
                  </div>
                  <div className="border-t blueprint-grid lg:col-span-6 lg:min-h-0 lg:border-t-0 lg:border-l xl:col-span-7">
                    <div className="sm:hidden">
                      <Interface project={p} />
                    </div>
                    {view === "system" ? (
                      <SystemDiagram key={p.slug} project={p} />
                    ) : (
                      <div className="hidden h-full sm:block">
                        <Interface project={p} />
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </Container>
    </section>
  )
}
