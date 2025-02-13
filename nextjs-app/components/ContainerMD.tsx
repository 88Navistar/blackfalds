import { cn } from "@/lib/utils";
interface ContainerMDProps {
  className?: string;
  props?: any;
  children?: React.ReactNode;
}
export function ContainerMD({
  className,
  children,
  ...props
}: ContainerMDProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-2", className)} {...props}>
      {children}
    </div>
  );
}
