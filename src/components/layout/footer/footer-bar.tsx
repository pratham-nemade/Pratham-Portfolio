"use client"

import { useLenis } from "lenis/react"
import { ArrowUp } from "lucide-react"

import { brandIcons } from "@/components/shared/brand-icons"
import { Container } from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { siteConfig, socials } from "@/config/site"

const iconButton =
  "size-8 cursor-pointer text-muted-foreground hover:border-primary hover:text-primary"

export function FooterBar() {
  const lenis = useLenis()

  return (
    <div className="border-t">
      <Container className="flex items-center justify-between gap-4 py-4">
        <p className="font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground uppercase">
          © {new Date().getFullYear()} {siteConfig.name}
          <span className="hidden md:inline"> · {siteConfig.location}</span>
        </p>

        <div className="flex items-center gap-1.5">
          <ul className="flex items-center gap-1.5">
            {socials.map((s) => {
              const Icon = brandIcons[s.label]
              return (
                <li key={s.label}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className={iconButton}
                      >
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={s.label}
                        >
                          <Icon className="size-3.5" />
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={6}>
                      {s.label}
                    </TooltipContent>
                  </Tooltip>
                </li>
              )
            })}
          </ul>
          <Separator orientation="vertical" className="mx-1.5 h-5!" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => lenis?.scrollTo(0, { duration: 1.8 })}
                aria-label="Back to top"
                className={`group ${iconButton} hover:bg-primary hover:text-primary-foreground`}
              >
                <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={6}>
              Back to top
            </TooltipContent>
          </Tooltip>
        </div>
      </Container>
    </div>
  )
}
