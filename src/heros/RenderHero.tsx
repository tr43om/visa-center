import React from 'react'

import type { Page } from '@/payload-types'

import { LowImpactHero } from '@/heros/LowImpact'
import { HomeHero } from './HomeHero'
import { VisaHero } from './VisaHero'

const heroes = {
  homeHero: HomeHero,
  visaHero: VisaHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
