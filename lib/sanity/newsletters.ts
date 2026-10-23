import "server-only";
import { groq } from "next-sanity";
import type { Newsletter } from "@/data/newsletters";
import { sanityFetch, sanityImageUrl } from "./client";
import { TIENDA_ONLINE } from "@/data/tienda-online";

type Row = {
  title: string;
  subtitle: string;
  slug: string;
  theme: string;
  number: number | null;
  publishedAt: string;
  image: { alt?: string; asset?: unknown } | null;
  excerpt: string;
  lead: string;
  stats: { value: string; label: string }[] | null;
  sections: { title: string; paragraphs?: string[]; list?: string[]; tip?: string }[] | null;
  shopTitle: string | null;
  shopProducts: string[] | null;
  ctaLabel: string | null;
  ctaHref: string | null;
};

const QUERY = groq`*[_type == "newsletterIssue" && defined(slug.current) && publishedAt <= now()] | order(publishedAt asc) {
  title, subtitle, "slug": slug.current, theme, number, publishedAt, image, excerpt, lead, stats, sections,
  shopTitle, shopProducts, ctaLabel, ctaHref
}`;

/** Boletines escritos en /admin (Sanity), o null si Sanity no está configurado o falla. `after` = último número ya usado. */
export async function getSanityNewsletters(after: number): Promise<Newsletter[] | null> {
  try {
    const rows = await sanityFetch<Row[]>(QUERY, {}, "newsletter");
    if (!rows) return null;
    let n = after;
    return rows.map((r) => {
      n = r.number ?? n + 1;
      return {
        slug: r.slug,
        number: n,
        theme: r.theme,
        title: r.title,
        subtitle: r.subtitle,
        excerpt: r.excerpt,
        image: { src: sanityImageUrl(r.image, 1600) ?? "/images/categorias/lotes.webp", alt: r.image?.alt ?? r.title },
        lead: r.lead,
        stats: r.stats ?? [],
        sections: (r.sections ?? []).map((s) => ({ title: s.title, paragraphs: s.paragraphs, list: s.list, tip: s.tip })),
        shop: {
          title: r.shopTitle || "En nuestra tienda",
          products: r.shopProducts ?? [],
          cta: { label: r.ctaLabel || "Ver la tienda", href: r.ctaHref || TIENDA_ONLINE },
        },
      };
    });
  } catch (err) {
    console.error("[sanity] No se pudieron leer los boletines", err);
    return null;
  }
}
