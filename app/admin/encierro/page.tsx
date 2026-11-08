import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { EncierroSeatsForm } from "@/components/admin/EncierroSeatsForm";
import { LoginForm } from "@/components/admin/LoginForm";
import { ENCIERRO, encierroDocId, mergeEncierroSeats } from "@/data/encierro";
import { isAdmin, isAdminConfigured } from "@/lib/admin-auth";
import { writer } from "@/lib/admin-posts";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Plazas del encierro · Panel", robots: { index: false, follow: false } };

/** Panel: plazas libres del balcón para cada día del encierro (se ven en /el-encierro). */
export default async function EncierroAdminPage() {
  if (!isAdminConfigured() || !(await isAdmin())) {
    return (
      <AdminShell>
        <LoginForm />
      </AdminShell>
    );
  }
  const c = writer();
  const doc = c
    ? await c.fetch<{ days?: { day?: number; seats?: number }[] } | null>(`*[_id == $id][0]{ days }`, { id: encierroDocId() })
    : null;
  return (
    <AdminShell logout>
      <Link href="/admin" className="text-[14px] text-vino hover:underline">
        ← Volver al panel
      </Link>
      <h1 className="mt-3 text-[32px] leading-tight lg:text-[40px]">Plazas del encierro {ENCIERRO.year}</h1>
      <p className="mt-2 text-[16px] text-secundario">
        Escribe cuántas plazas quedan libres cada día y pulsa «Guardar plazas». El calendario de la página{" "}
        <a href="/el-encierro" target="_blank" rel="noreferrer" className="text-vino underline">
          El encierro
        </a>{" "}
        se actualiza al momento. Con 0 plazas, ese día sale como «Completo» y no se puede elegir en el formulario.
      </p>
      {!c ? (
        <p className="mt-6 border border-vino bg-papel p-4 text-[15px]">
          Falta <code>SANITY_WRITE_TOKEN</code> en Vercel: sin esa clave no se pueden guardar las plazas.
        </p>
      ) : null}
      <EncierroSeatsForm seats={mergeEncierroSeats(doc?.days)} />
    </AdminShell>
  );
}
