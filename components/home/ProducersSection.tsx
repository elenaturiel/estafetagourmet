import { ProducerCard } from "@/components/cards/ProducerCard";
import { ArrowLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getProducers } from "@/lib/catalog";

export async function ProducersSection({ headingId = "productores-title" }: { headingId?: string }) {
  const producers = await getProducers({ featured: true });
  return (
    <Section aria-labelledby={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow="Productores"
        title="Conoce a quienes lo hacen"
        subtitle="Pequeños productores navarros, con nombre y apellidos."
        action={<ArrowLink href="/productores">Ver todos los productores</ArrowLink>}
      />
      <ul className="rail -mx-6 auto-cols-[62%] gap-5 px-6 sm:auto-cols-[40%] lg:mx-0 lg:grid-flow-row lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:px-0">
        {producers.map((p) => (
          <li key={p.slug}>
            <ProducerCard producer={p} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
