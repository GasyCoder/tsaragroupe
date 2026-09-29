import type { Metadata } from "next";
import { LegalBlock, LegalContent } from "@/components/legal-content";
import { InlinePlaceholder } from "@/components/placeholder";
import { PageHeader } from "@/components/sections/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: "/politique-confidentialite" },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHeader
        eyebrow="Informations légales"
        title="Politique de confidentialité"
        lead="Comment Tsara Groupe traite les données transmises via ce site."
      />
      <LegalContent>
        <LegalBlock title="Données collectées">
          <p>
            Le formulaire de contact recueille : nom et prénom, organisation, adresse e-mail, téléphone, activité concernée, objet et
            message. Seuls le nom, l&apos;e-mail, l&apos;objet et le message sont obligatoires.
          </p>
        </LegalBlock>
        <LegalBlock title="Utilisation">
          <p>
            Ces données servent uniquement à répondre à votre demande et, si nécessaire, à la transmettre à l&apos;entité du groupe
            concernée. Elles ne sont ni vendues ni cédées à des tiers.
          </p>
        </LegalBlock>
        <LegalBlock title="Durée de conservation">
          <p>
            <InlinePlaceholder />
          </p>
        </LegalBlock>
        <LegalBlock title="Vos droits">
          <p>
            Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données en écrivant à{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
          </p>
        </LegalBlock>
        <LegalBlock title="Cookies">
          <p>
            Ce site n&apos;utilise pas de cookies publicitaires.
          </p>
        </LegalBlock>
      </LegalContent>
    </>
  );
}
