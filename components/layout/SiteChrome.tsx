import type { ReactNode } from "react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { NewsletterPopup } from "@/components/newsletter/NewsletterPopup";
import { JsonLd } from "@/components/seo/JsonLd";
import { ShopGate } from "@/components/shop/ShopGate";
import { getCategoryTree } from "@/lib/category-tree";
import { getCategories, getProducts } from "@/lib/catalog";
import { site } from "@/data/site";
import { categoryHref, productHref } from "@/lib/product-utils";
import { getLocale, getT } from "@/lib/i18n/server";
import { isNewsletterEnabled } from "@/lib/newsletter";
import { localBusinessJsonLd } from "@/lib/structured-data";
import { Analytics, CookieBanner } from "./CookieBanner";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ScrollReveal } from "./ScrollReveal";
import { ScrollToTop } from "./ScrollToTop";
import { WhatsAppButton } from "./WhatsAppButton";
import { TopBar } from "./TopBar";

/** Estructura común de la web pública: barra superior, cabecera, pie y capas. */
export async function SiteChrome({ children }: { children: ReactNode }) {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  const [categories, lots, tree] = await Promise.all([getCategories(), getProducts({ category: "lotes" }), getCategoryTree()]);
  const lot = lots[0];
  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-[60] rounded-eg bg-vino px-4 py-3 font-semibold text-crema focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t.common.skip}
      </a>
      <TopBar />
      <Header
        tree={tree}
        categories={categories.map((c) => ({
          slug: c.slug,
          name: c.name,
          placeholder: c.image.placeholder,
          src: c.image.src,
          href: categoryHref(c),
        }))}
        featuredLot={lot ? { name: lot.name, href: productHref(lot), price: lot.price, src: lot.image.src } : undefined}
      />
      <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      {site.onlineSales ? <CartDrawer /> : null}
      <ShopGate />
      <ScrollReveal />
      <ScrollToTop />
      <CookieBanner />
      {isNewsletterEnabled() ? <NewsletterPopup /> : null}
      <Analytics />
      <JsonLd data={localBusinessJsonLd(t.common.site.description, locale)} />
    </>
  );
}
