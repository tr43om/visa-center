import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateDescription, GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Visa } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { getCountryDeclension } from '@/utilities/getCountryDeclension'

function isVisa(obj: any): obj is Visa {
  return obj
}

const generateTitle: GenerateTitle<Visa | Page> = ({ doc }) => {
  if (isVisa(doc)) {
    return `Sun Visa Travel: Виза в ${getCountryDeclension(doc.label, 'vi')} за кратчайшие сроки!`
  }
  return doc?.slug
    ? `${doc.slug} | визовый центр Sun Visa Travel `
    : 'Визовый центр Sun Visa Travel'
}

const generateDescription: GenerateDescription<Visa | Page> = ({ doc }) => {
  if (isVisa(doc)) {
    return `Оформите визу в ${getCountryDeclension(doc.label, 'vi')} легко и быстро с Sun Visa Travel! Профессиональная помощь в оформлении документов и сопровождение на всех этапах.`
  }
  return doc?.slug
    ? `${doc.slug} | Оформляйте визу легко и быстро с Sun Visa Travel! Профессиональная помощь в оформлении документов и сопровождение на всех этапах.`
    : 'Оформляйте визу легко и быстро с Sun Visa Travel! Профессиональная помощь в оформлении документов и сопровождение на всех этапах.'
}

const generateURL: GenerateURL<Visa | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'visas'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
  }),
  seoPlugin({
    generateTitle,
    generateURL,
    generateDescription,
    collections: ['visas', 'pages'],
    uploadsCollection: 'media',
  }),
  // formBuilderPlugin({
  //   fields: {
  //     payment: false,
  //   },
  //   formOverrides: {
  //     fields: ({ defaultFields }) => {
  //       return defaultFields.map((field) => {
  //         if ('name' in field && field.name === 'confirmationMessage') {
  //           return {
  //             ...field,
  //             editor: lexicalEditor({
  //               features: ({ rootFeatures }) => {
  //                 return [
  //                   ...rootFeatures,
  //                   FixedToolbarFeature(),
  //                   HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
  //                 ]
  //               },
  //             }),
  //           }
  //         }
  //         return field
  //       })
  //     },
  //   },
  // }),
  searchPlugin({
    collections: ['visas'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
]
