import {defineField, defineType} from 'sanity'

export const fullWidthImage = defineType({
  name: 'fullWidthImage',
  title: 'Full Width Image',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare: ({title, media}) => ({
      title: 'Full Width Image',
      subtitle: title,
      media: media,
    }),
  },
})
