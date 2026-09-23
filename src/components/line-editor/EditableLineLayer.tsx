'use client'

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { parsePath, pointsToPath, type Point } from './pathUtils'
import { useLineEditRegistry } from './LineEditContext'

/**
 * Converts a screen point to viewBox coordinates, correctly accounting for
 * `preserveAspectRatio` — our files use either "none" (the measured
 * section-lines, which stretch to fill exactly) or "xMidYMid slice"/"meet"
 * (Hero's fixed-viewBox variants, which uniformly scale and center-crop).
 */
function screenToViewBox(svg: SVGSVGElement, clientX: number, clientY: number): Point {
  const rect = svg.getBoundingClientRect()
  const vb = svg.viewBox.baseVal
  const par = svg.preserveAspectRatio.baseVal
  const isNone = par.align === SVGPreserveAspectRatio.SVG_PRESERVEASPECTRATIO_NONE

  let scaleX = rect.width / vb.width
  let scaleY = rect.height / vb.height

  if (!isNone) {
    const scale =
      par.meetOrSlice === SVGPreserveAspectRatio.SVG_MEETORSLICE_SLICE
        ? Math.max(scaleX, scaleY)
        : Math.min(scaleX, scaleY)
    scaleX = scale
    scaleY = scale
  }

  const offsetX = (rect.width - vb.width * scaleX) / 2
  const offsetY = (rect.height - vb.height * scaleY) / 2

  return {
    x: vb.x + (clientX - rect.left - offsetX) / scaleX,
    y: vb.y + (clientY - rect.top - offsetY) / scaleY,
  }
}

const SNAP_DISTANCE = 12

function projectOntoSegment(p: Point, a: Point, b: Point): Point {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const lengthSq = dx * dx + dy * dy
  if (lengthSq === 0) return a
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / lengthSq))
  return { x: a.x + t * dx, y: a.y + t * dy }
}

/**
 * If `raw` is close to any OTHER segment (excluding the ones directly
 * connected to the point being dragged, which right-angle preservation
 * already handles), returns the nearest point on that segment instead —
 * so dragging a node near a line connects it exactly onto that line.
 */
function findSnapPoint(
  raw: Point,
  allBranches: Point[][],
  excludeBranchIndex: number,
  excludePointIndex: number
): Point | null {
  let bestPoint: Point | null = null
  let bestDist = SNAP_DISTANCE

  allBranches.forEach((branch, bi) => {
    for (let i = 0; i < branch.length - 1; i++) {
      const touchesDraggedPoint =
        bi === excludeBranchIndex && (i === excludePointIndex - 1 || i === excludePointIndex)
      if (touchesDraggedPoint) continue

      const projected = projectOntoSegment(raw, branch[i], branch[i + 1])
      const dist = Math.hypot(projected.x - raw.x, projected.y - raw.y)
      if (dist <= bestDist) {
        bestDist = dist
        bestPoint = projected
      }
    }
  })

  return bestPoint
}

interface EditableLineLayerProps {
  /** Unique label shown in the editor panel, e.g. "skills", "projects". */
  id: string
  /** The section's current branch path strings (same format as the normal render). */
  branches: string[]
}

/**
 * Dev-only overlay: renders the given branches as plain draggable point
 * chains inside the ancestor `<svg>`, and reports live positions to the
 * editor panel. Mount this INSTEAD of the normal animated paths while
 * `useLineEditMode()` is true — it doesn't render its own `<svg>` wrapper,
 * it expects to be placed inside one that already has a `viewBox` set.
 *
 * Dragging any node snaps it onto a nearby line: if the drag lands within
 * `SNAP_DISTANCE` of another segment (not one directly connected to the
 * point being dragged, which right-angle preservation already handles),
 * it snaps to the nearest point on that segment instead of the raw cursor
 * position — so moving a node onto a line connects it there exactly.
 *
 * When "Add Node" mode is on: clicking a segment inserts a point on it
 * (collinear, so right angles stay intact by construction); clicking empty
 * space twice draws a new line, with the second click snapped to whichever
 * axis keeps it vertical/horizontal. Clicking an existing node (rather than
 * empty space) starts the new line from there instead — extending that
 * branch if the node is one of its ends, or branching off it (a
 * T-junction) if it's a middle point.
 *
 * When "Delete Node" mode is on: clicking a node removes it. Removing an
 * end point just shortens the branch; removing a middle point splices it
 * out (the branch's two remaining sides connect directly, which may no
 * longer be a right angle — that's an inherent tradeoff of deleting a
 * corner). Removing one of only two points deletes the whole branch.
 */
export function EditableLineLayer({ id, branches }: EditableLineLayerProps) {
  const [points, setPoints] = useState<Point[][]>(() => branches.map(parsePath))
  const [pending, setPending] = useState<{
    point: Point
    origin: { branchIndex: number; pointIndex: number } | null
  } | null>(null)
  const { registerLine, mode } = useLineEditRegistry()
  const svgRef = useRef<SVGSVGElement | null>(null)
  const nodeDownRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    registerLine(id, points)
  }, [id, points, registerLine])

  // Clear any half-drawn line when leaving add mode — a render-time state
  // adjustment (not an effect), so it lands before paint.
  const [prevMode, setPrevMode] = useState(mode)
  if (mode !== prevMode) {
    setPrevMode(mode)
    if (mode !== 'add') setPending(null)
  }

  const getSvg = () => svgRef.current?.ownerSVGElement ?? svgRef.current

  const updatePoint = (branchIndex: number, pointIndex: number, next: Point) => {
    setPoints((prev) => {
      const branch = prev[branchIndex]
      const old = branch[pointIndex]
      const newBranch = [...branch]
      newBranch[pointIndex] = next

      // Preserve right angles: a neighbor directly connected by a vertical
      // or horizontal segment moves along with the dragged point so that
      // segment stays vertical/horizontal, instead of going diagonal.
      const snapNeighbor = (neighborIndex: number) => {
        const neighbor = branch[neighborIndex]
        if (neighbor.x === old.x) {
          newBranch[neighborIndex] = { ...neighbor, x: next.x }
        } else if (neighbor.y === old.y) {
          newBranch[neighborIndex] = { ...neighbor, y: next.y }
        }
      }

      if (pointIndex > 0) snapNeighbor(pointIndex - 1)
      if (pointIndex < branch.length - 1) snapNeighbor(pointIndex + 1)

      const copy = [...prev]
      copy[branchIndex] = newBranch
      return copy
    })
  }

  const handleDrag = (branchIndex: number, pointIndex: number) => (e: ReactPointerEvent<SVGCircleElement>) => {
    if (e.buttons !== 1) return
    const svg = getSvg()
    if (!svg) return
    const raw = screenToViewBox(svg, e.clientX, e.clientY)
    const snapped = findSnapPoint(raw, points, branchIndex, pointIndex)
    updatePoint(branchIndex, pointIndex, snapped ?? raw)
  }

  const deletePoint = (branchIndex: number, pointIndex: number) => {
    setPoints((prev) => {
      const branch = prev[branchIndex]
      if (branch.length <= 2) return prev.filter((_, i) => i !== branchIndex)
      const copy = [...prev]
      copy[branchIndex] = branch.filter((_, i) => i !== pointIndex)
      return copy
    })
  }

  const handleNodePointerDown = (e: ReactPointerEvent<SVGCircleElement>) => {
    nodeDownRef.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  // A genuine click (no real movement) on an existing node: in add mode,
  // starts a new line from it; in delete mode, removes it.
  const handleNodePointerUp = (branchIndex: number, pointIndex: number) => (e: ReactPointerEvent<SVGCircleElement>) => {
    const down = nodeDownRef.current
    nodeDownRef.current = null
    if (mode === 'none' || !down) return
    if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 4) return // was a drag, not a click

    if (mode === 'delete') {
      deletePoint(branchIndex, pointIndex)
    } else if (mode === 'add') {
      setPending({ point: points[branchIndex][pointIndex], origin: { branchIndex, pointIndex } })
    }
  }

  // Add-mode: click a segment to insert a point on it, staying collinear.
  const handleSegmentClick = (branchIndex: number, segmentIndex: number) => (e: ReactMouseEvent<SVGLineElement>) => {
    if (mode !== 'add') return
    e.stopPropagation()
    const svg = getSvg()
    if (!svg) return
    const clicked = screenToViewBox(svg, e.clientX, e.clientY)

    setPoints((prev) => {
      const branch = prev[branchIndex]
      const p1 = branch[segmentIndex]
      const p2 = branch[segmentIndex + 1]
      let inserted: Point

      if (p1.y === p2.y) {
        const [minX, maxX] = [Math.min(p1.x, p2.x), Math.max(p1.x, p2.x)]
        inserted = { x: Math.round(Math.min(Math.max(clicked.x, minX), maxX)), y: p1.y }
      } else if (p1.x === p2.x) {
        const [minY, maxY] = [Math.min(p1.y, p2.y), Math.max(p1.y, p2.y)]
        inserted = { x: p1.x, y: Math.round(Math.min(Math.max(clicked.y, minY), maxY)) }
      } else {
        inserted = { x: Math.round(clicked.x), y: Math.round(clicked.y) }
      }

      const newBranch = [...branch.slice(0, segmentIndex + 1), inserted, ...branch.slice(segmentIndex + 1)]
      const copy = [...prev]
      copy[branchIndex] = newBranch
      return copy
    })
  }

  // Add-mode: click empty space to place the first point of a new line (or
  // click an existing node instead — see handleNodePointerUp), click again
  // to place the second, snapped to keep the segment vertical or
  // horizontal, whichever axis is closer to where you clicked. If the
  // first point came from an existing node, extend that node's branch
  // (prepend/append) when it's an end, or branch off it (T-junction)
  // otherwise; if it came from empty space, start a brand-new line.
  const handleBackgroundClick = (e: ReactMouseEvent<SVGRectElement>) => {
    if (mode !== 'add') return
    const svg = getSvg()
    if (!svg) return
    const clicked = screenToViewBox(svg, e.clientX, e.clientY)
    const rounded = { x: Math.round(clicked.x), y: Math.round(clicked.y) }

    if (!pending) {
      setPending({ point: rounded, origin: null })
      return
    }

    const { point: anchor, origin } = pending
    const dx = Math.abs(rounded.x - anchor.x)
    const dy = Math.abs(rounded.y - anchor.y)
    const snapped = dx < dy ? { x: anchor.x, y: rounded.y } : { x: rounded.x, y: anchor.y }

    setPoints((prev) => {
      if (!origin) return [...prev, [anchor, snapped]]

      const branch = prev[origin.branchIndex]
      const copy = [...prev]
      if (origin.pointIndex === 0) {
        copy[origin.branchIndex] = [snapped, ...branch]
      } else if (origin.pointIndex === branch.length - 1) {
        copy[origin.branchIndex] = [...branch, snapped]
      } else {
        copy.push([anchor, snapped])
      }
      return copy
    })
    setPending(null)
  }

  return (
    <g ref={(el) => { svgRef.current = el?.ownerSVGElement ?? null }}>
      <rect
        x={-2000}
        y={-2000}
        width={4000}
        height={4000}
        fill='transparent'
        style={{
          pointerEvents: mode === 'add' ? 'fill' : 'none',
          cursor: mode === 'add' ? 'crosshair' : 'default',
        }}
        onClick={handleBackgroundClick}
      />
      {mode === 'add' &&
        points.map((branchPoints, bi) =>
          branchPoints.slice(0, -1).map((p, pi) => {
            const next = branchPoints[pi + 1]
            return (
              <line
                key={`hit-${bi}-${pi}`}
                x1={p.x}
                y1={p.y}
                x2={next.x}
                y2={next.y}
                stroke='transparent'
                strokeWidth={16}
                style={{ pointerEvents: 'stroke', cursor: 'copy' }}
                onClick={handleSegmentClick(bi, pi)}
              />
            )
          })
        )}
      {points.map((branchPoints, bi) => (
        <path
          key={bi}
          d={pointsToPath(branchPoints)}
          fill='none'
          strokeWidth={1.5}
          stroke='#f472b6'
        />
      ))}
      {pending && (
        <circle
          cx={pending.point.x}
          cy={pending.point.y}
          r={7}
          fill='#fbbf24'
          fillOpacity={0.9}
          stroke='#fff'
          strokeWidth={1}
        />
      )}
      {points.map((branchPoints, bi) =>
        branchPoints.map((p, pi) => (
          <circle
            key={`${bi}-${pi}`}
            cx={p.x}
            cy={p.y}
            r={7}
            fill={mode === 'delete' ? '#ef4444' : '#f472b6'}
            fillOpacity={0.85}
            stroke='#fff'
            strokeWidth={1}
            style={{
              cursor: mode === 'delete' ? 'pointer' : mode === 'add' ? 'copy' : 'grab',
              touchAction: 'none',
              pointerEvents: 'auto',
            }}
            onPointerDown={handleNodePointerDown}
            onPointerMove={handleDrag(bi, pi)}
            onPointerUp={handleNodePointerUp(bi, pi)}
          />
        ))
      )}
    </g>
  )
}
