import React from "react";

import Cta from "@/components/Cta";
import Info from "@/components/InfoSection";
import SourceGroup from "@/components/SourceGroup";
import { dataAttr } from "@/sanity/lib/utils";

import IndigenousTranslationBlock from "./IndigenousTranslationBlock";

type BlocksType = {
  [key: string]: React.FC<any>;
};

type BlockType = {
  _type: string;
  _key: string;
};

type BlockProps = {
  index: number;
  block: BlockType;
  pageId: string;
  pageType: string;
};

const Blocks: BlocksType = {
  callToAction: Cta,
  infoSection: Info,
  sourceGroup: SourceGroup,
  indigenousTranslationBlock: IndigenousTranslationBlock,
};

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export default function BlockRenderer({
  block,
  index,
  pageId,
  pageType,
}: BlockProps) {
  // Block does exist
  if (typeof Blocks[block._type] !== "undefined") {
    return (
      <div
        key={block._key}
        data-sanity={dataAttr({
          id: pageId,
          type: pageType,
          path: `pageBuilder[_key=="${block._key}"]`,
        }).toString()}
      >
        {React.createElement(Blocks[block._type], {
          key: block._key,
          block: block,
          index: index,
        })}
      </div>
    );
  }
  // Block doesn't exist yet
  return React.createElement(
    () => (
      <div className="w-full rounded-sm bg-gray-100 p-20 text-center text-gray-500">
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    { key: block._key }
  );
}
