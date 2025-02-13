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

// Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.
export function linkResolver(link: Link | undefined) {
  if (!link) return null;

  // If linkType is not set but href is, lets set linkType to "href".  This comes into play when pasting links into the portable text editor because a link type is not assumed.
  if (!link.linkType && link.href) {
    link.linkType = "href";
  }

  switch (link.linkType) {
    case "href":
      return link.href || null;
    case "page":
      if (link?.page && typeof link.page === "string") {
        return `/${link.page}`;
      }
      break;
    case "post":
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
