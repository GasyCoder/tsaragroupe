import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Layers3, MapPin } from "lucide-react";
import { SectorIcon } from "@/components/sector-icon";
import { Button } from "@/components/ui/button";
import { activities, activityHref, type Activity } from "@/lib/data/activities";

const clinic = activities.find((activity) => activity.slug === "clinique-saint-georges")!;
const transport = activities.find((activity) => activity.slug === "tsaratrans")!;
const agriculture = activities.find((activity) => activity.slug === "tsaragri")!;

const activityNavigation = [
  clinic,
  activities.find((activity) => activity.slug === "ispsg")!,
  agriculture,
  transport,
  activities.find((activity) => activity.slug === "tsarashop")!,
  activities.find((activity) => activity.slug === "tsaraservice")!,
  activities.find((activity) => activity.slug === "tsarapharma")!,
  activities.find((activity) => activity.slug === "tsaranews")!,
];

function ActivityCard({ activity, main = false }: { activity: Activity; main?: boolean }) {
  const location = main ? activity.locations?.[0] : undefined;

  return (
    <Link
      href={activityHref(activity)}
      aria-label={`Découvrir ${activity.name}`}
      className="group relative block h-full overflow-hidden rounded-2xl border border-white/14 bg-muted text-white no-underline shadow-[0_14px_34px_rgba(3,15,31,0.24)] hover:text-white"
    >
      <Image
        src={activity.image.src}
        alt={activity.image.alt}
        fill
        priority
        sizes={main ? "(min-width: 1024px) 420px, 100vw" : "(min-width: 1024px) 250px, 50vw"}
        className="object-cover transition-transform duration-300 group-hover:scale-[1.025]"
      />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-navy/90 via-navy/25 to-transparent transition-opacity duration-300 group-hover:opacity-95" />
      <span className={main ? "absolute inset-x-0 bottom-0 p-5 md:p-6" : "absolute inset-x-0 bottom-0 p-4"}>
        <span className="mb-1.5 flex items-center gap-2 text-xs font-medium text-white/78">
          <SectorIcon activity={activity} className="size-4" strokeWidth={1.8} />
          {activity.sector}
        </span>
        <span className={main ? "flex items-center justify-between gap-4 text-xl font-semibold" : "flex items-center justify-between gap-3 text-base font-semibold"}>
          {activity.name}
          <ArrowUpRight className="size-4 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-80" aria-hidden />
        </span>
        {location && <span className="mt-1 block text-sm text-white/72">{location}</span>}
      </span>
    </Link>
  );
}

export function Hero() {
  return (
    <>
      <section className="landing-hero relative overflow-hidden border-b border-white/10 text-white">
        <div className="container-site grid items-center gap-10 py-11 md:py-14 lg:min-h-[590px] lg:grid-cols-[0.44fr_0.56fr] lg:gap-16 lg:py-16">
          <div className="flex max-w-[540px] flex-col items-start lg:-translate-y-2">
            <p className="mb-5 flex items-center gap-2 text-sm font-medium text-white/68">
              <MapPin className="size-4 text-navy-accent" strokeWidth={1.8} aria-hidden />
              Un groupe malgache, proche du terrain
            </p>
            <h1 className="text-[clamp(2.45rem,4vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-white">
              Des services essentiels,
              <br className="hidden sm:block" /> proches de vous.
            </h1>
            <p className="mt-6 max-w-[530px] text-[17px] leading-[1.72] text-white/72 md:text-lg">
              Présent dans la santé, la formation, l’agriculture, le transport, le commerce et les services, Tsara Groupe développe des activités concrètes, ancrées dans le quotidien à Madagascar.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild variant="light" className="h-12 rounded-[10px] px-5 text-sm shadow-none">
                <Link href="/groupe">
                  Découvrir le Groupe <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline-light" className="h-12 rounded-[10px] border-white/22 px-4 text-sm">
                <Link href="/activites">
                  Explorer nos activités <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-white/62">
              <Layers3 className="size-4 text-navy-accent" strokeWidth={1.7} aria-hidden />
              {activities.length} secteurs d’activité
            </p>
          </div>

          <div className="grid h-[470px] grid-cols-[minmax(0,1.62fr)_minmax(210px,1fr)] grid-rows-2 gap-4 md:h-[500px] lg:h-[480px]">
            <div className="col-span-2 min-h-0 md:col-span-1 md:row-span-2">
              <ActivityCard activity={clinic} main />
            </div>
            <div className="min-h-0">
              <ActivityCard activity={agriculture} />
            </div>
            <div className="min-h-0">
              <ActivityCard activity={transport} />
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Les secteurs d'activité du groupe" className="border-y border-[#e6e8ec] bg-white">
        <div className="container-site flex items-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="mr-4 shrink-0 py-5 text-sm font-semibold text-[#182235] md:mr-6">Nos activités</span>
          <ul className="flex min-w-max flex-1 items-stretch">
            {activityNavigation.map((activity) => (
              <li key={activity.slug} className="flex flex-1">
                <Link
                  href={activityHref(activity)}
                  className="group flex min-h-16 flex-1 items-center gap-2.5 px-3 text-sm font-medium text-[#5f6978] no-underline transition-colors duration-150 hover:bg-[#eef5fc] hover:text-primary md:px-4"
                >
                  <SectorIcon activity={activity} className="size-[18px] shrink-0 text-[#73808f] transition-colors group-hover:text-primary" strokeWidth={1.8} />
                  <span>{activity.sector}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
