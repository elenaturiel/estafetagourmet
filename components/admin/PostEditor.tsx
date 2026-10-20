"use client";

import { useActionState, useRef, useState, useTransition } from "react";
import { removePost, savePost, sendPost, uploadImage, type ActionState } from "@/app/admin/actions";
import { CATEGORIES } from "@/lib/admin-categories";

export type EditorPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  coverAssetId: string | null;
  coverUrl: string | null;
  coverAlt: string;
  publishedAt: string | null;
  sentAt: string | null;
  body: string;
};

/** Reduce la foto en el navegador (máx. 1800 px, JPEG) para que suba rápido y no pese de más. */
async function shrink(file: File): Promise<File> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1800 / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob>((ok, fail) => canvas.toBlob((b) => (b ? ok(b) : fail(new Error("foto"))), "image/jpeg", 0.85));
  return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
}

const input = "mt-1 min-h-[48px] w-full border border-tinta bg-papel px-3 text-[16px]";
const label = "block text-[14px] font-semibold";
const tool = "min-h-[40px] border border-linea bg-papel px-3 text-[14px] font-semibold hover:border-vino hover:text-vino";

export function PostEditor({ post }: { post: EditorPost | null }) {
  const [state, action, saving] = useActionState<ActionState, FormData>(savePost, null);
  const id = state?.id ?? post?.id ?? "";
  const [title, setTitle] = useState(post?.title ?? "");
  const [category, setCategory] = useState(post?.category ?? "Temporada");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [cover, setCover] = useState({ id: post?.coverAssetId ?? "", url: post?.coverUrl ?? "", alt: post?.coverAlt ?? "" });
  const [busy, setBusy] = useState<string | null>(null);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const [testTo, setTestTo] = useState("");
  const [, startSend] = useTransition();
  const area = useRef<HTMLTextAreaElement>(null);
  const photo = useRef<HTMLInputElement>(null);
  const coverInput = useRef<HTMLInputElement>(null);
  const published = Boolean(post?.publishedAt) || state?.message?.startsWith("Publicada");

  /** Envuelve el texto seleccionado (o lo inserta) en la posición del cursor. */
  function wrap(before: string, after = "", placeholder = "texto") {
    const el = area.current;
    if (!el) return;
    const { selectionStart: a, selectionEnd: b } = el;
    const sel = body.slice(a, b) || placeholder;
    setBody(body.slice(0, a) + before + sel + after + body.slice(b));
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(a + before.length, a + before.length + sel.length);
    });
  }
  /** Pone un prefijo al principio de la línea (subtítulo, lista, cita). */
  function prefix(p: string) {
    const el = area.current;
    if (!el) return;
    const a = el.selectionStart;
    const start = body.lastIndexOf("\n", a - 1) + 1;
    setBody(body.slice(0, start) + p + body.slice(start));
    requestAnimationFrame(() => el.focus());
  }
  function link() {
    const url = window.prompt("Dirección del enlace (https://…)");
    if (url) wrap("[", `](${url})`, "texto del enlace");
  }

  async function upload(file: File): Promise<{ id: string; url: string } | null> {
    setBusy("Subiendo la foto…");
    setNote(null);
    try {
      const form = new FormData();
      form.set("file", await shrink(file));
      const res = await uploadImage(form);
      if (!res.id) throw new Error(res.error);
      return { id: res.id, url: res.url ?? "" };
    } catch (e) {
      setNote({ ok: false, text: e instanceof Error && e.message ? e.message : "No se pudo subir la foto." });
      return null;
    } finally {
      setBusy(null);
    }
  }
  async function addCover(file?: File) {
    if (!file) return;
    const up = await upload(file);
    if (up) setCover((c) => ({ ...c, id: up.id, url: up.url }));
  }
  async function addPhoto(file?: File) {
    if (!file) return;
    const alt = window.prompt("¿Qué se ve en la foto? (descripción corta)") ?? "";
    const up = await upload(file);
    if (!up) return;
    const el = area.current;
    const pos = el ? el.selectionStart : body.length;
    setBody(`${body.slice(0, pos)}\n\n![${alt}](imagen:${up.id})\n\n${body.slice(pos)}`);
  }

  function send(mode: "test" | "all") {
    if (mode === "all" && !window.confirm("Se enviará esta entrada por correo a TODOS los suscriptores. ¿Seguro?")) return;
    setBusy(mode === "all" ? "Enviando a la lista…" : "Enviando la prueba…");
    setNote(null);
    startSend(async () => {
      const res = await sendPost(id, mode, testTo);
      setNote({ ok: Boolean(res.ok), text: res.message ?? res.error ?? "Hecho." });
      setBusy(null);
    });
  }

  return (
    <div>
      <h1 className="text-[28px] leading-tight lg:text-[36px]">{post ? "Editar entrada" : "Nueva entrada"}</h1>
      <form action={action} className="mt-6 grid gap-6">
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="coverAssetId" value={cover.id} />
        <input type="hidden" name="publishedAt" value={post?.publishedAt ?? ""} />

        <div>
          <label htmlFor="title" className={label}>
            Título
          </label>
          <input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={90} required className={input} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className={label}>
              Categoría
            </label>
            <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} className={input}>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="coverAlt" className={label}>
              Qué se ve en la foto principal
            </label>
            <input id="coverAlt" name="coverAlt" value={cover.alt} onChange={(e) => setCover({ ...cover, alt: e.target.value })} className={input} />
          </div>
        </div>

        <div>
          <span className={label}>Foto principal</span>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {cover.url ? <img src={cover.url} alt="" className="h-28 w-44 object-cover" /> : <div className="h-28 w-44 bg-crema-oscuro" />}
            <button type="button" className={tool} onClick={() => coverInput.current?.click()}>
              {cover.id ? "Cambiar foto" : "Subir foto"}
            </button>
            <input ref={coverInput} type="file" accept="image/*" hidden onChange={(e) => void addCover(e.target.files?.[0])} />
          </div>
        </div>

        <div>
          <label htmlFor="excerpt" className={label}>
            Entradilla <span className="font-normal text-secundario">(una o dos frases que resumen la entrada; sale en las tarjetas y en Google)</span>
          </label>
          <textarea id="excerpt" name="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} maxLength={200} className={`${input} py-2`} />
          <p className="text-right text-[12px] text-secundario">{excerpt.length}/200</p>
        </div>

        <div>
          <label htmlFor="body" className={label}>
            Texto
          </label>
          <div className="mt-1 flex flex-wrap gap-2" role="toolbar" aria-label="Formato del texto">
            <button type="button" className={tool} onClick={() => prefix("## ")}>
              Subtítulo
            </button>
            <button type="button" className={tool} onClick={() => wrap("**", "**")}>
              <strong>Negrita</strong>
            </button>
            <button type="button" className={tool} onClick={() => wrap("*", "*")}>
              <em>Cursiva</em>
            </button>
            <button type="button" className={tool} onClick={() => prefix("- ")}>
              Lista
            </button>
            <button type="button" className={tool} onClick={() => prefix("> ")}>
              Cita
            </button>
            <button type="button" className={tool} onClick={link}>
              Enlace
            </button>
            <button type="button" className={tool} onClick={() => photo.current?.click()}>
              Foto
            </button>
            <input ref={photo} type="file" accept="image/*" hidden onChange={(e) => void addPhoto(e.target.files?.[0])} />
          </div>
          <textarea
            id="body"
            name="body"
            ref={area}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={18}
            className={`${input} py-3 font-mono text-[15px] leading-[1.6]`}
            placeholder={"Escribe aquí. Deja una línea en blanco entre párrafos.\n\n## Un subtítulo\n\nUn párrafo con **negrita** y *cursiva*."}
          />
          <p className="mt-1 text-[13px] text-secundario">
            Usa los botones de arriba o escribe a mano: <code>## Subtítulo</code>, <code>**negrita**</code>, <code>*cursiva*</code>, <code>- lista</code>, <code>&gt; cita</code>.
          </p>
        </div>

        {state?.error ? (
          <p role="alert" className="border border-vino bg-papel p-3 text-[15px] font-semibold text-vino">
            {state.error}
          </p>
        ) : null}
        {state?.message ? (
          <p role="status" className="border border-linea bg-papel p-3 text-[15px] font-semibold">
            {state.message}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" name="intent" value="publish" disabled={saving || Boolean(busy)} className="min-h-[48px] bg-vino px-7 font-semibold text-crema disabled:opacity-60">
            {saving ? "Guardando…" : published ? "Guardar cambios" : "Publicar"}
          </button>
          <button type="submit" name="intent" value="draft" disabled={saving || Boolean(busy)} className="min-h-[48px] border border-tinta px-6 font-semibold disabled:opacity-60">
            Guardar borrador
          </button>
          {busy ? <span className="text-[14px] text-secundario">{busy}</span> : null}
          {id && post?.slug ? (
            <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="text-[15px] font-semibold text-vino hover:underline">
              Ver en la web →
            </a>
          ) : null}
        </div>
      </form>

      {id && published ? (
        <section className="mt-10 border border-linea bg-papel p-5" aria-labelledby="correo-title">
          <h2 id="correo-title" className="text-[22px]">
            Enviar por correo
          </h2>
          <p className="mt-1 text-[15px] text-secundario">
            {post?.sentAt
              ? `Esta entrada ya se envió a los suscriptores el ${new Date(post.sentAt).toLocaleDateString("es-ES")}.`
              : "Primero manda una prueba a tu correo para ver cómo queda; después, envíala a todos los suscriptores."}
          </p>
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <div className="min-w-[240px] flex-1">
              <label htmlFor="testTo" className={label}>
                Correo para la prueba
              </label>
              <input id="testTo" type="email" value={testTo} onChange={(e) => setTestTo(e.target.value)} placeholder="tu@correo.com" className={input} />
            </div>
            <button type="button" className="min-h-[48px] border border-tinta px-5 font-semibold disabled:opacity-60" disabled={Boolean(busy)} onClick={() => send("test")}>
              Enviar prueba
            </button>
            <button type="button" className="min-h-[48px] bg-vino px-5 font-semibold text-crema disabled:opacity-60" disabled={Boolean(busy) || Boolean(post?.sentAt)} onClick={() => send("all")}>
              Enviar a todos
            </button>
          </div>
          {note ? (
            <p role="status" className={`mt-3 text-[15px] font-semibold ${note.ok ? "" : "text-vino"}`}>
              {note.text}
            </p>
          ) : null}
        </section>
      ) : null}

      {id ? (
        <form
          action={removePost.bind(null, id)}
          onSubmit={(e) => {
            if (!window.confirm("¿Borrar esta entrada para siempre?")) e.preventDefault();
          }}
          className="mt-10 border-t border-linea pt-6"
        >
          <button type="submit" className="text-[14px] font-semibold text-secundario underline hover:text-vino">
            Borrar esta entrada
          </button>
        </form>
      ) : null}
    </div>
  );
}
