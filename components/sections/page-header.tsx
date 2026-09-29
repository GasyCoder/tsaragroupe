import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Eyebrow } from "@/components/sections/section-header";

export type Crumb = { label: string; href?: string };

function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane">
      <ol className="flex flex-wrap gap-2 text-sm text-navy-subtle">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {i > 0 && <ChevronRight className="size-3.5 text-[#5f7a95]" aria-hidden />}
            {c.href ? (
              <Link href={c.href} className="text-[#c3d1df] no-underline hover:text-white hover:underline">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-white">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lead: string;
  crumbs?: Crumb[];
  image?: { src: string; alt: string };
}

export function PageHeader({ eyebrow, title, lead, crumbs, image }: PageHeaderProps) {
  const items = crumbs ?? [{ label: "Accueil", href: "/" }, { label: title }];
  return (
    <section className="bg-navy text-white">
      <div className={`container-site grid items-center gap-x-18 gap-y-10 pt-8 pb-12 md:pt-12 md:pb-20 ${image ? "lg:grid-cols-[1.25fr_1fr]" : ""}`}>
        <div className="flex flex-col gap-5.5">
          <Breadcrumb items={items} />
          <div className="mt-2.5 flex flex-col gap-4.5">
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            <h1 className="text-h1 font-semibold text-white">{title}</h1>
            <p className="max-w-[620px] text-lead text-navy-muted">{lead}</p>
          </div>
        </div>
        {image && (
          <div className="relative hidden aspect-4/3 overflow-hidden rounded-xl bg-[#12314f] lg:block">
            <Image src={image.src} alt={image.alt} fill priority sizes="500px" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
