import type { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSection";
import { BlogSection } from "@/components/home/BlogSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { GiftsBand } from "@/components/home/GiftsBand";
import { Hero } from "@/components/home/Hero";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ProducersSection } from "@/components/home/ProducersSection";
import { ProductMarquee } from "@/components/home/ProductMarquee";
import { PromiseSection } from "@/components/home/PromiseSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { VisitSection } from "@/components/home/VisitSection";
import { site } from "@/data/site";
import { getGiftBoxes } from "@/lib/catalog";

export const metadata: Metadata = {
  title: { absolute: `${site.name} · Productos gourmet de Navarra en Pamplona` },
  description:
    "Vinos, quesos, embutidos y verduras de pequeños productores navarros, seleccionados en nuestra tienda de la calle Estafeta de Pamplona. Compra online con envío en 24–48 h.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: `${site.name} · Productos gourmet de Navarra en Pamplona`,
    description:
      "Vinos, quesos, embutidos y verduras de pequeños productores navarros, con envío a toda la península en 24–48 h.",
  },
};

/** La portada muestra las últimas entradas del blog: se refresca cada 5 minutos. */
export const revalidate = 300;

export default async function Home() {
  const gifts = await getGiftBoxes();
  return (
    <>
      <Hero featuredGift={gifts.find((g) => g.slug === "cesta-san-fermin") ?? gifts[0]} />
      <ProductMarquee />
      <CategoriesSection />
      <FeaturedProducts />
      <GiftsBand />
      <ProducersSection />
      <PromiseSection />
      <AboutSection />
      <ReviewsSection />
      <BlogSection />
      <NewsletterSection />
      <VisitSection />
    </>
  );
}
