import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'

export const getVisas = async () => {
  const payload = await getPayload({ config })

  const visas = await payload.find({ collection: 'visas' })
  return visas
}
