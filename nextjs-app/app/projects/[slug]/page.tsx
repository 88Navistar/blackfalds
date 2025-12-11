import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Suspense } from "react";
import { Article, BreadcrumbList, WithContext } from "schema-dts";

import Avatar from "@/components/Avatar";
import { ContainerMD } from "@/components/ContainerMD";
import CoverImage from "@/components/CoverImage";
import Modules from "@/components/modules/index";
import { MorePosts, MuralMediaPosts } from "@/components/Posts";
import { sanityFetch } from "@/sanity/lib/live";
import { postPagesSlugs, postQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage, urlForImage } from "@/sanity/lib/utils";
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
  const coverImageUrl = post.coverImage
    ? urlForImage(post.coverImage as any)
    : undefined;
  const blogPosting: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    dateModified: post._updatedAt,
    about: post.excerpt || "",
    articleBody: post.bodyText,
    image: coverImageUrl?.url(),
    author: {
      "@type": "Person",
      name: `${post.author?.firstName} ${post.author?.lastName} || "Judy Carleton"`,
    },
    publisher: {
      "@type": "Organization",
      name: "Blackfalds Historical Society",
      url: "https://www.blackfaldshistoricalsociety.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.blackfaldshistoricalsociety.com/logos/BAHS-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.blackfaldshistoricalsociety.com/projects/${post.slug}`,
    },
  };
  const breadcrumbList = (post: any): WithContext<BreadcrumbList> => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `https://www.blackfaldshistoricalsociety.com/projects/${post.slug}`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: {
            name: "Home",
            "@type": "WebPage",
            "@id": "https://www.blackfaldshistoricalsociety.com",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: {
            name: "Projects",
            "@type": "WebPage",
            "@id": "https://www.blackfaldshistoricalsociety.com/projects",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: {
            name: post.title,
            "@type": "WebPage",
            "@id": `https://www.blackfaldshistoricalsociety.com/projects/${post.slug}`,
          },
        },
      ],
    };
  };
  //console.log(blogPosting);
  return (
    <>
      <Script
        id="blog-posting"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      <Script
        id="breadcrumb-list-project-slug"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbList(post)),
        }}
      />
      <div className="bg-stone-50 px-2 dark:bg-brawn-950">
        <div className="my-12 space-y-12 lg:my-24">
          <div className="space-y-6">
            <ContainerMD className="space-y-6 border-b border-gray-100 pb-6">
              <h2 className="font-headings text-fluid-xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
                {post.title}
              </h2>
              <div className="flex items-center gap-4">
                {post.author &&
                  post.author.firstName &&
                  post.author.lastName && (
                    <Avatar person={post.author} date={post.date} />
                  )}
              </div>
            </ContainerMD>
            <article className="space-y-6">
              <CoverImage image={post.coverImage} priority />
              <section>
                {post.modules && <Modules modules={post.modules} />}
              </section>
            </article>
          </div>
        </div>
        <div className="border-t border-gray-100 bg-gold-100 dark:bg-gold-900">
          <ContainerMD className="my-12 grid gap-12 lg:my-24">
            <aside>
              <Suspense>
                {(() => {
                  return post.category?.slug?.current === "mural-media" ||
                    post.category?.slug?.current === "iron-ridge-mural"
                    ? MuralMediaPosts({ skip: post._id })
                    : MorePosts({ skip: post._id, limit: 2 });
                })()}
              </Suspense>
            </aside>
          </ContainerMD>
        </div>
      </div>
    </>
  );
}
