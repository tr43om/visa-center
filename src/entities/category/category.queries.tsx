import 'server-only'
import { getPayload } from 'payload'
import config from '@payload-config'

export const getCategories = async () => {
  const payload = await getPayload({ config })

  const categories = await payload.find({ collection: 'categories', draft: true })
  return categories
}
