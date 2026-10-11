import { parseBody } from "next-sanity/webhook";
import { NextResponse, type NextRequest } from "next/server";
import { SITE_URL } from "@/data/site";
import { CampaignError, renderEmail, sendCampaign } from "@/lib/campaign";
import { portableToHtml } from "@/lib/portable-html";
import { sanityImageUrl } from "@/lib/sanity/client";
import { sanityFresh, sanityWriter } from "@/lib/sanity/write";

/**
 * Webhook de Sanity: al publicar una entrada o un aviso con «Enviar por correo»
 * en «Enviar una prueba» o «Enviar a todos», sale el correo por Brevo.
 *
 * En sanity.io/manage → API → Webhooks (ver README):
 *   URL         https://tu-web/api/newsletter/send
 *   Trigger on  Create y Update
 *   Filter      _type in ["post","newsletterIssue","announcement"] && newsletter in ["test","all"]
 *   Projection  {_id, _type}
 *   Secret      el mismo que SANITY_REVALIDATE_SECRET
 *
 * «Enviar a todos» marca el documento como enviado y lo devuelve a «No enviar»
 * para que no se repita; para ello hace falta SANITY_WRITE_TOKEN.
 */
export const runtime = "nodejs";

type Doc = {
  _id: string;
  _type: "post" | "announcement" | "newsletterIssue";
  title: string;
  slug?: string;
  excerpt?: string;
  preheader?: string;
  coverImage?: { alt?: string };
  image?: { alt?: string };
  body?: unknown;
  ctaLabel?: string;
  ctaHref?: string;
  subtitle?: string;
  lead?: string;
  stats?: { value: string; label: string }[];
  sections?: { title: string; paragraphs?: string[]; list?: string[]; tip?: string }[];
  newsletter?: "none" | "test" | "all";
  testEmail?: string;
  newsletterSentAt?: string;
};

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: "Falta SANITY_REVALIDATE_SECRET" }, { status: 500 });
  const { isValidSignature, body } = await parseBody<{ _id?: string; _type?: string }>(req, secret);
  if (!isValidSignature) return NextResponse.json({ ok: false, error: "Firma no válida" }, { status: 401 });
  if (!body?._id || (body._type !== "post" && body._type !== "announcement" && body._type !== "newsletterIssue")) return NextResponse.json({ ok: true, skipped: "tipo" });

  const client = sanityFresh();
  if (!client) return NextResponse.json({ ok: false, error: "Sanity no está configurado" }, { status: 500 });
  const id = body._id.replace(/^drafts\./, "");
  const doc = await client.fetch<Doc | null>(
    `*[_id == $id][0]{_id,_type,title,subtitle,"slug":slug.current,excerpt,preheader,coverImage,image,body,lead,stats,sections,ctaLabel,ctaHref,newsletter,testEmail,newsletterSentAt}`,
    { id },
  );
  if (!doc) return NextResponse.json({ ok: true, skipped: "no publicado" });
  const mode = doc.newsletter ?? "none";
  if (mode === "none") return NextResponse.json({ ok: true, skipped: "no enviar" });
  if (mode === "all" && doc.newsletterSentAt) return NextResponse.json({ ok: true, skipped: "ya enviado" });
  if (mode === "test" && !doc.testEmail) return NextResponse.json({ ok: false, error: "Falta el correo de prueba" }, { status: 400 });

  const writer = sanityWriter();
  if (mode === "all" && !writer)
    return NextResponse.json({ ok: false, error: "Falta SANITY_WRITE_TOKEN (para marcar el correo como enviado y no repetirlo)" }, { status: 500 });

  const isPost = doc._type === "post";
  const isIssue = doc._type === "newsletterIssue";
  const img = isPost ? doc.coverImage : doc.image;
  const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const p = (t: string) => `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#2a1f1a">${esc(t)}</p>`;
  const h2 = (t: string) => `<h2 style="margin:24px 0 10px;font-family:Georgia,serif;font-size:24px;line-height:1.25;font-weight:normal;color:#2a1f1a">${esc(t)}</h2>`;
  const url = isPost && doc.slug ? `${SITE_URL}/blog/${doc.slug}` : isIssue && doc.slug ? `${SITE_URL}/newsletter/${doc.slug}` : undefined;
  const cta = isPost
    ? url ? { label: "Leer la entrada completa", href: url } : undefined
    : isIssue
      ? url ? { label: "Leer el boletín en la web", href: url } : undefined
      : doc.ctaLabel && doc.ctaHref ? { label: doc.ctaLabel, href: doc.ctaHref } : undefined;
  let bodyHtml: string;
  if (isPost) bodyHtml = p(doc.excerpt ?? "");
  else if (isIssue) {
    const stats = (doc.stats ?? []).map((x) => `<td style="padding:8px 10px 8px 0;vertical-align:top;font-size:13px;line-height:1.4;color:#5e4e43"><span style="display:block;font-family:Georgia,serif;font-size:22px;color:#6e1f2e">${esc(x.value)}</span>${esc(x.label)}</td>`).join("");
    bodyHtml =
      (doc.subtitle ? `<p style="margin:0 0 16px;font-family:Georgia,serif;font-size:19px;font-style:italic;color:#6e1f2e">${esc(doc.subtitle)}</p>` : "") +
      p(doc.lead ?? "") +
      (stats ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px"><tr>${stats}</tr></table>` : "") +
      (doc.sections ?? [])
        .map(
          (sec) =>
            h2(sec.title) +
            (sec.paragraphs ?? []).map(p).join("") +
            (sec.list?.length ? `<ul style="margin:0 0 16px;padding-left:22px;font-size:16px;line-height:1.6;color:#2a1f1a">${sec.list.map((li) => `<li style="margin:0 0 6px">${esc(li)}</li>`).join("")}</ul>` : "") +
            (sec.tip ? `<p style="margin:0 0 16px;padding:12px 16px;background:#f6f0e4;border-left:3px solid #e2b872;font-size:15px;line-height:1.55;color:#2a1f1a"><strong>Consejo Estafeta:</strong> ${esc(sec.tip)}</p>` : ""),
        )
        .join("");
  } else bodyHtml = portableToHtml(doc.body, (asset) => sanityImageUrl(asset, 1000));
  const preheader = isPost || isIssue ? doc.excerpt : doc.preheader;

  try {
    const campaignId = await sendCampaign({
      name: `${isPost ? "Blog" : isIssue ? "Boletín" : "Aviso"}: ${doc.title} (${new Date().toISOString().slice(0, 10)})`,
      subject: doc.title,
      preheader,
      html: renderEmail({
        title: doc.title,
        preheader,
        imageUrl: img ? sanityImageUrl(img, 1200) : undefined,
        imageAlt: img?.alt,
        bodyHtml,
        cta,
      }),
      testTo: mode === "test" ? doc.testEmail : undefined,
    });
    if (mode === "all" && writer) {
      await writer.patch(doc._id).set({ newsletterSentAt: new Date().toISOString(), newsletter: "none" }).commit();
    }
    return NextResponse.json({ ok: true, mode, campaignId });
  } catch (err) {
    console.error("[newsletter/send]", err);
    return NextResponse.json({ ok: false, error: err instanceof CampaignError ? err.message : "Error al enviar" }, { status: 500 });
  }
}
