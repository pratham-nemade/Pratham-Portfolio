type Point = { x: number; y: number }

export type Pixel = {
  hx: number
  hy: number
  x: number
  y: number
  vx: number
  vy: number
  accent: boolean
  alpha: number
  twinkle: number
}

type PixelTarget = { x: number; y: number; accent: boolean }

const TRACKING = -0.055
const LINE_HEIGHT = 0.86
const LIT_DISTANCE = 2.5
const TWINKLE_LIT = 0.35
const REST_DISTANCE = 0.3
const REST_SPEED = 0.05

export function createPixel(target: PixelTarget, from: Point = target): Pixel {
  return {
    hx: target.x,
    hy: target.y,
    x: from.x,
    y: from.y,
    vx: 0,
    vy: 0,
    accent: target.accent,
    alpha: 1,
    twinkle: 0,
  }
}

export function rasterize(
  lines: readonly [string, string],
  width: number,
  height: number,
  {
    indent,
    fill = 1,
    cell: cellFor,
    centerOnPixels = false,
  }: {
    indent: number
    fill?: number
    cell: number | ((fontSize: number) => number)
    centerOnPixels?: boolean
  }
): { targets: PixelTarget[]; cell: number; fontSize: number } {
  const off = document.createElement("canvas")
  const o = off.getContext("2d", { willReadFrequently: true })
  if (!o || !width || !height) return { targets: [], cell: 1, fontSize: 0 }

  const family =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--font-urbanist")
      .trim() || "sans-serif"
  const setFont = (px: number) => {
    o.font = `700 ${px}px ${family}`
    if ("letterSpacing" in o) o.letterSpacing = `${px * TRACKING}px`
  }

  setFont(100)
  const w1 = o.measureText(lines[0]).width / 100
  const w2 = o.measureText(lines[1]).width / 100 + indent
  const rows = lines[1] ? 2 : 1
  const size = Math.min(
    (width * fill) / (Math.max(w1, w2) + 0.05),
    height / (LINE_HEIGHT * rows + 0.08)
  )

  off.width = Math.ceil(width)
  off.height = Math.ceil(height)
  setFont(size)
  const base1 = (height - size * LINE_HEIGHT * rows) / 2 + size * 0.8
  const left = Math.max(0, (width - Math.max(w1, w2) * size) / 2)
  o.fillStyle = "#f00"
  o.fillText(lines[0], left, base1)
  if (lines[1]) {
    o.fillStyle = "#00f"
    o.fillText(lines[1], left + size * indent, base1 + size * LINE_HEIGHT)
  }

  const cell = typeof cellFor === "number" ? cellFor : cellFor(size)
  const data = o.getImageData(0, 0, off.width, off.height).data
  const targets: PixelTarget[] = []
  for (let y = cell / 2; y < off.height; y += cell) {
    for (let x = cell / 2; x < off.width; x += cell) {
      const i = (Math.floor(y) * off.width + Math.floor(x)) * 4
      if (data[i + 3] < 140) continue
      targets.push({ x, y, accent: data[i + 2] > data[i] })
    }
  }

  if (centerOnPixels && targets.length) {
    let minX = Infinity
    let maxX = -Infinity
    let minY = Infinity
    let maxY = -Infinity
    for (const t of targets) {
      if (t.x < minX) minX = t.x
      if (t.x > maxX) maxX = t.x
      if (t.y < minY) minY = t.y
      if (t.y > maxY) maxY = t.y
    }
    const dx = Math.round((width - (maxX + minX)) / 2)
    const dy = Math.round((height - (maxY + minY)) / 2)
    for (const t of targets) {
      t.x += dx
      t.y += dy
    }
  }

  return { targets, cell, fontSize: size }
}

export function stepPixel(
  p: Pixel,
  pointer: Point | null,
  radius: number,
  spring: number,
  friction: number
) {
  let ax = (p.hx - p.x) * spring
  let ay = (p.hy - p.y) * spring
  if (pointer) {
    const dx = p.x - pointer.x
    const dy = p.y - pointer.y
    const d2 = dx * dx + dy * dy
    if (d2 < radius * radius && d2 > 0.01) {
      const d = Math.sqrt(d2)
      const f = (1 - d / radius) ** 2 * 7
      ax += (dx / d) * f
      ay += (dy / d) * f
    }
  }
  p.vx = (p.vx + ax) * friction
  p.vy = (p.vy + ay) * friction
  p.x += p.vx
  p.y += p.vy
  p.twinkle *= 0.94
  return (
    Math.abs(p.vx) + Math.abs(p.vy) > REST_SPEED ||
    Math.abs(p.x - p.hx) + Math.abs(p.y - p.hy) > REST_DISTANCE
  )
}

const isLit = (p: Pixel, cell: number) =>
  p.twinkle > TWINKLE_LIT ||
  Math.abs(p.x - p.hx) + Math.abs(p.y - p.hy) > cell * LIT_DISTANCE

type Colors = { fg: string; accent: string }

function drawAll(
  ctx: CanvasRenderingContext2D,
  pixels: Pixel[],
  cell: number,
  { fg, accent }: Colors
) {
  const s = cell - 1
  const half = s / 2
  for (let pass = 0; pass < 2; pass++) {
    ctx.fillStyle = pass === 0 ? fg : accent
    let alpha = 1
    ctx.globalAlpha = 1
    for (const p of pixels) {
      const lit = isLit(p, cell)
      if ((pass === 1) !== (p.accent || lit)) continue
      const a = lit ? p.alpha * 0.95 : p.alpha
      if (a !== alpha) ctx.globalAlpha = alpha = a
      ctx.fillRect(p.x - half, p.y - half, s, s)
    }
  }
  ctx.globalAlpha = 1
}

function drawOne(
  ctx: CanvasRenderingContext2D,
  p: Pixel,
  cell: number,
  { fg, accent }: Colors
) {
  const s = cell - 1
  const half = s / 2
  ctx.clearRect(p.x - half - 0.5, p.y - half - 0.5, s + 1, s + 1)
  const lit = isLit(p, cell)
  ctx.fillStyle = p.accent || lit ? accent : fg
  ctx.globalAlpha = lit ? p.alpha * 0.95 : p.alpha
  ctx.fillRect(p.x - half, p.y - half, s, s)
  ctx.globalAlpha = 1
}

type Stage = {
  width: number
  height: number
  reduce: boolean
  draw(): void
}

type Scene = {
  readonly pixels: Pixel[]
  readonly cell: number
  readonly radius: number
  layout(): void
  update(now: number, pointer: Point | null): boolean
}

export function mountPixelStage(
  wrap: HTMLElement,
  canvas: HTMLCanvasElement,
  createScene: (stage: Stage) => Scene
): () => void {
  const ctx = canvas.getContext("2d")
  if (!ctx) return () => {}

  const colors: Colors = { fg: "", accent: "" }
  let pointer: Point | null = null
  let frame = 0
  let visible = false
  let ready = false
  let cancelled = false
  let resting = false
  const glints = new Set<Pixel>()

  const stage: Stage = {
    width: 0,
    height: 0,
    reduce: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    draw: () => {
      ctx.clearRect(0, 0, stage.width, stage.height)
      drawAll(ctx, scene.pixels, scene.cell, colors)
    },
  }
  const scene = createScene(stage)

  const readColors = () => {
    const s = getComputedStyle(canvas)
    colors.fg = s.getPropertyValue("--foreground").trim()
    colors.accent = s.getPropertyValue("--primary").trim()
  }

  const layout = () => {
    const rect = wrap.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    stage.width = rect.width
    stage.height = rect.height
    canvas.width = Math.round(rect.width * dpr)
    canvas.height = Math.round(rect.height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    resting = false
    glints.clear()
    if (stage.width && stage.height) scene.layout()
    stage.draw()
  }

  const tick = (now: number) => {
    const { pixels, cell } = scene
    if (Math.random() < 0.5 && pixels.length) {
      const p = pixels[Math.floor(Math.random() * pixels.length)]
      p.twinkle = 1
      glints.add(p)
    }

    if (scene.update(now, pointer)) {
      resting = false
      stage.draw()
    } else if (!resting) {
      for (const p of scene.pixels) {
        p.x = p.hx
        p.y = p.hy
        p.vx = p.vy = 0
      }
      resting = true
      stage.draw()
    } else {
      for (const p of glints) drawOne(ctx, p, cell, colors)
    }
    for (const p of glints) if (p.twinkle <= TWINKLE_LIT) glints.delete(p)

    frame = requestAnimationFrame(tick)
  }

  const start = () => {
    if (stage.reduce || frame || !ready || !visible || document.hidden) return
    frame = requestAnimationFrame(tick)
  }
  const stop = () => {
    cancelAnimationFrame(frame)
    frame = 0
  }

  const local = (e: PointerEvent): Point => {
    const r = canvas.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }
  const onMove = (e: PointerEvent) => {
    const p = local(e)
    const pad = scene.radius
    pointer =
      p.x > -pad &&
      p.y > -pad &&
      p.x < stage.width + pad &&
      p.y < stage.height + pad
        ? p
        : null
  }
  const onLeave = () => (pointer = null)
  const onDown = (e: PointerEvent) => {
    if (stage.reduce) return
    const c = local(e)
    const reach = scene.radius * 3.5
    for (const p of scene.pixels) {
      const dx = p.x - c.x
      const dy = p.y - c.y
      const d = Math.hypot(dx, dy) || 1
      const f = Math.max(0, 1 - d / reach) * 38
      p.vx += (dx / d) * f
      p.vy += (dy / d) * f
    }
  }
  const onVisibility = () => (document.hidden ? stop() : start())

  let resizeTimer: ReturnType<typeof setTimeout> | undefined
  const ro = new ResizeObserver(() => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      const r = wrap.getBoundingClientRect()
      if (r.width === stage.width && r.height === stage.height) return
      layout()
    }, 120)
  })
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) start()
    else stop()
  })
  const themeObserver = new MutationObserver(() => {
    readColors()
    stage.draw()
  })

  document.fonts.ready.then(() => {
    if (cancelled) return
    ready = true
    readColors()
    layout()
    ro.observe(wrap)
    io.observe(wrap)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
  })

  window.addEventListener("pointermove", onMove, { passive: true })
  document.addEventListener("pointerleave", onLeave)
  wrap.addEventListener("pointerdown", onDown)
  document.addEventListener("visibilitychange", onVisibility)

  return () => {
    cancelled = true
    stop()
    clearTimeout(resizeTimer)
    ro.disconnect()
    io.disconnect()
    themeObserver.disconnect()
    window.removeEventListener("pointermove", onMove)
    document.removeEventListener("pointerleave", onLeave)
    wrap.removeEventListener("pointerdown", onDown)
    document.removeEventListener("visibilitychange", onVisibility)
  }
}
