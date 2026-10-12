"use client"

import { motion } from "motion/react"
import { ArrowUpRight, Check, Copy } from "lucide-react"

import { IndexChip } from "@/components/layout/header/header-controls"
import { brandIcons } from "@/components/shared/brand-icons"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { navItems, siteConfig, socials } from "@/config/site"
import { useCopy } from "@/hooks/use-copy"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function MobileMenu({
  active,
  onNavigate,
  onClose,
  firstLinkRef,
}: {
  active: string
  onNavigate: (href: string) => (e: React.MouseEvent) => void
  onClose: () => void
  firstLinkRef: React.RefObject<HTMLAnchorElement | null>
}) {
  const [copied, copy] = useCopy(siteConfig.email)

  return (
    <div className="flex min-h-full flex-col">
      <nav aria-label="Mobile" className="flex-1">
        <ul>
          {navItems.map((item, i) => {
            const isActive = active === item.href
            return (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.08 + 0.05 * i,
                  duration: 0.4,
                  ease: EASE,
                }}
                className="border-b"
              >
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={onNavigate(item.href)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "group relative flex items-center justify-between px-4 py-4 outline-none focus-visible:bg-accent active:bg-accent sm:px-6",
                    isActive && "bg-primary/10"
                  )}
                >
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-y-0 left-0 w-0.5 bg-primary"
                    />
                  )}
                  <span className="flex items-center gap-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                    <IndexChip
                      index={i}
                      active={isActive}
                      className="h-5 min-w-6 text-[0.625rem]"
                    />
                    {item.label}
                  </span>
                  {isActive ? (
                    <span className="font-mono text-[0.625rem] tracking-widest text-primary uppercase">
                      Current
                    </span>
                  ) : (
                    <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </a>
              </motion.li>
            )
          })}
        </ul>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4, ease: EASE }}
        className="flex flex-col gap-3 px-4 pt-6 pb-8 sm:px-6"
      >
        <div className="flex h-12 items-stretch border">
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex min-w-0 flex-1 items-center truncate px-4 text-sm"
          >
            {siteConfig.email}
          </a>
          <Separator orientation="vertical" />
          <Button
            variant="ghost"
            onClick={copy}
            aria-label={copied ? "Email copied" : "Copy email"}
            className="h-full w-12 text-muted-foreground"
          >
            {copied ? (
              <Check className="size-4 text-primary" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </div>

        <Button asChild className="h-12 justify-between px-4 text-sm">
          <a
            href={siteConfig.resume}
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
          >
            Download resume <ArrowUpRight className="size-4" />
          </a>
        </Button>

        <div className="mt-2 flex gap-2">
          {socials.map((s) => {
            const Icon = brandIcons[s.label]
            return (
              <Button
                key={s.label}
                asChild
                variant="outline"
                className="size-11 text-muted-foreground hover:border-primary hover:text-primary"
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
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
