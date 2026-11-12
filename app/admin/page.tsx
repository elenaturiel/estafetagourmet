import type { Metadata } from "next";
import Link from "next/link";
import { ENCIERRO } from "@/data/encierro";
import { newsletters } from "@/data/newsletters";
import { WebIssueList } from "@/components/admin/WebIssueList";
import { AdminShell } from "@/components/admin/AdminShell";
import { LoginForm } from "@/components/admin/LoginForm";
import { PostList } from "@/components/admin/PostList";
import { isAdmin, isAdminConfigured } from "@/lib/admin-auth";
import { listPosts, writer } from "@/lib/admin-posts";
import { subscriberCount } from "@/lib/campaign";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Panel · Estafeta Gourmet", robots: { index: false, follow: false } };

export default async function AdminPage() {
  if (!isAdminConfigured()) {
    return (
      <AdminShell>
        <h1 className="text-[32px]">Falta la contraseña del panel</h1>
        <p className="mt-4 text-secundario">
          En Vercel → Settings → Environment Variables añade <code className="rounded bg-papel px-1">ADMIN_PASSWORD</code> con una
          contraseña de al menos 8 caracteres, y vuelve a publicar la web (Redeploy).
        </p>
      </AdminShell>
    );
  }
  if (!(await isAdmin())) {
    return (
      <AdminShell>
        <LoginForm />
      </AdminShell>
    );
  }
  const c = writer();
  const [posts, subscribers, sent] = await Promise.all([
    listPosts(),
    subscriberCount(),
    c ? c.fetch<{ slug: string; sentAt: string }[]>(`*[_type == "boletinWebEnviado"]{ slug, sentAt }`).catch(() => []) : Promise.resolve([]),
  ]);
  const sentAt = new Map(sent.map((x) => [x.slug, x.sentAt]));
  const issues = [...newsletters]
    .sort((a, b) => b.number - a.number)
    .map((n) => ({ slug: n.slug, number: n.number, title: n.title, sentAt: sentAt.get(n.slug) ?? null }));
  return (
    <AdminShell logout>
      {!c ? (
        <p className="mb-6 border border-vino bg-papel p-4 text-[15px]">
          Falta <code>SANITY_WRITE_TOKEN</code> en Vercel: sin esa clave no se pueden guardar entradas.
        </p>
      ) : null}
      <Link
        href="/admin/encierro"
        className="mb-8 flex items-center justify-between gap-4 border border-vino bg-papel px-5 py-4 hover:bg-crema"
      >
        <span>
          <span className="block font-serif text-[20px]">Plazas del encierro {ENCIERRO.year}</span>
          <span className="block text-[14px] text-secundario">Cambia cuántas plazas quedan libres cada día del 7 al 14 de julio.</span>
        </span>
        <span aria-hidden="true" className="text-[22px] text-vino">→</span>
      </Link>
      <PostList posts={posts} subscribers={subscribers} />
      <WebIssueList issues={issues} />
    </AdminShell>
  );
}
