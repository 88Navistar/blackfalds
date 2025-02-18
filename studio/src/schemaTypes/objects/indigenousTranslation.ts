import {defineField, defineType} from 'sanity'

export const indigenousTranslation = defineType({
  name: 'indigenousTranslation',
  title: 'Indigenous Translation',
  type: 'document',
  fields: [
    defineField({
      name: 'languageGroup',
      title: 'Language Group',
      type: 'object',
      fields: [
        {name: 'name', type: 'string', title: 'Name'},
        {name: 'nativeName', type: 'string', title: 'Native Name'},
        {name: 'meaning', type: 'string', title: 'Meaning'},
        {name: 'translator', type: 'string', title: 'Provided by'},
      ],
    }),
    defineField({
      name: 'translations',
      title: 'Translations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'english', type: 'string', title: 'English'},
            {name: 'indigenous', type: 'string', title: 'Indigenous Translation'},
          ],
        },
      ],
    }),
  ],
})
