import {defineField, defineType} from 'sanity'

export const moduleBlock = defineType({
  name: 'moduleBlock',
  title: 'Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      description: 'Editor Use Only: Describe the content of the module',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      description: 'Editor Use Only: Describe the content of the module',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({title, subtitle}) {
      return {
        title: title,
        subtitle: subtitle,
      }
    },
  },
})
