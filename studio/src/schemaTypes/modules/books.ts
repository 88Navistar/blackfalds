import {defineField, defineType} from 'sanity'

export const books = defineType({
  name: 'books',
  title: 'Books',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'This slug will be used generate an id for the books',
      type: 'slug',
    }),
    defineField({
      name: 'content',
      title: 'Description or Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'books',
      title: 'Books',
      type: 'array',
      of: [{type: 'reference', to: {type: 'book'}}],
    }),
  ],
})
