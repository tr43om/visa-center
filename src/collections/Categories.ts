import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'consularFee',
      label: 'Консульский сбор (€)',
      required: true,
      type: 'number',
    },
    {
      name: 'serviceFee',
      label: 'Cервисный сбор (₸)',
      required: true,
      type: 'number',
    },
    {
      name: 'visaFee',
      label: 'Стоимость услуги (₸)',
      required: true,
      type: 'number',
    },
    {
      name: 'totalPrice',
      label: 'Итоговая стоимость (₸)',
      required: true,
      type: 'number',
    },
    {
      name: 'processingTime',
      label: 'Срок оформления (в днях)',
      required: true,
      type: 'number',
    },
    { name: 'cover', type: 'upload', relationTo: 'media', label: 'Обложка' },
  ],
}
