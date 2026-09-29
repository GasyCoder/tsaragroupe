import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Building2, CheckCircle2, ChevronLeft, ChevronRight, Clock3, FileCheck2, Globe, GraduationCap, Layers, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { SectorIcon } from "@/components/sector-icon";
import { Button } from "@/components/ui/button";
import { ContentPlaceholder } from "@/components/placeholder";
import { LocationCards } from "@/components/sections/clinic-locations";
import { ClinicHistory } from "@/components/sections/clinic-history";
import { CTASection } from "@/components/sections/cta-section";
import { PageHeader } from "@/components/sections/page-header";
import { Eyebrow } from "@/components/sections/section-header";
import { activities, activityHref, getActivity, ispsgFacts, type Activity } from "@/lib/data/activities";
import { site } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const a = getActivity((await params).slug);
  if (!a) return {};
  return {
    title: `${a.name} · ${a.category}`,
    description: a.description,
    alternates: { canonical: activityHref(a) },
    openGraph: { title: `${a.name} | Tsara Groupe`, description: a.description, images: [a.image.src] },
  };
}

const listNames = (items: Activity[]) => {
  const names = items.map((i) => i.name);
  return `${names.slice(0, -1).join(", ")} et ${names[names.length - 1]}`;
};

export default async function ActivityPage({ params }: { params: Params }) {
  const a = getActivity((await params).slug);
  if (!a) notFound();
  const i = activities.indexOf(a);
  const prev = activities[(i + activities.length - 1) % activities.length];
  const next = activities[(i + 1) % activities.length];
  const others = activities.filter((o) => o !== a);

  return (
    <>
      <PageHeader
        eyebrow={a.category}
        title={a.name}
        lead={a.description}
        image={a.image}
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Nos activités", href: "/activites" }, { label: a.name }]}
      />

      {a.slug === "clinique-saint-georges" && <ClinicHistory showAction={false} />}

      <section aria-label={`Présentation de ${a.name}`} className="bg-white">
        <div className="container-site grid items-start gap-10 py-14 md:py-24 lg:grid-cols-[1.7fr_minmax(320px,1fr)] lg:gap-18">
          <div className="flex flex-col gap-13">
            <div className="flex flex-col gap-4.5">
              <Eyebrow>Présentation</Eyebrow>
              <p className="text-[clamp(1.1875rem,1.9vw,1.4375rem)] leading-snug font-semibold tracking-tight text-heading">{a.description}</p>
              <p className="text-[17px] leading-[1.7] text-muted-foreground">
                {a.name} est l&apos;une des {activities.length} entités de Tsara Groupe, aux côtés de {listNames(others)}.
              </p>
            </div>

            {a.locations && (
              <div className="flex flex-col gap-4.5">
                <h2 className="flex items-center gap-2.5 text-[clamp(1.3125rem,2.1vw,1.625rem)] font-semibold tracking-tight text-heading">
                  <MapPin className="size-5.5 text-primary" aria-hidden />
                  Implantations
                </h2>
                <LocationCards />
                <p className="text-sm text-subtle-foreground">Adresses, horaires et services : bientôt disponibles.</p>
              </div>
            )}

            {a.slug === "ispsg" && <IspsgDetails />}

            <ContentPlaceholder>services proposés par {a.name} et présentation de l&apos;équipe.</ContentPlaceholder>

            <nav aria-label="Navigation entre activités" className="grid gap-3 border-t pt-7 sm:grid-cols-2">
              <Link href={activityHref(prev)} className="flex flex-col gap-1 rounded-[10px] border border-[#e1e6eb] px-5 py-4.5 text-foreground no-underline transition-colors duration-150 hover:border-primary hover:text-foreground">
                <span className="flex items-center gap-1.5 text-[13px] text-subtle-foreground">
                  <ChevronLeft className="size-3.5" aria-hidden />
                  Activité précédente
                </span>
                <span className="text-[17px] font-semibold">{prev.name}</span>
              </Link>
              <Link href={activityHref(next)} className="flex flex-col items-end gap-1 rounded-[10px] border border-[#e1e6eb] px-5 py-4.5 text-right text-foreground no-underline transition-colors duration-150 hover:border-primary hover:text-foreground">
                <span className="flex items-center gap-1.5 text-[13px] text-subtle-foreground">
                  Activité suivante
                  <ChevronRight className="size-3.5" aria-hidden />
                </span>
                <span className="text-[17px] font-semibold">{next.name}</span>
              </Link>
            </nav>
          </div>

          <aside aria-labelledby="h-infos" className="flex flex-col gap-5.5 rounded-2xl border border-[#e1e6eb] bg-[#f8fafb] p-7 lg:sticky lg:top-28">
            <h2 id="h-infos" className="text-lg font-semibold text-heading">
              Informations utiles
            </h2>
            <dl className="flex flex-col [&>div]:border-t [&>div:last-child]:border-b">
              <Info label="Secteur" icon={Layers}>
                {a.category}
              </Info>
              <Info label="Rattachement" icon={Building2}>
                Tsara Groupe
              </Info>
              <Info label="Site officiel" icon={Globe}>
                {!a.website && <span className="font-normal text-subtle-foreground">Pas de site dédié</span>}
                {a.website?.status === "live" && (
                  <a href={`https://${a.website.domain}`} target="_blank" rel="noopener" className="inline-flex items-center gap-1">
                    {a.website.domain} <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                )}
                {a.website?.status === "planned" && (
                  <>
                    {a.website.domain}
                    <br />
                    <span className="text-[13px] font-normal text-subtle-foreground">en préparation</span>
                  </>
                )}
              </Info>
              <Info label="Contact" icon={Mail}>
                <a href={`mailto:${a.slug === "ispsg" ? ispsgFacts.email : site.contact.email}`}>
                  {a.slug === "ispsg" ? ispsgFacts.email : site.contact.email}
                </a>
              </Info>
              {a.slug === "ispsg" && (
                <Info label="Téléphone" icon={Phone}>
                  <a href={`tel:+261${ispsgFacts.phones[0].replaceAll(" ", "").slice(1)}`}>{ispsgFacts.phones[0]}</a>
                </Info>
              )}
            </dl>
            <div className="flex flex-col gap-2.5">
              <Button asChild size="lg" className="w-full">
                <Link href="/contact">
                  Contacter {a.name} <ArrowRight aria-hidden />
                </Link>
              </Button>
              {a.website?.status === "live" && (
                <Button asChild size="lg" variant="outline" className="w-full">
                  <a href={`https://${a.website.domain}`} target="_blank" rel="noopener">
                    Visiter le site <ArrowUpRight aria-hidden />
                  </a>
                </Button>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="h-autres" className="bg-secondary">
        <div className="container-site flex flex-col gap-7 py-14 md:py-24">
          <h2 id="h-autres" className="text-[clamp(1.3125rem,2.1vw,1.625rem)] font-semibold tracking-tight text-heading">
            Les autres activités du groupe
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={activityHref(o)}
                  className="flex items-center gap-4 rounded-xl border bg-white p-3 text-foreground no-underline transition-[box-shadow,border-color] duration-200 hover:border-border-strong hover:text-foreground hover:shadow-[0_10px_24px_rgba(11,36,71,0.08)]"
                >
                  <Image src={o.image.src} alt="" width={76} height={76} className="size-19 shrink-0 rounded-lg object-cover" />
                  <span className="flex flex-1 flex-col gap-1">
                    <span className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.1em] text-brand-green uppercase">
                      <SectorIcon activity={o} className="size-3.5" />
                      {o.category}
                    </span>
                    <span className="text-base font-semibold">{o.name}</span>
                  </span>
                  <ArrowRight className="mr-2 size-4 text-primary" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTASection />
    </>
  );
}

function IspsgDetails() {
  return (
    <section aria-labelledby="h-ispsg-programs" className="overflow-hidden rounded-xl border bg-[#f8fafc]">
      <div className="border-b bg-[#123f91] px-6 py-5 text-white md:px-8">
        <p className="flex items-center gap-2 text-sm font-medium text-[#75eef1]">
          <GraduationCap className="size-4" aria-hidden /> Formation paramédicale
        </p>
        <h2 id="h-ispsg-programs" className="mt-2 text-2xl font-semibold text-white">Programmes habilités</h2>
      </div>
      <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
        <div className="flex flex-col gap-3">
          {ispsgFacts.programs.map((program) => (
            <p key={program} className="flex items-center gap-3 font-semibold text-heading">
              <CheckCircle2 className="size-5 text-[#167a87]" aria-hidden /> {program}
            </p>
          ))}
        </div>
        <dl className="flex flex-col gap-4 text-sm">
          <div className="flex gap-3">
            <Clock3 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <div><dt className="font-semibold text-heading">Durée</dt><dd className="mt-0.5 text-muted-foreground">{ispsgFacts.duration}</dd></div>
          </div>
          <div className="flex gap-3">
            <FileCheck2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            <div><dt className="font-semibold text-heading">Diplôme</dt><dd className="mt-0.5 text-muted-foreground">{ispsgFacts.diploma}</dd></div>
          </div>
        </dl>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-white px-6 py-4 text-sm md:px-8">
        <span className="text-muted-foreground">{ispsgFacts.authorization}</span>
        <a href="https://cnlegis.gov.mg/uploads/A31308-2023-VF.pdf" target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 font-semibold no-underline hover:underline">
          Consulter l&apos;arrêté <ArrowUpRight className="size-4" aria-hidden />
        </a>
      </div>
    </section>
  );
}

function Info({ label, icon: Icon, children }: { label: string; icon: LucideIcon; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 py-3.5">
      <dt className="flex items-center gap-2 text-sm text-subtle-foreground">
        <Icon className="size-3.75 text-[#8a95a1]" aria-hidden />
        {label}
      </dt>
      <dd className="text-right text-[15px] font-semibold">{children}</dd>
    </div>
  );
}
