import Image from "next/image";
import { stegaClean } from "next-sanity";

import ContainerBlock from "@/components/ContainerBlock";
import { BlockHeadingDark } from "@/components/Text";
import {
  Carousel,
  CarouselContent,
  CarouselCounter,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { SanityImageAsset } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/utils";

const CAROUSEL_SIZES = {
  one: "basis-full",
  two: "basis-full md:basis-1/2",
  three: "basis-full md:basis-1/2 lg:basis-1/3",
} as const;

// const IMAGE_SIZES = {
//   one: "h-[30rem] sm:h-[40rem] lg:h-[31.25rem] xl:h-[35rem]",
//   two: "h-[30rem] md:h-[22rem] lg:h-[30rem] xl:h-[35rem]",
//   three: "h-[30rem] md:h-[20rem] xl:h-[25rem]",
// } as const;

type CarouselSize = keyof typeof CAROUSEL_SIZES;
type SanityImage = {
  alt: string;
  asset: SanityImageAsset;
  images?: SanityImageAsset[];
};
interface Carousel1Props {
  title: string;
  description: string;
  size: CarouselSize;
  indicators: "none" | "dots" | "count";
  images?: SanityImage[];
}

export default function CarouselOne({ block }: { block: Carousel1Props }) {
  const {
    title,
    description,
    size = "one",
    indicators = "none",
    images,
  } = block;
  const stegaIndicators = stegaClean(indicators);

  return (
    <div className="my-8 md:my-16">
      <ContainerBlock className="bg-gold-100 dark:bg-gold-900">
        <BlockHeadingDark title={title} description={description} />
        {images && images.length > 0 && (
          <Carousel className="">
            <CarouselContent className="">
              {images.map((image, index) => {
                const width = image.asset?.metadata?.dimensions?.width || 1200;
                const height = image.asset?.metadata?.dimensions?.height || 800;
                const aspectRatio = `${width} / ${height}`;

                return (
                  <CarouselItem
                    key={`${index}-${image.alt}`}
                    className={CAROUSEL_SIZES[stegaClean(size)]}
                  >
                    {image && (
                      <div className="space-y-2">
                        <div
                          className={cn(
                            "relative mx-auto w-full overflow-hidden rounded-lg"
                          )}
                          style={{ aspectRatio }}
                        >
                          <Image
                            className="object-cover"
                            src={urlFor(image)?.url() || ""}
                            alt={image.alt || ""}
                            fill
                            placeholder="blur"
                            blurDataURL={image.asset?.metadata?.lqip || ""}
                            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                            quality={90}
                          />
                        </div>
                        {image.alt && (
                          <p className="prose-sm text-center prose-stone dark:prose-invert">
                            {image.alt}
                          </p>
                        )}
                      </div>
                    )}
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious
              variant="secondary"
              className="-left-3 md:-left-8 xl:-left-12"
            />
            <CarouselNext
              variant="secondary"
              className="-right-3 md:-right-8 xl:-right-12"
            />
            {stegaIndicators !== "none" && (
              <div className="flex w-full justify-center">
                {stegaIndicators === "dots" && <CarouselDots />}
                {stegaIndicators === "count" && <CarouselCounter />}
              </div>
            )}
          </Carousel>
        )}
      </ContainerBlock>
    </div>
  );
}
