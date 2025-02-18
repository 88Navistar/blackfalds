import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Source, SourceGroup as SourceGroupType } from "@/sanity.types";
import { ContainerMD } from "./ContainerMD";

type SourceGroupProps = {
  sourceGroup: SourceGroupType;
};

export default function SourceGroup({ block }: SourceGroupProps) {
  return (
    <div className="my-6 w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Citation #</TableHead>
            <TableHead>Source</TableHead>
            <TableHead className="hidden md:table-cell">Author</TableHead>
            <TableHead className="hidden lg:table-cell">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {block.sources.map((source: Source) => (
            <TableRow key={source._id}>
              <TableCell className="font-medium">
                <sup>[{source.citationNumber}]</sup>
              </TableCell>
              <TableCell>
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
