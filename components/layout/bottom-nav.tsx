"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Building2, ChevronRight, House, LayoutGrid, Mail, MapPin, Menu, Newspaper, Phone, X, type LucideIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { isActivePath, mainNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const TABS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Accueil", href: "/", icon: House },
  { label: "Groupe", href: "/groupe", icon: Building2 },
  { label: "Activités", href: "/activites", icon: LayoutGrid },
  { label: "Contact", href: "/contact", icon: Mail },
];

const NAV_ICONS: Record<string, LucideIcon> = {
  "/": House,
  "/groupe": Building2,
  "/activites": LayoutGrid,
  "/implantations": MapPin,
  "/actualites": Newspaper,
  "/contact": Mail,
};

/** Barre de navigation fixée en bas d'écran (mobile < 768px) + menu complet en feuille basse */
export function BottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const moreActive = open || !TABS.some((t) => isActivePath(pathname, t.href));

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto rounded-t-[18px] px-5 pt-3 pb-[calc(84px+env(safe-area-inset-bottom))] md:hidden">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Toutes les pages du site Tsara Groupe</SheetDescription>
          <div aria-hidden className="mx-auto mb-1 h-1 w-10 rounded-full bg-input" />
          <ul className="flex flex-col">
            {mainNav.map((item) => {
              const Icon = NAV_ICONS[item.href] ?? House;
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-[#eef0f3]">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn("flex min-h-[54px] items-center gap-3.5 text-[16.5px] font-medium no-underline", active ? "text-primary" : "text-foreground")}
                  >
                    <span className="flex size-9 items-center justify-center rounded-[10px] bg-[#e8f4fb]">
                      <Icon className="size-4.5 text-primary" aria-hidden />
                    </span>
                    <span className="flex-1">{item.label}</span>
                    <ChevronRight className="size-4.5 text-[#9aa6b2]" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <a href={`mailto:${site.contact.email}`} className="flex h-12 items-center justify-center gap-2 rounded-[10px] border border-input text-[14.5px] font-medium text-primary no-underline">
              <Mail className="size-4" aria-hidden /> E-mail
            </a>
            <a href={`tel:${site.contact.phone}`} className="flex h-12 items-center justify-center gap-2 rounded-[10px] bg-primary text-[14.5px] font-medium text-white no-underline hover:text-white">
              <Phone className="size-4" aria-hidden /> Appeler
            </a>
          </div>
        </SheetContent>
      </Sheet>

      <nav
        aria-label="Navigation mobile"
        className="fixed inset-x-0 bottom-0 z-[60] border-t bg-white/98 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_24px_rgba(11,36,71,0.07)] md:hidden"
      >
        <ul className="grid h-[66px] grid-cols-5 px-1.5">
          {TABS.map(({ label, href, icon: Icon }) => {
            const active = !open && isActivePath(pathname, href);
            return (
              <li key={href} className="flex">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex flex-1 flex-col items-center justify-center gap-1 text-[11px] no-underline",
                    active ? "font-semibold text-primary" : "font-medium text-subtle-foreground",
                  )}
                >
                  <span aria-hidden className={cn("absolute inset-x-[30%] top-0 h-0.5 rounded-b-sm", active ? "bg-primary" : "bg-transparent")} />
                  <Icon className="size-5.25" aria-hidden />
                  {label}
                </Link>
              </li>
            );
          })}
          <li className="flex">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className={cn(
                "relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-1 text-[11px]",
                moreActive ? "font-semibold text-primary" : "font-medium text-subtle-foreground",
              )}
            >
              <span aria-hidden className={cn("absolute inset-x-[30%] top-0 h-0.5 rounded-b-sm", moreActive ? "bg-primary" : "bg-transparent")} />
              {open ? <X className="size-5.25" aria-hidden /> : <Menu className="size-5.25" aria-hidden />}
              Menu
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
