import { ArrowDown, ArrowUpRight } from "lucide-react"

import { PixelName } from "@/components/sections/hero/pixel-name"
import { Container } from "@/components/shared/container"
import { Separator } from "@/components/ui/separator"
import { FadeIn } from "@/components/shared/fade-in"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

const NAME_LINES = siteConfig.name.split(" ") as [string, string]

const ROLE_RULE = <Separator className="bg-primary/60 data-horizontal:w-6" />

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex h-svh flex-col overflow-hidden pt-14"
    >
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-60" />
      <div className="pointer-events-none absolute inset-0 opacity-50 blur-3xl hero-glow" />

      <Container className="relative flex min-h-0 flex-1 flex-col items-center pt-6 pb-10 text-center sm:pt-8 sm:pb-14">
        <PixelName lines={NAME_LINES} className="min-h-0 w-full flex-1" />

        <FadeIn delay={0.6} className="mt-4 flex flex-col items-center gap-3">
          <div className="flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.3em] text-primary uppercase">
            {ROLE_RULE}
            {siteConfig.role}
            {ROLE_RULE}
          </div>
          <p className="max-w-6xl font-heading text-lg leading-snug font-medium text-balance text-muted-foreground sm:text-2xl">
            I build fintech and SaaS products, and I&apos;m happiest turning
            complicated flows into{" "}
            <span className="text-foreground">something people just get</span>.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Button asChild className="group h-11 gap-2 px-5 text-sm">
              <a href="#projects" data-cta="See my work">
                See my work
                <ArrowDown className="size-4! transition-transform group-hover:translate-y-0.5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="group h-11 gap-2 bg-background/40 px-5 text-sm backdrop-blur-sm"
            >
              <a href="#contact" data-cta="Get in touch">
                Get in touch
                <ArrowUpRight className="size-4! transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
