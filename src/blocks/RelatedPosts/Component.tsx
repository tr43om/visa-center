import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Visa } from '@/payload-types'

export type RelatedVisasProps = {
  className?: string
  docs?: Visa[]
  introContent?: any
}

export const RelatedVisas: React.FC<RelatedVisasProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <></>
        })}
      </div>
    </div>
  )
}
