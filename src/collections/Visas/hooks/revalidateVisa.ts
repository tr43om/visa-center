import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Visa } from '../../../payload-types'

export const revalidateVisa: CollectionAfterChangeHook<Visa> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/visas/${doc.slug}`

      payload.logger.info(`Revalidating visa at path: ${path}`)

      revalidatePath(path)
      revalidateTag('visas-sitemap')
    }

    // If the visa was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/visas/${previousDoc.slug}`

      payload.logger.info(`Revalidating old visa at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('visas-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Visa> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/visas/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('visas-sitemap')
  }

  return doc
}
