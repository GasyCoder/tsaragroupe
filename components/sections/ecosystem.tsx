import Link from "next/link";
import { Building2 } from "lucide-react";
import { SectorIcon } from "@/components/sector-icon";
import { SectionHeader } from "@/components/sections/section-header";
import { activities, activityHref } from "@/lib/data/activities";
import { site } from "@/lib/site";

const LABEL = `Organigramme : Tsara Groupe, société mère, et ses ${activities.length} entités`;

export function Ecosystem() {
  return (
    <section aria-labelledby="h-eco" className="bg-white">
      <div className="container-site section-y flex flex-col gap-10 md:gap-16">
        <SectionHeader
          id="h-eco"
          align="center"
          eyebrow="Organisation"
          title="L'architecture du groupe"
          description="Tsara Groupe est la société mère. Chaque secteur est porté par une entité distincte."
        />

        {/* Desktop : arbre horizontal */}
        <figure aria-label={LABEL} className="m-0 hidden flex-col items-center xl:flex">
          <div className="flex flex-col gap-1.5 rounded-xl bg-navy px-10 py-5.5 text-center text-white shadow-[0_14px_34px_rgba(11,36,71,0.18)]">
            <Building2 className="mx-auto size-5.5 text-navy-accent" aria-hidden />
            <span className="font-heading text-xl font-semibold tracking-[0.08em]">TSARA GROUPE</span>
            <span className="text-[13px] text-navy-accent">Société mère · {site.contact.city}</span>
          </div>
          <div aria-hidden className="h-9 w-0.5 bg-connector" />
          <ul className="relative grid w-full grid-cols-4 gap-3.5 xl:grid-cols-8">
            <li aria-hidden className="absolute top-0 right-[calc(100%/16)] left-[calc(100%/16)] hidden h-0.5 bg-connector xl:block" />
            {activities.map((a) => (
              <li key={a.slug} className="flex flex-col items-center">
                <div aria-hidden className="h-7 w-0.5 bg-connector" />
                <Link
                  href={activityHref(a)}
                  className="flex w-full flex-col items-center gap-2 rounded-[10px] border border-[#e1e6eb] bg-white px-2.5 py-5 text-center text-foreground no-underline transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:text-foreground hover:shadow-[0_12px_28px_rgba(11,36,71,0.12)]"
                >
                  <span className="flex size-9.5 items-center justify-center rounded-[10px] bg-[#e8f4fb]">
                    <SectorIcon activity={a} className="size-4.75 text-primary" />
                  </span>
                  <span className="text-[11.5px] font-semibold tracking-[0.1em] text-brand-green uppercase">{a.sector}</span>
                  <span className="font-heading text-[15.5px] leading-tight font-semibold text-heading">{a.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </figure>

        {/* Mobile / tablette : structure verticale */}
        <figure aria-label={LABEL} className="m-0 flex flex-col xl:hidden">
          <div className="flex items-center justify-between gap-3 rounded-xl bg-navy px-5 py-4.5 text-white">
            <span className="flex items-center gap-2.5">
              <Building2 className="size-4.5 text-navy-accent" aria-hidden />
              <span className="font-heading text-[17px] font-semibold tracking-[0.08em]">TSARA GROUPE</span>
            </span>
            <span className="text-[13px] text-navy-accent">Société mère</span>
          </div>
          <ul className="ml-5.5 flex flex-col gap-2.5 border-l-2 border-connector pt-3.5">
            {activities.map((a) => (
              <li key={a.slug} className="flex items-center">
                <span aria-hidden className="h-0.5 w-5 shrink-0 bg-connector" />
                <Link
                  href={activityHref(a)}
                  className="flex min-h-14 flex-1 items-center justify-between gap-3 rounded-[10px] border border-[#e1e6eb] bg-white px-4 py-3.75 text-foreground no-underline"
                >
                  <span className="flex items-center gap-2.5">
                    <SectorIcon activity={a} className="size-4.25 text-primary" />
                    <span className="font-heading text-base font-semibold">{a.name}</span>
                  </span>
                  <span className="text-right text-[11.5px] font-semibold tracking-[0.1em] text-brand-green uppercase">{a.sector}</span>
                </Link>
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </section>
  );
}
