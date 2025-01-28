import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'SunVisa: визовый центр',
  images: [
    {
      url: `${getServerSideURL()}/api/media/file/schengen.webp`,
    },
  ],
  siteName: 'SunVisa',
  title: 'SunVisa: визовый центр',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
