import { stegaClean } from "@sanity/client/stega";
import Image from "next/image";

import { ContainerMD } from "@/components/ContainerMD";
import CustomPortableText from "@/components/PortableText";
import { ContactPage as ContactPageType } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { contactPageQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";

export default async function ContactPage() {
  // @ts-expect-error
  const { data: contactPage } = await sanityFetch<ContactPageType>({
    query: contactPageQuery,
  });
  return (
    <ContainerMD className="flex flex-col items-center py-16">
      <div className="max-w-prose">
        <h1 className="py-4 font-headings text-fluid-2xl font-bold text-pretty md:text-fluid-2xl">
          {contactPage?.title}
        </h1>
        <p className="pb-4 font-headings text-fluid-lg text-pretty">
          {contactPage?.description}
        </p>
      </div>
      <div className="space-x-4 md:flex">
        <CustomPortableText value={contactPage?.content} />
        <Image
          src={urlForImage(contactPage?.image)?.url() || ""}
          alt={stegaClean(contactPage?.image?.alt || "")}
          width={contactPage?.image?.asset?.metadata?.dimensions?.width || 0}
          height={contactPage?.image?.asset?.metadata?.dimensions?.height || 0}
          className="rounded-lg"
        />
      </div>
    </ContainerMD>
  );
}
