import { newsletters as coded, type Newsletter } from "@/data/newsletters";
import { getSanityNewsletters } from "@/lib/sanity/newsletters";

/**
 * Todos los boletines: los escritos en /admin (Sanity) y los que ya estaban en
 * data/newsletters.ts. Si un boletín del panel tiene la misma dirección que uno
 * del código, manda el del panel. Del más antiguo al más reciente.
 */
export async function getNewsletters(): Promise<Newsletter[]> {
  const lastCoded = Math.max(0, ...coded.map((n) => n.number));
  const fromSanity = (await getSanityNewsletters(lastCoded)) ?? [];
  const slugs = new Set(fromSanity.map((n) => n.slug));
  return [...coded.filter((n) => !slugs.has(n.slug)), ...fromSanity].sort((a, b) => a.number - b.number);
}

export async function getNewsletterBySlug(slug: string): Promise<Newsletter | undefined> {
  return (await getNewsletters()).find((n) => n.slug === slug);
}
