import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Category, Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { getVisas } from '@/entities/visa/visa.queries'
import { getCategories } from '@/entities/category/category.queries'
import { Button } from '@/components/ui/button'
import { RiInstagramFill, RiWhatsappFill } from '@remixicon/react'

export async function Footer() {
  const payloadVisas = await getVisas()
  const payloadCategories = await getCategories()
  const categories = payloadCategories.docs.reverse()
  const visas = payloadVisas.docs

  return (
    <footer className="mt-auto border-t  border-border bg-indigo-950 dark:bg-card text-white pb-24 md:pb-0">
      <div className="container max-w-7xl pt-8 pb-4 gap-8 flex flex-col">
        <div className=" gap-12 flex flex-col md:flex-row ">
          <div className="space-y-6">
            <Link className="flex items-center w-full" href="/">
              <Logo className="w-[300px] md:w-[480px]" />
            </Link>
            <div className="space-y-2">
              <div className="space-y-1">
                <p className="text-sm">Получите бесплатную консультацию</p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="justify-between bg-white/15 text-white hover:bg-white/30 w-full px-3"
                  asChild
                >
                  <Link href={`https://wa.me/77028438123`}>
                    В Whatsapp <RiWhatsappFill />
                  </Link>
                </Button>
              </div>
              <div className="w-full flex  items-center gap-2">
                <div className="w-full border-t border-white/50" />
                <p className="text-white/80 text-sm whitespace-nowrap">или по номеру телефона</p>
                <div className="w-full border-t border-white/50" />
              </div>
              <a href={`tel:+77768787306`} className="text-white block font-semibold">
                +7 776 878 7306
              </a>
              <a href={`tel:+77028438123`} className="text-white block font-semibold">
                +7 702 843 8123
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start md:flex-row gap-4 ">
            <nav className="flex flex-col md:flex-row gap-4 ">
              {categories.map((category) => {
                const filteredVisas =
                  visas.filter((visa) => (visa.category as Category).id === category.id) || []
                return (
                  <div key={category.id}>
                    <h3 className="text-sm text-white font-extrabold uppercase mb-4">
                      {category.title}
                    </h3>
                    <ul className="flex gap-2 max-h-48 items-center flex-wrap">
                      {filteredVisas.map((visa) => (
                        <li key={visa.id} className="text-white bg-white/10 px-2 py-1">
                          <Link href={visa.href}>{visa.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </nav>
          </div>
        </div>
        <div className=" grid md:flex items-center gap-4 md:justify-between">
          <Link href="/privacy" className="underline">
            Политика конфиденциальности
          </Link>
          <Button
            variant="secondary"
            size="sm"
            className="justify-between bg-white/15 text-white hover:bg-white/30 w-full px-3 md:w-fit"
            asChild
          >
            <Link href={`https://www.instagram.com/sun__visa_travel?igsh=MWl0aHB6ZzJsam1laA==`}>
              Больше о нас в Instagram <RiInstagramFill />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  )
}
