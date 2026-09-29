export interface NewsItem {
  id: string;
  category: string;
  /** ISO 8601, null tant que l'article n'est pas publié */
  date: string | null;
  title: string;
  excerpt: string;
  url: string | null;
  image: { src: string; alt: string } | null;
  isDemo: boolean;
}

const DEMO_NEWS: NewsItem[] = [
  { id: "demo-1", category: "Santé", title: "Actualité de la Clinique Saint Georges", image: "/images/clinique-saint-georges-mampikony.jpg" },
  { id: "demo-2", category: "Agriculture", title: "Actualité de TsarAgri", image: "/images/tsaragri.jpg" },
  { id: "demo-3", category: "Groupe", title: "Communiqué de Tsara Groupe", image: "/images/tsaranews.jpg" },
].map((n) => ({
  ...n,
  date: null,
  excerpt: "Résumé court de l'article, alimenté par les publications de tsaranews.mg.",
  url: null,
  image: { src: n.image, alt: "" },
  isDemo: true,
}));

/**
 * Point d'intégration API.
 * Définir NEWS_API_URL (ex. flux JSON de tsaranews.mg) pour afficher les vrais articles.
 * Le flux doit renvoyer un tableau compatible avec NewsItem (sans isDemo).
 */
export async function getLatestNews(limit = 3): Promise<NewsItem[]> {
  const endpoint = process.env.NEWS_API_URL;
  if (endpoint) {
    try {
      const res = await fetch(`${endpoint}?limit=${limit}`, { next: { revalidate: 900 } });
      if (res.ok) {
        const items = (await res.json()) as Omit<NewsItem, "isDemo">[];
        if (items.length) return items.slice(0, limit).map((i) => ({ ...i, isDemo: false }));
      }
    } catch {
      // En cas d'échec, on retombe sur les contenus de démonstration.
    }
  }
  return DEMO_NEWS.slice(0, limit);
}

export const formatNewsDate = (iso: string | null) =>
  iso ? new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(iso)) : "Date de publication";
