"use client"

import { useSyncExternalStore } from "react"

const noop = () => () => {}

export function useModKey() {
  return useSyncExternalStore(
    noop,
    () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘" : "Ctrl"),
    () => "Ctrl"
  )
}
