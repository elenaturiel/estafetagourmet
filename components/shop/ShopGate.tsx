"use client";

import { useEffect, useRef } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/data/site";
import { TIENDA_ONLINE_ACTIVA, TIENDA_ONLINE_ORIGEN } from "@/data/tienda-online";
import { useT } from "@/lib/i18n/client";

const EVENT = "tienda-online:aviso";

/** Abre el aviso de «tienda en construcción» (p. ej. al marcar Aceites en el filtro). */
export function openShopGate() {
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Mientras la tienda online no está operativa (TIENDA_ONLINE_ACTIVA = false),
 * cualquier enlace a ella no lleva a ningún sitio: se abre este aviso con el
 * botón para pedir por WhatsApp.
 */
export function ShopGate() {
  const ref = useRef<HTMLDialogElement>(null);
  const t = useT().common.shopNotice;

  useEffect(() => {
    if (TIENDA_ONLINE_ACTIVA) return;
    const open = () => ref.current?.showModal();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a || !a.getAttribute("href")?.startsWith(TIENDA_ONLINE_ORIGEN)) return;
      e.preventDefault();
      e.stopPropagation();
      open();
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    window.addEventListener(EVENT, open);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
      window.removeEventListener(EVENT, open);
    };
  }, []);

  if (TIENDA_ONLINE_ACTIVA) return null;
  const href = `${site.whatsappHref}?text=${encodeURIComponent(t.message)}`;
  return (
    <dialog
      ref={ref}
      aria-labelledby="tienda-aviso-titulo"
      onClick={(e) => {
        // Clic fuera del recuadro: cerrar.
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
      className="m-auto w-[min(92vw,460px)] rounded-eg bg-crema p-0 text-tinta shadow-2xl backdrop:bg-tinta/60"
    >
      <div className="border-t-4 border-vino px-6 pt-6 pb-6 text-center sm:px-8">
        <p id="tienda-aviso-titulo" className="font-serif text-[26px] leading-tight text-vino">
          {t.title}
        </p>
        <p className="mt-2 text-[16px] text-secundario">{t.dialogText}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-eg bg-vino px-5 text-[15px] font-semibold text-crema hover:bg-vino/90"
          >
            <WhatsAppIcon size={20} />
            {t.button}
          </a>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="inline-flex min-h-[44px] items-center justify-center rounded-eg border border-tinta px-5 text-[15px] font-semibold hover:border-vino hover:text-vino"
          >
            {t.close}
          </button>
        </div>
      </div>
    </dialog>
  );
}
