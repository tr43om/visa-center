import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const PopularDestinations: Block = {
  slug: 'popularDestinations',
  interfaceName: 'PopularDestinationsBlock',
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'all',
      required: true,
      options: [
        {
          label: 'Все популярные направления',
          value: 'all',
        },
        {
          label: 'Выборочно',
          value: 'selection',
        },
      ],
    },

    {
      name: 'destinations',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Направления',
      relationTo: ['visas'],
    },
  ],
}
