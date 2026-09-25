"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { EMAIL_RE, inputClasses } from "@/components/forms/Field";
import { buttonClasses } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CheckCircleIcon, CloseIcon } from "@/components/ui/icons";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { submitNewsletter } from "@/lib/forms";
import { markDismissed, markSubscribed, shouldShowPopup } from "./popup-store";

/** Pequeña espera para que la página se pinte antes de que entre el popup. */
const DELAY_MS = 800;
/** Páginas donde no molestamos: comprando o buscando. */
const EXCLUDED = ["/cesta", "/buscar"];

const perks = [
  "Lanzamientos y ediciones limitadas, antes que nadie",
  "Cestas de temporada: San Fermín, Navidad…",
  "Maridajes y recetas con producto navarro",
];

/**
 * Popup de bienvenida para captar suscriptores.
 *
 * - Sale nada más entrar en la web. Si lo cierra no vuelve hasta dentro de
 *   30 días, y si se suscribe no vuelve más.
 * - Convive con la barra de cookies: se coloca justo encima de ella
 *   (variable --cookie-h) y la barra sigue siendo usable, por eso el popup
 *   no bloquea la página como un modal.
 * - En móvil es una hoja inferior. Esc o el fondo oscuro lo cierran.
 */
export function NewsletterPopup() {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "confirmed">("idle");
  const [doubleOptIn, setDoubleOptIn] = useState(false);
  const [error, setError] = useState<string>();

  // Vuelta desde el correo de confirmación de Brevo (?suscrito=1).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("suscrito") !== "1") return;
    markSubscribed();
    const id = window.setTimeout(() => {
      setStatus("confirmed");
      setOpen(true);
    }, 400);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    // Prueba: ?popup=1 lo abre siempre, aunque ya se haya cerrado o suscrito.
    const forced = new URLSearchParams(window.location.search).get("popup") === "1";
    if (forced) {
      const id = window.setTimeout(() => setOpen(true), DELAY_MS);
      return () => window.clearTimeout(id);
    }
    if (EXCLUDED.some((p) => pathname.startsWith(p))) return;
    if (!shouldShowPopup()) return;
    const id = window.setTimeout(() => {
      if (shouldShowPopup()) setOpen(true);
    }, DELAY_MS);
    return () => window.clearTimeout(id);
  }, [pathname]);

  // Cerrar sin suscribirse cuenta como "no, gracias" (no vuelve en 30 días).
  const statusRef = useRef(status);
  useEffect(() => {
    statusRef.current = status;
  }, [status]);
  const close = useCallback(() => {
    if (statusRef.current === "idle" || statusRef.current === "sending") markDismissed();
    setOpen(false);
  }, []);

  // Abierto: foco dentro, Esc cierra y la página de fondo no hace scroll.
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.({ preventScroll: true });
    };
  }, [open, close]);



  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email")?.toString().trim() ?? "";
    if (!EMAIL_RE.test(email)) {
      setError("Escribe un correo electrónico válido, por ejemplo nombre@correo.com.");
      inputRef.current?.focus();
      return;
    }
    setError(undefined);
    setStatus("sending");
    try {
      const res = await submitNewsletter(email, "popup", data.get("website")?.toString() ?? "");
      markSubscribed();
      setDoubleOptIn(res.doubleOptIn);
      setStatus("done");
    } catch (err) {
      setError((err as Error).message);
      setStatus("idle");
    }
  }

  if (!open) return null;

  return (
    <>
      {/* Fondo oscuro: al pulsarlo se cierra. La barra de cookies queda por encima. */}
      <div
        aria-hidden="true"
        onClick={close}
        className="fixed inset-0 z-[60] animate-[fade-in_300ms_var(--ease-out)] bg-tinta/55"
      />
      <div className="pointer-events-none fixed inset-x-0 top-0 bottom-[var(--cookie-h,0px)] z-[70] flex items-end justify-center sm:items-center sm:p-6">
    <div
      ref={panelRef}
      role="dialog"
      aria-labelledby="popup-title"
      tabIndex={-1}
      className={cn(
        "pointer-events-auto max-h-full w-full overflow-y-auto rounded-t-[20px] bg-crema text-tinta outline-none animate-rise",
        "sm:max-h-[calc(100%-16px)] sm:max-w-[820px] sm:rounded-eg sm:shadow-[0_30px_60px_-30px_rgba(42,31,26,0.6)]",
      )}
    >
      <div className="grid sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Imagen: solo en pantallas medianas y grandes */}
        <div className="relative hidden bg-vino p-6 sm:block">
          <div className="arch h-full overflow-hidden">
            <ImagePlaceholder label="Foto · novedades de temporada" className="h-full min-h-[380px]" />
          </div>
        </div>

        <div className="relative px-6 pt-8 pb-6 sm:px-10 sm:py-12">
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute top-2 right-2 inline-flex h-11 w-11 items-center justify-center hover:text-vino"
          >
            <CloseIcon />
          </button>

          {status === "done" || status === "confirmed" ? (
            <div role="status" className="py-6 text-center sm:text-left">
              <CheckCircleIcon size={40} className="mx-auto text-vino sm:mx-0" />
              <h2 id="popup-title" className="mt-4 text-[30px] leading-tight tracking-[-0.02em]">
                {status === "confirmed" ? "¡Suscripción confirmada!" : "¡Ya casi estás dentro!"}
              </h2>
              <p className="mt-3 text-[16px] text-secundario">
                {status === "confirmed"
                  ? "Gracias. Serás de los primeros en enterarte de todo lo nuevo."
                  : doubleOptIn
                    ? "Te hemos enviado un correo: pulsa el enlace para confirmar (mira también en spam)."
                    : "Gracias. Serás de los primeros en enterarte de todo lo nuevo."}
              </p>
              <button type="button" onClick={() => setOpen(false)} className={cn(buttonClasses("primary", "md"), "mt-6")}>
                Seguir mirando
              </button>
            </div>
          ) : (
            <>
              <p className="eyebrow text-vino">Club Estafeta</p>
              <h2
                id="popup-title"
                className="mt-3 text-[30px] leading-[1.05] tracking-[-0.02em] sm:text-[38px]"
              >
                Sé de los primeros en <em className="font-normal text-vino italic">probar lo nuevo</em>
              </h2>
              <p className="mt-3 text-[16px] text-secundario">
                Apúntate y te avisamos antes que a nadie<span className="sm:hidden"> de lanzamientos, cestas de temporada y recetas.</span>
                <span className="hidden sm:inline">:</span>
              </p>
              {/* En móvil se omite la lista para que la hoja no tape la página. */}
              <ul className="mt-4 hidden space-y-2 text-[15px] sm:block">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2.5">
                    <CheckCircleIcon size={18} className="mt-0.5 shrink-0 text-vino" />
                    {perk}
                  </li>
                ))}
              </ul>
              {site.newsletterIncentive ? (
                <p className="mt-4">
                  <span className="sticker bg-dorado text-tinta">Regalo de bienvenida</span>{" "}
                  <span className="text-[14px] font-medium">{site.newsletterIncentive}</span>
                </p>
              ) : null}

              <form onSubmit={onSubmit} noValidate className="mt-6">
                <label htmlFor="popup-email" className="mb-2 block text-[14px] font-medium">
                  Tu correo electrónico
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    ref={inputRef}
                    id="popup-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    placeholder="nombre@correo.com"
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? "popup-email-error" : "popup-legal"}
                    className={cn(inputClasses, "min-h-[52px] flex-1")}
                  />
                  {/* Trampa para bots: invisible para las personas. */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={cn(buttonClasses("primary", "md"), "lg:min-h-[52px]")}
                  >
                    {status === "sending" ? "Enviando…" : "Quiero saber más"}
                  </button>
                </div>
                {error ? (
                  <p id="popup-email-error" role="alert" className="mt-2 text-[13px] font-medium text-vino">
                    {error}
                  </p>
                ) : null}
                <p id="popup-legal" className="mt-3 text-[12px] leading-relaxed text-secundario">
                  Al suscribirte aceptas recibir nuestros correos y la{" "}
                  <Link href="/privacidad" className="underline underline-offset-2 hover:text-vino">
                    política de privacidad
                  </Link>
                  . Puedes darte de baja cuando quieras desde cualquier correo.
                </p>
              </form>
              <button
                type="button"
                onClick={close}
                className="mt-4 min-h-[44px] text-[14px] text-secundario underline underline-offset-4 hover:text-vino"
              >
                No, gracias
              </button>
            </>
          )}
        </div>
      </div>
    </div>
      </div>
    </>
  );
}
