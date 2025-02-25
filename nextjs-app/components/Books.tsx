import { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";

import type { BlockContent, Post } from "@/sanity.types";
import { Book as BookType, Books as BooksType } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { allBooksQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";

import CustomPortableText from "./PortableText";
import { Card, CardContent, CardHeader } from "./ui/card";

interface Book {
  title: string;
  content: BlockContent;
  image: Post["coverImage"];
}

interface BooksModule {
  title: string;
  content: BlockContent;
  books: Book[];
}

const BookItem = ({ book }: { book: Book }) => {
  return (
    <Card className="flex max-w-xl flex-col bg-stone-50 shadow-lg ring-2 ring-lime-900/20 dark:bg-brawn-800/40 dark:ring-lime-100/20">
      {book.image && (
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-lg bg-gold-100 dark:bg-gold-900">
          <div className="flex h-full items-center justify-center">
            <Image
              src={urlForImage(book.image).url()}
              alt={book.image.alt || book.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-1">
        <CardHeader>
          <h3 className="font-headings text-fluid-lg font-semibold text-stone-900 dark:text-stone-100">
            {book.title}
          </h3>
        </CardHeader>

        <CardContent>
          <div className="prose-sm prose-stone dark:prose-invert prose-p:text-sm">
            <CustomPortableText value={book.content} />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

const BooksSection = ({ data }: { data: BooksModule }) => {
  return (
    <div className="mb-4 rounded-lg bg-stone-100/80 p-4 md:p-8 dark:bg-gold-900">
      <div>
        <h2 className="font-headings text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {data.title}
        </h2>
        <div className="mt-2 text-lg leading-8 text-stone-700 dark:text-stone-300">
          <CustomPortableText value={data.content} />
        </div>

        <div className="mt-6 space-y-12 border-t border-stone-800 pt-6 dark:border-stone-200">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.books.map((book, index) => (
              <BookItem key={index} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function Books() {
  const { data } = await sanityFetch<BooksModule[]>({ query: allBooksQuery });

  if (!data?.[0]) return null;

  return <BooksSection data={data[0]} />;
}
