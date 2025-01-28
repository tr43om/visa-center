'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Category, Header, Visa } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { BottomNav } from './Nav/bottom-nav'
import { DesktopNav } from './Nav/desktop-nav'
import { CallbackFormTrigger } from '@/entities/submission/ui/callback-form-trigger'

interface HeaderClientProps {
  data: Visa[]
  categories: Category[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, categories }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])
  return (
    <header
      className="left-0  z-20 -mt-[100px] translate-y-[124px] dark:bg-zinc-900          "
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="max-w-7xl container ">
        <Link href="/" className="md:hidden ">
          <Logo loading="eager" priority="high" />
        </Link>
        <DesktopNav categories={categories} data={data} />
      </div>
    </header>
  )
}
