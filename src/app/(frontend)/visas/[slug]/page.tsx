import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache, Suspense } from 'react'

import type { Visa } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { VisaInfo } from '@/blocks/VisaInfo/Component'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { MainHero } from '@/heros/Main'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const visas = await payload.find({
    collection: 'visas',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = visas.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Visa({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  const homeDocs = await payload.find({
    collection: 'pages',
    where: { slug: { contains: 'home' } },
    limit: 1,
  })
  const layout = homeDocs.docs[0].layout.filter((l) => l.blockType !== 'archive')
  const url = '/visas/' + slug
  const visa = await queryVisaBySlug({ slug })

  if (!visa) return <PayloadRedirects url={url} />

  return (
    <Suspense>
      <article>
        {/* Allows redirects for valid pages too */}
        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}

        <MainHero visa={visa} />
        <VisaInfo visa={visa} />
        <RenderBlocks blocks={layout} />
      </article>
    </Suspense>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const visa = await queryVisaBySlug({ slug })

  return generateMeta({ doc: visa })
}

const queryVisaBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'visas',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
