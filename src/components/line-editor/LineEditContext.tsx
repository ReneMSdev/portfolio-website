'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import { pointsToPath, type Point } from './pathUtils'
import { useLineEditMode } from './useLineEditMode'

export type LineEditToolMode = 'none' | 'add' | 'delete'

interface LineEditContextValue {
  registerLine: (id: string, branches: Point[][]) => void
  /** 'add': click a segment to insert a point, or click empty space/a node twice to draw a new line. 'delete': click a node to remove it. */
  mode: LineEditToolMode
  setMode: (mode: LineEditToolMode) => void
}

const LineEditContext = createContext<LineEditContextValue | undefined>(undefined)

export function LineEditProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<Record<string, Point[][]>>({})
  const [mode, setMode] = useState<LineEditToolMode>('none')

  const registerLine = useCallback((id: string, branches: Point[][]) => {
    setEntries((prev) => ({ ...prev, [id]: branches }))
  }, [])

  const value = useMemo(() => ({ registerLine, mode, setMode }), [registerLine, mode])

  return (
    <LineEditContext.Provider value={value}>
      {children}
      <LineEditPanel entries={entries} />
    </LineEditContext.Provider>
  )
}

export function useLineEditRegistry() {
  const ctx = useContext(LineEditContext)
  if (!ctx) throw new Error('useLineEditRegistry must be used within a LineEditProvider')
  return ctx
}

function LineEditPanel({ entries }: { entries: Record<string, Point[][]> }) {
  const editing = useLineEditMode()
  const { mode, setMode } = useLineEditRegistry()
  const panelRef = useRef<HTMLDivElement>(null)
  const dragState = useRef<{ startX: number; startY: number; panelX: number; panelY: number } | null>(null)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  if (!editing) return null

  const ids = Object.keys(entries)

  const handleDragStart = (e: ReactPointerEvent<HTMLDivElement>) => {
    const rect = panelRef.current?.getBoundingClientRect()
    if (!rect) return
    dragState.current = { startX: e.clientX, startY: e.clientY, panelX: rect.left, panelY: rect.top }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handleDragMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current || e.buttons !== 1) return
    const { startX, startY, panelX, panelY } = dragState.current
    setPos({ x: panelX + (e.clientX - startX), y: panelY + (e.clientY - startY) })
  }

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 1500)
    } catch {
      // clipboard unavailable — nothing to fall back to here
    }
  }

  return (
    <div
      ref={panelRef}
      className={`fixed z-[200] flex max-h-[50vh] w-full max-w-md flex-col rounded-lg border border-border bg-surface font-mono text-xs text-foreground shadow-2xl ${
        pos ? '' : 'bottom-4 right-4'
      }`}
      style={pos ? { left: pos.x, top: pos.y } : undefined}
    >
      <div
        onPointerDown={handleDragStart}
        onPointerMove={handleDragMove}
        className='flex shrink-0 cursor-grab items-center justify-between rounded-t-lg border-b border-border bg-background/60 px-4 py-2 active:cursor-grabbing'
        style={{ touchAction: 'none' }}
      >
        <p className='font-semibold text-accent'>Line editor — drag points, copy below</p>
        <span className='text-muted-foreground'>⠿⠿</span>
      </div>
      <div className='flex shrink-0 gap-2 border-b border-border px-4 py-2'>
        <button
          type='button'
          onClick={() => setMode(mode === 'add' ? 'none' : 'add')}
          className={`flex-1 rounded border px-2 py-1 transition-colors ${
            mode === 'add'
              ? 'border-accent bg-accent/20 text-accent'
              : 'border-border text-muted-foreground hover:bg-accent/10'
          }`}
        >
          + Add Node
        </button>
        <button
          type='button'
          onClick={() => setMode(mode === 'delete' ? 'none' : 'delete')}
          className={`flex-1 rounded border px-2 py-1 transition-colors ${
            mode === 'delete'
              ? 'border-destructive bg-destructive/20 text-destructive'
              : 'border-border text-muted-foreground hover:bg-destructive/10'
          }`}
        >
          − Delete Node
        </button>
      </div>
      {mode !== 'none' && (
        <p className='shrink-0 px-4 pt-2 text-[11px] text-muted-foreground'>
          {mode === 'add'
            ? 'Click a line to insert a point, or click a node/empty space twice to draw a new line.'
            : 'Click a node to remove it.'}
        </p>
      )}
      <div className='overflow-y-auto p-4'>
        {ids.length === 0 && <p className='text-muted-foreground'>No lines registered yet.</p>}
        {ids.map((id) => {
          const branches = entries[id]
          const text = branches.map((points) => `'${pointsToPath(points)}',`).join('\n')
          return (
            <div
              key={id}
              className='mb-4'
            >
              <div className='mb-1 flex items-center justify-between'>
                <span className='text-muted-foreground'>{id}</span>
                <button
                  type='button'
                  onClick={() => handleCopy(id, text)}
                  className={`rounded border px-2 py-0.5 transition-colors ${
                    copiedId === id
                      ? 'border-accent bg-accent/20 text-accent'
                      : 'border-border text-accent hover:bg-accent/10'
                  }`}
                >
                  {copiedId === id ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className='whitespace-pre-wrap rounded bg-background/60 p-2 leading-relaxed'>{text}</pre>
            </div>
          )
        })}
      </div>
    </div>
  )
}
