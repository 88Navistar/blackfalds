import { PortableTextBlock } from "@portabletext/types";
import { stegaClean } from "@sanity/client/stega";
import Image from "next/image";

import type { AllBooksQueryResult } from "@/sanity.types";
import { Book as BookType, Books as BooksType } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { allBooksQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";

import CustomPortableText from "./PortableText";
import { Card, CardContent, CardHeader } from "./ui/card";

// Use the exact types from your Sanity query result
type BooksData = AllBooksQueryResult[0];
type BookItemProps = NonNullable<BooksData["books"][0]>;

const BookItem = ({ book }: { book: BookItemProps }) => {
  const imageUrl = urlForImage(book.image);

  return (
    <Card className="flex max-w-xl flex-col bg-stone-50 shadow-lg ring-2 ring-lime-900/20 dark:bg-brawn-800/40 dark:ring-lime-100/20">
      {imageUrl ? (
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-lg bg-gold-100 dark:bg-gold-900">
          <div className="flex h-full items-center justify-center">
            <Image
              src={imageUrl.url()}
              alt={stegaClean(book.image?.alt) || "Book Cover"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        </div>
      ) : (
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-lg bg-gold-100 dark:bg-gold-900" />
      )}

      <div className="flex flex-1 flex-col">
        <CardHeader>
          <h3 className="font-headings text-3xl font-semibold text-stone-900 dark:text-stone-100">
            {book.title}
          </h3>
        </CardHeader>

        <CardContent>
          <div className="prose-sm prose-stone dark:prose-invert prose-p:text-sm prose-p:leading-tight">
            {book.content && <CustomPortableText value={book.content} />}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

const BooksSection = ({ data }: { data: BooksData }) => {
  return (
    <div className="mb-4 rounded-lg bg-stone-100/80 p-4 md:p-8 dark:bg-gold-900">
      <div>
        <h2 className="font-headings text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {data.title}
        </h2>

        <div className="mt-2 text-lg leading-8 text-stone-700 dark:text-stone-300">
          {data.content && <CustomPortableText value={data.content} />}
        </div>

        <div className="mt-6 space-y-12 border-t border-stone-800 pt-6 dark:border-stone-200">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.books?.map(
              (book, index) => book && <BookItem key={index} book={book} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function Books() {
  // @ts-expect-error
  const { data: books } = await sanityFetch<AllBooksQueryResult>({
    query: allBooksQuery,
  });

  if (!books?.[0]) return null;

  return <BooksSection data={books[0]} />;
}
