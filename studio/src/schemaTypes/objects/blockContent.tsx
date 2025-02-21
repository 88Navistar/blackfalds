import {defineArrayMember, defineType, defineField} from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 *
 * Learn more: https://www.sanity.io/docs/block-content
 */
export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      marks: {
        annotations: [
          {
            title: 'Citation',
            name: 'citation',
            type: 'object',
            fields: [
              {
                name: 'citation',
                type: 'reference',
                to: [{type: 'source'}],
              },
            ],
          },
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'linkType',
                title: 'Link Type',
                type: 'string',
                initialValue: 'href',
                options: {
                  list: [
                    {title: 'URL', value: 'href'},
                    {title: 'Page', value: 'staticpage'},
                    {title: 'Project', value: 'project'},
                    {title: 'Resources', value: 'resourcePage'},
                    {title: 'Email', value: 'mail'},
                  ],
                  layout: 'radio',
                },
              }),
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                hidden: ({parent}) => parent?.linkType !== 'href',
              }),
              defineField({
                name: 'staticpage',
                title: 'Page',
                type: 'string',
                options: {
                  list: [
                    {title: 'Home', value: '/'},
                    {title: 'About', value: '/about'},
                    {title: 'Contact', value: '/contact'},
                    {title: 'Projects', value: '/projects'},
                  ],
                },
                hidden: ({parent}) => parent?.linkType !== 'staticpage',
              }),
              defineField({
                name: 'project',
                title: 'Project',
                type: 'reference',
                to: [{type: 'post'}],
                hidden: ({parent}) => parent?.linkType !== 'project',
              }),
              defineField({
                name: 'resourcePage',
                title: 'Resources',
                type: 'reference',
                to: [{type: 'resourcePage'}],
                hidden: ({parent}) => parent?.linkType !== 'resourcePage',
              }),
              defineField({
                name: 'mail',
                title: 'Email',
                type: 'string',
                hidden: ({parent}) => parent?.linkType !== 'mail',
              }),
              defineField({
                name: 'openInNewTab',
                title: 'Open in new tab',
                type: 'boolean',
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),
  ],
})
