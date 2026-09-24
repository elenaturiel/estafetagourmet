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
        title="Conoce a quienes lo hacen"
        subtitle="Pequeños productores navarros, con nombre y apellidos."
        action={<ArrowLink href="/productores">Ver todos los productores</ArrowLink>}
      />
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-5">
        {producers.map((p) => (
          <li key={p.slug}>
            <ProducerCard producer={p} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
