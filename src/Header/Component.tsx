import { HeaderClient } from './Component.client'
import React from 'react'

import type { Header } from '@/payload-types'

import { getVisas } from '@/entities/visa/visa.queries'
import { getCategories } from '@/entities/category/category.queries'

const visas = await getVisas()
const categories = await getCategories()

export async function Header() {
  return <HeaderClient data={visas.docs} categories={categories.docs} />
}
