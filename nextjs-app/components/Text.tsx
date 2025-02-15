import { clsx } from "clsx";

type HeadingProps = {
  as?: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  dark?: boolean;
} & React.ComponentPropsWithoutRef<
  "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;
export function Eyebrow({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={clsx(
        className,
        "bg-pacific-8 prose w-fit rounded-2xl px-4 py-2 text-fluid-sm leading-6 text-sky-100 uppercase ring-2 ring-sky-900/10 md:text-fluid-base"
      )}
      {...props}
    />
  );
}
export function Heading({
  className,
  as: Element = "h2",
  dark = false,
  ...props
}: HeadingProps) {
  return (
    <Element
      {...props}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "font-headings text-4xl font-medium tracking-tighter text-pretty text-slate-800 data-[dark]:text-white sm:text-6xl"
      )}
    />
  );
}

export function Subheading({
  className,
  as: Element = "h2",
  dark = false,
  ...props
}: HeadingProps) {
  return (
    <Element
      {...props}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "data-[dark]:text-pacific-6 font-mono text-xs/5 font-semibold tracking-widest text-slate-600 uppercase"
      )}
    />
  );
}

export function Lead({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={clsx(
        className,
        "text-fluid-base font-medium text-slate-600 sm:text-fluid-lg lg:text-fluid-xl"
      )}
      {...props}
    />
  );
}
export function BlockHeading({
  title,
  description,
}: React.ComponentPropsWithoutRef<"div"> & {
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl py-12 text-center">
      <h2 className="text-fluid-lg font-semibold tracking-tight text-slate-800">
        {title}
      </h2>
      <h3 className="mt-2 text-xl font-normal tracking-tight text-balance text-slate-700 sm:text-2xl">
        {description}
      </h3>
    </div>
  );
}
export function BlockHeadingDark({
  title,
  description,
}: React.ComponentPropsWithoutRef<"div"> & {
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl pb-8">
      <h2 className="text-center text-fluid-xl font-semibold tracking-tight text-stone-800 dark:text-stone-200">
        {title}
      </h2>
      <h3 className="mt-2 text-left text-fluid-sm font-normal tracking-tight text-balance text-stone-700 dark:text-stone-300">
        {description}
      </h3>
    </div>
  );
}
