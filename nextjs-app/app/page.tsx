import Image from "next/image";
import { Suspense } from "react";

import { ContainerMD } from "@/components/ContainerMD";
import { AllPosts } from "@/components/Posts";
import { homePageSingletonQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { HomePageSingleton } from "@/sanity.types";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/utils";
import HistoricalTimeline from "@/components/HistoricalTimeline";

export default async function Page() {
  const { data: homePageSingleton } = await sanityFetch<HomePageSingleton>({
    query: homePageSingletonQuery,
  });
  if (!homePageSingleton) {
    return notFound();
  }
  console.log(homePageSingleton.historicalFacts[0].year);
  return (
    <>
      <div className="min-h-dvh">
        <div className="relative mx-auto px-4">
          <Image
            src={urlFor(homePageSingleton.hero?.image).url()}
            alt={homePageSingleton.hero?.image?.alt || "Blackfalds 1880"}
            className="mt-8w-full rounded-sm shadow-lg md:mt-16"
            width={
              homePageSingleton.hero?.image?.asset?.metadata?.dimensions?.width
            }
            height={
              homePageSingleton.hero?.image?.asset?.metadata?.dimensions?.height
            }
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="absolute inset-x-50 top-2 flex flex-col items-center justify-center text-center whitespace-nowrap lg:top-10">
            <h2 className="xs:text-fluid-lg font-headings text-fluid-base font-bold text-stone-900 drop-shadow-lg sm:text-fluid-2xl lg:text-fluid-3xl">
              {homePageSingleton.hero?.title}
            </h2>
            <h2 className="font-headings text-fluid-lg font-bold text-stone-700 drop-shadow-lg sm:text-fluid-xl lg:text-fluid-3xl">
              {homePageSingleton.hero?.subTitle}
            </h2>
          </div>
        </div>
        {homePageSingleton.historicalFacts &&
          homePageSingleton.historicalFacts.length > 0 && (
            <section className="py-12">
              <HistoricalTimeline
                historicalFacts={homePageSingleton.historicalFacts}
              />
            </section>
          )}
        <ContainerMD className="">
          <aside className="py-12 sm:py-20">
            <Suspense fallback={null}>{await AllPosts()}</Suspense>
          </aside>
        </ContainerMD>
      </div>
    </>
  );
}
