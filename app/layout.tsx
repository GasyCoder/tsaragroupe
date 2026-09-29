import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { BottomNav } from "@/components/layout/bottom-nav";
import { UtilityBar } from "@/components/layout/utility-bar";
import { activities } from "@/lib/data/activities";
import { leadership, site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Tsara Groupe | Groupe multisectoriel à Madagascar", template: "%s | Tsara Groupe" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_MG",
    url: site.url,
    siteName: site.name,
    title: "Tsara Groupe | Groupe multisectoriel à Madagascar",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/images/logo-tsara-groupe.png`,
  email: site.contact.email,
  telephone: site.contact.phone,
  address: { "@type": "PostalAddress", addressLocality: site.contact.city, addressCountry: "MG" },
  employee: {
    "@type": "Person",
    name: "Andrien RIVO",
    jobTitle: `${leadership.ceo.fullTitle} (${leadership.ceo.title})`,
    image: `${site.url}${leadership.ceo.photo.src}`,
  },
  subOrganization: activities.map((a) => ({
    "@type": "Organization",
    name: a.name,
    ...(a.website?.status === "live" ? { url: `https://${a.website.domain}` } : {}),
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="pb-[calc(66px+env(safe-area-inset-bottom))] font-sans md:pb-0">
        <a
          href="#main"
          className="absolute -left-[9999px] top-2 z-50 rounded-sm bg-primary px-4 py-2.5 text-primary-foreground focus:left-2"
        >
          Aller au contenu
        </a>
        <UtilityBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollToTop />
        <BottomNav />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </body>
    </html>
  );
}
