import type { Metadata } from "next";
import { getLocale, getT } from "@/lib/i18n/server";
import { AboutSection } from "@/components/home/AboutSection";
import { VisitSection } from "@/components/home/VisitSection";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return pageMetadata({ locale, title: t.pages.visit.metaTitle, description: t.pages.visit.metaDescription, path: "/visitanos" });
}

export default function VisitPage() {
  return (
    <>
      <VisitSection headingLevel="h1" />
      <AboutSection />
    </>
  );
}
