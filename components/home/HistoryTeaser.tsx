import { Eyebrow } from "@/components/ui/Section";

/**
 * Un párrafo corto sobre la historia de la tienda, justo debajo de la
 * cabecera de la portada. Enlaza al apartado "Quiénes somos" más abajo.
 */
export function HistoryTeaser() {
  return (
    <section aria-label="Nuestra historia" className="border-b border-linea bg-papel">
      <div className="container-site py-8 text-center lg:py-10">
        <Eyebrow>Nuestra historia</Eyebrow>
        <p className="mx-auto mt-3 max-w-2xl font-serif text-[19px] leading-[1.5] text-tinta lg:text-[22px]">
          Estafeta Gourmet nació en la calle Estafeta, en pleno casco viejo de Pamplona, para reunir en un solo sitio lo
          mejor de los pequeños productores navarros, catado y elegido uno a uno. Detrás de cada lata y cada botella hay una
          familia y un oficio.
        </p>
        <a
          href="#quienes-title"
          className="mt-3 inline-flex min-h-[44px] items-center text-[15px] font-semibold text-vino underline-offset-4 hover:underline"
        >
          Conoce quiénes somos ↓
        </a>
      </div>
    </section>
  );
}
