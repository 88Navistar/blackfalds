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
import HeroSection from "@/components/modules/heros/HeroSection";

export default async function HomePage() {
  const [{ data: homePageSingleton }] = await Promise.all([
    sanityFetch({ query: homePageSingletonQuery }),
  ]);

  if (!homePageSingleton) {
    return notFound();
  }
  return (
    <>
      <div className="min-h-dvh">
        <HeroSection hero={homePageSingleton.hero} />
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
