import Image from "next/image";
import { Suspense } from "react";

import { ContainerMD } from "@/components/ContainerMD";
import { AllPosts } from "@/components/Posts";

export default async function Page() {
  return (
    <>
      <div className="border-gray-10 min-h-dvh border-t">
        <div className="mx-auto px-4">
          <Image
            src="/images/street-scene-blackfalds.webp"
            alt="Blackfalds"
            className="mt-16 w-full rounded-sm shadow-lg"
            width={1600}
            height={1000}
          />
        </div>
        <ContainerMD className="">
          <aside className="py-12 sm:py-20">
            <Suspense fallback={null}>{await AllPosts()}</Suspense>
          </aside>
        </ContainerMD>
      </div>
    </>
  );
}
