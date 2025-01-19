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

export const BottomNav = async () => {
  const visas = await getVisas()
  const categories = await getCategories()
  return (
    <div className="py-4 w-full  md:hidden bg-white/50 backdrop-blur-2xl z-50   fixed  container  bottom-0 left-0 flex gap-2   ">
      <CallbackFormTrigger className=" w-full bg-zinc-800/80" />
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="default" className="bg-zinc-800/80 h-auto">
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
              {categories.docs.map((category) => {
                const filteredNavItems = visas.docs.filter(
                  (item) => (item.category as Category).title === category.title,
                )
                return (
                  <ul className="grid gap-3 p-4 " key={category.id}>
                    <li className=" min-h-10">
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md relative overflow-hidden before:block before:absolute before:inset-0  before:z-10 before:bg-gradient-to-t before:from-zinc-900/30 "
                        href="/"
                      >
                        {category.cover && (
                          <Media
                            resource={category.cover}
                            fill
                            imgClassName="absolute inset-0 w-full h-full w-[300px]"
                          />
                        )}
                        <div className="text-white z-20">
                          <div className="mb-2 mt-4 text-2xl font-bold">{category.title}</div>
                          <p className="text-sm leading-tight ">
                            Делаем визы в {filteredNavItems.length} стран
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
                )
              })}
            </nav>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
