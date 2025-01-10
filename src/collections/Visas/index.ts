import { CollectionConfig } from 'payload'
import { PayloadCountrySelect } from '@/components/PayloadCountrySelect'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { slugField } from '@/fields/slug'
import { revalidateVisa } from './hooks/revalidateVisa'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Visas: CollectionConfig = {
  slug: 'visas',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['name', 'image', 'slug'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'visas',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'visas',
        req,
      }),
  },
  defaultPopulate: {
    slug: true,
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'cover',
      label: 'Обложка',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'value',
      label: 'Выберите страну',
      type: 'text',
      admin: {
        components: { Field: '@/components/PayloadCountrySelect/index.tsx#PayloadCountrySelect' },
      },
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
      label: false,
    },

    {
      name: 'area',
      label: 'Регион',
      type: 'radio',
      options: [
        { label: 'Шенген', value: 'schengen' },
        { label: 'Азия', value: 'asia' },
        { label: 'Другие', value: 'other' },
      ],
      defaultValue: 'other',
      required: true,
    },
    { name: 'imagePosition', type: 'number', label: 'Положение обложки' },

    {
      name: 'types',
      label: 'Типы виз',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Тип визы',
          options: [
            { label: 'Рабочая виза', value: 'employment' },
            { label: 'Туристическая виза', value: 'tourism' },
            { label: 'Бизнес виза', value: 'business' },
          ],
          required: true,
        },
        {
          name: 'price',
          label: 'Цена за оформление (₸)',
          type: 'number',
          required: true,
        },
        {
          name: 'consular_fee',
          label: 'Консульский сбор (€)',
          defaultValue: 80,
          type: 'number',
        },
        {
          name: 'processing_time',
          label: 'Срок оформления (в днях)',
          type: 'number',
          required: true,
        },
        {
          name: 'rejection_chance',
          label: 'Шанс отказа',
          defaultValue: '<1%',
          type: 'text',
          required: true,
        },
      ],
      minRows: 1,
      maxRows: 10,
    },

    {
      type: 'collapsible',
      label: 'Meta',

      fields: [
        {
          name: 'label',
          label: 'Название страны',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
        {
          name: 'imgUrl',
          type: 'text',
          required: true,
        },
      ],
    },
    ...slugField('value'),
  ],
  hooks: {
    afterChange: [revalidateVisa],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}
