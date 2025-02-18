import Link from "next/link";

interface CitationProps {
  value: {
    _type: "citation";
    _key: string;
    citation: {
      _id: string;
      citationNumber: number;
      title: string;
    };
  };
  children: React.ReactNode;
}

export function Citation({ value, children }: CitationProps) {
  return (
    <span className="group inline-flex items-baseline">
      {children}
      <Link
        href={`/resources/mural-sources#citation-${value.citation._id}`}
        className="ml-0.5 text-sm text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
      >
        [{value.citation.citationNumber}]
      </Link>
    </span>
  );
}
