import type { Metadata } from "next";
import { AboutSection } from "@/components/home/AboutSection";
import { BlogSection } from "@/components/home/BlogSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { GiftsBand } from "@/components/home/GiftsBand";
import { Hero } from "@/components/home/Hero";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { ProducersSection } from "@/components/home/ProducersSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { VisitSection } from "@/components/home/VisitSection";
import { site } from "@/data/site";

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

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoriesSection />
      <FeaturedProducts />
      <GiftsBand />
      <ProducersSection />
      <AboutSection />
      <ReviewsSection />
      <BlogSection />
      <NewsletterSection />
      <VisitSection />
    </>
  );
}
