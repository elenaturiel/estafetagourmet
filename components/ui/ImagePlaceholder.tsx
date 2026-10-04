import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  /** Etiqueta del marcador (abajo a la izquierda, 12px). */
  label: string;
  /** Texto alternativo; obligatorio si se pasa `src`. */
  alt?: string;
  /** Foto real. Cuando existe se muestra con next/image ocupando el mismo hueco. */
  src?: string;
  /** Proporción del bloque (CSS aspect-ratio), p. ej. "1 / 1" o "4 / 3". */
  ratio?: string;
  className?: string;
  /** Atributo `sizes` para next/image. */
  sizes?: string;
  priority?: boolean;
  /** La foto se desliza dentro del marco al hacer scroll (ver .parallax-media). */
  parallax?: boolean;
  /** "contain" muestra la foto entera (fondo blanco) en vez de recortarla. */
  fit?: "cover" | "contain";
};

/**
 * Hueco de imagen. Mientras no haya fotos pinta un bloque #E6DAC4 con la
 * etiqueta; con `src` pinta la foto con el mismo tamaño y recorte, de modo
 * que el diseño no cambia al sustituir marcadores por fotos reales.
 */
export function ImagePlaceholder({
  label,
  alt,
  src,
  ratio,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
  parallax,
  fit = "cover",
}: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        src && fit === "contain" ? "bg-white" : "bg-placeholder",
        className,
      )}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {src ? (
        <div className={cn("absolute inset-0", parallax && "parallax-media")}>
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            sizes={sizes}
            priority={priority}
            className={fit === "contain" ? "object-contain" : "object-cover"}
          />
        </div>
      ) : (
        <>
          {/* Capa de fondo: con foto real es la que se desplaza en el parallax. */}
          <div
            aria-hidden="true"
            className={cn("absolute inset-0 bg-placeholder", parallax && "parallax-media")}
          />
          <span
            role={alt ? "img" : undefined}
            aria-label={alt}
            className="absolute inset-0 flex items-end p-3 text-[12px] leading-tight text-secundario"
          >
            <span aria-hidden={alt ? "true" : undefined}>{label}</span>
          </span>
        </>
      )}
    </div>
  );
}
