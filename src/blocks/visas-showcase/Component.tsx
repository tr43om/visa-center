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

export const VisasShowcase = ({ docs, categories }: VisasShowcaseProps) => {
  const [tab, setTab] = useState<string>(categories[0].title)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Оформляем визы в более чем {docs.length} стран мира</CardTitle>
        <CardDescription>
          Просто выберите нужную страну из списка, чтобы подробно ознакомиться с информацией
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.title}>
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => {
            const visas = docs.filter((doc) => tab === (doc.category as Category).title) || []
            return (
              <TabsContent
                key={category.id}
                value={category.title}
                className="mt-4 md:flex    grid gap-2"
              >
                {category.cover && (
                  <Link
                    className="flex md:h-80   md:min-w-60 md:max-w-96 h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md  relative overflow-hidden before:block before:absolute before:inset-0  before:z-10 before:bg-gradient-to-t before:from-zinc-900/90 "
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
                <div className="md:h-80 grid gap-2 xl:grid-cols-3   lg:grid-cols-2 w-full overflow-y-auto">
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
