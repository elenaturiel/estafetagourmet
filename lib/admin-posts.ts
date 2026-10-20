import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";
import { SITE_URL } from "@/data/site";
import { CampaignError, renderEmail, sendCampaign } from "@/lib/campaign";
import { portableToHtml } from "@/lib/portable-html";
import { sanityImageUrl } from "@/lib/sanity/client";

/** Entradas del blog guardadas en Sanity, que el panel /admin lee y escribe con SANITY_WRITE_TOKEN. */
export { CATEGORIES } from "@/lib/admin-categories";

export type AdminPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  publishedAt: string | null;
  coverAlt: string;
  coverAssetId: string | null;
  coverUrl: string | null;
  body: unknown;
  sentAt: string | null;
};

export function writer() {
  const token = (process.env.SANITY_WRITE_TOKEN ?? "").trim();
  if (!isSanityConfigured || !token) return null;
  return createClient({ projectId, dataset, apiVersion, useCdn: false, token });
}

const FIELDS = `_id, title, "slug": slug.current, category, excerpt, publishedAt, newsletterSentAt,
  "coverAlt": coverImage.alt, "coverAssetId": coverImage.asset._ref, coverImage, body`;

type Row = {
  _id: string;
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  publishedAt?: string | null;
  newsletterSentAt?: string | null;
  coverAlt?: string;
  coverAssetId?: string | null;
  coverImage?: unknown;
  body?: unknown;
};

const toPost = (r: Row): AdminPost => ({
  id: r._id,
  title: r.title ?? "",
  slug: r.slug ?? "",
  category: r.category ?? "Temporada",
  excerpt: r.excerpt ?? "",
  publishedAt: r.publishedAt ?? null,
  coverAlt: r.coverAlt ?? "",
  coverAssetId: r.coverAssetId ?? null,
  coverUrl: r.coverAssetId ? (sanityImageUrl(r.coverImage, 600) ?? null) : null,
  body: r.body ?? [],
  sentAt: r.newsletterSentAt ?? null,
});

export async function listPosts(): Promise<AdminPost[]> {
  const c = writer();
  if (!c) return [];
  const rows = await c.fetch<Row[]>(`*[_type == "post" && !(_id in path("drafts.**"))] | order(coalesce(publishedAt, _createdAt) desc) {${FIELDS}}`);
  return rows.map(toPost);
}

export async function getPost(id: string): Promise<AdminPost | null> {
  const c = writer();
  if (!c) return null;
  const row = await c.fetch<Row | null>(`*[_type == "post" && _id == $id][0]{${FIELDS}}`, { id });
  return row ? toPost(row) : null;
}

export const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70) || "entrada";

/** Una dirección que no use otra entrada. */
export async function uniqueSlug(base: string, ownId?: string): Promise<string> {
  const c = writer();
  if (!c) return base;
  let slug = base;
  for (let i = 2; i < 50; i++) {
    const taken = await c.fetch<number>(`count(*[_type == "post" && slug.current == $slug && _id != $id && !(_id in path("drafts.**"))])`, { slug, id: ownId ?? "" });
    if (!taken) return slug;
    slug = `${base}-${i}`;
  }
  return `${base}-${Date.now()}`;
}

/** Envía la entrada por correo a toda la lista, o una prueba a `testTo`. Devuelve el número de campaña. */
export async function emailPost(post: AdminPost, testTo?: string): Promise<number> {
  if (!post.slug) throw new CampaignError("La entrada no tiene dirección");
  const url = `${SITE_URL}/blog/${post.slug}`;
  const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lead = post.excerpt ? `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#2a1f1a">${esc(post.excerpt)}</p>` : "";
  const bodyHtml = lead + portableToHtml(post.body, (asset) => sanityImageUrl(asset, 1000));
  const coverSrc = post.coverAssetId ? sanityImageUrl({ asset: { _type: "reference", _ref: post.coverAssetId } }, 1200) : undefined;
  return sendCampaign({
    name: `Blog: ${post.title} (${new Date().toISOString().slice(0, 10)})`,
    subject: post.title,
    preheader: post.excerpt,
    html: renderEmail({
      title: post.title,
      preheader: post.excerpt,
      imageUrl: coverSrc,
      imageAlt: post.coverAlt || post.title,
      bodyHtml,
      cta: { label: "Leer la entrada completa", href: url },
    }),
    testTo,
  });
}
