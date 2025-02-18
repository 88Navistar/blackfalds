import {defineField, defineType} from 'sanity'

export const indigenousTranslationBlock = defineType({
  name: 'indigenousTranslationBlock',
  title: 'Indigenous Translations Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'translations',
      title: 'Translations',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'indigenousTranslation'}],
        },
      ],
    }),
  ],
})
