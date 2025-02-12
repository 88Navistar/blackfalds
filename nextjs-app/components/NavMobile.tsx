"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/lib/site-data";

export default function NavMobile() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen} aria-label="Menu">
      <SheetTitle className="sr-only">Menu</SheetTitle>
      <SheetDescription className="sr-only">
        Navigation menu for mobile devices
      </SheetDescription>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" aria-label="Open main menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex w-[300px] flex-col p-2">
        <div className="mt-10">
          <Separator className="bg-pacific-7 my-4" decorative />
          {/* Add your navigation links here */}
          <nav className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className={`rounded-md p-2 text-foreground/70 transition-colors hover:text-foreground ${
                  pathname === item.href
                    ? "bg-pacific-7 text-slate-50"
                    : "hover:bg-pacific-7/10"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Separator className="my-4" decorative />
        </div>
      </SheetContent>
    </Sheet>
  );
}
