// Renders every architecture diagram in src/data/projects.ts to a static SVG
// in public/diagrams/, so the site ships finished SVGs instead of Mermaid.
//
// Usage: start the site (`npm run dev`), then `npm run diagrams`.
// Set DIAGRAMS_URL to render against a different address.
//
// Mermaid sizes every label by measuring text in the DOM, so the render runs
// inside the real site page: same fonts, same global CSS, same Mermaid
// version, same theme as the old in-browser render. Needs Google Chrome
// installed (driven through playwright-core).

import { createHash } from 'node:crypto'
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'
import { projects } from '../src/data/projects.ts'
import { diagramKey } from '../src/lib/diagrams.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public/diagrams')
const siteUrl = process.env.DIAGRAMS_URL ?? 'http://localhost:3000'

// Same config the site used to pass to mermaid.initialize at runtime.
const mermaidConfig = {
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    background: '#17171a',
    primaryColor: '#1f1f23',
    primaryTextColor: '#f2f2f0',
    primaryBorderColor: '#6ee7b7',
    lineColor: '#6ee7b7',
    secondaryColor: '#17171a',
    tertiaryColor: '#17171a',
    textColor: '#f2f2f0',
    actorBorder: '#6ee7b7',
    actorBkg: '#1f1f23',
    actorTextColor: '#f2f2f0',
    signalColor: '#b9b9bd',
    signalTextColor: '#f2f2f0',
    labelBoxBorderColor: '#6ee7b7',
    labelBoxBkgColor: '#1f1f23',
    labelTextColor: '#f2f2f0',
    loopTextColor: '#f2f2f0',
    noteBorderColor: '#27272a',
    noteBkgColor: '#1f1f23',
    noteTextColor: '#b9b9bd',
    fontFamily: 'var(--font-space-mono), monospace',
  },
}

// Must match the hash in src/lib/check-diagrams.ts
const sha = (text) => createHash('sha256').update(text).digest('hex').slice(0, 16)

const diagrams = projects.flatMap((project) =>
  (project.architectureDiagrams ?? []).map((diagram, i) => ({
    key: diagramKey(project.slug, i),
    chart: diagram.chart,
  }))
)

try {
  await fetch(siteUrl)
} catch {
  console.error(`Can't reach ${siteUrl}. Start the site first with \`npm run dev\`.`)
  process.exit(1)
}

const browser = await chromium.launch({ channel: 'chrome' })
const page = await browser.newPage()
await page.goto(siteUrl, { waitUntil: 'networkidle' })
await page.addScriptTag({ path: join(root, 'node_modules/mermaid/dist/mermaid.min.js') })
await page.evaluate(async (config) => {
  await document.fonts.ready
  window.mermaid.initialize(config)
}, mermaidConfig)

await rm(outDir, { recursive: true, force: true })
await mkdir(outDir, { recursive: true })

const manifest = {}
for (const { key, chart } of diagrams) {
  const svg = await page.evaluate(
    async ({ id, chart }) => (await window.mermaid.render(id, chart)).svg,
    { id: `diagram-${key}`, chart }
  )
  await writeFile(join(outDir, `${key}.svg`), svg)
  manifest[key] = sha(chart)
  console.log(`rendered ${key}.svg`)
}

await writeFile(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
await browser.close()
console.log(`${diagrams.length} diagrams written to public/diagrams/ (${(await readdir(outDir)).length - 1} files)`)
