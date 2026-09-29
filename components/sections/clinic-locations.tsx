import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/sections/section-header";
import { activityHref, clinic, clinicLocations } from "@/lib/data/activities";
import { cn } from "@/lib/utils";

type Tone = "dark" | "light";

export function LocationCards({ tone = "light" }: { tone?: Tone }) {
  const dark = tone === "dark";
  return (
    <ol className="grid gap-0 sm:grid-cols-3">
      {clinicLocations.map((l, i) => (
        <li
          key={l.city}
          className={cn(
            "flex flex-col gap-2 border-t px-0 py-4 sm:border-t-0 sm:border-l sm:px-5 sm:first:border-l-0 sm:first:pl-0",
            dark ? "border-white/18" : "border-border",
          )}
        >
          <span className={cn("flex items-center gap-2 text-[13px] font-medium", dark ? "text-navy-accent" : "text-primary")}> 
            <MapPin className="size-4" aria-hidden />
            Implantation {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={cn("text-[19px] font-semibold tracking-tight", dark ? "text-white" : "text-heading")}>{l.city}</h3>
          <span className={cn("text-sm leading-snug", dark ? "text-navy-muted" : "text-muted-foreground")}>{l.label}</span>
        </li>
      ))}
    </ol>
  );
}

export function ClinicLocations({ tone = "dark" }: { tone?: Tone }) {
  const dark = tone === "dark";
  return (
    <section aria-labelledby="h-clinique" className={dark ? "bg-navy text-white" : "bg-white"}>
      <div className="container-site section-y grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-18">
        <div className="flex flex-col gap-5.5">
          <Eyebrow tone={dark ? "dark" : "light"}>Santé · Clinique Saint Georges</Eyebrow>
          <h2 id="h-clinique" className={cn("text-h2 font-semibold", dark ? "text-white" : "text-heading")}>
            Une présence dans plusieurs villes
          </h2>
          <p className={cn("text-[17.5px] leading-[1.7]", dark ? "text-navy-muted" : "text-muted-foreground")}>{clinic.description}</p>
          <div className="mt-2.5">
            <LocationCards tone={tone} />
          </div>
          <p className={cn("text-sm", dark ? "text-navy-subtle" : "text-subtle-foreground")}>
            Adresses, horaires et services de chaque établissement : bientôt disponibles.
          </p>
          <div className="mt-1 flex flex-wrap gap-3">
            <Button asChild size="default" variant={dark ? "light" : "default"}>
              <Link href={activityHref(clinic)}>
                Découvrir la Clinique <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="default" variant={dark ? "outline-light" : "outline"}>
              <a href="https://cliniquesaintgeorges.mg" target="_blank" rel="noopener">
                cliniquesaintgeorges.mg <ArrowUpRight aria-hidden />
              </a>
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/3.6] max-h-[560px] overflow-hidden rounded-xl bg-[#12314f]">
          <Image
            src={clinic.image.src}
            alt="Entrée de la Clinique Saint Georges avec une ambulance stationnée"
            fill
            sizes="(min-width: 1024px) 480px, 100vw"
            className="object-cover object-[32%_center]"
          />
        </div>
      </div>
    </section>
  );
}
