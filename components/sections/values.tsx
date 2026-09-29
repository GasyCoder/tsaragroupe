import { Handshake, Layers, MapPin, TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/sections/section-header";
import { values } from "@/lib/data/values";

const VALUE_ICONS = [MapPin, Layers, TrendingUp, Handshake];

function ValueItem({ index, title, text }: { index: number; title: string; text: string }) {
  const Icon = VALUE_ICONS[index % VALUE_ICONS.length];
  return (
    <li className="flex flex-col gap-3.5 rounded-xl border bg-white px-6 py-7 shadow-[0_1px_2px_rgba(16,24,40,0.03)]">
      <span className="flex items-center justify-between">
        <span className="flex size-10 items-center justify-center rounded-lg bg-accent">
          <Icon className="size-5 text-primary" strokeWidth={1.8} aria-hidden />
        </span>
        <span className="text-[13px] font-semibold text-[#9aa6b2]">{String(index + 1).padStart(2, "0")}</span>
      </span>
      <h3 className="text-[19px] font-semibold tracking-tight text-heading">{title}</h3>
      <p className="text-[15.5px] leading-[1.7] text-muted-foreground">{text}</p>
    </li>
  );
}

export function Values({ eyebrow = "Pourquoi Tsara Groupe", title = "Quatre principes de fonctionnement" }: { eyebrow?: string; title?: string }) {
  return (
    <section aria-labelledby="h-valeurs" className="bg-secondary">
      <div className="container-site section-y flex flex-col gap-10 md:gap-15">
        <SectionHeader id="h-valeurs" eyebrow={eyebrow} title={title} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <ValueItem key={v.title} index={i} {...v} />
          ))}
        </ul>
      </div>
    </section>
  );
}
