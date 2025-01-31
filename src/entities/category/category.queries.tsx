import { getPayload, Where } from 'payload'
import config from '@payload-config'
import { cache } from 'react'

export const getCategories = cache(async () => {
  const payload = await getPayload({ config })

  const categories = await payload.find({ collection: 'categories', sort: 'id' })
  return categories
})

export const getCategoryById = cache(async (id: string) => {
  const payload = await getPayload({ config })

  const category = await payload.find({
    collection: 'categories',
    where: { id: { equals: id } },
    limit: 1,
  })
  return category
})
