import type { Metadata } from "next";
import { Envios } from "@/components/legal/Envios";
import { LegalPage } from "@/components/ui/LegalPage";
import { getLocale, getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  const m = t.legal.shipping;
  return pageMetadata({ locale, title: m.title, description: m.metaDescription, path: "/envios-y-devoluciones" });
}

export default async function Page() {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return (
    <LegalPage title={t.legal.shipping.title}>
      <Envios locale={locale} />
    </LegalPage>
  );
}
