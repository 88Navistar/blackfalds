import Image from "next/image";

import { ContainerMD } from "@/components/ContainerMD";
import { urlForImage } from "@/sanity/lib/utils";
import { height, width } from "@/sanity/lib/utils";
interface FullWidthImageProps {
  title?: string;
  description?: string;
  image?: any;
  caption?: string;
}

export default function FullWidthImage({
  title,
  description,
  image,
  caption,
}: FullWidthImageProps) {
  return (
    <ContainerMD className="mx-auto flex flex-col items-center justify-center py-12 lg:py-24">
      <div className="prose max-w-[70ch] text-lg xl:text-xl dark:prose-invert">
        {title && (
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-slate-700 dark:text-slate-300">{description}</p>
        )}
      </div>
      {image && (
        <div className="w-full">
          <Image
            src={urlForImage(image)?.url() || ""}
            alt={caption || title || "Full width image"}
            layout="responsive"
            // TODO: check if need to change query to get the correct dimensions
            width={image.asset?.metadata?.dimensions?.width || 800}
            height={image.asset?.metadata?.dimensions?.height || 800}
          />
        </div>
      )}
      {caption && <p className="">{caption}</p>}
    </ContainerMD>
  );
}
