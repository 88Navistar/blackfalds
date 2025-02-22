import React from "react";

import { ContainerMD } from "@/components/ContainerMD";
import CustomPortableText from "@/components/PortableText";

export default function Acknowledgement({ content }: { content: any }) {
  return (
    <ContainerMD className="mb-4 rounded-lg bg-gold-100 p-4 md:p-8 dark:bg-gold-900">
      <CustomPortableText value={content} />
    </ContainerMD>
  );
}
