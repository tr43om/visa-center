'use client'
import { CallbackFormTrigger } from '@/entities/submission/ui/callback-form-trigger'
import { Category, Visa } from '@/payload-types'
import {
  Drawer,
  DrawerTrigger,
  DrawerTitle,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
} from '@/components/ui/drawer'
import { RiMenu3Line } from '@remixicon/react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getVisas } from '@/entities/visa/visa.queries'
import { getCategories } from '@/entities/category/category.queries'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { normalizeCountForm } from '@/utilities/normalizeCountForm'
import { useGlobalContext } from '@/providers/global-provider'
import { useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { cn } from '@/utilities'
import Image from 'next/image'

export const BottomNav = () => {
  const { categories, visas } = useGlobalContext()
  const [open, setOpen] = useState(false)
  const { slug } = useParams()

  return (
    <div className="py-4 w-full  md:hidden bg-white/50 backdrop-blur-2xl z-50   fixed  px-4  bottom-0 left-0 flex gap-2   ">
      <CallbackFormTrigger className=" w-full bg-zinc-800/80" />
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="default" className="bg-zinc-800/80 h-auto">
            <RiMenu3Line className="text-white" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80vh] ">
          <DrawerHeader>
            <DrawerTitle>Sun Visa Travel</DrawerTitle>
            <DrawerDescription>Пару кликов до мечты</DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="p-4 max-h-[60vh] overflow-scroll ">
            <nav className="grid md:flex gap-3 items-center">
              {categories.map((category) => {
                const filteredNavItems = visas.filter(
                  (item) => (item.category as Category).title === category.title,
                )
                return (
                  <ul className="grid gap-3 p-4 relative" key={category.id}>
                    <li className=" min-h-10 -order-2">
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md relative overflow-hidden before:block before:absolute before:inset-0  before:z-10 before:bg-gradient-to-t before:from-zinc-900/30 "
                        href="/"
                      >
                        {category.cover && (
                          <Media
                            resource={category.cover}
                            fill
                            imgClassName="absolute inset-0 w-full h-full w-[300px] object-cover"
                          />
                        )}
                        <div className="text-white z-20">
                          <div className="mb-2 mt-4 text-2xl font-bold">{category.title}</div>
                          <p className="text-sm leading-tight ">
                            Делаем визы в {filteredNavItems.length}{' '}
                            {normalizeCountForm(filteredNavItems.length, 'country')}
                          </p>
                        </div>
                      </Link>
                    </li>
                    {filteredNavItems.map((visa) => {
                      const isActive = slug === visa.slug
                      return (
                        <li
                          key={visa.id}
                          className={cn(
                            isActive && 'bg-zinc-100 rounded-sm -order-1 relative',
                            isActive &&
                              'before:w-[3px] before:h-5 before:absolute before:block before:-translate-y-1/2 before:top-1/2 before:bg-indigo-500 before:left-0 before:rounded-e-lg',
                          )}
                        >
                          <Link
                            href={visa.href}
                            className="flex justify-between items-center select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            onClick={() => setOpen(false)}
                          >
                            <div className="text-sm font-medium leading-none">{visa.label}</div>
                            <Image
                              src={visa.imgUrl.trimEnd()}
                              alt={`Флаг страны: ${visa.label}`}
                              className="border border-black/10"
                              width={24}
                              height={16}
                            />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )
              })}
            </nav>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
