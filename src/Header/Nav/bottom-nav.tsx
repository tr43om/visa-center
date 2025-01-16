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
import { AreaList } from './area-list'
import { getVisas } from '@/entities/visa/visa.queries'
import { getCategories } from '@/entities/category/category.queries'

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
              {categories.docs.map((category) => (
                <AreaList key={category.id} category={category} navItems={visas.docs} />
              ))}
            </nav>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
