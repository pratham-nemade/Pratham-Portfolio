export const pad2 = (n: number) => String(n).padStart(2, "0")

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
]

export const startYear = (period: string) =>
  period.split(" · ")[0].replace(/^\D+/, "")

export function startDate(period: string) {
  const [mon = "", year] = period.split(" · ")[0].toLowerCase().split(" ")
  const m = MONTHS.indexOf(mon.slice(0, 3))
  const y = Number(year)
  return m < 0 || !y ? null : new Date(y, m, 1)
}

export const daysBetween = (from: Date, now: Date) =>
  Math.max(0, Math.floor((now.getTime() - from.getTime()) / 86_400_000))
