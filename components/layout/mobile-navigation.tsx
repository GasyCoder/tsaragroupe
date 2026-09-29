"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { isActivePath, mainNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileNavigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="hidden h-11.5 text-foreground md:inline-flex xl:hidden">
          <MenuIcon aria-hidden />
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-md overflow-y-auto px-6 pt-20 pb-8">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Navigation principale du site Tsara Groupe</SheetDescription>
        <nav aria-label="Navigation mobile">
          <ul className="flex flex-col">
            {mainNav.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-[#eef0f3]">
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-[58px] items-center justify-between font-heading text-xl font-semibold no-underline",
                        active ? "text-primary" : "text-foreground",
                      )}
                    >
                      {item.label}
                      <ChevronRight className="size-4.5 text-[#9aa6b2]" aria-hidden />
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </nav>
        <Button asChild size="lg" className="mt-4 w-full">
          <Link href="/contact">Nous contacter</Link>
        </Button>
        <address className="mt-4 flex flex-col gap-1.5 text-[15px] text-muted-foreground not-italic">
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          <a href={`tel:${site.contact.phone}`}>{site.contact.phoneDisplay}</a>
          <span>
            {site.contact.city}, {site.contact.country}
          </span>
        </address>
      </SheetContent>
    </Sheet>
  );
}
