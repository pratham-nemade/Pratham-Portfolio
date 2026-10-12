"use client"

import { useEffect } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

import { useThemeToggle } from "@/hooks/use-theme-toggle"
import { isTypingTarget } from "@/lib/dom"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      scriptProps={{
        type:
          typeof window === "undefined"
            ? "text/javascript"
            : "application/json",
        suppressHydrationWarning: true,
      }}
      {...props}
    >
      <ThemeHotkey />
      {children}
    </NextThemesProvider>
  )
}

function ThemeHotkey() {
  const { toggle } = useThemeToggle()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.repeat) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key?.toLowerCase() !== "d" || isTypingTarget(e.target)) return
      toggle()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [toggle])

  return null
}
