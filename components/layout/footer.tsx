import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { activities, activityHref } from "@/lib/data/activities";
import { site } from "@/lib/site";

const groupLinks = [
  { label: "À propos", href: "/groupe" },
  { label: "Nos activités", href: "/activites" },
  { label: "Nos implantations", href: "/implantations" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title} className="flex flex-col gap-3.5">
      <h2 className="font-sans text-eyebrow font-semibold text-white uppercase">{title}</h2>
      <ul className="flex flex-col gap-2.5 text-[15px]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[#c3d1df] no-underline hover:text-white hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-[#c3d1df]">
      <div className="container-site flex flex-col gap-14 pt-14 pb-7 md:pt-22">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4.5">
            <Image
              src="/images/logo-tsara-groupe.png"
              alt="Tsara Groupe"
              width={2060}
              height={380}
              className="h-auto w-[176px] brightness-0 invert"
            />
            <p className="text-[15px]">{site.tagline}.</p>
            <address className="flex flex-col gap-2.5 text-[14.5px] not-italic">
              <span className="flex items-center gap-2.5">
                <MapPin className="size-3.75 text-navy-accent" aria-hidden />
                {site.contact.city}, {site.contact.country}
              </span>
              <a href={`mailto:${site.contact.email}`} className="flex items-center gap-2.5 text-white hover:text-white">
                <Mail className="size-3.75 text-navy-accent" aria-hidden />
                {site.contact.email}
              </a>
              <a href={`tel:${site.contact.phone}`} className="flex items-center gap-2.5 text-white hover:text-white">
                <Phone className="size-3.75 text-navy-accent" aria-hidden />
                {site.contact.phoneDisplay}
              </a>
            </address>
          </div>
          <FooterColumn title="Groupe" links={groupLinks} />
          <FooterColumn title="Activités" links={activities.map((a) => ({ label: a.name, href: activityHref(a) }))} />
          <FooterColumn title="Liens" links={legalLinks} />
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-white/12 pt-6 text-sm text-navy-subtle">
          <span>© {new Date().getFullYear()} Tsara Groupe. Tous droits réservés.</span>
          <span>tsaragroupe.com</span>
        </div>
      </div>
    </footer>
  );
}
