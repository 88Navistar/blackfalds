import { ContainerMD } from "./ContainerMD";
import HistoricalFact from "./HistoricalFact";

interface TimelineProps {
  historicalFacts: {
    year: number;
    title: string;
    snippet: string;
  }[];
}

export default function HistoricalTimeline({ historicalFacts }: TimelineProps) {
  // Sort facts by year
  const sortedFacts = [...historicalFacts].sort((a, b) => a.year - b.year);

  return (
    <ContainerMD>
      <div className="relative max-w-prose space-y-4 py-8">
        <h2 className="mb-8 text-3xl font-bold">Historical Notes</h2>
        {sortedFacts.map(fact => (
          <HistoricalFact key={fact.year + fact.title} fact={fact} />
        ))}
      </div>
    </ContainerMD>
  );
}
