import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { Field } from 'payload'

export const metaFields: Field = {
  type: 'collapsible',
  label: 'СЕО',
  fields: [
    OverviewField({
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
      imagePath: 'meta.image',
    }),
    MetaTitleField({
      hasGenerateFn: true,
    }),
    MetaImageField({
      relationTo: 'media',
    }),

    MetaDescriptionField({}),
    PreviewField({
      // if the `generateUrl` function is configured
      hasGenerateFn: true,

      // field paths to match the target field for data
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
    }),
  ],
}
