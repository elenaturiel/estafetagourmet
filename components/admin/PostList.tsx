import Link from "next/link";
import type { AdminPost } from "@/lib/admin-posts";

const fmt = (iso: string) => new Date(iso).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });

export function PostList({ posts, subscribers }: { posts: AdminPost[]; subscribers: number | null }) {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] leading-tight lg:text-[40px]">Entradas del blog</h1>
          {subscribers !== null ? (
            <p className="mt-1 text-[15px] text-secundario">
              {subscribers} {subscribers === 1 ? "persona suscrita" : "personas suscritas"} a la newsletter
            </p>
          ) : null}
        </div>
        <Link href="/admin/entrada/nueva" className="inline-flex min-h-[48px] items-center bg-vino px-6 font-semibold text-crema">
          + Nueva entrada
        </Link>
      </div>
      {posts.length ? (
        <ul className="mt-8 divide-y divide-linea border-y border-linea">
          {posts.map((p) => {
            const live = p.publishedAt && new Date(p.publishedAt) <= new Date();
            return (
              <li key={p.id}>
                <Link href={`/admin/entrada/${encodeURIComponent(p.id)}`} className="flex items-center gap-4 py-4 hover:bg-papel">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {p.coverUrl ? <img src={p.coverUrl} alt="" className="h-16 w-24 shrink-0 object-cover" /> : <div className="h-16 w-24 shrink-0 bg-crema-oscuro" />}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-serif text-[19px]">{p.title || "(sin título)"}</span>
                    <span className="block text-[13px] text-secundario">
                      {p.category} · {p.publishedAt ? fmt(p.publishedAt) : "sin fecha"}
                      {p.sentAt ? ` · enviada por correo el ${fmt(p.sentAt)}` : ""}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold ${live ? "bg-vino text-crema" : "border border-linea text-secundario"}`}
                  >
                    {live ? "Publicada" : "Borrador"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-8 text-secundario">Todavía no hay entradas. Pulsa «Nueva entrada» para escribir la primera.</p>
      )}
    </>
  );
}
