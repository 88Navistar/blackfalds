import { stegaClean } from "@sanity/client/stega";
import Image from "next/image";

import CustomPortableText from "@/components/PortableText";
import { urlForImage } from "@/sanity/lib/utils";

// Define the types locally
export type ImageAlignment = "left" | "right";
export type ImageWidth = "small" | "medium" | "large";
export const IMAGE_WIDTH_CLASSES = {
  small: "w-1/4",
  medium: "w-1/2",
  large: "w-3/4",
} as const;

export default function TextWrapImage({
  image,
  content,
  alignment,
  width,
}: TextWrapImageProps) {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="relative mx-auto max-w-3xl">
        <Image
          className={stegaClean(
            `float-${alignment} ${IMAGE_WIDTH_CLASSES[width]} mx-4 mt-2 mb-4`
          )}
          src={urlForImage(image)?.url() || ""}
          alt={stegaClean(image.alt || "Historical Image")}
          width={image.asset?.metadata?.dimensions?.width || 200}
          height={image.asset?.metadata?.dimensions?.height || 200}
        />
        <div className="px-2 text-balance sm:px-4">
          <CustomPortableText value={content} />
        </div>
      </div>
    </div>
  );
}

interface TextWrapImageProps {
  image: any;
  content: any;
  alignment: ImageAlignment;
  width: ImageWidth;
}
