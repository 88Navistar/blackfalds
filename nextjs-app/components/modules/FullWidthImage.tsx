import { stegaClean } from "@sanity/client/stega";
import Image from "next/image";

import { ContainerMD } from "@/components/ContainerMD";
import { urlForImage } from "@/sanity/lib/utils";
interface FullWidthImageProps {
  title?: string;
  description?: string;
  image?: any;
  caption?: string;
  alt?: string;
}

export default function FullWidthImage({
  image,
  caption,
  alt,
}: FullWidthImageProps) {
  //console.log("image.asset:", image.asset);

  return (
    <ContainerMD className="mx-auto flex flex-col items-center justify-center py-6 lg:py-12">
      {/* <div className="prose max-w-[70ch] text-lg xl:text-xl dark:prose-invert">
        {title && (
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-slate-700 dark:text-slate-300">{description}</p>
        )}
      </div> */}
      {image && (
        <div className="">
          <Image
            src={urlForImage(image)?.url() || ""}
            alt={stegaClean(alt || caption || "Full width image")}
            width={image.assetData.metadata.dimensions.width || 800}
            height={image.assetData.metadata.dimensions.height || 800}
            className="h-auto w-full"
          />
        </div>
      )}
      {caption && <p className="">{caption}</p>}
    </ContainerMD>
  );
}
