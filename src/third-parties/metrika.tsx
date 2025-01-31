'use client'

import Router from 'next/router'

import React, { useCallback, useEffect } from 'react'
import ym, { YMInitializer } from 'react-yandex-metrika'

const analyticsEnabled = process.env.NODE_ENV === 'production'

const Metrika = () => {
  const hit = useCallback((url: string) => {
    if (analyticsEnabled) {
      ym('hit', url)
    } else {
      console.log(`%c[YandexMetrika](HIT)`, `color: orange`, url)
    }
  }, [])

  useEffect(() => {
    hit(window.location.pathname + window.location.search)
    Router.events.on('routeChangeComplete', (url: string) => hit(url))
  }, [hit])

  if (!analyticsEnabled) return null

  return (
    <YMInitializer
      accounts={[Number(process.env.NEXT_PUBLIC_ANALYTICS_ID)]}
      options={{
        defer: true,
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      }}
      version="2"
    />
  )
}

export { Metrika }
