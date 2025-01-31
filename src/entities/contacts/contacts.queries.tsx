import { getPayload, Where } from 'payload'
import config from '@payload-config'
import { cache } from 'react'

export const getContacts = cache(async () => {
  const payload = await getPayload({ config })

  const contacts = await payload.find({ collection: 'contacts' })
  return contacts
})
