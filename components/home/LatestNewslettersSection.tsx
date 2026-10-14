import { NewsletterCard } from "@/components/cards/NewsletterCard";
import { ArrowLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { getT } from "@/lib/i18n/server";
import { getNewsletters } from "@/lib/newsletters";

/** Portada: los tres últimos boletines de la newsletter. */
export async function LatestNewslettersSection() {
  const [issues, t] = await Promise.all([getNewsletters(), getT()]);
  const latest = issues.reverse().slice(0, 3);
  return (
    <Section tone="papel" aria-labelledby="boletines-title">
      <SectionHeader
        id="boletines-title"
        eyebrow={t.home.newsletters.eyebrow}
        title={t.home.newsletters.title}
        subtitle={t.home.newsletters.subtitle}
        action={<ArrowLink href="/newsletter">{t.home.newsletters.link}</ArrowLink>}
      />
      <ul data-reveal-stagger className="grid gap-4 md:grid-cols-3 md:gap-5">
        {latest.map((issue, i) => (
          <li key={issue.slug} className={i >= 2 ? "max-md:hidden" : undefined}>
            <NewsletterCard issue={issue} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
