import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },

  fields: [
    {
      type: 'select',
      label: 'Откуда отзыв',
      required: true,
      name: 'platform',
      options: [
        { label: 'Instagram', value: 'instagram' },
        { label: '2gis', value: '2gis' },
      ],
    },
    {
      name: 'visa',
      label: 'Услуга',
      type: 'relationship',
      relationTo: 'visas',

      required: true,
    },

    {
      name: 'video',
      type: 'upload',
      relationTo: 'videos',
      label: 'Видео отзыв',
      admin: {
        condition: (_, siblingData) => siblingData.platform === 'instagram',
      },
    },
    {
      name: 'text',
      label: 'Отзыв',
      type: 'textarea',

      admin: {
        condition: (_, siblingData) => siblingData.platform === '2gis',
      },
    },
    {
      name: 'reviewHref',
      label: 'Ссылка на отзыв',
      type: 'text',
      defaultValue: 'https://2gis.kz/almaty/firm/70000001069038260/tab/reviews',
    },
  ],
}
