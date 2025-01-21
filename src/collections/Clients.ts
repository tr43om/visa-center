import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Имя',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      label: 'Номер телефона',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      label: 'Текст заявки',
      type: 'text',
    },
    {
      name: 'visa',
      label: 'Направление',
      type: 'text',
    },
  ],
}
