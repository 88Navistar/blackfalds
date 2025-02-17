import {defineType} from 'sanity'

import {defineField} from 'sanity'

export const sourceGroup = defineType({
  name: 'sourceGroup',
  title: 'Source Group',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Group Title',
      type: 'string',
      description: 'A title for the group of sources',
    }),
    defineField({
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'source'}]}],
      description: 'The sources that belong to this group',
    }),
  ],
})
