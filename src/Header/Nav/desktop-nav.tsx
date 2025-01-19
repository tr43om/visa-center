import { CallbackFormTrigger } from '@/entities/submission/ui/callback-form-trigger'
import { Category, Visa } from '@/payload-types'
import Link from 'next/link'
import { Logo } from '@/components/Logo/Logo'
import {
  ListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { AreaList } from './area-list'
import { Media } from '@/components/Media'

interface DesktopNavProps {
  data: Visa[]
  categories: Category[]
}

export const DesktopNav = ({ categories, data }: DesktopNavProps) => {
  return (
    <div className="py-8  w-full hidden md:flex           gap-4 ">
      <Link href="/">
        <Logo loading="eager" priority="high" />
      </Link>

      <NavigationMenu>
        <NavigationMenuList asChild>
          <nav className="flex gap-3 items-center">
            {categories.map((category) => {
              const filteredNavItems = data.filter(
                (item) => (item.category as Category).title === category.title,
              )
              return (
                <NavigationMenuItem key={category.id}>
                  <NavigationMenuTrigger className=" text-white bg-transparent hover:bg-white/20 hover:text-white">
                    {category.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3 min-h-80">
                        <NavigationMenuLink asChild>
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
                        </NavigationMenuLink>
                      </li>
                      {filteredNavItems.map((visa) => (
                        <ListItem key={visa.id} href={visa.href} title={visa.label}></ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            })}
          </nav>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
