import { sanityFetch } from "@/sanity/lib/live";
import { getResourcePageQuery, resourcePagesSlugs } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBuilderPage from "@/components/PageBuilder";
import { GetResourcePageQueryResult } from "@/sanity.types";
import { ContainerMD } from "@/components/ContainerMD";

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
 */
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

  return (
    <ContainerMD>
      <h1 className="pt-12 text-4xl font-bold">{resourcePage.name}</h1>
      <PageBuilderPage page={resourcePage as GetResourcePageQueryResult} />
    </ContainerMD>
  );
}
