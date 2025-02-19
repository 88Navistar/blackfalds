import {defineField, defineType} from 'sanity'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero Block',
  type: 'object',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Type',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: 'type',
          title: 'Select Hero Type',
          type: 'string',
          options: {
            list: [
              {title: 'Full Width', value: 'fullWidth'},
              {title: 'Half Width', value: 'halfWidth'},
              {title: 'Video Hero', value: 'video'},
            ],
          },
        }),
        // Conditional fields based on type
        defineField({
          name: 'fullWidth',
          type: 'object',
          hidden: ({parent}) => parent?.type !== 'fullWidth',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'tagline',
              title: 'Tagline',
              type: 'text',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt',
                  type: 'string',
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'tagline',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Hero',
                subtitle: subtitle || 'Hero',
              }
            },
          },
        }),
        defineField({
          name: 'halfWidth',
          type: 'object',
          hidden: ({parent}) => parent?.type !== 'halfWidth',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'tagline',
              title: 'Tagline',
              type: 'text',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'video',
          type: 'object',
          hidden: ({parent}) => parent?.type !== 'video',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'tagline',
              title: 'Tagline',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      type: 'hero.type',
      // Full Width Hero
      fullWidthTitle: 'hero.fullWidth.title',
      fullWidthTagline: 'hero.fullWidth.tagline',
      fullWidthImage: 'hero.fullWidth.image',
      // Half Width Hero
      halfWidthTitle: 'hero.halfWidth.title',
      halfWidthTagline: 'hero.halfWidth.tagline',
      halfWidthImage: 'hero.halfWidth.image',
      // Video Hero
      videoTitle: 'hero.video.title',
      videoTagline: 'hero.video.tagline',
      videoThumbnail: 'hero.video.thumbnail',
    },
    prepare({
      type,
      fullWidthTitle,
      fullWidthTagline,
      fullWidthImage,
      halfWidthTitle,
      halfWidthTagline,
      halfWidthImage,
      videoTitle,
      videoTagline,
      videoThumbnail,
    }) {
      const typeLabels = {
        fullWidth: 'Full Width Hero',
        halfWidth: 'Half Width Hero',
        video: 'Video Hero',
      }

      // Get the appropriate content based on type
      const content = type
        ? {
            fullWidth: {
              title: fullWidthTitle,
              tagline: fullWidthTagline,
              media: fullWidthImage,
            },
            halfWidth: {
              title: halfWidthTitle,
              tagline: halfWidthTagline,
              media: halfWidthImage,
            },
            video: {
              title: videoTitle,
              tagline: videoTagline,
              media: videoThumbnail,
            },
          }[type as keyof typeof typeLabels]
        : {}

      return {
        title: type ? typeLabels[type as keyof typeof typeLabels] : 'Hero',
        subtitle: content.title || content.tagline || 'Untitled',
        media: content.media || undefined,
      }
    },
  },
})
