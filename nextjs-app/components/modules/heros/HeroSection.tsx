import type { HomePageSingletonQueryResult } from "@/sanity.types";
import Image from "next/image";

// TODO: Add type for hero
export default function HeroSection({ hero }: any) {
  if (!hero?.hero?.type) {
    return null;
  }

  switch (hero.hero.type) {
    case "fullWidth":
      const fullWidthData = hero.hero.fullWidth;
      if (!fullWidthData) return null;

      return (
        <div className="relative">
          {fullWidthData.image?.asset && (
            <Image
              src={fullWidthData.image.asset.url || ""}
              alt={fullWidthData.image.alt || "Blackfalds 1880"}
              className="mt-8 w-full rounded-sm shadow-lg md:mt-16"
              width={
                fullWidthData.image.asset.metadata?.dimensions?.width || 1800
              }
              height={
                fullWidthData.image.asset.metadata?.dimensions?.height || 704
              }
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-x-50 top-2 flex flex-col items-center justify-center text-center whitespace-nowrap lg:top-10">
            <h2 className="xs:text-fluid-lg font-headings text-fluid-base font-bold text-stone-900 drop-shadow-lg sm:text-fluid-2xl lg:text-fluid-3xl">
              {fullWidthData.title}
            </h2>
            <h2 className="font-headings text-fluid-lg font-bold text-stone-700 drop-shadow-lg sm:text-fluid-xl lg:text-fluid-3xl">
              {fullWidthData.tagline}
            </h2>
          </div>
        </div>
      );

    case "halfWidth":
      return (
        // Half width hero component
        <div>Half width hero coming soon...</div>
      );

    case "video":
      return (
        // Video hero component
        <div>Video hero coming soon...</div>
      );

    default:
      return null;
  }
}
