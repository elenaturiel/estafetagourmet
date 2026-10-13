import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/data/site";

/**
 * Mapa interactivo de Google Maps (arrastrar, zoom, Street View), cargado
 * directamente en la sección «Visítanos». Google puede instalar sus propias
 * cookies al mostrarlo (ver /cookies).
 */
export function GoogleMap({ className }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-eg border border-linea bg-crema-oscuro ${className ?? ""}`}
    >
      <iframe
        title="Mapa de Google Maps con la ubicación de Estafeta Gourmet, Calle Estafeta 70, Pamplona"
        src={site.mapEmbedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
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
