import Image from "next/image";
import Link from "next/link";

import NavDesktop from "@/components/NavDesktop";
import NavMobile from "@/components/NavMobile";
import { ModeToggle } from "./ModeToggle";
import { ContainerMD } from "./ContainerMD";

export default function Header() {
  return (
    <header className="fixed inset-0 z-50 flex h-28 items-center bg-background">
      <ContainerMD className="">
        <div className="flex items-center justify-between gap-4">
          <Link className="flex items-center gap-2" href="/">
            <Image
              src="/logos/BAHS-logo.png"
              alt="Blackfalds"
              width={100}
              height={100}
            />
            <span className="hidden pl-2 text-lg font-semibold lg:block">
              Blackfalds
            </span>
          </Link>

          <nav>
            <div className="hidden md:block">
              <NavDesktop />
            </div>
            <div className="md:hidden">
              <NavMobile />
            </div>
          </nav>
          <div className="hidden md:relative md:z-10 md:ml-4 md:flex md:items-center">
            {/* Dark Mode Toggle */}
            <ModeToggle />
          </div>
        </div>
      </ContainerMD>
    </header>
  );
}
