import { pointsToPath, type Point } from '@/lib/svgPath'

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export interface GenerateOptions {
  width: number
  height: number
  branchCount: number
  /** Rectangles no segment is allowed to cross — e.g. content columns. */
  avoidRects?: Rect[]
  /** Fixed seed so the same options always produce the same layout (no SSR/client mismatch, and a good result can be "locked in"). */
  seed?: number
  /** Turns/endpoints snap to this grid, matching the hand-authored design's right-angle style. */
  gridSize?: number
  minSegments?: number
  maxSegments?: number
  minStep?: number
  maxStep?: number
}

export interface NodePoint {
  cx: number
  cy: number
}

/** Tiny deterministic PRNG (mulberry32) — same seed always gives the same sequence. */
function createRandom(seed: number) {
  let state = seed
  return function random() {
    state |= 0
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function snap(value: number, gridSize: number) {
  return Math.round(value / gridSize) * gridSize
}

function segmentHitsRect(p1: Point, p2: Point, rects: Rect[]): boolean {
  const minX = Math.min(p1.x, p2.x)
  const maxX = Math.max(p1.x, p2.x)
  const minY = Math.min(p1.y, p2.y)
  const maxY = Math.max(p1.y, p2.y)
  return rects.some((r) => minX < r.x + r.width && maxX > r.x && minY < r.y + r.height && maxY > r.y)
}

/**
 * Generates right-angle "circuit trace" branches via a constrained random
 * walk: each branch enters from an off-canvas edge, alternates horizontal/
 * vertical moves (keeping every segment a clean right angle by
 * construction), and rejects any move that would cross an `avoidRects`
 * entry, retrying a few times before giving up and ending the branch there.
 *
 * Returns nodes for every branch's final (in-canvas) point too, so callers
 * don't have to remember to add one by hand for each generated endpoint.
 */
export function generateCircuitBranches({
  width,
  height,
  branchCount,
  avoidRects = [],
  seed = 1,
  gridSize = 20,
  minSegments = 3,
  maxSegments = 7,
  minStep = 40,
  maxStep = 140,
}: GenerateOptions): { branches: string[]; nodes: NodePoint[] } {
  const random = createRandom(seed)
  const branches: string[] = []
  const nodes: NodePoint[] = []

  for (let b = 0; b < branchCount; b++) {
    const fromLeft = random() < 0.5
    const start: Point = { x: fromLeft ? -40 : width + 40, y: snap(random() * height, gridSize) }

    const points: Point[] = [start]
    let current = start
    let horizontal = true // the entry move brings it onto the canvas horizontally
    const segments = minSegments + Math.floor(random() * (maxSegments - minSegments + 1))

    for (let s = 0; s < segments; s++) {
      let next: Point | null = null

      for (let attempt = 0; attempt < 8 && !next; attempt++) {
        const step = minStep + random() * (maxStep - minStep)
        const candidate: Point = horizontal
          ? { x: snap(current.x + (fromLeft ? step : -step), gridSize), y: current.y }
          : { x: current.x, y: snap(current.y + (random() < 0.5 ? step : -step), gridSize) }

        candidate.x = Math.max(-40, Math.min(width + 40, candidate.x))
        candidate.y = Math.max(0, Math.min(height, candidate.y))

        if (!segmentHitsRect(current, candidate, avoidRects)) next = candidate
      }

      if (!next) break // no clear move found — end the branch here rather than force a diagonal
      points.push(next)
      current = next
      horizontal = !horizontal
    }

    if (points.length < 2) continue
    branches.push(pointsToPath(points))

    const last = points[points.length - 1]
    if (last.x >= 0 && last.x <= width) nodes.push({ cx: last.x, cy: last.y })
  }

  return { branches, nodes }
}
