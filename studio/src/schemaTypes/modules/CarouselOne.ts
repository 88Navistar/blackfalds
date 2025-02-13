import {defineField, defineType} from 'sanity'
//import {ImagesIcon} from '@sanity/icons'

export const carouselOne = defineType({
  name: 'carouselOne',
  type: 'object',
  title: 'Carousel One',
  //icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'size',
      type: 'string',
      title: 'Size',
      options: {
        list: [
          {title: 'One', value: 'one'},
          {title: 'Two', value: 'two'},
          {title: 'Three', value: 'three'},
        ],
        layout: 'radio',
      },
      initialValue: 'one',
    }),
    defineField({
      name: 'indicators',
      type: 'string',
      title: 'Slide Indicators',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Dots', value: 'dots'},
          {title: 'Count', value: 'count'},
        ],
        layout: 'radio',
      },
      initialValue: 'none',
      description: 'Choose how to indicate carousel progress and position',
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'images.0.alt',
    },
    prepare({title}) {
      return {
        title: 'Carousel',
        subtitle: title,
      }
    },
  },
})
