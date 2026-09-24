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
}: Props) {
  return (
    <div
      className={cn("relative w-full overflow-hidden bg-placeholder", className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <span
          role={alt ? "img" : undefined}
          aria-label={alt}
          className="absolute inset-0 flex items-end p-3 text-[12px] leading-tight text-secundario"
        >
          <span aria-hidden={alt ? "true" : undefined}>{label}</span>
        </span>
      )}
    </div>
  );
}
