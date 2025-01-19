import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'

import type { Media as MediaType, WhyUsBlock as WhyUsBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '@/components/Media'
import { Block } from 'payload'

export const WhyUsBlock: React.FC<
  WhyUsBlockProps & {
    id?: string
  }
> = (props) => {
  const { apart, together, introContent } = props

  const columns = [apart, together]
  return (
    <div className="container max-w-7xl my-8">
      <header className="mb-4">
        {introContent && (
          <RichText
            data={introContent}
            enableGutter={false}
            className="text-zinc-800 [&>p]:text-zinc-600 m-0  [&>h2]:m-0   [&>h2]:font-extrabold md:[&>h2]:text-3xl [&>h2]:text-xl space-y-2 md:[&>p]:text-xl"
          />
        )}
      </header>
      <div className="grid lg:grid-cols-2  gap-4 ">
        {columns.map((col, i) => {
          return (
            <div
              className={cn(`col-auto relative py-6 px-4 rounded-sm  overflow-hidden`)}
              key={`whyUs-${i}`}
            >
              {col?.richText && (
                <RichText
                  data={col.richText}
                  enableGutter={false}
                  className={cn(
                    'space-y-4 md:[&>h3]:text-2xl [&>h3]:text-xl  text-sm md:text-base [&>h3]:font-bold [&>ul]:list-none [&>ul]:p-0 [&>ul]:text-zinc-600',
                    i === 1 && '[&>ul]:text-white [&>h3]:text-white',
                  )}
                />
              )}
              {col?.cover && (
                <Media
                  resource={col.cover}
                  alt="Обложка"
                  imgClassName="-z-10 object-cover opacity-15  before:content-['']"
                  className={cn(
                    'before:absolute before:inset-0 before:block before:bg-slate-200 before:-z-10 before:opacity-90',
                    i === 1 && 'before:bg-indigo-500',
                  )}
                  priority
                  fill
                />
              )}
              {col?.hero && (
                <Media
                  resource={col.hero}
                  alt="Клиент расстроен, потому что не обратился к нам за оформлением визы"
                  imgClassName={cn(
                    'z-10 absolute w-[175px] md:w-[208px] -right-[55px] md:-right-[30px] -bottom-[25px] ',
                  )}
                  priority
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
