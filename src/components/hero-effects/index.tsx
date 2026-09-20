'use client'

import type { ComponentType } from 'react'
import { useSearchParams } from 'next/navigation'
import { FiberLines } from './FiberLines'
import { FusionSplice } from './FusionSplice'

export type HeroEffectId = 'none' | 'fiber-lines' | 'fusion-splice'

/**
 * Which hero background effect is live. Flip this to switch options while
 * comparing them — every variant stays in the codebase either way.
 * Override per-visit without touching code via `?heroEffect=<id>` in the URL.
 */
export const ACTIVE_HERO_EFFECT: HeroEffectId = 'fusion-splice'

const effects: Record<HeroEffectId, ComponentType | null> = {
  none: null,
  'fiber-lines': FiberLines,
  'fusion-splice': FusionSplice,
}

export function HeroEffect() {
  const searchParams = useSearchParams()
  const override = searchParams.get('heroEffect')
  const activeId: HeroEffectId =
    override && override in effects ? (override as HeroEffectId) : ACTIVE_HERO_EFFECT

  const Effect = effects[activeId]
  return Effect ? <Effect /> : null
}
