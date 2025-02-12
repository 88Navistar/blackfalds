import { Suspense } from "react";

import { AllPosts } from "@/components/Posts";

export default async function ProjectsPage() {
  return (
    <div className="container">
      <aside className="py-12 sm:py-20">
        <Suspense fallback={null}>{await AllPosts()}</Suspense>
      </aside>
    </div>
  );
}
