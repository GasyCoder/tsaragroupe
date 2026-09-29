import type { Metadata } from "next";
import { ClinicLocations } from "@/components/sections/clinic-locations";
import { CTASection } from "@/components/sections/cta-section";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = {
  title: "Nos implantations",
  description: "La Clinique Saint Georges est présente à Mampikony, Ambondromamy et Boriziny. Siège de Tsara Groupe : Mampikony.",
  alternates: { canonical: "/implantations" },
};

export default function ImplantationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nos implantations"
        title="Nos implantations"
        lead="La Clinique Saint Georges est présente à Mampikony, Ambondromamy et Boriziny. Le siège du groupe est situé à Mampikony."
        image={{ src: "/images/clinique-saint-georges-mampikony.jpg", alt: "Bâtiment et jardin de la Clinique Saint Georges de Mampikony" }}
      />
      <ClinicLocations tone="light" />
      <CTASection />
    </>
  );
}
