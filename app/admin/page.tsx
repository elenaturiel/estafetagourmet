import type { Metadata } from "next";
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
  const [posts, subscribers] = await Promise.all([listPosts(), subscriberCount()]);
  return (
    <AdminShell logout>
      {!writer() ? (
        <p className="mb-6 border border-vino bg-papel p-4 text-[15px]">
          Falta <code>SANITY_WRITE_TOKEN</code> en Vercel: sin esa clave no se pueden guardar entradas.
        </p>
      ) : null}
      <PostList posts={posts} subscribers={subscribers} />
    </AdminShell>
  );
}
