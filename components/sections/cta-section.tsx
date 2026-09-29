import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function CTASection({
  title = "Une question sur Tsara Groupe ou l'une de ses activités ?",
  text = "Écrivez-nous, votre demande sera transmise à l'entité concernée.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-white px-5 py-14 md:px-10 md:py-24">
      <div className="relative mx-auto max-w-[1160px] overflow-hidden rounded-2xl bg-navy text-white">
        <Image src="/images/tsaragri.jpg" alt="" aria-hidden fill sizes="1160px" className="object-cover opacity-22" />
        <div className="relative flex flex-wrap items-center justify-between gap-x-12 gap-y-7 p-9 md:p-18">
          <div className="flex max-w-[620px] flex-col gap-3">
            <h2 className="text-[clamp(1.375rem,2.4vw,1.875rem)] leading-tight font-semibold tracking-tight text-white">{title}</h2>
            <p className="text-[17px] leading-relaxed text-[#d3dee9]">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="light">
              <Link href="/contact">Nous contacter <ArrowRight aria-hidden /></Link>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <a href={`tel:${site.contact.phone}`}>
                <Phone aria-hidden />
                {site.contact.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
