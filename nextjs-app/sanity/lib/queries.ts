import { defineQuery } from "next-sanity";
export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  _type,
  _updatedAt,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage{
    ...,
    "asset": asset{
    _ref,
    _type,
    _type == 'reference' => @->{
      url,
          mimeType,
          metadata {
              lqip,
              dimensions {
                width,
                height,
                aspectRatio
              }
      }
    },
    
  }
  },
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
  "category": category->{
    name,
    slug
  },
  "featured": featured,
`;
export const citationReference = /* groq */ `
  _type == "citation" => {
    ...,
    citation-> {
      ...,
      _id,
      citationNumber,
      title
    }
  }
`;
const linkReference = /* groq */ `
  _type == "link" => {
    "resourcePage": resourcePage->slug.current,
    "project": post->slug.current,
    "href": href,
    "staticpage": staticpage,
    "mail": mail,
    "openInNewTab": openInNewTab
  }
`;

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`;
// For use with urlForImage when the _ref is needed for validation,
const imageWithMetadata = /* groq */ `
  ...,
  "asset": asset {
    _ref,
    _type,
    _type == 'reference' => @-> {
      url,
      mimeType,
      metadata {
        lqip,
        dimensions {
          width,
          height,
          aspectRatio
        }
      }
    }
  }
`;
export const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage"][0] {
    ...,
    title,
    description,
    "content": content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference},
            ${citationReference},
          }
        }
  }
`);
export const contactPageQuery = defineQuery(`
  *[_type == "contactPage"][0] {
    ...,
    title,
    description,
    "content": content[]{
      ...,
      markDefs[]{
        ...,
        ${linkReference},
        ${citationReference},
      }
    },
    image {
      ${imageWithMetadata}
    }
  }
`);
export const homePageSingletonQuery = defineQuery(`
  *[_type == "homePageSingleton"][0] {
    "hero": hero[0] {
      _type,
      hero {
        type,
        fullWidth {
          title,
          tagline,
          image {
            ${imageWithMetadata}
          }
        },
        halfWidth {
          title,
          tagline,
          image {
            ${imageWithMetadata}
          }
        },
        video {
          title,
          tagline,
          thumbnail {
            ${imageWithMetadata}
          }
        }
      }
    },
    "carouselOne": carouselOne {
      ...,
        _type,
        size,
        indicators,
        images[]{
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    },
    "historicalFacts": historicalFacts[]-> {
      _id,
      year,
      title,
      snippet
    }
  }
`);
//convert from page to resourcePage
export const getResourcePageQuery = defineQuery(`
  *[_type == 'resourcePage' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference},
            ${citationReference},
          }
        }
      },
      _type == "sourceGroup" => {
        ...,
        sources[]->{
          ...,
          _type == "source" => {
            ...,
          }
        }
      },
      _type == "indigenousTranslationBlock" => {
        _type,
        _key,
        heading,
        description,
        translations[]-> {
          _type,
          languageGroup {
            name,
            nativeName,
            meaning,
            translator
          },
          translations[] {
            english,
            indigenous
          }
        }
      },
    },
  }
`);

export const sitemapData = defineQuery(`
  *[
    _type == "resourcePage" || 
    _type == "post" || 
    _type == "aboutPage" ||
    _type == "contactPage" ||
    _type == "homePageSingleton" ||
    _type == "projectPage"
  ] | order(_type asc) {
    _type == "homePageSingleton" => {
      "slug": "",
      "_type": _type,
      "_updatedAt": _updatedAt
    },
    _type == "aboutPage" => {
      "slug": "about",
      "_type": _type,
      "_updatedAt": _updatedAt
    },
    _type == "contactPage" => {
      "slug": "contact",
      "_type": _type,
      "_updatedAt": _updatedAt
    },
    _type == "projectPage" => {
      "slug": "projects",
      "_type": _type,
      "_updatedAt": _updatedAt
    },
    _type in ["resourcePage", "post"] => {
      "slug": slug.current,
      "_type": _type,
      "_updatedAt": _updatedAt
    }
  }
`);
export const allBooksQuery = defineQuery(`
  *[_type == "books" && defined(slug.current == "all-books") ] {
    title,
    content[],
    "books": books[]->{
      ...,
      image{
        alt,
        "asset": asset{
          _ref,
          _type == 'reference' => @-> {
      url,
      metadata {
        dimensions {
          width,
          height,
          aspectRatio
        }
      }
    }
        }
      }
    }
  }
`);
export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`);
export const featuredPostsQuery = defineQuery(`
  *[_type == "post" && featured == true && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`);
export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);
export const muralMediaQuery = defineQuery(`
  *[
    _type == "post" && 
    defined(slug.current) && 
    _id != $skip &&
    category->slug.current in ["mural-media", "iron-ridge-mural"]
  ] {
    ${postFields}
  }
`);
export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    ${postFields}
    // Calculate everything in one step
    "bodyText": array::join([
      coalesce(pt::text(modules[_type == "moduleBlock"][].content[]), ""),
      coalesce(pt::text(modules[_type == "textWrapImage"][].content[]), "")
    ], " "),
  modules[]{
      ...,
      _type == "moduleBlock" => {
        _type,
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference},
            ${citationReference},
          }
        }
      },
      _type == "fullWidthImage" => {
        _type,
        caption,
        image{
          ${imageWithMetadata}
        },
      },
      _type == "textWrapImage" => {
        _type,
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference},
            ${citationReference},
          }
        },
        alignment,
        image{
          ${imageWithMetadata}
        },
      },
      _type == "carouselOne" => {
        ...,
        _type,
        size,
        indicators,
        images[]{
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },

      },
      }
      }
    
  
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);
//convert from page to resourcePage
export const resourcePagesSlugs = defineQuery(`
  *[_type == "resourcePage" && defined(slug.current)]
  {"slug": slug.current}
`);
