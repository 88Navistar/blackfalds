import { Suspense } from "react";

import { ContainerMD } from "@/components/ContainerMD";
import { AllPosts } from "@/components/Posts";
export default async function ProjectsPage() {
  return (
    <ContainerMD className="">
      <aside className="py-12 sm:py-20">
        <Suspense fallback={null}>{await AllPosts()}</Suspense>
      </aside>
    </ContainerMD>
  );
}
