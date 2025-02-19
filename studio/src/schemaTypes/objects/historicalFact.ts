import {defineType, defineField} from 'sanity'

export const historicalFact = defineType({
  name: 'historicalFact',
  title: 'Historical Fact',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(1800).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'snippet',
      title: 'Snippet',
      type: 'text',
      description: 'A brief historical fact or story.',
    }),
  ],
})
