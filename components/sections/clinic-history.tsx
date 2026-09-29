import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, GraduationCap, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { activityHref, clinic, clinicHistory } from "@/lib/data/activities";

export function ClinicHistory({ showAction = true }: { showAction?: boolean }) {
  return (
    <section aria-labelledby="h-clinic-history" className="bg-white">
      <div className="container-site section-y grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <div className="grid grid-cols-[1.12fr_0.88fr] gap-3">
            <figure className="m-0">
              <div className="relative aspect-[4/4.2] overflow-hidden rounded-xl bg-muted">
                <Image
                  src="/images/dr-odilon-tsarahita.jpg"
                  alt="Portrait du Dr Odilon Tsarahita, cofondateur de la Clinique Saint Georges"
                  fill
                  sizes="(min-width: 1024px) 300px, 58vw"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="mt-3 text-sm font-semibold text-heading">Dr Odilon Tsarahita</figcaption>
            </figure>
            <figure className="m-0 pt-10">
              <div className="relative aspect-[4/4.35] overflow-hidden rounded-xl bg-muted">
                <Image
                  src="/images/adeline-tsarahita.jpg"
                  alt="Portrait de Mme Adeline Tsarahita, cofondatrice de la Clinique Saint Georges"
                  fill
                  sizes="(min-width: 1024px) 240px, 42vw"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="mt-3 text-sm font-semibold text-heading">Mme Adeline Tsarahita</figcaption>
            </figure>
          </div>
          <div aria-hidden className="mt-5 flex h-1.5 overflow-hidden rounded-full">
            <span className="flex-1 bg-[#284b93]" />
            <span className="flex-1 bg-[#42d6df]" />
            <span className="flex-1 bg-[#ffdd18]" />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-subtle-foreground">Fondateurs de la Clinique Saint Georges de Mampikony</p>
        </div>

        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold text-primary">Notre histoire</p>
          <h2 id="h-clinic-history" className="mt-3 max-w-[620px] text-h2 font-semibold text-heading">
            Une histoire de soins, de proximité et de transmission
          </h2>
          <p className="mt-5 text-[17px] leading-[1.75] text-muted-foreground">{clinicHistory.summary}</p>

          <div className="mt-8 w-full border-y">
            <div className="grid gap-4 py-5 sm:grid-cols-[44px_1fr]">
              <span className="flex size-10 items-center justify-center rounded-lg bg-[#eaf8f9] text-[#167a87]">
                <HeartPulse className="size-5" strokeWidth={1.8} aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold text-heading">Les fondateurs</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                  {clinicHistory.founders}. Le Dr Odilon Tsarahita ({clinicHistory.founderLife}) était médecin généraliste, spécialisé en échographie ; Mme Adeline Tsarahita est sage-femme d’État.
                </p>
              </div>
            </div>
            <div className="grid gap-4 border-t py-5 sm:grid-cols-[44px_1fr]">
              <span className="flex size-10 items-center justify-center rounded-lg bg-[#fff8d6] text-[#8a6b00]">
                <GraduationCap className="size-5" strokeWidth={1.8} aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold text-heading">Des soins à la formation</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{clinicHistory.legacy}</p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            {showAction && (
              <Button asChild>
                <Link href={activityHref(clinic)}>
                  Découvrir la Clinique <ArrowRight aria-hidden />
                </Link>
              </Button>
            )}
            <a
              href="https://cliniquesaintgeorges.wordpress.com/a-propos/fondateurs/"
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold no-underline hover:underline"
            >
              Source historique <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
