import {CogIcon, HomeIcon, MarkerIcon, MoonIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = [
  'settings',
  'assist.instruction.context',
  'homePageSingleton',
  'aboutPage',
  'contactPage',
]

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('settings').documentId('siteSettings'))
        .icon(CogIcon),
      S.listItem()
        .title('Home Page')
        .child(S.document().schemaType('homePageSingleton').documentId('homePageSingleton'))
        .icon(HomeIcon),
      S.listItem()
        .title('About Page')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage'))
        .icon(MarkerIcon),
      S.listItem()
        .title('Contact Page')
        .child(S.document().schemaType('contactPage').documentId('contactPage'))
        .icon(MoonIcon),
      ...S.documentTypeListItems()
        // Remove the "assist.instruction.context" and "settings" content  from the list of content types
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId())),
      // Settings Singleton in order to view/edit the one particular document for Settings.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
    ])
