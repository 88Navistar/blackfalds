import {defineField, defineType} from 'sanity'

export const acknowledgement = defineType({
  name: 'acknowledgement',
  title: 'Acknowledgement',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
})
