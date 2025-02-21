import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { createDataAttribute, CreateDataAttributeProps } from "next-sanity";
import { Image } from "sanity";

import { Link } from "@/sanity.types";
import { dataset, projectId, studioUrl } from "@/sanity/lib/api";
const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});
// Must have _ref asset{_ref}
export const urlForImage = (source: Image) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto("format").fit("max");
};
// Use this one to avoid _ref condition
export const urlFor = (source: SanityImageSource) => {
  const builder = createImageUrlBuilder({ projectId, dataset });
  const imageBuilderTwo = builder.image(source);

  // Check if it's an object with asset property that has mimeType
  const sourceObj = source as { asset?: { mimeType?: string } };
  const isSvg = sourceObj?.asset?.mimeType === "image/svg+xml";

  if (isSvg) {
    return imageBuilderTwo;
  }

  return imageBuilderTwo.format("webp").fit("crop");
};
export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) return;
  const url = urlForImage(image)?.width(1200).height(627).fit("crop").url();
  if (!url) return;
  return { url, alt: image?.alt as string, width, height };
}

// Temporary debug - remove after
import type { Link } from "@/sanity.types";
type LinkTypes = Link["linkType"];
// This will show us the exact union type when hovering
const _debug: LinkTypes = "href";

// Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.
export function linkResolver(link: Link | undefined) {
  if (!link) return null;

  if (!link.linkType && link.href) {
    link.linkType = "href";
  }

  switch (link.linkType) {
    case "href":
      return link.href || null;
    case "staticpage":
      return link.staticpage || null;
    case "resourcePage":
      if (link?.resourcePage && typeof link.resourcePage === "string") {
        return `/resources/${link.resourcePage}`;
      }
      break;
    case "project":
      if (link?.post && typeof link.post === "string") {
        return `/projects/${link.post}`;
      }
      break;
    case "mail":
      if (link?.mail && typeof link.mail === "string") {
        return `mailto:${link.mail}`;
      }
      break;
    default:
      return null;
  }
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, "id" | "type" | "path">>;

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config);
}
