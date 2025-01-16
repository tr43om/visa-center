'use client'

import { Media } from '@/components/Media'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Category, Visa } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type VisasShowcaseProps = {
  docs: Visa[]
  categories: Category[]
}

const getCategoryCount = (docs: Visa[], category: Category) =>
  docs.filter((doc) => category.title === (doc.category as Category).title).length

export const VisasShowcase = ({ docs, categories }: VisasShowcaseProps) => {
  const sortedCategories = categories.sort(
    (a, b) => getCategoryCount(docs, b) - getCategoryCount(docs, a),
  )
  const [tab, setTab] = useState<string>(sortedCategories[0].title)

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className='text-zinc-800 font-extrabold md:text-3xl text-xl space-y-2 "'>
          Оформляем визы в более чем {docs.length} стран мира
        </CardTitle>
        <CardDescription className="text-zinc-600 md:text-xl">
          Просто выберите нужную страну из списка, чтобы подробно ознакомиться с информацией
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="px-4 mb-4">
            {sortedCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.title}
                className="text-xl group flex gap-2 items-center"
              >
                {category.title}{' '}
                <div className="text-sm px-3 border rounded-[5px]">
                  {getCategoryCount(docs, category)}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          {sortedCategories.map((category) => {
            const visas = docs.filter((doc) => tab === (doc.category as Category).title) || []
            return (
              <TabsContent
                key={category.id}
                value={category.title}
                className="md:flex px-4    grid gap-2"
              >
                {category.cover && (
                  <Link
                    className="flex md:h-96   md:min-w-60 md:max-w-72 h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md  relative overflow-hidden before:block before:absolute before:inset-0  before:z-10 before:bg-gradient-to-t before:from-zinc-900/90 "
                    href="/"
                  >
                    <Media
                      resource={category.cover}
                      alt="Обложка для меню виз"
                      imgClassName="object-cover"
                      fill
                    />
                    <div className="text-white z-20">
                      <div className="mb-2 mt-4 text-2xl font-bold">{category.title}</div>
                      <p className="text-sm leading-tight ">Делаем визы в {visas.length} стран</p>
                    </div>
                  </Link>
                )}
                <div className="md:h-96 grid gap-2 xl:grid-cols-3   lg:grid-cols-2 w-full overflow-y-auto">
                  {' '}
                  {visas.map((visa) => (
                    <Link
                      key={visa.id}
                      href={visa.href}
                      className="bg-slate-200/60 min-h-16 row-auto max-h-60 h-full grow flex min-w-56  text-slate-600 font-semibold relative  items-center p-3 overflow-hidden rounded-sm"
                    >
                      {visa.label}
                      <Image
                        src={visa.imgUrl.trimEnd()}
                        alt={`Флаг ${visa.label}`}
                        width={60}
                        height={50}
                        className="absolute -right-2 -bottom-2 rounded-sm"
                      />
                    </Link>
                  ))}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </CardContent>
    </Card>
  )
}
