"use client"

import { useEffect } from "react"
import { ReactLenis, useLenis } from "lenis/react"
import type Lenis from "lenis"
import { MotionConfig } from "motion/react"

const SECTION_GAP = 32

export const NAV_SCROLL_EVENT = "nav-scroll"
export type NavScrollDetail = { phase: "start" | "end"; toTop: boolean }

function sectionTarget(href: string): number | null {
  if (href === "#top" || href === "#") return 0
  const el = document.querySelector<HTMLElement>(href)
  if (!el) return null
  const content =
    Array.from(el.children).find((c) => {
      const pos = getComputedStyle(c).position
      return pos !== "absolute" && pos !== "fixed"
    }) ?? el
  const top = content.getBoundingClientRect().top + window.scrollY
  return Math.max(0, top - SECTION_GAP)
}

export function scrollToSection(
  lenis: Lenis | undefined,
  href: string,
  { duration = 1.4 }: { duration?: number } = {}
) {
  const top = sectionTarget(href)
  if (top === null) return
  const toTop = top === 0
  const emit = (phase: NavScrollDetail["phase"]) =>
    window.dispatchEvent(
      new CustomEvent<NavScrollDetail>(NAV_SCROLL_EVENT, {
        detail: { phase, toTop },
      })
    )

  emit("start")
  if (lenis) {
    lenis.scrollTo(top, {
      duration,
      force: true,
      onComplete: () => emit("end"),
    })
  } else {
    window.scrollTo({ top, behavior: "smooth" })
    setTimeout(() => emit("end"), duration * 1000)
  }
}

function AnchorLinks() {
  const lenis = useLenis()

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      )
      const href = a?.getAttribute("href")
      if (!href || href.length < 2) return
      e.preventDefault()
      scrollToSection(lenis, href)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [lenis])

  return null
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        anchors: false,
        respectReducedMotion: true,
      }}
    >
      <AnchorLinks />
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  )
}
