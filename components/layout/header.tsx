"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { isActivePath, mainNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white/96 backdrop-blur-md transition-shadow duration-200",
        scrolled && "shadow-[0_8px_24px_rgba(15,23,42,0.07)]",
      )}
    >
      <div className={cn("container-site flex items-center justify-between gap-8 transition-[height] duration-200", scrolled ? "h-[68px] lg:h-[70px]" : "h-[68px] lg:h-[82px]")}>
        <Link href="/" aria-label="Tsara Groupe, accueil" className="shrink-0">
          <Image src="/images/logo-tsara-groupe.png" alt="Tsara Groupe" width={2060} height={380} priority className="h-auto w-[154px] lg:w-[196px]" />
        </Link>

        <nav aria-label="Navigation principale" className="hidden h-full items-center gap-10 xl:flex">
          <ul className="flex h-full gap-8">
            {mainNav.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href} className="flex">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center border-y-2 border-t-transparent text-[15px] font-semibold no-underline transition-colors duration-150 hover:text-primary",
                      active ? "border-b-primary text-primary" : "border-b-transparent text-[#243140]",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button asChild className="h-10 rounded-lg px-4 text-sm shadow-none">
            <Link href="/contact">Contact</Link>
          </Button>
        </nav>

        <MobileNavigation pathname={pathname} />
        <a
          href={`tel:${site.contact.phone}`}
          aria-label="Appeler Tsara Groupe"
          className="flex h-10.5 items-center gap-2 rounded-full bg-primary px-3.5 text-sm font-medium text-white no-underline hover:text-white md:hidden"
        >
          <Phone className="size-4" aria-hidden />
          Appeler
        </a>
      </div>
    </header>
  );
}
