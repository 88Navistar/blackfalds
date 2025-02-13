import Image from "next/image";
import { PortableText } from "next-sanity";

// Define the types locally
export type ImageAlignment = "left" | "right";
export type ImageWidth = "small" | "medium" | "large";
export const IMAGE_WIDTH_CLASSES = {
  small: "w-1/4",
  medium: "w-1/2",
  large: "w-3/4",
} as const;

import CustomPortableText from "@/components/PortableText";
import { urlForImage } from "@/sanity/lib/utils";

export default function TextWrapImage({
  image,
  content,
  alignment,
  width,
}: TextWrapImageProps) {
  return (
    <div className="clearfix">
      <Image
        className={`float-${alignment} ${IMAGE_WIDTH_CLASSES[width]} m-4`}
        src={urlForImage(image)?.url() || ""}
        alt={image.alt}
        width={image.asset?.metadata?.dimensions?.width || 200}
        height={image.asset?.metadata?.dimensions?.height || 200}
      />
      <CustomPortableText value={content} />
    </div>
  );
}

interface TextWrapImageProps {
  image: any;
  content: any;
  alignment: ImageAlignment;
  width: ImageWidth;
}
