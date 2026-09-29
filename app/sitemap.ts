import type { MetadataRoute } from "next";
import { activities, activityHref } from "@/lib/data/activities";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/groupe", "/activites", "/implantations", "/actualites", "/contact", "/mentions-legales", "/politique-confidentialite"];
  return [
    ...staticRoutes.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/mentions") || path.startsWith("/politique") ? 0.2 : 0.8,
    })),
    ...activities.map((a) => ({ url: `${site.url}${activityHref(a)}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
