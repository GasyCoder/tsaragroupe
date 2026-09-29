import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SectionHeader } from "@/components/sections/section-header";
import type { ContactActivity } from "@/lib/data/activities";
import { site } from "@/lib/site";

const details = [
  { label: "E-mail", value: site.contact.email, href: `mailto:${site.contact.email}`, icon: Mail },
  { label: "Téléphone", value: site.contact.phoneDisplay, href: `tel:${site.contact.phone}`, icon: Phone },
  { label: "Adresse", value: `${site.contact.city}, ${site.contact.country}`, href: undefined, icon: MapPin },
];

export function ContactSection({ withHeading = true, defaultActivity }: { withHeading?: boolean; defaultActivity?: ContactActivity }) {
  return (
    <section aria-labelledby={withHeading ? "h-contact" : undefined} aria-label={withHeading ? undefined : "Formulaire de contact"} className="bg-secondary">
      <div className="container-site section-y flex flex-col gap-9 md:gap-13">
        {withHeading && (
          <SectionHeader
            id="h-contact"
            eyebrow="Contact"
            title="Nous contacter"
            description="Pour toute demande concernant Tsara Groupe ou l'une de ses activités, vous pouvez contacter notre équipe."
          />
        )}
        <div className="grid items-stretch overflow-hidden rounded-xl border bg-white shadow-[0_12px_40px_rgba(18,48,82,0.07)] lg:grid-cols-[0.85fr_1.6fr]">
          <div className="flex flex-col gap-7 bg-navy p-7 text-white md:p-10">
            <div className="flex flex-col gap-2">
              <h3 className="text-[22px] font-semibold text-white">Coordonnées</h3>
              <p className="text-[15px] leading-relaxed text-[#b9c9d9]">Tsara Groupe et l&apos;ensemble de ses entités.</p>
            </div>
            <dl className="flex flex-col gap-5.5">
              {details.map((d) => (
                <div key={d.label} className="flex flex-col gap-1">
                  <dt className="flex items-center gap-2 text-xs font-semibold tracking-[0.1em] text-navy-accent uppercase">
                    <d.icon className="size-3.5" aria-hidden />
                    {d.label}
                  </dt>
                  <dd className="text-[17px] font-semibold">
                    {d.href ? (
                      <a href={d.href} className="text-white hover:text-white">
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-auto border-t border-white/14 pt-5.5 text-[14.5px] leading-relaxed text-[#b9c9d9]">
              Chaque demande est orientée vers l&apos;entité concernée : précisez-la dans le champ « Activité concernée ».
            </p>
          </div>
          <div className="bg-white p-6 md:p-10">
            <ContactForm defaultActivity={defaultActivity} />
          </div>
        </div>
      </div>
    </section>
  );
}
