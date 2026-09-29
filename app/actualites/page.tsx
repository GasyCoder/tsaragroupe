import type { Metadata } from "next";
import { CTASection } from "@/components/sections/cta-section";
import { NewsSection } from "@/components/sections/news-section";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Les actualités de Tsara Groupe et de ses activités, publiées notamment via tsaranews.mg.",
  alternates: { canonical: "/actualites" },
};

export const revalidate = 900;

export default function ActualitesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Actualités"
        title="Actualités du Groupe"
        lead="Les actualités du groupe et de ses activités, publiées notamment via tsaranews.mg."
        image={{ src: "/images/tsaranews.jpg", alt: "Tournage TsaraNews" }}
      />
      <NewsSection showAllLink={false} limit={12} />
      <CTASection />
    </>
  );
}
