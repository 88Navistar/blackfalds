import Link from "next/link";
import { Suspense } from "react";

import { AllPosts } from "@/components/Posts";

export default async function Page() {
  return (
    <>
      <div className="relative">
        <p>Blackfalds</p>
      </div>
      <div className="border-gray-10 border-t">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense fallback={null}>{await AllPosts()}</Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
