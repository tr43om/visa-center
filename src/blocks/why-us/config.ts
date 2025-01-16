import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ChecklistFeature,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures, defaultFeatures }) => {
        return [
          ...rootFeatures,
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          ChecklistFeature(),
          OrderedListFeature(),
          UnorderedListFeature(),
        ]
      },
    }),
    label: false,
  },
  { name: 'cover', type: 'upload', relationTo: 'media' },
  { name: 'hero', type: 'upload', relationTo: 'media' },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
]

export const WhyUs: Block = {
  slug: 'whyUs',
  interfaceName: 'WhyUsBlock',
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
      type: 'tabs',
      tabs: [
        { name: 'apart', label: 'Без нас', fields: columnFields },
        { name: 'together', label: 'С нами', fields: columnFields },
      ],
    },
  ],
}
