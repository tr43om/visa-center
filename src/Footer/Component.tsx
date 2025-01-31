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
import { RiInstagramFill, RiPhoneFill, RiWhatsappFill } from '@remixicon/react'
import { getContacts } from '@/entities/contacts/contacts.queries'
import { formatPhoneNumber } from '@/utilities/formatPhoneNumber'

export async function Footer() {
  const payloadVisas = await getVisas()
  const payloadCategories = await getCategories()
  const payloadContacts = await getContacts()
  const categories = payloadCategories.docs.reverse()
  const visas = payloadVisas.docs
  const contacts = payloadContacts.docs

  const instagram = contacts.find((contact) => contact.type === 'instagram')?.text
  const whatsapp = contacts.find((contact) => contact.type === 'whatsapp')?.text
  const phone_numbers = contacts.filter((contact) => contact.type === 'phone').reverse()

  return (
    <footer className="mt-auto border-t  border-border bg-indigo-950 dark:bg-card text-white pb-24 md:pb-0">
      <div className="container max-w-7xl pt-8 pb-4 gap-8 flex flex-col">
        <div className=" gap-12 flex flex-col md:flex-row ">
          <div className="space-y-6">
            <Link className="flex items-center w-full" href="/">
              <Logo className="w-[300px]" />
            </Link>
            <div className="space-y-2">
              <div className="space-y-1">
                <p className="text-sm">Получите бесплатную консультацию</p>
                {whatsapp && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="justify-between bg-white/15 text-white hover:bg-white/30 w-full px-3"
                    asChild
                  >
                    <Link href={`https://wa.me/${whatsapp}`}>
                      В Whatsapp <RiWhatsappFill />
                    </Link>
                  </Button>
                )}
              </div>
              <div className="w-full flex  items-center gap-2">
                <div className="w-full border-t border-white/50" />
                <p className="text-white/80 text-sm whitespace-nowrap">или по номеру телефона</p>
                <div className="w-full border-t border-white/50" />
              </div>
              {phone_numbers.map((tel) => {
                const formatterPhone = formatPhoneNumber(tel.text)
                return (
                  <Button
                    variant="secondary"
                    size="sm"
                    key={tel.id}
                    className="justify-between bg-white/15 text-white hover:bg-white/30 w-full px-3"
                    asChild
                  >
                    <Link href={`tel:${tel.text}`}>
                      {formatterPhone} <RiPhoneFill />
                    </Link>
                  </Button>
                )
              })}
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
                    <ul className="flex gap-2  items-center flex-wrap">
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
          {instagram && (
            <Button
              variant="secondary"
              size="sm"
              className="justify-between bg-white/15 text-white hover:bg-white/30 w-full px-3 md:w-fit"
              asChild
            >
              <Link href={instagram}>
                Больше о нас в Instagram <RiInstagramFill />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </footer>
  )
}
