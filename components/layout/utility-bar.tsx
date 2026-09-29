import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";

/** Bandeau d'informations au-dessus du header (desktop uniquement) */
export function UtilityBar() {
  return (
    <div className="hidden bg-[#102a4c] text-xs leading-none text-[#ccd5df] lg:block">
      <div className="container-site flex h-8.5 items-center justify-between gap-6 py-px">
        <span className="flex items-center gap-2">
          <MapPin className="size-3 text-[#9eb5ca]" aria-hidden />
          Siège : {site.contact.city}, {site.contact.country}
        </span>
        <div className="flex gap-6">
          <a href={`mailto:${site.contact.email}`} className="flex items-center gap-1.5 text-[#dbe2e9] no-underline hover:text-white hover:underline">
            <Mail className="size-3 text-[#9eb5ca]" aria-hidden />
            {site.contact.email}
          </a>
          <a href={`tel:${site.contact.phone}`} className="flex items-center gap-1.5 text-[#dbe2e9] no-underline hover:text-white hover:underline">
            <Phone className="size-3 text-[#9eb5ca]" aria-hidden />
            {site.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
