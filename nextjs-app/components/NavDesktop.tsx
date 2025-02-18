"use client";
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navItems } from "@/lib/site-data";

const Link = ({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof NavigationMenuLink>) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <NextLink href={href} legacyBehavior passHref>
      <NavigationMenuLink
        {...props}
        className={`${navigationMenuTriggerStyle()} ${
          isActive ? "bg-pacific-7 text-slate-50" : ""
        }`}
      >
        {children}
      </NavigationMenuLink>
    </NextLink>
  );
};

export function NavDesktop({ pathname }: { pathname: string }) {
  return (
    <NavigationMenu viewport={false} aria-label="Main navigation">
      <NavigationMenuList>
        {navItems.map(item => (
          <NavigationMenuItem
            key={item.href}
            className="relative rounded-md text-lg font-medium transition-colors duration-200 ease-in-out"
          >
            {item.children ? (
              <>
                <NavigationMenuTrigger className="data-[state=open]:bg-pacific-7">
                  {item.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="min-w-[150px] space-y-1 rounded-md bg-popover p-1.5">
                    {item.children.map(child => (
                      <li key={child.href} className="w-full">
                        <NavigationMenuLink asChild>
                          <Link
                            href={child.href}
                            className="hover:bg-pacific-7 block w-full rounded-md px-3 py-2 text-sm hover:text-slate-50"
                            aria-current={
                              pathname === child.href ? "page" : undefined
                            }
                          >
                            {child.label}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <>
                <AnimatePresence>
                  {pathname === item.href && (
                    <motion.div
                      className="bg-pacific-7 absolute inset-0 -z-10 rounded-md"
                      layoutId="highlight"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </AnimatePresence>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
