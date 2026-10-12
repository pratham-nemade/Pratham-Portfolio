"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"

import { JourneyChapters } from "@/components/sections/about/journey-chapters"
import { JourneyHeader } from "@/components/sections/about/journey-header"
import { PortraitCard } from "@/components/sections/about/portrait-card"
import { AccentText } from "@/components/shared/accent-text"
import { Container, sectionPad } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { SectionTitle } from "@/components/shared/section-title"
import { aboutIntro, bio } from "@/data/about"
import { reveal } from "@/lib/motion"
import { cn } from "@/lib/utils"

function useActiveJourney() {
  const [active, setActive] = useState(-1)
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-journey]")
    )
    if (!els.length) return
    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      const start = vh * 0.5
      const end = vh * 0.9
      const tops = els.map((el) => el.getBoundingClientRect().top)
      const height =
        els[els.length - 1].getBoundingClientRect().bottom - tops[0]
      const span = height - (end - start)
      const progress =
        span > 0 ? (start - tops[0]) / span : tops[0] <= start ? 1 : -1
      let next = -1
      if (progress >= 0) {
        const reading =
          Math.min(progress, 1) * (tops[tops.length - 1] - tops[0])
        tops.forEach((top, i) => {
          if (top - tops[0] <= reading + 1) next = i
        })
      }
      setActive(next)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])
  return active
}

export function About() {
  const active = useActiveJourney()

  return (
    <section id="about" className={cn("relative scroll-mt-14", sectionPad)}>
      <Container>
        <SectionHeader index={2} title="About me" note="The person" />

        <div className="grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[min(32vw,calc((100svh-9rem)*0.8),30rem)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
          <div>
            <div className="lg:sticky lg:top-0 lg:-mt-16 lg:-mb-16 lg:flex lg:h-svh lg:items-center lg:py-16">
              <motion.div
                {...reveal()}
                className="mx-auto w-full max-w-md lg:max-w-none"
              >
                <PortraitCard active={active} />
              </motion.div>
            </div>
          </div>

          <div className="flex max-w-4xl flex-col gap-14 lg:gap-16">
            <div className="flex flex-col gap-10">
              <SectionTitle>
                <AccentText text={aboutIntro} />
              </SectionTitle>

              <div className="flex flex-col gap-6">
                {bio.map((p, i) => (
                  <motion.p
                    key={i}
                    {...reveal(i * 0.08)}
                    className={cn(
                      "text-pretty text-muted-foreground",
                      i === 0
                        ? "font-heading text-2xl leading-snug font-medium tracking-tight sm:text-3xl"
                        : "text-base leading-relaxed sm:text-lg"
                    )}
                  >
                    <AccentText text={p} accentClassName="text-foreground" />
                  </motion.p>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <JourneyHeader active={active} />
              <JourneyChapters active={active} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
