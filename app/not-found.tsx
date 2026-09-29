import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-site section-y flex max-w-2xl flex-col gap-5">
      <p className="text-eyebrow font-semibold tracking-[0.08em] text-primary uppercase">Erreur 404</p>
      <h1 className="text-h1 font-semibold text-heading">Cette page n&apos;existe pas</h1>
      <p className="text-lead text-muted-foreground">L&apos;adresse est peut-être incorrecte, ou la page a été déplacée.</p>
      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href="/">Retour à l&apos;accueil</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/activites">Nos activités</Link>
        </Button>
      </div>
    </section>
  );
}
