"use client"

import { motion } from "motion/react"
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  FileText,
  Mail,
} from "lucide-react"

import { LocalTimeTile } from "@/components/sections/contact/local-time"
import { MessageForm } from "@/components/sections/contact/message-form"
import { brandIcons } from "@/components/shared/brand-icons"
import { Container, sectionPad } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { SectionTitle } from "@/components/shared/section-title"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { siteConfig, socials } from "@/config/site"
import { useCopy } from "@/hooks/use-copy"
import { reveal } from "@/lib/motion"
import { cn } from "@/lib/utils"

const label =
  "font-mono text-[0.5625rem] tracking-[0.3em] text-muted-foreground uppercase"

const tile =
  "gap-0 border bg-linear-to-b from-card to-card/60 py-0 text-sm ring-0 transition-colors duration-300 hover:border-primary/40"

function Tile({
  className,
  delay = 0,
  children,
}: {
  className?: string
  delay?: number
  children: React.ReactNode
}) {
  return (
    <motion.div {...reveal(delay)} className={className}>
      <Card className={cn(tile, "h-full p-5 tall:p-6")}>{children}</Card>
    </motion.div>
  )
}

export function Contact() {
  const [copied, copy] = useCopy(siteConfig.email, 2000)

  return (
    <section
      id="contact"
      className={cn(
        "relative scroll-mt-14 overflow-hidden lg:flex lg:h-svh lg:min-h-152 lg:flex-col",
        sectionPad
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 opacity-40 blur-3xl hero-glow" />

      <Container className="relative flex flex-col lg:min-h-0 lg:flex-1">
        <SectionHeader index={5} title="Contact" note="Say hello" />

        <div className="mb-8 grid gap-4 lg:mb-5 lg:grid-cols-12 lg:items-end tall:mb-8">
          <SectionTitle className="lg:col-span-7 lg:text-5xl tall:text-6xl xl:tall:text-7xl">
            Have something in <span className="text-primary">mind</span>?
          </SectionTitle>
          <motion.p
            {...reveal(0.08)}
            className="text-base text-pretty text-muted-foreground sm:text-lg lg:col-span-5 lg:text-base tall:text-lg"
          >
            Hiring, building something, or just curious? Drop me a note below.
            It comes straight to me, and I answer every one.
          </motion.p>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)] gap-3 lg:min-h-0 lg:flex-1 lg:grid-cols-12 lg:grid-rows-[1fr_auto_auto] tall:gap-4">
          <motion.div
            {...reveal(0.1)}
            className="lg:col-span-7 lg:row-span-3 lg:min-h-0"
          >
            <Card
              className={cn(
                tile,
                "h-full shadow-[0_40px_90px_-50px_color-mix(in_oklch,var(--primary)_55%,transparent)] hover:border-border"
              )}
            >
              <MessageForm />
            </Card>
          </motion.div>

          <Tile delay={0.14} className="lg:col-span-5">
            <LocalTimeTile />
          </Tile>

          <Tile delay={0.18} className="lg:col-span-5">
            <div className="flex flex-col gap-3">
              <span className={label}>Prefer email?</span>
              <Button
                asChild
                variant="link"
                className="h-auto w-fit max-w-full p-0 font-heading text-xl font-semibold tracking-tight break-all whitespace-normal text-foreground decoration-primary underline-offset-4 hover:text-primary"
              >
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </Button>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={copy}
                  className="h-8 cursor-pointer gap-2 px-3 text-xs"
                >
                  {copied ? (
                    <Check className="size-3.5 text-primary" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  {copied ? "Copied" : "Copy address"}
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="h-8 gap-2 px-3 text-xs text-muted-foreground"
                >
                  <a href={`mailto:${siteConfig.email}`}>
                    <Mail className="size-3.5" />
                    Open mail app
                  </a>
                </Button>
              </div>
            </div>
          </Tile>

          <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 lg:col-span-5 tall:gap-4">
            <Tile delay={0.22}>
              <div className="flex h-full flex-col justify-between gap-3">
                <span className={label}>Elsewhere</span>
                <div className="flex gap-2">
                  {socials.map((s) => {
                    const Icon = brandIcons[s.label]
                    return (
                      <Tooltip key={s.label}>
                        <TooltipTrigger asChild>
                          <Button
                            asChild
                            variant="outline"
                            size="icon"
                            className="size-9 text-muted-foreground hover:border-primary hover:text-primary"
                          >
                            <a
                              href={s.href}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={s.label}
                            >
                              <Icon className="size-4" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top" sideOffset={6}>
                          {s.label} · @{s.handle}
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>
              </div>
            </Tile>
            <Tile delay={0.26}>
              <Button
                asChild
                variant="ghost"
                className="group h-full w-full flex-col items-stretch justify-between gap-3 p-0 text-left font-normal whitespace-normal hover:bg-transparent active:not-aria-[haspopup]:translate-y-0"
              >
                <a href={siteConfig.resume} target="_blank" rel="noreferrer">
                  <span
                    className={cn(label, "flex items-center justify-between")}
                  >
                    Résumé
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center border text-primary transition-colors group-hover:border-primary">
                      <FileText className="size-4" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="font-medium">One page, PDF</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Download className="size-3" /> Updated{" "}
                        {siteConfig.resumeUpdated}
                      </span>
                    </span>
                  </span>
                </a>
              </Button>
            </Tile>
          </div>
        </div>
      </Container>
    </section>
  )
}
