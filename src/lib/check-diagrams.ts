import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { projects } from '@/data/projects'
import { diagramKey } from '@/lib/diagrams'

/**
 * Fails the build (the page is prerendered at build time) when a diagram's
 * Mermaid source in projects.ts no longer matches the SVG rendered from it,
 * so an edited chart can't ship with a stale picture. The hashes come from
 * public/diagrams/manifest.json, written by scripts/render-diagrams.mjs. A
 * missing SVG file counts as stale too.
 * In development it only warns: the render script needs the dev site running.
 */
export function assertDiagramsFresh() {
  const manifestPath = join(process.cwd(), 'public/diagrams/manifest.json')
  const manifest: Record<string, string> = existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, 'utf8'))
    : {}

  const expected = new Map<string, string>()
  for (const project of projects) {
    project.architectureDiagrams?.forEach((diagram, i) => {
      const hash = createHash('sha256').update(diagram.chart).digest('hex').slice(0, 16)
      expected.set(diagramKey(project.slug, i), hash)
    })
  }

  const diagramsDir = join(process.cwd(), 'public/diagrams')
  const stale = [...expected]
    .filter(([key, hash]) => manifest[key] !== hash || !existsSync(join(diagramsDir, `${key}.svg`)))
    .map(([key]) => key)
  const extra = Object.keys(manifest).filter((key) => !expected.has(key))

  if (stale.length > 0 || extra.length > 0) {
    const message =
      `Diagram SVGs are out of date (${[...stale, ...extra].join(', ')}). ` +
      'Start the site with `npm run dev`, then run `npm run diagrams`.'
    if (process.env.NODE_ENV === 'production') throw new Error(message)
    console.warn(message)
  }
}
