import { ContainerMD } from "@/components/ContainerMD";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { AboutPageQueryResult } from "@/sanity.types";
import CustomPortableText from "@/components/PortableText";
import { notFound } from "next/navigation";

export default async function AboutPage() {
  // @ts-expect-error
  const { data: aboutPage } = await sanityFetch<AboutPageQueryResult>({
    query: aboutPageQuery,
  });
  if (!aboutPage) {
    return notFound();
  }
  return (
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
  );
}
