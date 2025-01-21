import 'server-only'
import { getPayload, Where } from 'payload'
import config from '@payload-config'

export const getCategories = async () => {
  const payload = await getPayload({ config })

  const categories = await payload.find({ collection: 'categories', sort: 'id' })
  return categories
}

// export const getCategoryByTitle = async (title: string) => {
//   const payload = await getPayload({ config })

//   const category = await payload.find({
//     collection: 'categories',
//     where: { title: { equals: title } },
//     limit: 1,
//   })
//   return category
// }
