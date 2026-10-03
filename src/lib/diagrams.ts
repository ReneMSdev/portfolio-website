// File name (without .svg) of a project's pre-rendered diagram in
// public/diagrams/. scripts/render-diagrams.mjs builds the same key.
export function diagramKey(slug: string, index: number) {
  return `${slug}-${index}`
}
