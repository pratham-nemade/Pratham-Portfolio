"use client"

import { useEffect, useEffectEvent, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useLenis } from "lenis/react"
import { track } from "@vercel/analytics"

import { FooterBar } from "@/components/layout/footer/footer-bar"
import { PixelDisplay } from "@/components/layout/footer/pixel-display"
import { scrollToSection } from "@/components/providers/smooth-scroll"
import { Container, sectionPadTop } from "@/components/shared/container"
import { SectionHeader } from "@/components/shared/section-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { siteConfig, socials } from "@/config/site"
import { useMediaQuery } from "@/hooks/use-media-query"
import { isTypingTarget } from "@/lib/dom"
import { cn } from "@/lib/utils"

type Screen = [string, string]

type Command = {
  name: string
  hint?: string
  aliases?: string[]
  screens: Screen[]
  reply: string
  action?: () => boolean | void
  immediate?: boolean
  fallback?: { reply: string; href: string; text: string }
}

type Log = { cmd: string; reply: string; link?: { href: string; text: string } }

function openTab(url: string) {
  const tab = window.open(url, "_blank")
  if (!tab) return false
  tab.opener = null
  return true
}

const tabFallback = (href: string) => ({
  reply: "Your browser stopped the tab.",
  href,
  text: "Open it here",
})

const IDLE: Screen = ["Let's", "talk."]
const EXEC_MS = 1000
const STEP_MS = 1600

export function SiteFooter() {
  const lenis = useLenis()
  const touch = useMediaQuery("(pointer: coarse)")
  const footerRef = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const steps = useRef<ReturnType<typeof setTimeout>[]>([])

  const [screen, setScreen] = useState<Screen>(IDLE)
  const [log, setLog] = useState<Log | null>(null)
  const [running, setRunning] = useState<string | null>(null)
  const [value, setValue] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(-1)

  const goTo = (href: string) => () =>
    scrollToSection(lenis, href, { duration: 2 })

  const commands: Command[] = [
    {
      name: "hire",
      hint: "Start a conversation",
      screens: [["Let's", "build."]],
      reply: "Taking you to the contact form.",
      action: goTo("#contact"),
    },
    {
      name: "resume",
      hint: "One page, PDF",
      aliases: ["cv"],
      screens: [["My", "résumé."]],
      reply: "Opening it in a new tab.",
      action: () => {
        track("Résumé opened", { from: "footer console" })
        return openTab(siteConfig.resume)
      },
      fallback: tabFallback(siteConfig.resume),
    },
    {
      name: "whoami",
      hint: "Me in ten seconds",
      screens: [
        ["Product", "Engineer."],
        ["Fintech", "& SaaS."],
        ["Based in", "Bengaluru."],
      ],
      reply: `${siteConfig.role} at Hyperface, building fintech and SaaS products.`,
    },
    {
      name: "work",
      hint: "How I build things",
      aliases: ["projects"],
      screens: [["The", "work."]],
      reply: "Heading to the projects.",
      action: goTo("#projects"),
    },
    {
      name: "copy",
      hint: "Just the address",
      screens: [["Got", "it."]],
      reply: "Email copied. Paste it wherever you write from.",
      action: () => void navigator.clipboard?.writeText(siteConfig.email),
      immediate: true,
    },
    {
      name: "email",
      aliases: ["mail", "contact"],
      screens: [["Say", "hi."]],
      reply: "Opening your mail app.",
      action: () => window.location.assign(`mailto:${siteConfig.email}`),
    },
    {
      name: "about",
      screens: [["About", "me."]],
      reply: "Heading to my story.",
      action: goTo("#about"),
    },
    {
      name: "skills",
      aliases: ["stack"],
      screens: [["The", "toolkit."]],
      reply: "Heading to the toolkit.",
      action: goTo("#skills"),
    },
    ...socials.map<Command>((s) => ({
      name: s.label.toLowerCase(),
      screens: [["On", `${s.label}.`]],
      reply: `Opening ${s.label} in a new tab.`,
      action: () => openTab(s.href),
      fallback: tabFallback(s.href),
    })),
    {
      name: "sudo hire pratham",
      aliases: ["sudo hire", "sudo"],
      screens: [
        ["Access", "granted."],
        ["Let's", "build."],
      ],
      reply: "No password needed. Taking you to the contact form.",
      action: goTo("#contact"),
    },
  ]
  const keys = commands.filter((c) => c.hint)
  const names = [...commands.map((c) => c.name), "help", "ls", "clear"]

  const typed = value.trim().toLowerCase()
  const suggestion =
    typed && names.find((n) => n.startsWith(typed) && n !== typed)
  const ghost = suggestion ? suggestion.slice(typed.length) : ""
  const matching = typed
    ? keys.find((c) => c.name.startsWith(typed))?.name
    : undefined

  const byKey = (key: string) => {
    const n = Number(key)
    return Number.isInteger(n) && n >= 1 ? keys[n - 1] : undefined
  }

  const play = (screens: Screen[]) => {
    steps.current.forEach(clearTimeout)
    setScreen(screens[0])
    steps.current = screens
      .slice(1)
      .map((s, i) => setTimeout(() => setScreen(s), (i + 1) * STEP_MS))
  }

  const run = (raw: string) => {
    let cmd = raw
      .trim()
      .toLowerCase()
      .replace(/^\/|^\$\s*/, "")
      .replace(/\s+/g, " ")
    if (!cmd) return
    cmd = byKey(cmd)?.name ?? cmd
    clearTimeout(timer.current)
    setValue("")
    setCursor(-1)
    setHistory((h) => [cmd, ...h.filter((x) => x !== cmd)].slice(0, 10))

    if (cmd === "clear") {
      play([IDLE])
      setLog(null)
      setRunning(null)
      return
    }
    if (cmd === "help" || cmd === "ls") {
      play([["Try", "these."]])
      setLog({
        cmd,
        reply: `Try ${keys.map((c) => c.name).join(", ")}. Typing works for about, skills and socials too.`,
      })
      return
    }
    const c = commands.find((x) => x.name === cmd || x.aliases?.includes(cmd))
    if (!c) {
      play([["404", "oops."]])
      setLog({ cmd, reply: `I don't know "${cmd}" yet. Try help.` })
      return
    }
    play(c.screens)
    setLog({ cmd: c.name, reply: c.reply })
    setRunning(c.name)
    if (c.immediate) c.action?.()
    timer.current = setTimeout(() => {
      if (!c.immediate && c.action?.() === false && c.fallback) {
        const { reply, href, text } = c.fallback
        setLog({ cmd: c.name, reply, link: { href, text } })
      }
      setRunning(null)
    }, EXEC_MS)
  }

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const shortcut = byKey(e.key)
    if (!value && shortcut && !e.metaKey && !e.ctrlKey) {
      e.preventDefault()
      run(shortcut.name)
      return
    }
    if ((e.key === "Tab" || e.key === "ArrowRight") && ghost) {
      e.preventDefault()
      setValue(suggestion as string)
    } else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault()
      const next = Math.min(cursor + 1, history.length - 1)
      setCursor(next)
      setValue(history[next])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const next = cursor - 1
      setCursor(Math.max(next, -1))
      setValue(next >= 0 ? history[next] : "")
    } else if (e.key === "Escape") {
      setValue("")
      setCursor(-1)
    }
  }

  const onGlobalKey = useEffectEvent((e: KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(e.target)) return
    const shortcut = byKey(e.key)
    if (shortcut) {
      e.preventDefault()
      run(shortcut.name)
    }
  })
  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    let inView = false
    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting), {
      threshold: 0.4,
    })
    io.observe(el)
    const onKey = (e: KeyboardEvent) => {
      if (inView) onGlobalKey(e)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      io.disconnect()
      window.removeEventListener("keydown", onKey)
    }
  }, [])

  useEffect(() => {
    if (screen === IDLE) return
    const id = setTimeout(() => setScreen(IDLE), 7000)
    return () => clearTimeout(id)
  }, [screen])

  useEffect(
    () => () => {
      clearTimeout(timer.current)
      steps.current.forEach(clearTimeout)
    },
    []
  )

  return (
    <footer
      ref={footerRef}
      className="relative flex h-svh min-h-150 flex-col overflow-hidden border-t"
    >
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-50" />
      <div className="pointer-events-none absolute inset-0 opacity-40 blur-3xl hero-glow" />

      <Container
        className={cn(
          "relative flex min-h-0 flex-1 flex-col gap-4 pb-5 sm:pb-6",
          sectionPadTop
        )}
      >
        <div className="flex flex-col">
          <SectionHeader
            index={6}
            title="Sign-off"
            note="Thanks for stopping by"
          />
          <p className="font-heading text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
            You made it to the end.{" "}
            <span className="text-muted-foreground">
              The terminal below still has a few tricks.
            </span>
          </p>
        </div>

        <div
          className="relative min-h-0 flex-1"
          onClick={() => {
            if (!touch) inputRef.current?.focus({ preventScroll: true })
          }}
        >
          <PixelDisplay lines={screen} className="size-full" />
          <p className="sr-only" aria-live="polite">
            {screen.join(" ")}
          </p>
        </div>

        <Card className="gap-0 border bg-card/90 py-0 font-mono text-sm shadow-[0_40px_80px_-50px_color-mix(in_oklch,var(--primary)_50%,transparent)] ring-0 backdrop-blur-md">
          <div className="flex flex-col gap-2 border-b px-4 py-3 sm:flex-row sm:items-center sm:gap-6">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                run(
                  suggestion && !commands.some((c) => c.name === typed)
                    ? (suggestion as string)
                    : value
                )
              }}
              className="flex min-w-0 flex-1 items-center gap-2"
            >
              <span className="hidden shrink-0 text-muted-foreground sm:inline">
                pratham@portfolio
              </span>
              <span className="text-primary">❯</span>
              <div className="relative min-w-0 flex-1">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 truncate whitespace-pre"
                >
                  <span className="invisible">{value}</span>
                  <span className="text-muted-foreground/40">{ghost}</span>
                </span>
                <Input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value)
                    setCursor(-1)
                  }}
                  onKeyDown={onInputKey}
                  placeholder={
                    touch
                      ? "type a command"
                      : `type a command, or press 1 to ${keys.length}`
                  }
                  aria-label="Terminal command"
                  aria-describedby="console-help"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  enterKeyHint="go"
                  className="relative h-auto w-full rounded-none border-0 bg-transparent p-0 font-mono text-sm shadow-none placeholder:text-muted-foreground/50 focus-visible:ring-0 md:text-sm dark:bg-transparent"
                />
              </div>
              {ghost && (
                <Kbd className="hidden shrink-0 border font-mono sm:inline-flex">
                  Tab
                </Kbd>
              )}
              <span className="h-4 w-2 shrink-0 animate-pulse bg-primary motion-reduce:animate-none" />
            </form>

            <div className="relative h-5 min-w-0 overflow-hidden sm:max-w-[50%] sm:flex-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={log ? `${log.cmd}-${log.reply}-${running}` : "idle"}
                  id="console-help"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="truncate text-xs text-muted-foreground sm:text-right"
                >
                  {log ? (
                    <>
                      <span className="text-primary">{log.cmd}</span>{" "}
                      {running === log.cmd ? "running…" : log.reply}
                      {log.link && running !== log.cmd && (
                        <>
                          {" "}
                          <Button
                            asChild
                            variant="link"
                            className="h-auto p-0 text-xs underline"
                          >
                            <a
                              href={log.link.href}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {log.link.text}
                            </a>
                          </Button>
                        </>
                      )}
                    </>
                  ) : (
                    "Not sure where to start? Type help."
                  )}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-5">
            {keys.map((c, i) => {
              const active = running === c.name
              const match = matching === c.name
              return (
                <Button
                  key={c.name}
                  variant="ghost"
                  onClick={() => run(c.name)}
                  aria-keyshortcuts={String(i + 1)}
                  title={c.hint}
                  className={cn(
                    "group relative h-auto cursor-pointer flex-col items-center justify-start gap-2 overflow-hidden rounded-none border-0 border-l px-2 py-3 text-center font-mono font-normal whitespace-normal transition-colors first:border-l-0 hover:bg-accent focus-visible:bg-accent focus-visible:ring-0 active:not-aria-[haspopup]:translate-y-0 sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:text-left",
                    (active || match) && "bg-accent"
                  )}
                >
                  <Kbd
                    className={cn(
                      "size-7 shrink-0 border border-b-2 text-xs transition-all duration-150 group-active:translate-y-px group-active:border-b",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : match
                          ? "border-primary text-primary"
                          : "bg-background text-muted-foreground group-hover:border-primary/60 group-hover:text-primary"
                    )}
                  >
                    {i + 1}
                  </Kbd>
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-xs sm:text-sm">
                      {c.name}
                    </span>
                    <span className="hidden truncate font-sans text-[0.6875rem] text-muted-foreground lg:block">
                      {c.hint}
                    </span>
                  </span>

                  {active && (
                    <motion.span
                      aria-hidden
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: EXEC_MS / 1000, ease: "linear" }}
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-primary"
                    />
                  )}
                </Button>
              )
            })}
          </div>
        </Card>
      </Container>

      <FooterBar />
    </footer>
  )
}
