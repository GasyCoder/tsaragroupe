import { ActivityGrid } from "@/components/sections/activity-grid";
import { ClinicLocations } from "@/components/sections/clinic-locations";
import { ClinicHistory } from "@/components/sections/clinic-history";
import { ContactSection } from "@/components/sections/contact-section";
import { Hero } from "@/components/sections/hero";
import { NewsSection } from "@/components/sections/news-section";
import { Presentation } from "@/components/sections/presentation";
import { Values } from "@/components/sections/values";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Presentation />
      <ClinicHistory />
      <ActivityGrid />
      <ClinicLocations />
      <Values />
      <NewsSection />
      <ContactSection />
    </>
  );
}
