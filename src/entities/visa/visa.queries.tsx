import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'

export const getVisas = async () => {
  const payload = await getPayload({ config })

  const visas = await payload.find({ collection: 'visas', pagination: false })
  return visas
}

export const getPopularDestinations = async () => {
  const payload = await getPayload({ config })
  const visas = await payload.find({
    collection: 'visas',
    where: { isPopular: { equals: true } },
    pagination: false,
  })
  return visas
}
