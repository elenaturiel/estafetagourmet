import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";
import { getLocale, getT } from "@/lib/i18n/server";

/**
 * Mapa interactivo de Google Maps (arrastrar, zoom, Street View), cargado
 * directamente en la sección «Visítanos». Google puede instalar sus propias
 * cookies al mostrarlo (ver /cookies).
 */
export async function GoogleMap({ className }: { className?: string }) {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  return (
    <div
      className={`relative overflow-hidden rounded-eg border border-linea bg-crema-oscuro ${className ?? ""}`}
    >
      <iframe
        title={t.home.visit.mapTitle}
        src={site.mapEmbedSrc.replace("hl=es", `hl=${locale}`)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}

/** Botón "Cómo llegar" (abre la ruta en Google Maps). */
export async function DirectionsButton({ className }: { className?: string }) {
  const t = (await getT()).home.visit;
  return (
    <ButtonLink
      href={site.directionsHref}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {t.directions}
      <span className="sr-only">{t.directionsTab}</span>
    </ButtonLink>
  );
}
