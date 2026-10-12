"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react"
import type Lenis from "lenis"
import { useLenis } from "lenis/react"
import { Menu, X } from "lucide-react"

import {
  control,
  IndexChip,
  QuickJumpKey,
  ResumeButton,
  RollText,
  ThemeSwitch,
} from "@/components/layout/header/header-controls"
import { MobileMenu } from "@/components/layout/header/mobile-menu"
import {
  NAV_SCROLL_EVENT,
  scrollToSection,
  type NavScrollDetail,
} from "@/components/providers/smooth-scroll"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"
import { navItems, siteConfig } from "@/config/site"
import { DESKTOP_QUERY } from "@/hooks/use-media-query"
import { usePaletteHotkey } from "@/hooks/use-palette-hotkey"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

const CommandPalette = dynamic(
  () =>
    import("@/components/shared/command-palette").then((m) => m.CommandPalette),
  { ssr: false }
)

const SHOW_AT_TOP = 4
const HEADER_HEIGHT = 56
const slide = { duration: 0.4, ease: EASE }

function useActiveSection() {
  const [active, setActive] = useState(navItems[0].href)

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return active
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const lenis = useLenis()
  const active = useActiveSection()
  const { scrollY, scrollYProgress } = useScroll()

  const [atTop, setAtTop] = useState(true)
  const [hidden, setHidden] = useState(false)
  const navigating = useRef(false)
  const closedByLink = useRef(false)

  useEffect(() => {
    const onNav = (e: Event) => {
      const { phase, toTop } = (e as CustomEvent<NavScrollDetail>).detail
      navigating.current = phase === "start"
      if (phase === "start") setHidden(!toTop)
    }
    window.addEventListener(NAV_SCROLL_EVENT, onNav)
    return () => window.removeEventListener(NAV_SCROLL_EVENT, onNav)
  }, [])

  const onScroll = useCallback((y: number, direction: number) => {
    setAtTop(y <= SHOW_AT_TOP)
    if (navigating.current) return
    if (y <= SHOW_AT_TOP) setHidden(false)
    else if (direction > 0) setHidden(true)
    else if (direction < 0) setHidden(false)
  }, [])
  useLenis(
    useCallback((l: Lenis) => onScroll(l.scroll, l.direction), [onScroll])
  )
  useMotionValueEvent(scrollY, "change", (y) => {
    if (!lenis) onScroll(y, y - (scrollY.getPrevious() ?? 0))
  })

  const glass = !atTop || open
  const headerHidden = hidden && !open && !paletteOpen

  const setPalette = useCallback((fn: (o: boolean) => boolean) => {
    setOpen(false)
    setPaletteOpen(fn)
  }, [])
  usePaletteHotkey(setPalette)

  const activeIndex = Math.max(
    navItems.findIndex((n) => n.href === active),
    0
  )
  const activeItem = navItems[activeIndex]

  useEffect(() => {
    if (!open) return
    lenis?.stop()
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const onResize = () => desktop.matches && setOpen(false)
    desktop.addEventListener("change", onResize)
    return () => {
      lenis?.start()
      desktop.removeEventListener("change", onResize)
    }
  }, [open, lenis])

  const goTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    closedByLink.current = true
    setOpen(false)
    lenis?.start()
    scrollToSection(lenis, href)
  }

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: headerHidden ? "-100%" : "0%" }}
        transition={slide}
        onFocusCapture={(e) => {
          if (navigating.current) return
          if ((e.target as HTMLElement).matches(":focus-visible")) {
            setHidden(false)
          }
        }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          glass
            ? "border-border/70 bg-background/55 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent backdrop-blur-none"
        )}
      >
        <div className="mx-auto flex h-14 w-full max-w-[100rem] items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6 lg:px-8">
          <div className="flex min-w-0 shrink-0 items-center gap-4 lg:justify-self-start">
            <Button
              asChild
              variant="ghost"
              className="group h-auto min-w-0 justify-start gap-3 rounded-none p-0 font-normal hover:bg-transparent focus-visible:ring-0 active:not-aria-[haspopup]:translate-y-0 dark:hover:bg-transparent"
            >
              <a
                href="#top"
                onClick={goTo("#top")}
                aria-label={`${siteConfig.name}, home`}
              >
                <span className="grid size-8 shrink-0 place-items-center bg-primary font-heading text-xs font-bold text-primary-foreground transition-transform duration-500 group-hover:rotate-90 group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background">
                  <span className="transition-transform duration-500 group-hover:-rotate-90">
                    PN
                  </span>
                </span>
                <span className="hidden min-w-0 flex-col leading-none sm:flex">
                  <span className="truncate font-heading text-sm font-semibold tracking-tight">
                    {siteConfig.name}
                  </span>
                  <span className="mt-1 truncate font-mono text-[0.625rem] tracking-wider text-muted-foreground uppercase">
                    {siteConfig.role}
                  </span>
                </span>
              </a>
            </Button>

            <div className="hidden h-7 items-center gap-2 border-l pl-4 font-mono text-[0.625rem] tracking-wider whitespace-nowrap text-muted-foreground uppercase 2xl:flex">
              <span className="relative flex size-1.5 shrink-0">
                <span className="absolute inset-0 animate-ping bg-primary opacity-60" />
                <span className="relative size-1.5 bg-primary" />
              </span>
              <span className="text-primary">Now</span>
              {siteConfig.now}
            </div>
          </div>

          <div
            aria-hidden
            className="hidden h-7 min-w-0 flex-1 items-center overflow-hidden border-l pl-3 font-mono text-[0.6875rem] tracking-wider uppercase min-[360px]:flex sm:pl-4 lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={activeItem.href}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="flex min-w-0 items-center gap-2"
              >
                <IndexChip index={activeIndex} active />
                <span className="truncate">{activeItem.label}</span>
              </motion.span>
            </AnimatePresence>
          </div>

          <nav
            aria-label="Primary"
            className="hidden items-center justify-center lg:flex"
          >
            <ul className="flex items-center">
              {navItems.map((item, i) => {
                const isActive = active === item.href
                return (
                  <li key={item.href}>
                    <Button
                      asChild
                      variant="ghost"
                      className={cn(
                        "group relative h-auto gap-2 rounded-none px-3 py-2.5 text-sm font-normal transition-colors hover:bg-transparent focus-visible:text-foreground focus-visible:ring-0 active:not-aria-[haspopup]:translate-y-0 xl:px-4 dark:hover:bg-transparent",
                        isActive
                          ? "font-medium text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <a
                        href={item.href}
                        onClick={goTo(item.href)}
                        aria-current={isActive ? "location" : undefined}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            aria-hidden
                            transition={{ duration: 0.5, ease: EASE }}
                            className="absolute inset-0 bg-primary/10"
                          >
                            <span className="absolute inset-y-0 left-0 w-0.5 bg-primary" />
                          </motion.span>
                        )}
                        <IndexChip
                          index={i}
                          active={isActive}
                          className="relative"
                        />
                        <span className="relative">
                          <RollText>{item.label}</RollText>
                        </span>
                      </a>
                    </Button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2 lg:justify-self-end">
            <QuickJumpKey onOpen={() => setPalette(() => true)} />
            <ThemeSwitch />
            <ResumeButton />
            <Button
              ref={toggleRef}
              variant="outline"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className={cn(
                control,
                "w-9 px-0 lg:hidden",
                open && "border-primary text-foreground"
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? (
                    <X className="size-4" />
                  ) : (
                    <Menu className="size-4" />
                  )}
                </motion.span>
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </motion.header>

      <motion.div
        aria-hidden
        initial={false}
        animate={{ y: headerHidden ? 1 : HEADER_HEIGHT }}
        transition={slide}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 -mt-px h-0.5"
      >
        <motion.span
          style={{ scaleX: scrollYProgress }}
          className="block h-full origin-left bg-primary"
        />
      </motion.div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

      <Sheet open={open} onOpenChange={setOpen} modal={false}>
        <SheetContent
          id="mobile-menu"
          side="top"
          showCloseButton={false}
          data-lenis-prevent
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            firstLinkRef.current?.focus({ preventScroll: true })
          }}
          onCloseAutoFocus={(e) => {
            e.preventDefault()
            if (closedByLink.current) closedByLink.current = false
            else toggleRef.current?.focus({ preventScroll: true })
          }}
          onInteractOutside={(e) => {
            if (toggleRef.current?.contains(e.target as Node))
              e.preventDefault()
          }}
          className="top-14! bottom-0 z-40 h-auto overflow-y-auto overscroll-contain border-b-0 bg-background p-0 text-base shadow-none lg:hidden"
        >
          <SheetTitle className="sr-only">Site menu</SheetTitle>
          <SheetDescription className="sr-only">
            Jump to a section, email Pratham or open the résumé.
          </SheetDescription>
          <MobileMenu
            active={active}
            onNavigate={goTo}
            onClose={() => setOpen(false)}
            firstLinkRef={firstLinkRef}
          />
        </SheetContent>
      </Sheet>
    </>
  )
}
