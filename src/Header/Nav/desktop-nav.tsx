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
import { Media } from '@/components/Media'
import { ScrollArea } from '@/components/ui/scroll-area'
import { normalizeCountForm } from '@/utilities/normalizeCountForm'

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

      <NavigationMenu className="relative z-50 ">
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
                  <NavigationMenuContent className="grid bg-slate-100 gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <NavigationMenuLink asChild>
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
                    </NavigationMenuLink>
                    <ScrollArea className="h-52">
                      <ul>
                        {filteredNavItems.map((visa) => (
                          <ListItem
                            key={visa.id}
                            href={visa.href}
                            title={visa.label}
                            icon={visa.imgUrl}
                          />
                        ))}
                      </ul>
                    </ScrollArea>
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
