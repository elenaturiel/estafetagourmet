import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { PageHeader } from "@/components/ui/PageHeader";
import { getLocale, getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return pageMetadata({ locale, title: t.cart.title, description: t.cart.metaDescription, path: "/cesta" });
}

export default async function CartPage() {
  const t = await getT();
  return (
    <>
      <PageHeader title={t.cart.title} />
      <div className="container-site pb-16 lg:pb-24">
        <CartView />
      </div>
    </>
  );
}
