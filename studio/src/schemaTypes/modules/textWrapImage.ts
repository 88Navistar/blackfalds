import {defineField, defineType} from 'sanity'
import {IMAGE_ALIGN} from '../shared/imageVariants'
import {IMAGE_WIDTH} from '../shared/imageVariants'

export const textWrapImage = defineType({
  name: 'textWrapImage',
  title: 'Text Wrap Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility.',
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: IMAGE_ALIGN,
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'string',
      options: {
        list: IMAGE_WIDTH,
        layout: 'radio',
      },
      initialValue: 'medium',
    }),
  ],
  preview: {
    select: {
      media: 'image',
    },
    prepare({media}) {
      return {
        title: 'Text Wrap Image',
        media,
      }
    },
  },
})
