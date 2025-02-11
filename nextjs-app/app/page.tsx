import { Suspense } from "react";
import Link from "next/link";

import { AllPosts } from "@/components/Posts";

export default async function Page() {
  return (
    <>
      <div className="relative">
        
        <p>Blackfalds</p>
      </div>
      <div className="border-t border-gray-10">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense>{await AllPosts()}</Suspense>
          </aside>
        </div>
      </div>
    </>
  );
}
