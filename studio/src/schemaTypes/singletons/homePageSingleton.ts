import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'
export const homePageSingleton = defineType({
  name: 'homePageSingleton',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'heroOne',
    }),
    defineField({
      name: 'historicalFacts',
      title: 'Historical Facts',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'historicalFact'}]}],
    }),
  ],
  preview: {
    select: {
      title: 'hero.title',
      subtitle: 'hero.subtitle',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Home Page',
        subtitle: subtitle || 'Home Page',
      }
    },
  },
})
