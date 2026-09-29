import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Hospital, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/sections/section-header";
import { leadership, site } from "@/lib/site";
import { activities } from "@/lib/data/activities";

const figures = [
  { value: String(activities.length), label: "entités au sein du groupe", icon: Building2 },
  { value: "3", label: "implantations de la Clinique Saint Georges", icon: Hospital },
  { value: site.contact.city, label: "siège de Tsara Groupe", icon: MapPin },
];

function CeoCard() {
  const { ceo } = leadership;
  return (
    <figure aria-labelledby="ceo-name" className="m-0 w-full max-w-[400px] justify-self-end">
      <div className="relative aspect-[4/4.35] overflow-hidden rounded-xl bg-[#dde3ea]">
        <Image src={ceo.photo.src} alt={ceo.photo.alt} fill sizes="(min-width: 1024px) 400px, 90vw" className="object-cover" />
      </div>
      <figcaption className="flex flex-col gap-1 border-b px-1 py-4">
        <span className="text-sm font-medium text-primary">Direction générale</span>
        <span id="ceo-name" className="font-heading text-xl font-semibold tracking-tight text-heading">
          {ceo.name}
        </span>
        <span className="text-[15px] text-[#3a4553]">
          {ceo.fullTitle} ({ceo.title}) de Tsara Groupe
        </span>
      </figcaption>
    </figure>
  );
}

/** Présentation du groupe + carte PDG + chiffres factuels */
export function Presentation({ showMoreLink = true }: { showMoreLink?: boolean }) {
  return (
    <section aria-labelledby="h-intro">
      <div className="container-site section-y">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div className="flex flex-col gap-5.5">
            <Eyebrow>Le Groupe</Eyebrow>
            <h2 id="h-intro" className="text-h2 font-semibold text-heading">
              Un groupe, plusieurs domaines d&apos;activité
            </h2>
            <p className="mt-1 text-lg leading-[1.75] text-[#273445]">
              Tsara Groupe est un groupe multisectoriel malgache réunissant plusieurs entreprises et initiatives complémentaires. Le groupe
              développe progressivement ses activités autour de secteurs essentiels tels que la santé, l&apos;agriculture, le transport, les
              services, le commerce, la pharmacie et l&apos;information.
            </p>
            <p className="text-[17px] leading-[1.7] text-muted-foreground">
              Chaque entité conserve son identité et son domaine d&apos;activité, tout en bénéficiant d&apos;une vision commune et d&apos;une
              organisation coordonnée au niveau du groupe.
            </p>
            {showMoreLink && (
              <div>
                <Button asChild variant="ghost" className="-ml-4 font-medium">
                  <Link href="/groupe">
                    En savoir plus sur le Groupe <ArrowRight aria-hidden />
                  </Link>
                </Button>
              </div>
            )}
            <dl className="mt-3 grid gap-x-0 gap-y-5 border-y py-6 sm:grid-cols-3">
              {figures.map((f) => (
                <div key={f.label} className="flex flex-col-reverse gap-1.5 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0">
                  <dt className="text-sm leading-snug text-subtle-foreground">{f.label}</dt>
                  <dd className="text-[clamp(1.45rem,2.2vw,1.75rem)] leading-tight font-semibold tracking-[-0.022em] text-heading">{f.value}</dd>
                  <span aria-hidden className="mb-1 flex items-center gap-2 text-primary">
                    <f.icon className="size-4.5" />
                  </span>
                </div>
              ))}
            </dl>
          </div>
          <CeoCard />
        </div>
      </div>
    </section>
  );
}
