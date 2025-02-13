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
      className="rounded-lg shadow-md transition-shadow hover:shadow-lg"
      fill={true}
      alt={stegaClean(source?.alt) || ""}
      src={
        urlForImage(source)
          ?.height(200)
          ?.width(300)
          ?.auto("format")
          ?.url() as string
      }
      sizes="(max-width: 768px) 100vw, 300px"
      priority={priority}
    />
  ) : (
    <div className="bg-slate-50" style={{ paddingTop: "100%" }} />
  );

  return <div className="relative aspect-video">{image}</div>;
}
