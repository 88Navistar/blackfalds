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
  // Detailed logging
  console.log("Citation Component Render:", {
    fullValue: value,
    citationObject: value?.citation,
    id: value?.citation?._id,
    number: value?.citation?.citationNumber,
    hasChildren: !!children,
  });

  if (!value?.citation?.citationNumber) {
    console.log("Missing citation data");
    return <>{children}</>;
  }

  return (
    <span className="group inline-flex items-baseline">
      {children}
      <Link
        href={`#citation-${value.citation._id}`}
        className="ml-0.5 text-sm text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
      >
        <sup>[{value.citation.citationNumber || "missing"}]</sup>
      </Link>
    </span>
  );
}
