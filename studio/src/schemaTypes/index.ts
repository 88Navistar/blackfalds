import {person} from './documents/person'
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
import {indigenousTranslation} from './objects/indigenousTranslation'
import {indigenousTranslationBlock} from './objects/indigenousTranslationBlock'
import {homePageSingleton} from './singletons/homePageSingleton'
import {historicalFact} from './objects/historicalFact'
import {heroBlock} from './modules/heroBlock'
import {aboutPage} from './singletons/aboutPage'
import {contactPage} from './singletons/contactPage'
// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  aboutPage,
  contactPage,
  settings,
  homePageSingleton,
  // Documents
  category,
  post,
  person,
  resourcePage,
  // Objects
  blockContent,
  citationMark,
  heroBlock,
  historicalFact,
  indigenousTranslation,
  indigenousTranslationBlock,
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
