import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { BreadcrumbList, WithContext } from "schema-dts";

import { ContainerMD } from "@/components/ContainerMD";
import PageBuilderPage from "@/components/PageBuilder";
import { GetResourcePageQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { getResourcePageQuery, resourcePagesSlugs } from "@/sanity/lib/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: resourcePagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */ // Log the slug value

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { data: page } = await sanityFetch({
    query: getResourcePageQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  });

  return {
    title: page?.name,
    description: page?.heading,
  } satisfies Metadata;
}

export default async function ResourcePage(props: Props) {
  const params = await props.params;
  const [{ data: resourcePage }] = await Promise.all([
    sanityFetch({ query: getResourcePageQuery, params }),
  ]);

  if (!resourcePage?._id) {
    return notFound();
  }
  const breadcrumbListResource = (resourcePage: any) => {
    return {
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
          name: "Resources",
          item: "https://www.blackfaldshistoricalsociety.com/resources",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Resource",
          item: `https://www.blackfaldshistoricalsociety.com/resources/${resourcePage.slug}`,
        },
      ],
    };
  };
  return (
    <>
      <Script
        id="breadcrumb-list-resource-slug"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbListResource(resourcePage)),
        }}
      />
      <ContainerMD>
        <h1 className="pt-12 text-4xl font-bold">{resourcePage.name}</h1>
        <PageBuilderPage page={resourcePage as GetResourcePageQueryResult} />
      </ContainerMD>
    </>
  );
}
