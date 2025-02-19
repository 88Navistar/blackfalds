import { stegaClean } from "@sanity/client/stega";
import { Image } from "next-sanity/image";

import { urlForImage } from "@/sanity/lib/utils";

interface PostsImageProps {
  image: any;
  priority?: boolean;
}

export default function PostsImage(props: PostsImageProps) {
  const { image: source, priority } = props;
  const image = source?.asset?._ref ? (
    <Image
      className="mx-auto shadow-md transition-shadow hover:shadow-lg"
      alt={stegaClean(source?.alt) || ""}
      src={urlForImage(source)?.url() as string}
      width={source?.asset?.metadata?.dimensions?.width || 300}
      height={source?.asset?.metadata?.dimensions?.height || 200}
      sizes="(max-width: 768px) 100vw, 300px"
      priority={priority}
    />
  ) : (
    <div className="bg-slate-50" style={{ paddingTop: "100%" }} />
  );

  return <div className="relative">{image}</div>;
}
