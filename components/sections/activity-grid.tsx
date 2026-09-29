import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectorIcon } from "@/components/sector-icon";
import { SectionHeader } from "@/components/sections/section-header";
import { activities, activityHref, type Activity } from "@/lib/data/activities";

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Link
      href={activityHref(activity)}
      className="group flex h-full flex-col overflow-hidden rounded-xl border bg-white text-foreground no-underline shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-[border-color,box-shadow] duration-200 hover:border-border-strong hover:text-foreground hover:shadow-[0_10px_30px_rgba(18,48,82,0.08)]"
    >
      <div className="relative aspect-[4/2.7] overflow-hidden bg-muted">
        <Image
          src={activity.image.src}
          alt={activity.image.alt}
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
          <SectorIcon activity={activity} className="size-4" strokeWidth={1.8} />
          {activity.category}
        </span>
        <h3 className="text-xl font-semibold tracking-tight text-heading">{activity.name}</h3>
        <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-muted-foreground">{activity.description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Découvrir <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

export function ActivityGrid() {
  return (
    <section aria-labelledby="h-activites" className="bg-secondary">
      <div className="container-site section-y flex flex-col gap-10 md:gap-13">
        <SectionHeader
          id="h-activites"
          eyebrow="Nos activités"
          title={`${activities.length} entités au service du quotidien`}
          action={
            <p className="max-w-[420px] text-[16px] leading-relaxed text-muted-foreground">
              Des expertises complémentaires, portées par des entreprises qui conservent chacune leur identité.
            </p>
          }
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity) => (
            <li key={activity.slug}>
              <ActivityCard activity={activity} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
