import React from "react";

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
        <div className="flex h-24 w-24 items-center justify-center rounded-md bg-gold-900 dark:bg-gold-100 dark:text-slate-50">
          <span className="text-2xl font-bold text-stone-200 dark:text-stone-800">
            {fact.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2 pt-2">
        <h3 className="text-xl font-semibold">{fact.title}</h3>
        <p className="text-muted-foreground">{fact.snippet}</p>
      </div>

      {/* Timeline connector */}
      <div className="bg-pacific-7/20 absolute top-0 left-[5.5rem] h-full w-px" />
    </div>
  );
}
