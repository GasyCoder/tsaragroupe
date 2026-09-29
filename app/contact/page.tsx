import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-section";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Tsara Groupe ou l'une de ses activités : contact@tsaragroupe.com, +261 32 02 222 52, Mampikony, Madagascar.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Nous contacter"
        lead="Pour toute demande concernant Tsara Groupe ou l'une de ses activités, vous pouvez contacter notre équipe."
      />
      <ContactSection withHeading={false} />
    </>
  );
}
