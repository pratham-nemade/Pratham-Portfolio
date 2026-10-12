"use client"

import {
  ArrowUpRight,
  Download,
  FileText,
  Moon,
  Search,
  Sun,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import { Switch, SwitchThumb } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { siteConfig } from "@/config/site"
import { useModKey } from "@/hooks/use-mod-key"
import { useThemeToggle } from "@/hooks/use-theme-toggle"
import { pad2 } from "@/lib/format"
import { cn } from "@/lib/utils"

const morph = "duration-500 ease-smooth"

export const control =
  "flex h-9 shrink-0 cursor-pointer items-center border bg-muted/30 text-muted-foreground transition-colors outline-none hover:border-primary/40 hover:text-foreground focus-visible:border-primary focus-visible:text-foreground"

export function IndexChip({
  index,
  active,
  className,
}: {
  index: number
  active: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        "grid h-4 min-w-5 shrink-0 place-items-center px-1 font-mono text-[0.5625rem] leading-none transition-colors duration-300",
        active
          ? "bg-primary text-primary-foreground"
          : "text-primary/70 group-hover:text-primary",
        className
      )}
    >
      {pad2(index + 1)}
    </span>
  )
}

export function RollText({
  children,
  hoverClassName = "text-primary",
}: {
  children: React.ReactNode
  hoverClassName?: string
}) {
  return (
    <span className="relative block overflow-hidden">
      <span
        className={cn(
          "block transition-transform group-hover:-translate-y-full group-focus-visible:-translate-y-full",
          morph
        )}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 block translate-y-full transition-transform group-hover:translate-y-0 group-focus-visible:translate-y-0",
          morph,
          hoverClassName
        )}
      >
        {children}
      </span>
    </span>
  )
}

export function QuickJumpKey({ onOpen }: { onOpen: () => void }) {
  const mod = useModKey()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          onClick={onOpen}
          aria-label="Quick jump: search sections, projects and actions"
          aria-keyshortcuts="Meta+K Control+K"
          className={cn(
            control,
            "group w-9 px-0 lg:w-auto lg:justify-start lg:gap-2 lg:pr-1.5 lg:pl-2.5"
          )}
        >
          <Search className="size-4! shrink-0 transition-colors group-hover:text-primary group-focus-visible:text-primary" />
          <span
            className={cn(
              "hidden grid-cols-[0fr] transition-[grid-template-columns] xl:grid xl:group-hover:grid-cols-[1fr] xl:group-focus-visible:grid-cols-[1fr]",
              morph
            )}
          >
            <span className="overflow-hidden text-sm font-normal whitespace-nowrap">
              Quick jump
            </span>
          </span>
          <KbdGroup className="hidden lg:inline-flex">
            <Kbd className="border bg-background font-mono">{mod}</Kbd>
            <Kbd className="border bg-background font-mono text-primary">K</Kbd>
          </KbdGroup>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={8} className="xl:hidden">
        Quick jump
        <KbdGroup>
          <Kbd>{mod}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </TooltipContent>
    </Tooltip>
  )
}

export function ThemeSwitch() {
  const { isDark, toggle } = useThemeToggle()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Switch
          checked={isDark}
          onCheckedChange={toggle}
          aria-label="Dark mode"
          className={cn(
            control,
            "relative rounded-none border-border p-1 after:hidden data-[size=default]:h-9 data-[size=default]:w-auto data-checked:bg-muted/30 data-unchecked:bg-muted/30 dark:data-unchecked:bg-muted/30"
          )}
        >
          <SwitchThumb
            className={cn(
              "absolute top-1 left-1 size-7 bg-primary transition-transform dark:translate-x-7",
              morph
            )}
          />
          <span className="relative grid size-7 place-items-center text-primary-foreground transition-colors duration-300 dark:text-muted-foreground">
            <Sun className="size-3.5" />
          </span>
          <span className="relative grid size-7 place-items-center text-muted-foreground transition-colors duration-300 dark:text-primary-foreground">
            <Moon className="size-3.5" />
          </span>
        </Switch>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={8}>
        Toggle theme <Kbd>D</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}

export function ResumeButton() {
  return (
    <HoverCard openDelay={120} closeDelay={160}>
      <HoverCardTrigger asChild>
        <Button
          asChild
          className="group hidden h-9 gap-2 px-4 text-sm hover:bg-primary/90 sm:inline-flex"
        >
          <a href={siteConfig.resume} target="_blank" rel="noreferrer">
            <RollText hoverClassName="text-primary-foreground">Resume</RollText>
            <span className="relative size-4 overflow-hidden">
              <ArrowUpRight
                className={cn(
                  "absolute size-4! transition-transform group-hover:translate-x-full group-hover:-translate-y-full",
                  morph
                )}
              />
              <ArrowUpRight
                className={cn(
                  "absolute size-4! -translate-x-full translate-y-full transition-transform group-hover:translate-x-0 group-hover:translate-y-0",
                  morph
                )}
              />
            </span>
          </a>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        align="end"
        sideOffset={8}
        className="w-72 border p-4 shadow-soft ring-0"
      >
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center border bg-accent text-primary">
            <FileText className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-heading text-sm font-semibold">
              {siteConfig.name} · Resume
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {siteConfig.role} · 2 yrs exp · 1-page PDF
            </p>
          </div>
        </div>
        <p className="mt-3 flex items-center gap-2 font-mono text-[0.625rem] tracking-wider text-muted-foreground uppercase">
          <span className="size-1.5 bg-primary" />
          Updated {siteConfig.resumeUpdated}
        </p>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-2">
          <Button asChild variant="outline" className="h-9 text-sm">
            <a href={siteConfig.resume} target="_blank" rel="noreferrer">
              View <ArrowUpRight />
            </a>
          </Button>
          <Button asChild className="h-9 text-sm">
            <a href={siteConfig.resume} download>
              Download <Download />
            </a>
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
