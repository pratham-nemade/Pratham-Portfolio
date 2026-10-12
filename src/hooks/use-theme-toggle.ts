"use client"

import { useTheme } from "next-themes"

import { useMounted } from "@/hooks/use-mounted"

export function useThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = useMounted() && resolvedTheme === "dark"
  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark")
  return { isDark, toggle }
}
