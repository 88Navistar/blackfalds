import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { AllPosts } from "@/components/Posts";

export default async function Page() {
  return (
    <>
      <div className="border-gray-10 border-t">
        <div className="mx-auto px-4">
          <Image
            src="/images/street-scene-blackfalds.webp"
            alt="Blackfalds"
            className="mt-16 w-full rounded-sm shadow-lg"
            width={1600}
            height={1000}
          />
        </div>
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense fallback={null}>{await AllPosts()}</Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
