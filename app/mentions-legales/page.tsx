import type { Metadata } from "next";
import { LegalBlock, LegalContent } from "@/components/legal-content";
import { InlinePlaceholder } from "@/components/placeholder";
import { PageHeader } from "@/components/sections/page-header";
import { leadership, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
};

const rows: [string, React.ReactNode][] = [
  ["Raison sociale", "Tsara Groupe"],
  [`${leadership.ceo.fullTitle} (${leadership.ceo.title})`, leadership.ceo.name],
  ["Adresse", `${site.contact.city}, ${site.contact.country}`],
  ["E-mail", <a key="e" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>],
  ["Téléphone", <a key="t" href={`tel:${site.contact.phone}`}>{site.contact.phoneDisplay}</a>],
  ["Forme juridique", <InlinePlaceholder key="f" />],
  ["NIF / STAT / RCS", <InlinePlaceholder key="n" />],
  ["Directeur de la publication", <InlinePlaceholder key="d" />],
];

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Informations légales"
        title="Mentions légales"
        lead="Informations relatives à l'éditeur et à l'hébergement du site tsaragroupe.com."
      />
      <LegalContent>
        <LegalBlock title="Éditeur du site">
          <dl className="flex flex-col border-t">
            {rows.map(([k, v]) => (
              <div key={k} className="grid gap-x-6 gap-y-1 border-b py-3.5 sm:grid-cols-2">
                <dt className="text-subtle-foreground">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </LegalBlock>
        <LegalBlock title="Hébergement">
          <p>
            <InlinePlaceholder />
          </p>
        </LegalBlock>
        <LegalBlock title="Propriété intellectuelle">
          <p>
            L&apos;ensemble des contenus de ce site (textes, logos, photographies) est la propriété de Tsara Groupe ou de ses entités, sauf
            mention contraire. Toute reproduction sans autorisation préalable est interdite.
          </p>
        </LegalBlock>
        <LegalBlock title="Sites des entités du groupe">
          <p>Les sites cliniquesaintgeorges.mg, tsaraservice.mg, tsaragri.mg et tsaranews.mg disposent de leurs propres mentions légales.</p>
        </LegalBlock>
      </LegalContent>
    </>
  );
}
