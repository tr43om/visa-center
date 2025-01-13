'use client'

import React from 'react'

import type { Category, Header as HeaderType, Visa } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu'
import { NavItem } from './types'
import { AreaList } from './area-list'
import { useMediaQuery } from '@/hooks/use-media-query'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { RiMenu3Line } from '@remixicon/react'

type HeaderNavProps = {
  navItems: Visa[]
  categories: Category[]
}

const desktop = '(min-width: 768px)'

export const HeaderNav: React.FC<{ data: HeaderNavProps }> = ({ data }) => {
  const isDesktop = useMediaQuery(desktop)
  const navItems = data?.navItems || []
  const categories = data?.categories || []

  return (
    <>
      {isDesktop ? (
        <NavigationMenu>
          <NavigationMenuList asChild>
            <nav className="flex gap-3 items-center">
              {categories.map((category) => (
                <AreaList key={category.id} category={category} navItems={navItems} />
              ))}
            </nav>
          </NavigationMenuList>
        </NavigationMenu>
      ) : (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" className="mr-4">
              <RiMenu3Line className="text-white" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>Sun Visa Travel</DrawerTitle>
              <DrawerDescription>Пару кликов до мечты</DrawerDescription>
            </DrawerHeader>
            <ScrollArea className="p-4 max-h-[60vh] overflow-auto">
              <nav className="grid md:flex gap-3 items-center">
                {categories.map((category) => (
                  <AreaList key={category.id} category={category} navItems={navItems} />
                ))}
              </nav>
            </ScrollArea>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}
