import type { Metadata } from "next";
import { getLocale, getT } from "@/lib/i18n/server";
import { ProducerCard } from "@/components/cards/ProducerCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { getProducerCounts, getProducers } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return pageMetadata({ locale, title: t.pages.producers.metaTitle, description: t.pages.producers.metaDescription, path: "/productores" });
}

export default async function ProducersPage() {
  const [producers, counts, t] = await Promise.all([getProducers(), getProducerCounts(), getT()]);
  const p = t.pages.producers;
  return (
    <>
      <PageHeader
        eyebrow={p.eyebrow}
        title={p.title}
        intro={p.intro}
      />
      <div className="container-site pb-12 lg:pb-24">
        <h2 className="sr-only">{p.all}</h2>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-7 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-10">
          {producers.map((pr) => (
            <li key={pr.slug}>
              <ProducerCard producer={pr} count={counts[pr.slug]} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
