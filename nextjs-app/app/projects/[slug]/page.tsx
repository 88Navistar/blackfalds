import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { type PortableTextBlock } from "next-sanity";
import { Suspense } from "react";

import Avatar from "@/components/Avatar";
import { ContainerMD } from "@/components/ContainerMD";
import CoverImage from "@/components/CoverImage";
import Modules from "@/components/modules/index";
import CustomPortableText from "@/components/PortableText";
import { MorePosts } from "@/components/Posts";
import { sanityFetch } from "@/sanity/lib/live";
import { postPagesSlugs, postQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: postPagesSlugs,
    // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const { data: post } = await sanityFetch({
    query: postQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors:
      post?.author?.firstName && post?.author?.lastName
        ? [{ name: `${post.author.firstName} ${post.author.lastName}` }]
        : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PostPage(props: Props) {
  const params = await props.params;
  const [{ data: post }] = await Promise.all([
    sanityFetch({ query: postQuery, params }),
  ]);

  if (!post?._id) {
    return notFound();
  }

  return (
    <>
      <ContainerMD className="mx-auto flex flex-col items-center">
        <div className="my-12 grid max-w-5xl gap-12 lg:my-24">
          <div>
            <div className="mb-6 grid gap-6 border-b border-gray-100 pb-6">
              <div className="flex flex-col gap-6">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
                  {post.title}
                </h2>
              </div>
              <div className="flex items-center gap-4">
                {post.author &&
                  post.author.firstName &&
                  post.author.lastName && (
                    <Avatar person={post.author} date={post.date} />
                  )}
              </div>
            </div>
            <article className="grid gap-6">
              <div className="">
                <CoverImage image={post.coverImage} priority />
              </div>
              <section>
                {post.modules && <Modules modules={post.modules} />}
              </section>
            </article>
          </div>
        </div>
      </ContainerMD>
      <div className="border-t border-gray-100">
        <ContainerMD className="my-12 grid gap-12 lg:my-24">
          <aside>
            <Suspense>{await MorePosts({ skip: post._id, limit: 2 })}</Suspense>
          </aside>
        </ContainerMD>
      </div>
    </>
  );
}
