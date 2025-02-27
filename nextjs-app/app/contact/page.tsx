import { stegaClean } from "@sanity/client/stega";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Script from "next/script";
import { BreadcrumbList, WithContext } from "schema-dts";

import { ContainerMD } from "@/components/ContainerMD";
import CustomPortableText from "@/components/PortableText";
import { ContactPage as ContactPageType } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { contactPageQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";

const breadcrumbListContact: WithContext<BreadcrumbList> = {
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
      name: "Contact",
      item: "https://www.blackfaldshistoricalsociety.com/contact",
    },
  ],
};
export const metadata: Metadata = {
  title: "Contact The Blackfalds Historical Society",
  description: "Contact the Blackfalds Historical Society",
};
export default async function ContactPage() {
  // @ts-expect-error
  const { data: contactPage } = await sanityFetch<ContactPageType>({
    query: contactPageQuery,
  });
  return (
    <>
      <Script
        id="breadcrumb-list"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbListContact),
        }}
      />
      <ContainerMD className="flex flex-col items-center py-16">
        <div className="max-w-prose">
          <h1 className="py-4 font-headings text-fluid-2xl font-bold text-pretty md:text-fluid-2xl">
            {contactPage?.title}
          </h1>
          <p className="pb-4 font-headings text-fluid-lg text-pretty">
            {contactPage?.description || ""}
          </p>
        </div>
        <div className="space-x-4 md:flex">
          <div className="flex-1">
            <CustomPortableText value={contactPage?.content} />
          </div>
          <div className="flex-shrink-0 md:max-w-[40%]">
            <Image
              src={urlForImage(contactPage?.image)?.url() || ""}
              alt={stegaClean(contactPage?.image?.alt || "")}
              width={
                contactPage?.image?.asset?.metadata?.dimensions?.width || 0
              }
              height={
                contactPage?.image?.asset?.metadata?.dimensions?.height || 0
              }
              className="rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </ContainerMD>
    </>
  );
}
