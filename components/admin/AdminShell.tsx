import Link from "next/link";
import type { ReactNode } from "react";
import { logout } from "@/app/admin/actions";

/** Marco del panel: cabecera sencilla con el nombre de la tienda, enlace a la web y botón de salir. */
export function AdminShell({ children, logout: showLogout = false, wide = false }: { children: ReactNode; logout?: boolean; wide?: boolean }) {
  return (
    <div className="min-h-dvh bg-crema text-tinta">
      <header className="border-b border-linea bg-papel">
        <div className={`mx-auto flex h-[60px] items-center justify-between gap-4 px-4 ${wide ? "max-w-5xl" : "max-w-3xl"}`}>
          <Link href="/admin" className="font-serif text-[20px]">
            Estafeta Gourmet <span className="text-[14px] text-secundario">· Panel</span>
          </Link>
          <div className="flex items-center gap-4 text-[14px]">
            <a href="/blog" target="_blank" rel="noreferrer" className="text-vino hover:underline">
              Ver el blog
            </a>
            {showLogout ? (
              <form action={logout}>
                <button type="submit" className="min-h-[40px] font-semibold text-secundario hover:text-vino">
                  Salir
                </button>
              </form>
            ) : null}
          </div>
        </div>
      </header>
      <main className={`mx-auto px-4 py-8 lg:py-12 ${wide ? "max-w-5xl" : "max-w-3xl"}`}>{children}</main>
    </div>
  );
}
