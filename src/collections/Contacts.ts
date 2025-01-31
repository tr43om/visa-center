import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'type',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'Тип контактных данных',
      required: true,
      defaultValue: 'whatsapp',
      options: [
        { label: 'Whatsapp', value: 'whatsapp' },
        { label: 'Email', value: 'email' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'Номер телефона', value: 'phone' },
        { label: 'Адрес', value: 'address' },
      ],
    },
    {
      name: 'manager',
      type: 'text',
      label: 'Менеджер:',
      admin: {
        condition: (_, siblingData) =>
          siblingData.type === 'phone' ||
          siblingData.type === 'email' ||
          siblingData.type === 'whatsapp',
      },
    },
    {
      name: 'text',
      type: 'text',
      required: true,
      admin: {
        components: { Field: '@/components/PayloadContactsComponent#PayloadContactsComponent' },
      },
      hooks: {
        afterChange: [
          (props) =>
            props.siblingData.type === 'whatsapp' ? `https://wa.me/${props.data}` : props.data,
        ],
      },
    },
  ],
}
