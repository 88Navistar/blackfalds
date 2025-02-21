import { Suspense } from "react";

import { ContainerMD } from "@/components/ContainerMD";
import { AllPosts, FeaturedPosts } from "@/components/Posts";
export default async function ProjectsPage() {
  return (
    <ContainerMD className="">
      <div className="max-w-prose">
        <h1 className="py-4 font-headings text-fluid-2xl font-bold text-pretty md:text-fluid-2xl">
          Projects and Initiatives
        </h1>
        <p className="pb-4 font-headings text-fluid-lg text-pretty">
          A collection of projects and initiatives by the Blackfalds & Area
          Historical Society.
        </p>
      </div>
      <aside className="py-12 sm:py-20">
        <Suspense fallback={null}>
          {await FeaturedPosts()}
          {await AllPosts()}
        </Suspense>
      </aside>
    </ContainerMD>
  );
}
