import type { Metadata } from "next";
import { isSanityConfigured } from "@/sanity/env";
import { Studio } from "./Studio";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Panel del blog",
  robots: { index: false, follow: false },
};

export { viewport } from "next-sanity/studio";

/**
 * Panel para escribir entradas del blog (Sanity Studio).
 * Pide iniciar sesión; solo entran las personas invitadas al proyecto.
 */
export default function AdminPage() {
  if (!isSanityConfigured) {
    return (
      <main className="mx-auto max-w-xl px-6 py-20">
        <h1 className="text-[36px] leading-tight">Panel del blog sin configurar</h1>
        <p className="mt-4 text-secundario">
          Falta conectar el proyecto de Sanity. Añade la variable de entorno
          <code className="mx-1 rounded bg-papel px-1">NEXT_PUBLIC_SANITY_PROJECT_ID</code>
          y vuelve a publicar la web. Los pasos están en el README, en «Blog: panel para escribir
          entradas».
        </p>
      </main>
    );
  }
  return <Studio />;
}
