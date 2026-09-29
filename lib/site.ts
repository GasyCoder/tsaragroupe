export const site = {
  name: "Tsara Groupe",
  url: "https://tsaragroupe.com",
  tagline: "Groupe multisectoriel malgache",
  description:
    "Découvrez Tsara Groupe et ses activités dans la santé, la formation paramédicale, l'agriculture, le transport, les services, le commerce, la pharmacie et les médias à Madagascar.",
  contact: {
    email: "contact@tsaragroupe.com",
    phone: "+26132022252",
    phoneDisplay: "+261 32 02 222 52",
    city: "Mampikony",
    country: "Madagascar",
  },
} as const;

export const leadership = {
  ceo: {
    name: "M. Andrien RIVO",
    title: "PDG",
    fullTitle: "Président-Directeur Général",
    photo: { src: "/images/andrien-rivo-pdg.png", alt: "Portrait de M. Andrien RIVO, PDG de Tsara Groupe" },
  },
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Le Groupe", href: "/groupe" },
  { label: "Activités", href: "/activites" },
  { label: "Implantations", href: "/implantations" },
  { label: "Actualités", href: "/actualites" },
];

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
