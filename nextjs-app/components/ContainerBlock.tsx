import { ContainerTwo } from "@/components/ContainerTwo";
import { cn } from "@/lib/utils";

type ContainerBlockProps = {
  children: React.ReactNode;
  className?: string;
};
// Used for CarouselOne
export default function ContainerBlock({
  children,
  className,
}: ContainerBlockProps) {
  return (
    <div
      className={cn(
        "w-full px-2 py-12 md:px-4 lg:px-6 xl:px-8",
        className // override with custom classes
      )}
    >
      <ContainerTwo className="mx-auto max-w-7xl rounded-lg py-4 ring-4 ring-brawn-900">
        {children}
      </ContainerTwo>
    </div>
  );
}
