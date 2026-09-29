import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/section-header";
import { formatNewsDate, getLatestNews, type NewsItem } from "@/lib/data/news";

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="group flex h-full flex-col rounded-xl border bg-white p-3 shadow-[0_1px_2px_rgba(16,24,40,0.03)] transition-shadow duration-200 hover:shadow-[0_10px_28px_rgba(18,48,82,0.08)]">
      <div className="relative aspect-16/10 overflow-hidden rounded-lg bg-muted">
        {item.image && <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 380px, 100vw" className="object-cover" />}
        {item.isDemo && (
          <span className="absolute top-3.5 left-3.5 rounded-full bg-warning-bg px-2.75 py-1.25 text-xs font-semibold tracking-[0.06em] text-warning-foreground uppercase">
            Exemple
          </span>
        )}
      </div>
      <div className="mt-4 flex items-center gap-3.5 px-2 text-[13px] text-subtle-foreground">
        <span className="font-semibold text-primary">{item.category}</span>
        <span aria-hidden className="size-1 rounded-full bg-[#b5bfca]" />
        <span className="flex items-center gap-1.5">
          <Calendar className="size-3.5" aria-hidden />
          {item.date ? <time dateTime={item.date}>{formatNewsDate(item.date)}</time> : formatNewsDate(null)}
        </span>
      </div>
      <h3 className="mt-3 px-2 text-[19px] leading-snug font-semibold tracking-tight text-heading">{item.title}</h3>
      <p className="mt-2 px-2 text-[15px] leading-relaxed text-muted-foreground">{item.excerpt}</p>
      {item.url ? (
        <a href={item.url} className="mt-4 inline-flex items-center gap-1.5 px-2 pb-2 text-sm font-semibold">
          Lire la suite <ArrowRight className="size-3.75" aria-hidden />
        </a>
      ) : (
        <span aria-disabled="true" className="mt-4 inline-flex items-center gap-1.5 px-2 pb-2 text-sm font-semibold text-[#8a95a1]">
          Lire la suite <ArrowRight className="size-3.75" aria-hidden />
        </span>
      )}
    </article>
  );
}

export async function NewsSection({ showAllLink = true, limit = 3 }: { showAllLink?: boolean; limit?: number }) {
  const news = await getLatestNews(limit);
  const isDemo = news.some((n) => n.isDemo);
  return (
    <section aria-labelledby="h-news" className="bg-white">
      <div className="container-site section-y flex flex-col gap-9 md:gap-13">
        <SectionHeader
          id="h-news"
          eyebrow="Actualités"
          title="Actualités du Groupe"
          action={
            <>
              {showAllLink && (
                <Button asChild variant="outline">
                  <Link href="/actualites">Toutes les actualités <ArrowRight aria-hidden /></Link>
                </Button>
              )}
              <Button asChild variant="ghost" className="bg-secondary text-primary">
                <a href="https://tsaranews.mg" target="_blank" rel="noopener">
                  tsaranews.mg <ArrowUpRight aria-hidden />
                </a>
              </Button>
            </>
          }
        />
        <ul className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <li key={n.id}>
              <NewsCard item={n} />
            </li>
          ))}
        </ul>
        {isDemo && (
          <p className="border-t pt-5 text-sm text-subtle-foreground">
            Articles d&apos;exemple. Les actualités réelles seront publiées ici depuis tsaranews.mg.
          </p>
        )}
      </div>
    </section>
  );
}
