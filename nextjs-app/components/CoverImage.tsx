import { stegaClean } from "@sanity/client/stega";
import { Image } from "next-sanity/image";

import { ContainerMD } from "@/components/ContainerMD";
import { urlForImage } from "@/sanity/lib/utils";
import { cn } from "@/lib/utils";

interface CoverImageProps {
  image: any;
  priority?: boolean;
}

export default function CoverImage(props: CoverImageProps) {
  const { image: source, priority } = props;
  const aspectRatio = source?.assetData?.metadata?.dimensions?.aspectRatio;

  const image = source?.asset?._ref ? (
    <Image
      className="rounded-lg shadow-md transition-shadow"
      alt={stegaClean(source?.alt) || ""}
      src={urlForImage(source)?.auto("format").url() as string}
      width={source?.assetData?.metadata?.dimensions?.width || 1280}
      height={source?.assetData?.metadata?.dimensions?.height || 800}
      sizes="100vw"
      priority={priority}
    />
  ) : (
    <div className="bg-slate-50" style={{ paddingTop: "100%" }} />
  );

  return (
    <ContainerMD>
      <div className="relative">{image}</div>
    </ContainerMD>
  );
}
