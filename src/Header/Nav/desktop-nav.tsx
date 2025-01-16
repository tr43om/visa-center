import { CallbackFormTrigger } from '@/entities/submission/ui/callback-form-trigger'
import { Category, Visa } from '@/payload-types'
import Link from 'next/link'
import { Logo } from '@/components/Logo/Logo'
import { NavigationMenu, NavigationMenuList } from '@/components/ui/navigation-menu'
import { AreaList } from './area-list'

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
            {categories.map((category) => (
              <AreaList key={category.id} category={category} navItems={data} />
            ))}
          </nav>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
