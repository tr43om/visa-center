import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
} from '@/components/ui/carousel'
import { Tilt } from '@/components/ui/tilt'
import type { Review, ReviewsBlock as ReviewsProps, Visa } from '@/payload-types'
import { cn } from '@/utilities'
import { RiStarFill } from '@remixicon/react'
import Image from 'next/image'
import Link from 'next/link'
import { rgbaToThumbHash } from 'thumbhash'
import { VideoReview } from './video-review'
import { TextReview } from './text-review'

export const Reviews: React.FC<
  ReviewsProps & {
    id?: string
  }
> = (props) => {
  const { reviews, introContent } = props
  const filteredSelectedReviews = (reviews || []).map((review) => {
    if (typeof review.value === 'object') return review.value
  }) as Review[]

  return (
    <section className="relative w-full  ">
      <Carousel className="container max-w-7xl">
        <header className="flex justify-between justify-self-start items-center mb-4 w-full">
          {introContent && (
            <RichText
              data={introContent}
              enableGutter={false}
              className="text-zinc-800 [&>p]:text-zinc-600 m-0  [&>h2]:m-0   [&>h2]:font-extrabold md:[&>h2]:text-3xl [&>h2]:text-xl space-y-2 md:[&>p]:text-xl"
            />
          )}
          <CarouselNavigation
            className=" gap-2 relative left-0 translate-y-0 w-fit hidden md:flex"
            classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
            alwaysShow
          />
        </header>
        <CarouselContent className=" gap-2 ">
          {filteredSelectedReviews.map((review) => {
            const visa = review.visa as unknown as Visa
            return (
              <CarouselItem
                key={review.id}
                className={cn(
                  'flex w-[300px] cursor-default h-[480px] items-start  relative  rounded-md group',
                  review.platform === '2gis' &&
                    'p-4 items-end border border-zinc-200 dark:border-zinc-800 pl-4 pt-4 pb-[90px] bg-slate-200',
                  review.platform === 'instagram' &&
                    'before:content before:inset-0 before:absolute before:opacity-40 before:bg-slate-600 before:z-10 ',
                )}
              >
                {review.platform === 'instagram' && <VideoReview review={review} visa={visa} />}
                {review.platform === '2gis' && <TextReview review={review} visa={visa} />}
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
