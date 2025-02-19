"use client";

import Image from "next/image";
import Link from "next/link";

import { NavDesktop } from "@/components/NavDesktop";
import NavMobile from "@/components/NavMobile";
import { ModeToggle } from "./ModeToggle";
import { ContainerMD } from "./ContainerMD";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="fixed inset-0 z-50 flex h-16 items-center bg-background md:h-28">
      <ContainerMD className="">
        <div className="flex items-center justify-between gap-4">
          <Link className="flex items-center gap-2" href="/">
            <Image
              src="/logos/BAHS-logo.png"
              alt="Blackfalds"
              width={100}
              height={100}
              className="h-16 w-16 py-2 md:h-28 md:w-28"
            />
          </Link>

          <nav>
            <div className="hidden md:block">
              <NavDesktop pathname={pathname} />
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
