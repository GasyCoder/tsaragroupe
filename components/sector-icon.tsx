import { Bus, GraduationCap, HeartPulse, Newspaper, Pill, ShoppingBag, Sprout, Wrench, type LucideIcon, type LucideProps } from "lucide-react";
import type { Activity } from "@/lib/data/activities";

const ICONS: Record<string, LucideIcon> = {
  "clinique-saint-georges": HeartPulse,
  ispsg: GraduationCap,
  tsaratrans: Bus,
  tsaragri: Sprout,
  tsaraservice: Wrench,
  tsarashop: ShoppingBag,
  tsarapharma: Pill,
  tsaranews: Newspaper,
};

/** Icône Lucide associée au secteur d'une entité */
export function SectorIcon({ activity, ...props }: { activity: Activity } & LucideProps) {
  const Icon = ICONS[activity.slug] ?? HeartPulse;
  return <Icon aria-hidden {...props} />;
}
