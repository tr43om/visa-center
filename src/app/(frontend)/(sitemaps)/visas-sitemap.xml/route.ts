import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getVisasSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://sunvisa.kz'

    const results = await payload.find({
      collection: 'visas',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((visa) => Boolean(visa?.slug))
          .map((visa) => ({
            loc: `${SITE_URL}/visas/${visa?.slug}`,
            lastmod: visa.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  },
  ['visas-sitemap'],
  {
    tags: ['visas-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getVisasSitemap()

  return getServerSideSitemap(sitemap)
}
