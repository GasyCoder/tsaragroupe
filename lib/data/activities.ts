export type WebsiteStatus = "live" | "planned";

export interface Activity {
  slug: string;
  name: string;
  /** Catégorie affichée sur les cartes et pages */
  category: string;
  /** Libellé court pour l'organigramme */
  sector: string;
  description: string;
  image: { src: string; alt: string };
  website?: { domain: string; status: WebsiteStatus };
  locations?: string[];
}

export const activities: Activity[] = [
  {
    slug: "clinique-saint-georges",
    name: "Clinique Saint Georges",
    category: "Santé",
    sector: "Santé",
    description:
      "La Clinique Saint Georges développe une offre de soins de proximité à travers plusieurs implantations.",
    image: { src: "/images/clinique-saint-georges-mampikony.jpg", alt: "Bâtiment et jardin de la Clinique Saint Georges de Mampikony" },
    website: { domain: "cliniquesaintgeorges.mg", status: "live" },
    locations: ["Mampikony", "Ambondromamy", "Boriziny"],
  },
  {
    slug: "ispsg",
    name: "ISPSG",
    category: "Enseignement supérieur paramédical",
    sector: "Formation",
    description:
      "L’Institut Supérieur Paramédical Saint Georges forme à Mampikony des sages-femmes et des infirmiers généralistes.",
    image: { src: "/images/ispsg-brand.svg", alt: "Identité de l’Institut Supérieur Paramédical Saint Georges à Mampikony" },
  },
  {
    slug: "tsaratrans",
    name: "TsaraTrans",
    category: "Transport",
    sector: "Transport",
    description: "Activités de transport et solutions de mobilité développées au sein de Tsara Groupe.",
    image: { src: "/images/tsaratrans.jpg", alt: "Autocar TsaraTrans sur une route" },
  },
  {
    slug: "tsaragri",
    name: "TsarAgri",
    category: "Agriculture",
    sector: "Agriculture",
    description:
      "Activités agricoles et initiatives contribuant au développement de la production et de la chaîne de valeur agricole.",
    image: { src: "/images/tsaragri.jpg", alt: "Agriculteur au travail dans une parcelle cultivée" },
    website: { domain: "tsaragri.mg", status: "planned" },
  },
  {
    slug: "tsaraservice",
    name: "TsaraService",
    category: "Services",
    sector: "Services",
    description: "Une branche dédiée aux différentes prestations de services proposées par le groupe.",
    image: { src: "/images/tsaraservice.jpg", alt: "Agent TsaraService réalisant un entretien de sol" },
    website: { domain: "tsaraservice.mg", status: "live" },
  },
  {
    slug: "tsarashop",
    name: "TsaraShop",
    category: "Commerce",
    sector: "Commerce",
    description:
      "Activité commerciale et distribution de produits à destination des particuliers et professionnels.",
    image: { src: "/images/tsarashop.jpg", alt: "Vendeuse TsaraShop remettant un sac à une cliente" },
  },
  {
    slug: "tsarapharma",
    name: "TsaraPharma",
    category: "Pharmacie / Santé",
    sector: "Pharmacie",
    description: "Activité spécialisée dans le domaine pharmaceutique et les produits liés à la santé.",
    image: { src: "/images/tsarapharma.jpg", alt: "Pharmacienne TsaraPharma consultant un produit" },
  },
  {
    slug: "tsaranews",
    name: "TsaraNews",
    category: "Média & Communication",
    sector: "Média",
    description:
      "Plateforme d'information, d'actualité et de communication développée au sein de l'écosystème Tsara.",
    image: { src: "/images/tsaranews.jpg", alt: "Caméra de tournage TsaraNews" },
    website: { domain: "tsaranews.mg", status: "live" },
  },
];

export const activityNumber = (a: Activity) => String(activities.indexOf(a) + 1).padStart(2, "0");

export const getActivity = (slug: string) => activities.find((a) => a.slug === slug);

export const activityHref = (a: Activity) => `/activites/${a.slug}`;

export const clinic = activities[0];

export const clinicLocations = clinic.locations!.map((city) => ({
  city,
  label: `Clinique Saint Georges · ${city}`,
}));

/** Options du champ « Activité concernée » du formulaire */
export const contactActivityOptions = [
  "Tsara Groupe",
  "Clinique Saint Georges",
  "ISPSG",
  "TsaraTrans",
  "TsarAgri",
  "TsaraService",
  "TsaraShop",
  "TsaraPharma",
  "TsaraNews",
  "Autre",
] as const;

export type ContactActivity = (typeof contactActivityOptions)[number];

export const clinicHistory = {
  founders: "Dr Odilon Tsarahita et Mme Adeline Tsarahita",
  founderLife: "16 juin 1952 – 17 janvier 2022",
  summary:
    "La Clinique Saint Georges de Mampikony a été créée par le Dr Odilon Tsarahita et son épouse, Mme Adeline Tsarahita. Médecin généraliste spécialisé en échographie et sage-femme d’État, ils ont inscrit leur action dans la proximité et le service de la communauté.",
  legacy:
    "Cet héritage se poursuit aujourd’hui à travers les activités de soins de la Clinique Saint Georges et la formation paramédicale portée par l’ISPSG à Mampikony.",
} as const;

export const ispsgFacts = {
  authorization: "Arrêté n°31308/2023-MESupRES du 17 novembre 2023",
  programs: ["Sage-Femme", "Infirmier Généraliste"],
  duration: "3 ans après le baccalauréat (6 semestres)",
  diploma: "Licence en Paramédicaux",
  address: "Clinique Saint Georges, Lot 2060 D Tsaramandroso, 414 Mampikony",
  phones: ["032 55 313 50", "038 83 728 12"],
  email: "infoispsg@gmail.com",
} as const;
