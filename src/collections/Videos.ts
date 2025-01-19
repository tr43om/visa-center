import type { CollectionConfig } from 'payload'

import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Videos: CollectionConfig = {
  slug: 'videos',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [{ name: 'text', label: 'Название', type: 'text' }],
  upload: {
    staticDir: path.resolve(dirname, '../videos'),
    mimeTypes: ['video/*'],
  },
}
