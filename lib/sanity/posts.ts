import "server-only";
import { groq } from "next-sanity";
import type { PortableBlock, Post } from "@/lib/types";
import { sanityFetch, sanityImageUrl } from "./client";

type SanityPost = {
  title: string;
  slug: string;
  category: string;
  publishedAt: string | null;
  excerpt: string | null;
  coverImage: { alt?: string } | null;
  body: PortableBlock[] | null;
};

const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc) {
    title, "slug": slug.current, category, publishedAt, excerpt, coverImage, body
  }`;

/** Entradas publicadas en Sanity, o null si Sanity no está configurado o falla. */
export async function getSanityPosts(): Promise<Post[] | null> {
  try {
    const rows = await sanityFetch<SanityPost[]>(POSTS_QUERY);
    if (!rows) return null;
    return rows.map((row) => ({
      slug: row.slug,
      title: row.title,
      category: row.category ?? "Blog",
      excerpt: row.excerpt ?? "",
      date: row.publishedAt,
      image: {
        src: sanityImageUrl(row.coverImage),
        alt: row.coverImage?.alt ?? row.title,
        placeholder: "Foto · blog",
      },
      body: row.body ?? undefined,
    }));
  } catch (err) {
    console.error("[sanity] No se pudieron leer las entradas del blog", err);
    return null;
  }
}
