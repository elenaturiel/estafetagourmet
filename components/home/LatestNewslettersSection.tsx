import { NewsletterCard } from "@/components/cards/NewsletterCard";
import { ArrowLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { newsletters } from "@/data/newsletters";

/** Portada: los tres últimos boletines de la newsletter. */
export function LatestNewslettersSection() {
  const latest = [...newsletters].sort((a, b) => b.number - a.number).slice(0, 3);
  return (
    <Section tone="papel" aria-labelledby="boletines-title">
      <SectionHeader
        id="boletines-title"
        eyebrow="Newsletter"
        title="De la huerta a la despensa"
        subtitle="Cada boletín cuenta un producto de Navarra: de dónde viene, cómo reconocerlo y cómo disfrutarlo."
        action={<ArrowLink href="/newsletter">Ver todos los boletines</ArrowLink>}
      />
      <ul data-reveal-stagger className="grid gap-5 md:grid-cols-3">
        {latest.map((issue) => (
          <li key={issue.slug}>
            <NewsletterCard issue={issue} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
