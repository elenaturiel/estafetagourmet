"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";
import { consentStore } from "./consent";

function useConsent() {
  const consent = useSyncExternalStore(
    consentStore.subscribe,
    consentStore.getSnapshot,
    consentStore.getServerSnapshot,
  );
  const reopen = useSyncExternalStore(
    consentStore.subscribe,
    consentStore.isReopenRequested,
    () => false,
  );
  return { consent, reopen };
}

/**
 * Banner de cookies. "Rechazar" y "Aceptar" tienen el mismo peso visual y
 * están al mismo nivel: rechazar es tan fácil como aceptar.
 */
export function CookieBanner() {
  const { consent, reopen } = useConsent();
  if (consent === "unknown") return null;
  if (consent !== null && !reopen) return null;

  return (
    <section
      aria-labelledby="cookie-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-linea bg-papel text-tinta"
    >
      <div className="container-site flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-3xl">
          <h2 id="cookie-title" className="font-serif text-[20px]">
            {t.cookies.title}
          </h2>
          <p className="mt-1 text-[15px] leading-relaxed text-secundario">
            {t.cookies.text}{" "}
            <Link href="/cookies" className="font-semibold text-vino underline underline-offset-4">
              {t.cookies.more}
            </Link>
          </p>
        </div>
        <div className="grid shrink-0 grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => consentStore.set("denied")}
            className="min-h-[52px] rounded-eg border border-tinta px-6 text-[15px] font-semibold hover:bg-tinta hover:text-crema"
          >
            {t.cookies.reject}
          </button>
          <button
            type="button"
            onClick={() => consentStore.set("granted")}
            className="min-h-[52px] rounded-eg border border-tinta px-6 text-[15px] font-semibold hover:bg-tinta hover:text-crema"
          >
            {t.cookies.accept}
          </button>
        </div>
      </div>
    </section>
  );
}

/** Enlace del pie para volver a abrir el banner y cambiar la elección. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => consentStore.requestReopen()}
      className={cn("inline-flex min-h-[44px] items-center", className)}
    >
      {t.footer.cookieSettings}
    </button>
  );
}

/**
 * Punto único donde se cargaría la analítica. NO carga nada salvo que el
 * usuario haya aceptado. TODO: añadir aquí el script de analítica elegido
 * (p. ej. con next/script) cuando se decida la herramienta.
 */
export function Analytics() {
  const { consent } = useConsent();
  if (consent !== "granted") return null;
  return null;
}
