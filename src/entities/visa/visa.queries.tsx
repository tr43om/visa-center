import { getPayload } from 'payload'
import config from '@payload-config'
import { cache } from 'react'

export const getVisas = cache(async () => {
  const payload = await getPayload({ config })

  const visas = await payload.find({ collection: 'visas', pagination: false })
  return visas
})

export const getPopularDestinations = cache(async () => {
  const payload = await getPayload({ config })
  const visas = await payload.find({
    collection: 'visas',
    where: { isPopular: { equals: true } },
    pagination: false,
  })
  return visas
})
