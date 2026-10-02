"use client";

import { useSyncExternalStore } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { PinIcon } from "@/components/ui/icons";
import { site } from "@/data/site";

/**
 * Mapa interactivo de Google Maps (arrastrar, zoom, Street View).
 *
 * Google instala cookies de terceros al cargar el mapa, así que no se carga
 * hasta que la persona pulsa "Ver mapa" (consentimiento para ese contenido).
 * La elección se recuerda en este navegador y se puede quitar desde el pie
 * ("Configurar cookies") o borrando los datos del sitio.
 */
const KEY = "eg-map-consent-v1";
const listeners = new Set<() => void>();

const mapConsent = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  get(): boolean {
    try {
      return window.localStorage.getItem(KEY) === "1";
    } catch {
      return false;
    }
  },
  server: () => false,
  allow() {
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {
      // Sin almacenamiento: el mapa se muestra en esta visita pero no se recuerda.
    }
    memory = true;
    listeners.forEach((l) => l());
  },
};

/** Respaldo en memoria cuando localStorage no está disponible. */
let memory = false;
const read = () => memory || mapConsent.get();

export function GoogleMap({ className }: { className?: string }) {
  const allowed = useSyncExternalStore(mapConsent.subscribe, read, mapConsent.server);

  return (
    <div
      className={`relative overflow-hidden rounded-eg border border-linea bg-crema-oscuro ${className ?? ""}`}
    >
      {allowed ? (
        <iframe
          title="Mapa de Google Maps con la ubicación de Estafeta Gourmet, Calle Estafeta 70, Pamplona"
          src={site.mapEmbedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          {/* Fondo que recuerda a un plano, sin cargar nada de Google */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full text-vino/10"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 400 240"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
          >
            <path d="M-10 60 L120 40 L260 90 L410 50" />
            <path d="M40 -10 L90 120 L70 250" />
            <path d="M180 -10 L210 110 L330 250" />
            <path d="M-10 170 L150 150 L300 190 L410 160" />
            <path d="M330 -10 L350 120 L410 140" />
          </svg>
          <PinIcon size={36} className="relative text-vino" />
          <p className="relative font-serif text-[20px] leading-tight">
            {site.address.street}, {site.address.cityShort}
          </p>
          <button
            type="button"
            onClick={() => mapConsent.allow()}
            className="relative inline-flex min-h-[52px] items-center justify-center rounded-eg border border-vino bg-vino px-7 text-[15px] font-semibold text-crema transition-colors hover:border-vino-oscuro hover:bg-vino-oscuro"
          >
            Ver mapa interactivo
          </button>
          <p className="relative max-w-xs text-[12px] leading-snug text-secundario">
            Al verlo se carga Google Maps, que puede usar cookies.{" "}
            <a
              href={site.directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-vino underline underline-offset-2"
            >
              O ábrelo directamente en Google Maps
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}

/** Botón "Cómo llegar" (abre la ruta en Google Maps). */
export function DirectionsButton({ className }: { className?: string }) {
  return (
    <ButtonLink
      href={site.directionsHref}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      Cómo llegar<span className="sr-only"> (abre Google Maps en otra pestaña)</span>
    </ButtonLink>
  );
}
