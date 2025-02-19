import { stegaClean } from "@sanity/client/stega";
import Image from "next/image";

import { ContainerMD } from "@/components/ContainerMD";
import { urlForImage } from "@/sanity/lib/utils";
interface FullWidthImageProps {
  title?: string;
  description?: string;
  image?: any;
  caption?: string;
}

export default function FullWidthImage({
  image,
  caption,
}: FullWidthImageProps) {
  return (
    <ContainerMD className="mx-auto my-2 flex flex-col items-center justify-center rounded-lg bg-gold-100 px-6 pt-6 pb-2 lg:px-12 lg:pt-12 lg:pb-8 dark:bg-gold-900">
      {image && (
        <div className="">
          <Image
            src={urlForImage(image)?.url() || ""}
            alt={stegaClean(image.alt || caption || "Full width image")}
            width={image.asset.metadata.dimensions.width || 800}
            height={image.asset.metadata.dimensions.height || 800}
            className="h-auto w-full rounded-lg"
          />
        </div>
      )}
      {caption && <p className="pt-4">{caption}</p>}
    </ContainerMD>
  );
}
