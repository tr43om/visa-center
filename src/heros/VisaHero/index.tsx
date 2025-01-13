import React from 'react'

import type { Page, Visa } from '@/payload-types'

import RichText from '@/components/RichText'
import { Feature } from './components/feature'
import cups_image from '@media/cups.webp'
import reviews_image from '@media/reviews.webp'
import suitcase_image from '@media/suitcase.webp'
import gis_image from '@media/2GIS.svg'
import hero_girl from '@media/hero-girl.webp'

import { Media } from '@/components/Media'
import Image from 'next/image'
import { RiStarFill } from '@remixicon/react'
import Link from 'next/link'
import { cn } from '@/utilities/cn'

type VisaHeroProps = { visa: Visa }

export const VisaHero = (data: VisaHeroProps) => {
  const visa = data.visa
  return (
    <div className="overflow-hidden relative container max-w-7xl rounded-md mt-4">
      <div className="   pt-[100px] pb-[40px] ">
        <div className="grid gap-8">
          <div className="max-w-[40rem] space-y-2">
            <h1 className="font-extrabold md:text-5xl text-4xl   text-white">
              Оформление визы <br /> в {visa.label}
            </h1>
            <p className="text-xl text-white/90">
              Оставьте заявку и получите варианты решения вашей задачи от визового специалиста{' '}
              {visa.label}
            </p>
          </div>

          <div className="grid gap-2 md:flex max-w-56 sm:max-w-80 md:max-w-none">
            <Link href="https://2gis.kz/almaty/firm/70000001069038260/tab/reviews" target="_blank">
              <Feature
                image={{
                  src: reviews_image,
                  alt: 'Преимущество нашего визового центра: высокая оценка',
                }}
                text={<Image src={gis_image} height={28} alt="Логотип 2гис" />}
                title={
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-semibold leading-none opacity-80">5.0</span>
                    <div className="flex items-center gap-1 z-10">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <RiStarFill key={`star-${i}`} className="text-amber-500  size-5" />
                        ))}
                    </div>
                  </div>
                }
              />
            </Link>
            <Feature
              image={{
                src: suitcase_image,
                alt: 'Преимущество нашего визового центра: опыт сотрудников',
              }}
              text=">5 лет"
              title="Опыт специалистов"
            />
            <Feature
              image={{
                src: cups_image,
                alt: 'Преимущество нашего визового центра: низкий шанс отказа',
              }}
              text=">99%"
              title="Одобрения"
            />
          </div>
        </div>
      </div>
      <Image
        alt="Довольный клиент нашего визового центра уже готова к путешествию. Довольная держит в руке паспорт и билеты "
        src={hero_girl}
        className="absolute z-20 bottom-8 -right-12 lg:-bottom-72 sm:-bottom-16  sm:w-[350px] lg:w-[600px]  before:content before:absolute
            before:inset-0
            before:bg-indigo-500
            before:z-10
            before:opacity-75"
        width={250}
      />
      {visa.content.cover && (
        <Media
          imgClassName={cn("-z-10 object-cover  opacity-25  before:content-['']")}
          fill
          className="before:absolute
            before:inset-0
            before:block
            before:bg-indigo-700
            before:-z-10
            before:opacity-65"
          priority
          resource={visa.content.cover}
        />
      )}
    </div>
  )
}
