interface HistoricalFactProps {
  fact: {
    year: number;
    title: string;
    snippet: string;
  };
}

export default function HistoricalFact({ fact }: HistoricalFactProps) {
  return (
    <div className="flex items-start gap-6 py-6">
      {/* Year Box */}
      <div className="shrink-0">
        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gold-900 md:h-24 md:w-24 dark:bg-gold-100 dark:text-slate-50">
          <span className="font-headings text-lg font-bold text-stone-200 md:text-2xl dark:text-stone-800">
            {fact.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 pt-2">
        <h3 className="font-headings text-lg font-semibold md:text-2xl">
          {fact.title}
        </h3>
        <p className="text-sm text-muted-foreground md:text-base">
          {fact.snippet}
        </p>
      </div>

      {/* Timeline connector */}
      <div className="bg-pacific-7/20 absolute top-0 left-[5.5rem] h-full w-px" />
    </div>
  );
}
