"use client"

import { useEffect } from "react"

import { isTypingTarget } from "@/lib/dom"

export function usePaletteHotkey(
  setOpen: (fn: (o: boolean) => boolean) => void
) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key?.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      } else if (e.key === "/" && !isTypingTarget(e.target)) {
        e.preventDefault()
        setOpen(() => true)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [setOpen])
}
