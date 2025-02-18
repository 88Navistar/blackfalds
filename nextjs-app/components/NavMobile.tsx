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
import { ModeToggle } from "./ModeToggle";

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
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <ModeToggle />
            {/* Add other action buttons here */}
            {/* <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Info className="h-5 w-5" />
            </Button> */}
          </div>
        </div>

        <Separator className="bg-pacific-7" decorative />

        <nav className="mt-4 flex flex-col space-y-4">
          {navItems.map(item => (
            <div key={item.href}>
              {item.children ? (
                <div className="space-y-3">
                  <span className="px-2 text-sm font-medium text-muted-foreground">
                    {item.label}
                  </span>
                  <div className="flex flex-col space-y-2 pl-3">
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`rounded-md p-2 text-foreground/70 transition-colors hover:text-foreground ${
                          pathname === child.href
                            ? "bg-pacific-7 text-slate-50"
                            : "hover:bg-pacific-7/10"
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`rounded-md p-2 text-foreground/70 transition-colors hover:text-foreground ${
                    pathname === item.href
                      ? "bg-pacific-7 text-slate-50"
                      : "hover:bg-pacific-7/10"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
