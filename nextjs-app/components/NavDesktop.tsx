"use client";
import { AnimatePresence, motion } from "framer-motion";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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

export default function NavDesktop() {
  const pathname = usePathname();
  return (
    <NavigationMenu aria-label="Main navigation">
      <NavigationMenuList>
        {navItems.map(item => (
          <NavigationMenuItem
            key={item.href}
            className="relative rounded-md text-lg font-medium transition-colors duration-200 ease-in-out"
          >
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
            <Link
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
