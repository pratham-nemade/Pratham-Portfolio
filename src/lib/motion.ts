export const EASE = [0.22, 1, 0.36, 1] as const

export function reveal(delay = 0, { y = 24, duration = 0.9 } = {}) {
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px" },
    transition: { duration, delay, ease: EASE },
  } as const
}
