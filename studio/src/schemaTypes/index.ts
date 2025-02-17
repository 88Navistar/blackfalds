import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {fullWidthImage} from './modules/fullWidthImage'
import {moduleBlock} from './modules/moduleBlock'
import {textWrapImage} from './modules/textWrapImage'
import {category} from './documents/category'
import {carouselOne} from './modules/CarouselOne'
import {acknowledgement} from './modules/acknowledgement'
import {resourcePage} from './documents/resourcePage'
import {source} from './objects/source'
import {sourceGroup} from './objects/sourceGroup'
import {citationMark} from './objects/citationMark'
// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  category,
  page,
  post,
  person,
  resourcePage,
  // Objects
  blockContent,
  citationMark,
  infoSection,
  callToAction,
  link,
  source,
  sourceGroup,
  // Modules
  fullWidthImage,
  moduleBlock,
  textWrapImage,
  carouselOne,
  acknowledgement,
]
