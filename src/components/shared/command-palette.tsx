"use client"

import { useLenis } from "lenis/react"
import { track } from "@vercel/analytics"
import {
  ArrowUpRight,
  Check,
  Copy,
  CornerDownLeft,
  FileText,
  Hash,
  Mail,
  SunMoon,
  X,
} from "lucide-react"

import { scrollToSection } from "@/components/providers/smooth-scroll"
import { brandIcons } from "@/components/shared/brand-icons"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Kbd as BaseKbd } from "@/components/ui/kbd"
import { navItems, siteConfig, socials } from "@/config/site"
import { projects } from "@/data/projects"
import { useCopy } from "@/hooks/use-copy"
import { useModKey } from "@/hooks/use-mod-key"
import { useThemeToggle } from "@/hooks/use-theme-toggle"
import { pad2 } from "@/lib/format"
import { openProject } from "@/lib/project-link"
import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <BaseKbd
      className={cn("border font-mono leading-none font-normal", className)}
      {...props}
    />
  )
}

const itemClass =
  "group flex h-11 cursor-pointer rounded-none py-0 **:data-[slot=command-item-check]:hidden items-center gap-3 px-3 text-sm text-muted-foreground select-none data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"

const groupClass =
  "px-2 pb-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[0.625rem] [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase"

function ItemIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid size-7 shrink-0 place-items-center border bg-background text-foreground group-data-[selected=true]:border-primary-foreground/30 group-data-[selected=true]:bg-primary-foreground/10 group-data-[selected=true]:text-primary-foreground [&_svg]:size-3.5">
      {children}
    </span>
  )
}

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-auto font-mono text-[0.625rem] tracking-wider uppercase opacity-0 group-data-[selected=true]:opacity-80">
      {children}
    </span>
  )
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const lenis = useLenis()
  const { isDark, toggle } = useThemeToggle()
  const [copied, copy] = useCopy(siteConfig.email, 900)
  const mod = useModKey()

  const run = (action: () => void) => {
    onOpenChange(false)
    setTimeout(action, 60)
  }

  const goTo = (href: string) => run(() => scrollToSection(lenis, href))

  const openUrl = (url: string) =>
    run(() => window.open(url, "_blank", "noopener,noreferrer"))

  const copyEmail = async () => {
    if (await copy()) setTimeout(() => onOpenChange(false), 900)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        data-lenis-prevent
        aria-describedby={undefined}
        className="top-[12svh] w-[calc(100%-2rem)] max-w-xl translate-y-0 gap-0 rounded-none border p-0 shadow-soft ring-0 sm:max-w-xl"
      >
        <DialogTitle className="sr-only">Quick jump</DialogTitle>

        <Command loop className="rounded-none bg-transparent p-0">
          <div className="flex h-14 items-center gap-3 border-b px-4">
            <CommandInput
              autoFocus
              placeholder="Where to? Search sections, projects, actions…"
              wrapperClassName="h-full flex-1 p-0"
              groupClassName="h-full! gap-1 rounded-none border-0 bg-transparent px-0 dark:bg-transparent [&_[data-slot=input-group-addon]]:pl-0 [&_svg]:size-4! [&_svg]:text-primary [&_svg]:opacity-100"
              className="h-full text-sm placeholder:text-muted-foreground"
            />
            <Kbd className="pointer-coarse:hidden">esc</Kbd>
            <DialogClose asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Close"
                className="hidden size-8 text-muted-foreground pointer-coarse:inline-flex"
              >
                <X className="size-4" />
              </Button>
            </DialogClose>
          </div>

          <CommandList className="max-h-[min(60svh,26rem)] overscroll-contain py-1">
            <CommandEmpty className="px-4 py-10 text-center text-sm text-muted-foreground">
              Nothing matches. Try &ldquo;projects&rdquo; or
              &ldquo;email&rdquo;.
            </CommandEmpty>

            <CommandGroup heading="Navigate" className={groupClass}>
              {navItems.map((item, i) => (
                <CommandItem
                  key={item.href}
                  value={`section ${item.label}`}
                  onSelect={() => goTo(item.href)}
                  className={itemClass}
                >
                  <ItemIcon>
                    <Hash />
                  </ItemIcon>
                  <span className="text-foreground group-data-[selected=true]:text-primary-foreground">
                    {item.label}
                  </span>
                  <span className="font-mono text-[0.625rem] opacity-60">
                    {pad2(i + 1)}
                  </span>
                  <Hint>Jump</Hint>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading="Projects" className={groupClass}>
              {projects.map((p) => (
                <CommandItem
                  key={p.slug}
                  value={`project ${p.name} ${p.tagline} ${p.role} ${p.stack.join(" ")}`}
                  onSelect={() => run(() => openProject(p.slug))}
                  className={itemClass}
                >
                  <ItemIcon>
                    <span className="font-heading text-xs font-bold">
                      {p.name[0]}
                    </span>
                  </ItemIcon>
                  <span className="min-w-0 truncate">
                    <span className="text-foreground group-data-[selected=true]:text-primary-foreground">
                      {p.name}
                    </span>
                    <span className="ml-2 hidden sm:inline">{p.tagline}</span>
                  </span>
                  <Hint>Explore</Hint>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading="Actions" className={groupClass}>
              <CommandItem
                value="copy email address contact"
                onSelect={copyEmail}
                className={itemClass}
              >
                <ItemIcon>{copied ? <Check /> : <Copy />}</ItemIcon>
                <span className="text-foreground group-data-[selected=true]:text-primary-foreground">
                  {copied ? "Copied to clipboard" : "Copy email"}
                </span>
                <span className="hidden truncate sm:inline">
                  {siteConfig.email}
                </span>
              </CommandItem>
              <CommandItem
                value="download resume cv pdf"
                onSelect={() => {
                  track("Résumé opened", { from: "command palette" })
                  openUrl(siteConfig.resume)
                }}
                className={itemClass}
              >
                <ItemIcon>
                  <FileText />
                </ItemIcon>
                <span className="text-foreground group-data-[selected=true]:text-primary-foreground">
                  Open resume
                </span>
                <Hint>PDF ↗</Hint>
              </CommandItem>
              <CommandItem
                value="toggle theme dark light mode"
                onSelect={toggle}
                className={itemClass}
              >
                <ItemIcon>
                  <SunMoon />
                </ItemIcon>
                <span className="text-foreground group-data-[selected=true]:text-primary-foreground">
                  Switch to {isDark ? "light" : "dark"} mode
                </span>
                <Kbd className="ml-auto group-data-[selected=true]:border-primary-foreground/30 group-data-[selected=true]:bg-transparent group-data-[selected=true]:text-primary-foreground">
                  D
                </Kbd>
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading="Connect" className={groupClass}>
              <CommandItem
                value="email mail send message"
                onSelect={() =>
                  run(() =>
                    window.location.assign(`mailto:${siteConfig.email}`)
                  )
                }
                className={itemClass}
              >
                <ItemIcon>
                  <Mail />
                </ItemIcon>
                <span className="text-foreground group-data-[selected=true]:text-primary-foreground">
                  Send an email
                </span>
                <Hint>Compose</Hint>
              </CommandItem>
              {socials.map((s) => {
                const Icon = brandIcons[s.label]
                return (
                  <CommandItem
                    key={s.label}
                    value={`social ${s.label} ${s.handle}`}
                    onSelect={() => openUrl(s.href)}
                    className={itemClass}
                  >
                    <ItemIcon>
                      <Icon />
                    </ItemIcon>
                    <span className="text-foreground group-data-[selected=true]:text-primary-foreground">
                      {s.label}
                    </span>
                    <span className="hidden font-mono text-xs sm:inline">
                      @{s.handle}
                    </span>
                    <ArrowUpRight className="ml-auto size-3.5 opacity-0 group-data-[selected=true]:opacity-80" />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>

          <div className="flex items-center justify-between gap-4 border-t px-4 py-2.5 font-mono text-[0.625rem] tracking-wider text-muted-foreground uppercase pointer-coarse:hidden">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd> Move
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>
                  <CornerDownLeft className="size-3" />
                </Kbd>
                Open
              </span>
            </div>
            <span className="flex items-center gap-1.5">
              <Kbd>{mod}</Kbd>
              <Kbd>K</Kbd> Toggle
            </span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
