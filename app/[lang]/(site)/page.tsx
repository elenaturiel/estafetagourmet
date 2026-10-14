import type { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { LotsBand } from "@/components/home/LotsBand";
import { Hero } from "@/components/home/Hero";
import { HistoryTeaser } from "@/components/home/HistoryTeaser";
import { BlogSection } from "@/components/home/BlogSection";
import { LatestNewslettersSection } from "@/components/home/LatestNewslettersSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ProducersSection } from "@/components/home/ProducersSection";
import { ProductMarquee } from "@/components/home/ProductMarquee";
import { PromiseSection } from "@/components/home/PromiseSection";
import { VisitSection } from "@/components/home/VisitSection";
import { getProducts } from "@/lib/catalog";
import { getLocale, getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  const base = pageMetadata({
    locale,
    title: t.common.site.titleDefault,
    description: t.home.meta.description,
    path: "/",
  });
  return { ...base, title: { absolute: t.common.site.titleDefault } };
}

/** La portada muestra las últimas entradas del blog: se refresca cada 5 minutos. */
export const revalidate = 300;

export default async function Home() {
  const [featuredLot] = await getProducts({ category: "lotes" });
  return (
    <>
      <Hero featuredLot={featuredLot} />
      <HistoryTeaser />
      <ProductMarquee />
      <CategoriesSection />
      <FeaturedProducts />
      <LotsBand />
      <ProducersSection />
      <PromiseSection />
      <AboutSection />
      <LatestNewslettersSection />
      <BlogSection />
      <NewsletterSection />
      <VisitSection />
    </>
  );
}
