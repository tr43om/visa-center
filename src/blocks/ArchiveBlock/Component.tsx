import type { Visa, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import { VisasShowcase } from './visas-showcase'
import { getCategories } from '@/entities/category/category.queries'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const payload = await getPayload({ config: configPromise })

  const allCategories = await getCategories()

  const limit = limitFromProps || 3

  let visas: Visa[] = []

  if (populateBy === 'collection') {
    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedVisas = await payload.find({
      collection: 'visas',

      draft: true,
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    visas = fetchedVisas.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedVisas = selectedDocs.map((visa) => {
        if (typeof visa.value === 'object') return visa.value
      }) as Visa[]

      visas = filteredSelectedVisas
    }
  }

  return (
    <section className="container max-w-7xl -my-12 z-20 relative">
      <VisasShowcase docs={visas} categories={allCategories.docs} />
    </section>
  )
}
