import Link from "next/link";

import DateComponent from "@/components/Date";
import OnBoarding from "@/components/Onboarding";
import PostsImage from "@/components/PostsImage";
import { Post as PostType } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { allPostsQuery, morePostsQuery } from "@/sanity/lib/queries";

import { Card, CardContent, CardHeader } from "./ui/card";

const Post = ({ post }: { post: PostType }) => {
  const { _id, title, slug, excerpt, date, coverImage } = post;

  return (
    <Card
      key={_id}
      className="flex max-w-xl flex-col bg-stone-50 ring-2 shadow-lg ring-stone-900/20 dark:bg-brawn-800/40 dark:ring-stone-100/20"
    >
      {coverImage ? (
        <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg bg-gold-100 dark:bg-gold-900">
          <div className="flex h-full items-center justify-center">
            <PostsImage image={coverImage} />
          </div>
        </div>
      ) : (
        <div className="aspect-[16/9] w-full rounded-t-lg bg-gold-100 dark:bg-gold-900" />
      )}

      <div className="flex flex-1 flex-col">
        <CardHeader className="space-y-2">
          <div className="text-sm text-green-700/50 dark:text-green-300/50">
            <DateComponent dateString={date} />
          </div>

          <h3 className="font-headings text-3xl font-semibold text-stone-900 dark:text-stone-100">
            <Link
              className="transition-colors hover:text-red-500"
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
    <div className="rounded-lg bg-stone-100/80 p-4 md:p-8 dark:bg-gold-900">
      <Posts heading={`Recent Posts (${data?.length})`}>
        {data?.map((post: any) => <Post key={post._id} post={post} />)}
      </Posts>
    </div>
  );
};

export const AllPosts = async () => {
  const { data } = await sanityFetch({ query: allPostsQuery });

  if (!data || data.length === 0) {
    return <OnBoarding />;
  }

  return (
    <div className="rounded-lg bg-stone-100/80 p-4 md:p-8 dark:bg-gold-900">
      <Posts
        heading="Projects Page"
        subHeading={`Total Projects ${data.length} `}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((post: any) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </Posts>
    </div>
  );
};
