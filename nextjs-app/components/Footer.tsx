export default function Footer() {
  return (
    <footer className="border-t border-yellow-700">
      <div className="mx-auto flex flex-col items-center justify-center border-t border-stone-950/50">
        <p className="py-4 text-center text-base font-semibold sm:text-base">
          &copy; {new Date().getFullYear()}{" "}
          <span>
            Blackfalds & Area Historical Society. All rights reserved.
          </span>
        </p>
        <p className="font-semibold">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.88create.ca"
            className="text-red-600"
          >
            Website Design by 88 Create Inc
          </a>
        </p>
      </div>
    </footer>
  );
}
