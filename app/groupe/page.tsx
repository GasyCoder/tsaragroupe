import type { Metadata } from "next";
import { ActivityGrid } from "@/components/sections/activity-grid";
import { CTASection } from "@/components/sections/cta-section";
import { ClinicHistory } from "@/components/sections/clinic-history";
import { Ecosystem } from "@/components/sections/ecosystem";
import { PageHeader } from "@/components/sections/page-header";
import { Presentation } from "@/components/sections/presentation";
import { Eyebrow } from "@/components/sections/section-header";
import { Values } from "@/components/sections/values";
import { leadership } from "@/lib/site";

export const metadata: Metadata = {
  title: "Le Groupe",
  description: `Présentation de Tsara Groupe, groupe multisectoriel malgache basé à Mampikony, dirigé par ${leadership.ceo.name}, PDG.`,
  alternates: { canonical: "/groupe" },
};

export default function GroupePage() {
  return (
    <>
      <PageHeader
        eyebrow="Le Groupe"
        title="Tsara Groupe"
        lead={`Groupe multisectoriel malgache réunissant plusieurs entreprises et initiatives complémentaires, dirigé par ${leadership.ceo.name}, PDG.`}
        image={{ src: "/images/tsaragri.jpg", alt: "Parcelle agricole TsarAgri" }}
      />
      <Presentation showMoreLink={false} />
      <ClinicHistory />

      <section aria-labelledby="h-vision" className="px-5 pb-18 md:px-10 md:pb-30">
        <div className="mx-auto grid max-w-[1160px] gap-x-20 gap-y-7 rounded-2xl bg-primary p-9 text-white md:p-18 lg:grid-cols-[1.35fr_1fr]">
          <div className="flex flex-col gap-3.5">
            <Eyebrow tone="dark">Vision</Eyebrow>
            {/* TODO(direction) : formulation à valider */}
            <h2 id="h-vision" className="text-[clamp(1.3125rem,2.2vw,1.75rem)] leading-snug font-semibold tracking-tight text-white">
              Développer, dans la durée, des activités utiles aux territoires où le groupe est présent.
            </h2>
          </div>
          <p className="self-end text-[17px] leading-[1.7] text-[#d3dee9]">
            Le groupe s&apos;appuie sur des entités complémentaires et une organisation commune pour faire évoluer progressivement ses activités.
          </p>
        </div>
      </section>

      <ActivityGrid />
      <Ecosystem />
      <Values eyebrow="Valeurs" title="Les principes qui guident le groupe" />
      <CTASection />
    </>
  );
}
