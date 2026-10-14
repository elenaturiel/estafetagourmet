import { ProducerCard } from "@/components/cards/ProducerCard";
import { ArrowLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getProducerCounts, getProducers } from "@/lib/catalog";
import { getT } from "@/lib/i18n/server";

export async function ProducersSection({ headingId = "productores-title" }: { headingId?: string }) {
  const [producers, counts, t] = await Promise.all([getProducers({ featured: true }), getProducerCounts(), getT()]);
  return (
    <Section aria-labelledby={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={t.home.producers.eyebrow}
        title={t.home.producers.title}
        subtitle={t.home.producers.subtitle}
        action={<ArrowLink href="/productores">{t.home.producers.link}</ArrowLink>}
      />
      {/* En móvil se ven los cuatro primeros; en pantallas grandes, todos. */}
      <ul data-reveal-stagger className="grid grid-cols-2 gap-x-3 gap-y-7 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-10">
        {producers.map((p, i) => (
          <li key={p.slug} className={i >= 4 ? "max-lg:hidden" : undefined}>
            <ProducerCard producer={p} count={counts[p.slug]} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
