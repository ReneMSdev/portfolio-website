export interface Point {
  x: number
  y: number
}

/** Parses a simple `M x y L x y L x y ...` path string (no curves) into points. */
export function parsePath(d: string): Point[] {
  const tokens = d.trim().split(/\s+/)
  const points: Point[] = []
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === 'M' || tokens[i] === 'L') {
      points.push({ x: Number(tokens[i + 1]), y: Number(tokens[i + 2]) })
      i += 2
    }
  }
  return points
}

/** Inverse of parsePath — rounds to whole viewBox units, matching the source files' style. */
export function pointsToPath(points: Point[]): string {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${Math.round(p.x)} ${Math.round(p.y)}`).join(' ')
}
