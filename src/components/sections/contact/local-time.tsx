"use client"

import { useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"

const IST_OFFSET = 330

const istClock = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
})
const istHour = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  hour12: false,
  timeZone: "Asia/Kolkata",
})
const localClock = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
})

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 15_000)
  return () => clearInterval(id)
}

const snapshot = () => {
  const now = new Date()
  const diff = IST_OFFSET + now.getTimezoneOffset()
  return [
    istClock.format(now).toLowerCase(),
    istHour.format(now),
    localClock.format(now).toLowerCase(),
    diff,
  ].join("|")
}

const span = (minutes: number) => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h ? `${h}h` : ""}${h && m ? " " : ""}${m ? `${m}m` : ""}`
}

function useBengaluruTime() {
  const value = useSyncExternalStore(subscribe, snapshot, () => null)
  if (!value) return null
  const [time, hour, local, diff] = value.split("|")
  const h = Number(hour)
  const d = Number(diff)
  return {
    time,
    hour: h,
    awake: h >= 9 && h < 23,
    local,
    compare:
      d === 0
        ? "Same time zone as you."
        : `${local} for you · I'm ${span(Math.abs(d))} ${d > 0 ? "ahead" : "behind"}.`,
  }
}

export function LocalTimeTile() {
  const now = useBengaluruTime()
  const Icon = now?.awake === false ? Moon : Sun

  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div className="flex items-center justify-between font-mono text-[0.5625rem] tracking-[0.3em] text-muted-foreground uppercase">
        <span>Local time · Bengaluru</span>
        <Icon className="size-4 text-primary" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-heading text-5xl font-bold tracking-tight tabular-nums lg:text-4xl tall:text-5xl">
          {now ? (
            <>
              {now.time.replace(/ (am|pm)$/, "")}
              <span className="ml-2 text-2xl font-semibold text-primary">
                {now.time.slice(-2)}
              </span>
            </>
          ) : (
            <span className="opacity-0">0:00</span>
          )}
        </p>
        <p className="text-sm text-muted-foreground">
          {now?.awake === false
            ? "I'm probably asleep, but I'll see it first thing."
            : "I'm probably at my desk."}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div aria-hidden className="grid grid-cols-24 gap-0.5">
          {Array.from({ length: 24 }, (_, h) => (
            <span
              key={h}
              className={cn(
                "h-3 transition-colors",
                now?.hour === h
                  ? "bg-primary"
                  : h >= 9 && h < 23
                    ? "bg-primary/20"
                    : "bg-border/60"
              )}
            />
          ))}
        </div>
        <div
          aria-hidden
          className="flex justify-between font-mono text-[0.5625rem] text-muted-foreground"
        >
          <span>12 am</span>
          <span>6 am</span>
          <span>12 pm</span>
          <span>6 pm</span>
          <span>11 pm</span>
        </div>
        <p className="text-xs text-muted-foreground">{now?.compare ?? " "}</p>
      </div>
    </div>
  )
}
