import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { GlobalProvider } from './global-provider'
import { getContacts } from '@/entities/contacts/contacts.queries'
import { getCategories } from '@/entities/category/category.queries'
import { getVisas } from '@/entities/visa/visa.queries'

export const Providers: React.FC<{
  children: React.ReactNode
}> = async ({ children }) => {
  const [contactsDocs, categoriesDocs, visasDocs] = await Promise.all([
    getContacts(),
    getCategories(),
    getVisas(),
  ])

  const values = {
    contacts: contactsDocs.docs,
    categories: categoriesDocs.docs,
    visas: visasDocs.docs,
  }

  return (
    <NuqsAdapter>
      <ThemeProvider>
        <GlobalProvider {...values}>
          <HeaderThemeProvider>{children}</HeaderThemeProvider>
        </GlobalProvider>
      </ThemeProvider>
    </NuqsAdapter>
  )
}
