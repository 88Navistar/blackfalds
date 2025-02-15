import Image from "next/image";
import { Suspense } from "react";

import { ContainerMD } from "@/components/ContainerMD";
import { AllPosts } from "@/components/Posts";

export default async function Page() {
  return (
    <>
      <div className="border-gray-10 min-h-dvh border-t">
        <div className="relative mx-auto px-4">
          <Image
            src="/images/street-scene-blackfalds.webp"
            alt="Blackfalds"
            className="mt-16 w-full rounded-sm shadow-lg"
            width={1600}
            height={1000}
          />
          <div className="absolute inset-x-50 top-2 flex flex-col items-center justify-center text-center whitespace-nowrap lg:top-10">
            <h2 className="xs:text-fluid-lg font-headings text-fluid-base font-bold text-stone-900 drop-shadow-lg sm:text-fluid-2xl lg:text-fluid-3xl">
              Blackfalds & Area Historical Society
            </h2>
            <h2 className="font-headings text-fluid-lg font-bold text-stone-700 drop-shadow-lg sm:text-fluid-xl lg:text-fluid-3xl">
              Linking Past & Present
            </h2>
          </div>
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
