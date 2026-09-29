import type { ReactNode } from "react";

/** Bloc technique visible signalant un contenu institutionnel à fournir. Ne jamais remplacer par un texte inventé. */
const SHOW_CONTENT_MARKERS = process.env.NEXT_PUBLIC_SHOW_CONTENT_MARKERS === "true";

export function ContentPlaceholder({ children }: { children: ReactNode }) {
  if (!SHOW_CONTENT_MARKERS) return null;
  return (
    <div className="rounded-sm border border-dashed border-[#c3cad2] bg-[#f7f8f8] px-4.5 py-4 font-mono text-[13px] leading-relaxed text-subtle-foreground">
      Contenu à compléter : {children}
    </div>
  );
}

/** Donnée officielle non encore fournie : affichage sobre côté public */
export function InlinePlaceholder({ children = "En cours de mise à jour" }: { children?: ReactNode }) {
  return <span className="font-normal text-[#8a95a1]">{children}</span>;
}
