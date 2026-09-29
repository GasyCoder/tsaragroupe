import type { Metadata } from "next";
import { ActivityGrid } from "@/components/sections/activity-grid";
import { CTASection } from "@/components/sections/cta-section";
import { Ecosystem } from "@/components/sections/ecosystem";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = {
  title: "Nos activités",
  description:
    "Santé, formation paramédicale, transport, agriculture, services, commerce, pharmacie et médias : les activités de Tsara Groupe à Madagascar.",
  alternates: { canonical: "/activites" },
};

export default function ActivitesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nos activités"
        title="Nos activités"
        lead="Tsara Groupe intervient dans huit secteurs à travers des entités qui conservent chacune leur identité."
        image={{ src: "/images/tsaratrans.jpg", alt: "Autocar TsaraTrans" }}
      />
      <ActivityGrid />
      <Ecosystem />
      <CTASection />
    </>
  );
}
