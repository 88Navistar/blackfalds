import {defineType, defineField, defineArrayMember} from 'sanity'

export const source = defineType({
  name: 'source',
  title: 'Source',
  type: 'document',
  fields: [
    defineField({
      name: 'citationNumber',
      title: 'Citation Number',
      type: 'number',
      // validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publicationDetails',
      title: 'Publication Details',
      type: 'string',
      description: 'Publisher, location, year, etc.',
    }),
    // defineField({
    //   name: 'jsonld',
    //   title: 'JSON-LD',
    //   type: 'object',
    //   options: {collapsed: true},
    //   fields: [
    //     defineField({name: '@context', type: 'string', initialValue: 'https://schema.org'}),
    //     defineField({name: '@type', type: 'string', initialValue: 'Book'}),
    //     defineField({name: 'name', title: 'Book Title', type: 'string'}),
    //     defineField({name: 'author', title: 'Author', type: 'string'}),
    //     defineField({name: 'publisher', title: 'Publisher', type: 'string'}),
    //     defineField({name: 'datePublished', title: 'Publication Year', type: 'string'}),
    //   ],
    // }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author',
      number: 'citationNumber',
    },
    prepare(selection) {
      const {title, subtitle, number} = selection
      return {
        title: `[${number}] ${title}`,
        subtitle,
      }
    },
  },
})
