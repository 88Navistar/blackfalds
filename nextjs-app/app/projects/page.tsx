import { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { BreadcrumbList, WithContext } from "schema-dts";

import Books from "@/components/Books";
import { ContainerMD } from "@/components/ContainerMD";
import { AllPosts, FeaturedPosts } from "@/components/Posts";
export const metadata: Metadata = {
  title: "Projects and Initiatives",
  description:
    "A collection of projects and initiatives by the Blackfalds & Area Historical Society.",
};
const breadcrumbList = (): WithContext<BreadcrumbList> => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.blackfaldshistoricalsociety.com/projects",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: {
          name: "Home",
          "@type": "WebPage",
          "@id": "https://www.blackfaldshistoricalsociety.com",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: {
          name: "Projects",
          "@type": "WebPage",
          "@id": "https://www.blackfaldshistoricalsociety.com/projects",
        },
      },
    ],
  };
};
export default async function ProjectsPage() {
  return (
    <>
      <Script
        id="breadcrumb-list-project-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList()) }}
      />
      <ContainerMD className="flex flex-col items-center pt-16">
        <div className="max-w-prose">
          <h1 className="py-4 font-headings text-fluid-2xl font-bold text-pretty md:text-fluid-2xl">
            Projects and Initiatives
          </h1>
          <p className="pb-4 font-headings text-fluid-lg text-pretty">
            A collection of projects and initiatives by the Blackfalds & Area
            Historical Society.
          </p>
        </div>
        <aside className="space-y-12 py-12 sm:py-20">
          <Suspense fallback={null}>{await FeaturedPosts()}</Suspense>

          <Suspense fallback={null}>{await Books()}</Suspense>

          <Suspense fallback={null}>{await AllPosts()}</Suspense>
        </aside>
      </ContainerMD>
    </>
  );
}
