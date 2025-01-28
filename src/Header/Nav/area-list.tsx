'use client'

import {
  ListItem,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { NavigationMenuItem } from '@/components/ui/navigation-menu'
import { Category, Visa } from '@/payload-types'
import Image from 'next/image'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Media } from '@/components/Media'
import { normalizeCountForm } from '@/utilities/normalizeCountForm'

type AreaListProps = {
  navItems: Visa[]
  category: Category
}

const desktop = '(min-width: 768px)'

export const AreaList = ({ navItems, category }: AreaListProps) => {
  const isDesktop = useMediaQuery(desktop)
  const title = category.title
  const cover = category.cover
  const filteredNavItems = navItems.filter(
    (item) => (item.category as Category).title === category.title,
  )

  return (
    <>
      {isDesktop ? (
        <NavigationMenuItem>
          <NavigationMenuTrigger className=" text-white bg-transparent hover:bg-white/20 hover:text-white">
            {title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3 min-h-80">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md relative overflow-hidden before:block before:absolute before:inset-0  before:z-10 before:bg-gradient-to-t before:from-zinc-900/30 "
                    href="/"
                  >
                    {cover && (
                      <Media
                        resource={cover}
                        fill
                        imgClassName="absolute inset-0 w-full h-full w-[300px]"
                      />
                    )}
                    <div className="text-white z-20">
                      <div className="mb-2 mt-4 text-2xl font-bold">{title}</div>
                      <p className="text-sm leading-tight ">
                        Делаем визы в {filteredNavItems.length}{' '}
                        {normalizeCountForm(filteredNavItems.length, 'country')}
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              {filteredNavItems.map((visa) => (
                <ListItem key={visa.id} href={visa.href} title={visa.label}></ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      ) : (
        <>
          <ul className="grid gap-3 p-4 ">
            <li className=" min-h-10">
              <Link
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md relative overflow-hidden before:block before:absolute before:inset-0  before:z-10 before:bg-gradient-to-t before:from-zinc-900/30 "
                href="/"
              >
                {cover && (
                  <Media
                    resource={cover}
                    fill
                    imgClassName="absolute inset-0 w-full h-full w-[300px]"
                  />
                )}
                <div className="text-white z-20">
                  <div className="mb-2 mt-4 text-2xl font-bold">{title}</div>
                  <p className="text-sm leading-tight ">
                    Делаем визы в {filteredNavItems.length}{' '}
                    {normalizeCountForm(filteredNavItems.length, 'country')}
                  </p>
                </div>
              </Link>
            </li>
            {filteredNavItems.map((visa) => (
              <li key={visa.id}>
                <Link
                  href={visa.href}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">{visa.label}</div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
