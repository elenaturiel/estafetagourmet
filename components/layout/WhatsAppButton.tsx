"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

/** Ficha de producto: /tienda/<categoria>/<producto>. */
const PRODUCT_PAGE = /^\/tienda\/[^/]+\/[^/]+\/?$/;

function chatUrl(message: string) {
  return `${site.whatsappHref}?text=${encodeURIComponent(message)}`;
}

/**
 * Botón flotante de WhatsApp, abajo a la derecha.
 *
 * - Al pasar el ratón (o con el foco del teclado) se despliega con el texto
 *   "Escríbenos por WhatsApp"; en móvil es solo el icono, para no tapar nada.
 * - En una ficha de producto el mensaje ya lleva el nombre del producto.
 * - Se coloca encima de la barra de cookies (--cookie-h) y, en móvil, de la
 *   barra de compra de la ficha, para no estorbar a ninguna.
 * - Aro que "late" cada pocos segundos.
 */
export function WhatsAppButton() {
  const pathname = usePathname();
  const onProduct = PRODUCT_PAGE.test(pathname);

  const open = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Con el nombre del producto en el mensaje si estamos en su ficha.
    const title = onProduct ? document.querySelector("main h1")?.textContent?.trim() : "";
    const message = title
      ? `Hola, os escribo desde la web de Estafeta Gourmet. Me interesa: ${title}`
      : site.whatsappMessage;
    e.currentTarget.href = chatUrl(message);
  };

  return (
    <aside
      aria-label="Contacto por WhatsApp"
      className={cn(
        "fixed right-4 z-40 transition-[bottom] duration-300 ease-out",
        "bottom-[calc(var(--cookie-h,0px)+16px)] lg:right-6 lg:bottom-[calc(var(--cookie-h,0px)+24px)]",
        // En móvil, las fichas de producto tienen una barra fija de compra (≈72 px).
        onProduct && "max-lg:bottom-[calc(var(--cookie-h,0px)+88px)]",
      )}
    >
      {/* Aro que late: llama la atención sin ser pesado (fuera del botón, para que no se recorte) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-vino animate-[wa-pulse_3.6s_var(--ease-out)_infinite]"
      />
      <a
        href={chatUrl(site.whatsappMessage)}
        onClick={open}
        onAuxClick={open}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp (se abre en otra pestaña)"
        className="group relative flex h-14 items-center overflow-hidden rounded-full bg-vino text-crema shadow-[0_10px_30px_-8px_rgba(42,31,26,0.55)] transition-[background-color,transform] duration-200 ease-out hover:bg-vino-oscuro focus-visible:bg-vino-oscuro active:scale-95"
      >
        {/* Texto: oculto hasta pasar el ratón / foco (solo con ratón; en móvil, solo el icono) */}
        <span
          aria-hidden="true"
          className="max-w-0 overflow-hidden pl-0 text-[15px] font-semibold whitespace-nowrap opacity-0 transition-[max-width,opacity,padding] duration-300 ease-out group-focus-visible:max-w-[220px] group-focus-visible:pl-5 group-focus-visible:opacity-100 [@media(hover:hover)]:group-hover:max-w-[220px] [@media(hover:hover)]:group-hover:pl-5 [@media(hover:hover)]:group-hover:opacity-100"
        >
          Escríbenos por WhatsApp
        </span>
        <span className="flex h-14 w-14 shrink-0 items-center justify-center">
          <WhatsAppIcon size={28} />
        </span>
      </a>
    </aside>
  );
}
