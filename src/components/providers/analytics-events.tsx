"use client"

import { useEffect } from "react"
import { track } from "@vercel/analytics"

import { siteConfig } from "@/config/site"

export function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a")
      if (!link) return
      const href = link.getAttribute("href")
      const area = link.closest("header, section, footer, [role=dialog]")
      const from = area?.id || area?.tagName.toLowerCase() || "page"
      if (href === siteConfig.resume) track("Résumé opened", { from })
      if (link.dataset.cta) track("Hero CTA", { action: link.dataset.cta })
    }
    document.addEventListener("click", onClick, { capture: true })
    return () =>
      document.removeEventListener("click", onClick, { capture: true })
  }, [])

  return null
}
