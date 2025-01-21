import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
} from '@/components/ui/carousel'
import { Tilt } from '@/components/ui/tilt'
import { getPopularDestinations } from '@/entities/visa/visa.queries'
import type { PopularDestinationsBlock as PopularDestinationsProps, Visa } from '@/payload-types'
import { getCountryDeclension } from '@/utilities/getCountryDeclension'
import Image from 'next/image'
import Link from 'next/link'

export const PopularDestinations: React.FC<
  PopularDestinationsProps & {
    id?: string
  }
> = async (props) => {
  const { destinations, introContent } = props
  const allPopularDestinations = await getPopularDestinations()
  const filteredSelectedVisas =
    props.populateBy === 'all'
      ? allPopularDestinations.docs
      : ((destinations || []).map((visa) => {
          if (typeof visa.value === 'object') return visa.value
        }) as Visa[])

  return (
    <section className="relative w-full ">
      <Carousel className="container max-w-7xl">
        <header className="flex justify-between justify-self-start items-center mb-4 w-full">
          {introContent ? (
            <RichText
              data={introContent}
              enableGutter={false}
              className="text-zinc-800 [&>p]:text-zinc-600 m-0  [&>h2]:m-0   [&>h2]:font-extrabold md:[&>h2]:text-3xl [&>h2]:text-xl space-y-2 md:[&>p]:text-xl"
            />
          ) : (
            <div className="grid">
              <h2 className="font-extrabold text-xl md:text-3xl text-zinc-700">
                Популярные направления
              </h2>
              <p className="md:text-xl text-zinc-600">
                На основе собранной статистики по нашим клиентам
              </p>
            </div>
          )}
          <CarouselNavigation
            className=" gap-2 relative left-0 translate-y-0 w-fit hidden md:flex"
            classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
            alwaysShow
          />
        </header>
        <CarouselContent className=" gap-2 ">
          {filteredSelectedVisas.map((visa) => (
            <Tilt
              className="w-full  cursor-pointer active:cursor-grabbing"
              key={visa.id}
              isRevese={true}
              rotationFactor={8}
            >
              <CarouselItem
                key={visa.id}
                className="flex w-[300px]  h-96 relative bg-slate-400 rounded-sm p-4 items-end border border-zinc-200 dark:border-zinc-800 pl-4"
              >
                <Link href={visa.href} className="" draggable={false}>
                  <h3 className="text-white font-bold z-20 text-xl relative">{visa.label}</h3>
                  <Image
                    src={visa.imgUrl.trimEnd()}
                    alt={`Флаг страны: ${visa.label}`}
                    className="absolute top-4 left-4 z-20"
                    width={34}
                    height={34}
                  />
                  {visa.cover && (
                    <Media
                      resource={visa.cover}
                      alt="Обложка для визы"
                      className="before:block absolute inset-0 before:absolute before:inset-0  before:z-10 before:bg-gradient-to-t before:from-zinc-900/90"
                      imgClassName="object-cover"
                      fill
                    />
                  )}
                </Link>
              </CarouselItem>
            </Tilt>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
