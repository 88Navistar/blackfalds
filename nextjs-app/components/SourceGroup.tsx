import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Source, SourceGroup as SourceGroupType } from "@/sanity.types";
import { useEffect } from "react";

type SourceGroupProps = {
  sourceGroup: SourceGroupType;
  block: any;
  index: number;
};

export default function SourceGroup({ block, index }: SourceGroupProps) {
  useEffect(() => {
    // Get the hash from the URL
    const hash = window.location.hash;
    if (hash) {
      // Remove the '#' prefix
      const citationId = hash.slice(1);
      // Find the element
      const element = document.getElementById(citationId);
      if (element) {
        // Scroll to the element with a slight delay to ensure rendering
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          // Add a highlight class
          element.classList.add("bg-pacific-7/10");
          // Remove highlight after 2 seconds
          setTimeout(() => {
            element.classList.remove("bg-pacific-7/10");
          }, 2000);
        }, 100);
      }
    }
  }, []);

  return (
    <div className="rounded-md border">
      <Table className="[&_tbody_tr]:!hover:bg-transparent [&_tr]:hover:!bg-transparent [&_tr:hover]:bg-transparent">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Citation #</TableHead>
            <TableHead>Source</TableHead>
            <TableHead className="hidden md:table-cell">Author</TableHead>
            <TableHead className="hidden lg:table-cell">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {block.sources.map((source: Source, index: number) => (
            <TableRow
              key={source._id}
              id={`citation-${source._id}`}
              className={` ${index % 2 === 0 ? "bg-muted/50" : "bg-background"} !hover:bg-transparent transition-colors duration-300`}
            >
              <TableCell className="font-medium">
                <sup>[{source.citationNumber}]</sup>
              </TableCell>
              <TableCell className="">
                <div className="space-y-1">
                  <div className="font-medium">{source.title}</div>
                  <div className="text-sm text-stone-400 md:hidden">
                    {source.author}
                  </div>
                  <div className="text-sm text-stone-400 lg:hidden">
                    {source.publicationDetails}
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {source.author}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {source.publicationDetails}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
