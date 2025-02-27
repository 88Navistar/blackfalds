import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { BreadcrumbList, WithContext } from "schema-dts";

import { ContainerMD } from "@/components/ContainerMD";
import CustomPortableText from "@/components/PortableText";
import { AboutPageQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { aboutPageQuery } from "@/sanity/lib/queries";

const breadcrumbListAbout: WithContext<BreadcrumbList> = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.blackfaldshistoricalsociety.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://www.blackfaldshistoricalsociety.com/about",
    },
  ],
};
export const metadata: Metadata = {
  title: "About The Blackfalds Historical Society",
  description: "About the Blackfalds Historical Society",
};
export default async function AboutPage() {
  // @ts-expect-error
  const { data: aboutPage } = await sanityFetch<AboutPageQueryResult>({
    query: aboutPageQuery,
  });
  if (!aboutPage) {
    return notFound();
  }
  return (
    <>
      <Script
        id="breadcrumb-list"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbListAbout),
        }}
      />
      <ContainerMD className="flex flex-col items-center py-16">
        <div className="max-w-prose">
          <h1 className="py-4 font-headings text-fluid-2xl font-bold text-pretty md:text-fluid-2xl">
            {aboutPage?.title}
          </h1>
          <p className="pb-4 font-headings text-fluid-lg text-pretty">
            {aboutPage?.description}
          </p>
          <CustomPortableText value={aboutPage?.content} />
        </div>
      </ContainerMD>
    </>
  );
}
