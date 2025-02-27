import { notFound } from "next/navigation";
import Script from "next/script";
import { Suspense } from "react";
import { Organization, WithContext } from "schema-dts";

import { ContainerMD } from "@/components/ContainerMD";
import HistoricalTimeline from "@/components/HistoricalTimeline";
import CarouselOne from "@/components/modules/carousel-one";
import HeroSection from "@/components/modules/heros/HeroSection";
import { AllPosts } from "@/components/Posts";
import { sanityFetch } from "@/sanity/lib/live";
import { homePageSingletonQuery } from "@/sanity/lib/queries";

const organization: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Blackfalds & Area Historical Society",
  url: "https://www.blackfaldshistoricalsociety.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.blackfaldshistoricalsociety.com/logos/BAHS-logo.png",
  },
};

export default async function HomePage() {
  const [{ data: homePageSingleton }] = await Promise.all([
    sanityFetch({ query: homePageSingletonQuery }),
  ]);

  if (!homePageSingleton) {
    return notFound();
  }
  return (
    <>
      <Script
        id="organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <div className="min-h-dvh">
        <HeroSection hero={homePageSingleton.hero} />
        <div className="w-full bg-gold-200 py-4 dark:bg-gold-800">
          <CarouselOne block={homePageSingleton.carouselOne} />
        </div>
        {homePageSingleton.historicalFacts &&
          homePageSingleton.historicalFacts.length > 0 && (
            <section className="py-12">
              <HistoricalTimeline
                historicalFacts={
                  homePageSingleton.historicalFacts as {
                    year: number;
                    title: string;
                    snippet: string;
                  }[]
                }
              />
            </section>
          )}
        <div className="bg-gold-200 dark:bg-gold-800">
          <ContainerMD className="">
            <aside className="py-12 sm:py-20">
              <Suspense fallback={null}>{await AllPosts()}</Suspense>
            </aside>
          </ContainerMD>
        </div>
      </div>
    </>
  );
}
