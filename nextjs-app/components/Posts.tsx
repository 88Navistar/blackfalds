import Link from "next/link";

import DateComponent from "@/components/Date";
import PostsImage from "@/components/PostsImage";
import { Post as PostType } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import {
  allPostsQuery,
  featuredPostsQuery,
  morePostsQuery,
} from "@/sanity/lib/queries";

import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";

const Post = ({ post }: { post: PostType }) => {
  const { _id, title, slug, excerpt, coverImage, category } = post;

  return (
    <Card
      key={_id}
      className="flex max-w-xl flex-col bg-stone-50 shadow-lg ring-2 ring-lime-900/20 dark:bg-brawn-800/40 dark:ring-lime-100/20"
    >
      <Link
        className="transition-colors hover:text-red-500"
        href={`/projects/${slug}`}
      >
        {coverImage ? (
          <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg bg-gold-100 dark:bg-gold-900">
            <div className="flex h-full items-center justify-center transition-all duration-300 hover:scale-105">
              <PostsImage image={coverImage} />
            </div>
          </div>
        ) : (
          <div className="aspect-[16/9] w-full rounded-t-lg bg-gold-100 dark:bg-gold-900" />
        )}
      </Link>
      <div className="flex flex-1 flex-col">
        <CardHeader className="space-y-2">
          {category && (
            <Badge variant="green" className="text-sm text-stone-200">
              {category.name}
            </Badge>
          )}
          <h3 className="font-headings text-3xl font-semibold text-stone-900 dark:text-stone-100">
            <Link
              className="transition-colors hover:text-lime-600"
              href={`/projects/${slug}`}
            >
              {title}
            </Link>
          </h3>
        </CardHeader>

        <CardContent>
          <p className="line-clamp-3 text-sm leading-6 text-stone-700 dark:text-stone-300">
            {excerpt}
          </p>
        </CardContent>
      </div>
    </Card>
  );
};

const Posts = ({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode;
  heading?: string;
  subHeading?: string;
  coverImage?: any;
}) => (
  <div>
    {heading && (
      <h2 className="font-headings text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
    )}
    {subHeading && (
      <p className="mt-2 text-lg leading-8 text-stone-700 dark:text-stone-300">
        {subHeading}
      </p>
    )}
    <div className="mt-6 space-y-12 border-t border-stone-800 pt-6 dark:border-stone-200">
      {children}
    </div>
  </div>
);

export const MorePosts = async ({
  skip,
  limit,
}: {
  skip: string;
  limit: number;
}) => {
  const { data } = await sanityFetch({
    query: morePostsQuery,
    params: { skip, limit },
  });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 rounded-lg bg-stone-100/80 p-4 md:p-8 dark:bg-gold-900">
      <Posts heading={`Recent Posts (${data?.length})`}>
        {data?.map((post: any) => <Post key={post._id} post={post} />)}
      </Posts>
    </div>
  );
};
export const FeaturedPosts = async () => {
  const { data } = await sanityFetch({ query: featuredPostsQuery });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 rounded-lg bg-stone-100/80 p-4 md:p-8 dark:bg-gold-900">
      <Posts
        heading="Featured Projects"
        subHeading="These are some of our favorite projects"
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((post: any) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </Posts>
    </div>
  );
};
export const AllPosts = async () => {
  const { data } = await sanityFetch({ query: allPostsQuery });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 rounded-lg bg-stone-100/80 p-4 md:p-8 dark:bg-gold-900">
      <Posts
        heading="All Projects"
        subHeading={`The Society's Projects ${data.length} `}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((post: any) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </Posts>
    </div>
  );
};
