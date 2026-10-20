"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { endSession, isAdmin, passwordMatches, startSession } from "@/lib/admin-auth";
import { CATEGORIES, emailPost, getPost, slugify, uniqueSlug, writer } from "@/lib/admin-posts";
import { markdownToPortable } from "@/lib/admin-markdown";
import { CampaignError } from "@/lib/campaign";
import { locales } from "@/lib/i18n/config";

export type ActionState = { ok?: boolean; error?: string; message?: string; id?: string } | null;

async function guard() {
  if (!(await isAdmin())) throw new Error("Sesión caducada: vuelve a entrar con la contraseña.");
}

/** La web se actualiza al momento: blog, portada y la página de la entrada, en los tres idiomas. */
function refreshWeb(slug?: string) {
  updateTag("post");
  for (const l of locales) {
    const base = l === "es" ? "" : `/${l}`;
    revalidatePath(`${base || "/"}`);
    revalidatePath(`${base}/blog`);
    if (slug) revalidatePath(`${base}/blog/${slug}`);
  }
  revalidatePath("/sitemap.xml");
}

export async function login(_: ActionState, form: FormData): Promise<ActionState> {
  const ok = passwordMatches(String(form.get("password") ?? ""));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 900));
    return { error: "Contraseña incorrecta." };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin");
}

/** Guarda la entrada. `intent`: "publish" (visible en la web), "draft" (solo en el panel). */
export async function savePost(_: ActionState, form: FormData): Promise<ActionState> {
  try {
    await guard();
    const c = writer();
    if (!c) return { error: "Falta SANITY_WRITE_TOKEN en Vercel." };
    const id = String(form.get("id") ?? "");
    const intent = String(form.get("intent") ?? "publish");
    const title = String(form.get("title") ?? "").trim();
    const excerpt = String(form.get("excerpt") ?? "").trim();
    const category = String(form.get("category") ?? "");
    const coverAssetId = String(form.get("coverAssetId") ?? "");
    const coverAlt = String(form.get("coverAlt") ?? "").trim();
    const body = String(form.get("body") ?? "");
    if (!title) return { error: "Pon un título." };
    if (intent === "publish") {
      if (!excerpt) return { error: "Escribe la entradilla (una o dos frases que resumen la entrada)." };
      if (!coverAssetId) return { error: "Sube la foto principal." };
      if (!body.trim()) return { error: "Escribe el texto de la entrada." };
    }
    const existing = id ? await getPost(id) : null;
    const slug = existing?.slug || (await uniqueSlug(slugify(title), id || undefined));
    const when = String(form.get("publishedAt") ?? "");
    const publishedAt =
      intent === "draft" ? null : existing?.publishedAt && !existing.publishedAt.startsWith("1970") ? existing.publishedAt : when ? new Date(when).toISOString() : new Date().toISOString();
    const doc = {
      _type: "post" as const,
      title,
      slug: { _type: "slug" as const, current: slug },
      category: (CATEGORIES as readonly string[]).includes(category) ? category : "Temporada",
      excerpt,
      publishedAt,
      body: markdownToPortable(body),
      ...(coverAssetId
        ? { coverImage: { _type: "image" as const, asset: { _type: "reference" as const, _ref: coverAssetId }, alt: coverAlt || title } }
        : {}),
    };
    let savedId = id;
    if (id) {
      await c.patch(id).set(doc).commit();
      if (!publishedAt) await c.patch(id).unset(["publishedAt"]).commit();
    } else {
      const created = await c.create(doc);
      savedId = created._id;
    }
    refreshWeb(slug);
    return { ok: true, id: savedId, message: intent === "draft" ? "Borrador guardado." : "Publicada. Ya se ve en la web." };
  } catch (err) {
    console.error("[admin] savePost", err);
    return { error: err instanceof Error ? err.message : "No se pudo guardar." };
  }
}

export async function removePost(id: string) {
  await guard();
  const c = writer();
  const post = await getPost(id);
  if (c) {
    await c.delete(id);
    await c.delete(`drafts.${id}`).catch(() => undefined);
  }
  refreshWeb(post?.slug);
  redirect("/admin");
}

/** Sube una foto (ya reducida en el navegador) y devuelve su identificador. */
export async function uploadImage(form: FormData): Promise<{ id?: string; url?: string; error?: string }> {
  try {
    await guard();
    const c = writer();
    if (!c) return { error: "Falta SANITY_WRITE_TOKEN en Vercel." };
    const file = form.get("file");
    if (!(file instanceof File) || !file.size) return { error: "No se recibió la foto." };
    const asset = await c.assets.upload("image", Buffer.from(await file.arrayBuffer()), { filename: file.name || "foto.jpg", contentType: file.type || "image/jpeg" });
    return { id: asset._id, url: asset.url };
  } catch (err) {
    console.error("[admin] uploadImage", err);
    return { error: "No se pudo subir la foto." };
  }
}

/** Envía la entrada por correo. `test`: solo a `testTo`; `all`: a toda la lista (y se marca como enviada). */
export async function sendPost(id: string, mode: "test" | "all", testTo?: string): Promise<{ ok?: boolean; error?: string; message?: string }> {
  try {
    await guard();
    const c = writer();
    const post = await getPost(id);
    if (!c || !post) return { error: "No se encontró la entrada." };
    if (!post.publishedAt) return { error: "Publica la entrada antes de enviarla por correo." };
    if (mode === "test") {
      const to = (testTo ?? "").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return { error: "Escribe un correo válido para la prueba." };
      await emailPost(post, to);
      return { ok: true, message: `Prueba enviada a ${to}. Puede tardar un par de minutos.` };
    }
    if (post.sentAt) return { error: "Esta entrada ya se envió a la lista." };
    await emailPost(post);
    await c.patch(id).set({ newsletterSentAt: new Date().toISOString() }).commit();
    return { ok: true, message: "Enviada a todos los suscriptores." };
  } catch (err) {
    console.error("[admin] sendPost", err);
    return { error: err instanceof CampaignError ? err.message : "No se pudo enviar el correo." };
  }
}
