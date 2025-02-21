import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

/**
 * Link schema object. This link object lets the user first select the type of link and then
 * then enter the URL, page reference, or post reference - depending on the type selected.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      initialValue: 'url',
      options: {
        list: [
          {title: 'URL', value: 'href'},
          {title: 'Page', value: 'staticpage'},
          {title: 'Resources', value: 'resourcePage'},
          {title: 'Email', value: 'mail'},
          {title: 'Project', value: 'post'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'href',
      validation: (Rule) =>
        // Custom validation to ensure URL is provided if the link type is 'href'
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'href' && !value) {
            return 'URL is required when Link Type is URL'
          }
          return true
        }),
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
        layout: 'radio',
      },
    }),
    defineField({
      name: 'resourcePage',
      title: 'Resource Page',
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
      name: 'project',
      title: 'Project',
      type: 'reference',
      to: [{type: 'post'}],
      hidden: ({parent}) => parent?.linkType !== 'project',
      validation: (Rule) =>
        // Custom validation to ensure post reference is provided if the link type is 'post'
        Rule.custom((value, context: any) => {
          if (context.parent?.linkType === 'post' && !value) {
            return 'Project reference is required when Link Type is Project'
          }
          return true
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
