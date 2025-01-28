import React from 'react'

import type { Media as MediaType, Page, Visa } from '@/payload-types'

import Image from 'next/image'
import { RiStarFill } from '@remixicon/react'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import { getServerSideURL } from '@/utilities/getURL'
import { VisaIntro } from './visa-intro'
import { HomeIntro } from './home-intro'
import { Media } from '@/components/Media'
import { Feature } from './components/feature'

type MainHeroProps = { visa?: Visa; media?: Page['hero']['media'] }

export const MainHero = ({ media, visa }: MainHeroProps) => {
  const resource = visa ? visa.cover : media
  return (
    <div className="overflow-hidden  relative container max-w-7xl rounded-md mt-4 ">
      <div className="   pt-[100px] pb-[40px] ">
        <div className="grid gap-8 mt-2 md:mt-6">
          {visa ? <VisaIntro visa={visa} /> : <HomeIntro />}

          <div className="grid gap-2 md:flex max-w-56 sm:max-w-80 md:max-w-none">
            <Link href="https://2gis.kz/almaty/firm/70000001069038260/tab/reviews" target="_blank">
              <Feature
                image={{
                  src: `${getServerSideURL()}/api/media/file/feature1.webp`,
                  alt: 'Преимущество нашего визового центра: высокая оценка',
                  width: 180,
                }}
                text={
                  <Image
                    src={`${getServerSideURL()}/api/media/file/2GIS-full.svg`}
                    height={38}
                    width={140}
                    alt="Логотип 2гис"
                  />
                }
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
                src: `${getServerSideURL()}/api/media/file/feature2.webp`,
                alt: 'Преимущество нашего визового центра: опыт сотрудников',
                width: 180,
              }}
              text=">5 лет"
              title="Опыт специалистов"
            />
            <Feature
              image={{
                src: `${getServerSideURL()}/api/media/file/feature3.webp`,
                alt: 'Преимущество нашего визового центра: низкий шанс отказа',
                width: 180,
              }}
              text=">97%"
              title="Одобрения"
            />
          </div>
        </div>
      </div>
      <div className="absolute z-[15] bottom-0 -right-12 lg:-bottom-72 sm:-bottom-16 ">
        <Image
          alt="Довольный клиент нашего визового центра уже готова к путешествию. Довольная держит в руке паспорт и билеты "
          src={`${getServerSideURL()}/api/media/file/hero-girl.webp`}
          className=" w-[285px]  sm:w-[350px] lg:w-[600px]  bg-blend-lighten
                "
          quality={100}
          priority={true}
          height={800}
          width={600}
        />
      </div>
      {resource && (
        <Media
          imgClassName={cn("-z-10 object-cover  opacity-20  before:content-['']")}
          fill
          className="before:absolute
            before:inset-0
            before:block
            before:bg-indigo-600
            before:-z-10
            before:opacity-80"
          priority
          resource={resource}
        />
      )}
    </div>
  )
}
