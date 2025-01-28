import React from 'react'

import type { Page } from '@/payload-types'

import { LowImpactHero } from '@/heros/LowImpact'
import { MainHero } from './Main'

const heroes = {
  mainHero: MainHero,
  lowImpact: LowImpactHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
