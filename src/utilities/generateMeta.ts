import type { Metadata } from 'next'

import type { Media, Page, Visa, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

function isVisa(obj: any): obj is Visa {
  return obj
}

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Visa>
}): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title || ''

  return {
    description: doc?.meta?.description,
    keywords: [
      isVisa(doc) ? doc.label : 'визы',
      'Визовая поддержка',
      'Помощь с визой',
      'Шенген Алматы',
      'Оформление визы',
      'Консультация по визам',
      'Получение визы',
      'Туристическая виза',
      'Рабочая виза',
      'Бизнес виза',
      'Шенгенская виза',
      'Sunvisa',
      'Студенческая виза',
    ],
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
