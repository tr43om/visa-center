import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const visas = await payload.find({ collection: 'visas', draft: true })

export async function Header() {
  console.log({ visas })
  const headerData: Header = await getCachedGlobal('header', 1)()
  return <HeaderClient data={visas.docs} />
}
