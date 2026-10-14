import type { Metadata } from "next";
import { CondicionesVenta } from "@/components/legal/CondicionesVenta";
import { LegalPage } from "@/components/ui/LegalPage";
import { getLocale, getT } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  const m = t.legal.terms;
  return pageMetadata({ locale, title: m.metaTitle, description: m.metaDescription, path: "/condiciones-de-venta" });
}

export default async function Page() {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return (
    <LegalPage title={t.legal.terms.title}>
      <CondicionesVenta locale={locale} />
    </LegalPage>
  );
}
