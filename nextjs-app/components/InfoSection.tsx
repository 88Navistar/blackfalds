import { type PortableTextBlock } from "next-sanity";

import CustomPortableText from "@/components/PortableText";
import { InfoSection } from "@/sanity.types";

type InfoProps = {
  block: InfoSection;
  index: number;
};

export default function CTA({ block }: InfoProps) {
  return (
    <div className="container my-12">
      <div className="max-w-3xl">
        {block?.heading && (
          <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
            {block.heading}
          </h2>
        )}
        {block?.subheading && (
          <span className="mt-4 mb-8 block text-lg font-light text-gray-900/70 uppercase">
            {block.subheading}
          </span>
        )}
        <div className="mt-4">
          {block?.content?.length && (
            <CustomPortableText
              className=""
              value={block.content as PortableTextBlock[]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
