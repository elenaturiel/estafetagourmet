"use client";

import { useRef, useState, type CSSProperties, type LiHTMLAttributes, type ReactNode, type Ref } from "react";

/* MagnifyingDock, de Bencho (MIT, bencho.dev/licence), adaptado al menú de
   esta web. Cambios respecto al original:
   · los elementos no son iconos con nombre sino lo que ya tenía el menú
     (enlaces de texto), así que cada uno entra como `content`;
   · `outside` permite colgar de un elemento algo que NO debe crecer ni subir
     con él (aquí, nada: el mega menú vive fuera del dock);
   · sin la etiqueta flotante (`labels`): el texto del menú ya es la etiqueta;
   · sin lucide-react, porque no hay iconos;
   · solo reacciona al ratón: el menú de escritorio se pulsa, no se desliza
     con el dedo. La parte táctil del original (captura de puntero, elegir
     al levantar el dedo) se quitó con ella.
   El resto de comentarios son los originales. */

export type DockItem = {
  key: string;
  /* lo que se ve y se magnifica: aquí, el enlace del menú */
  content: ReactNode;
  active?: boolean;
  /* lo que cuelga del elemento sin magnificarse */
  outside?: ReactNode;
  /* atributos del <li>, p. ej. los manejadores de ratón del mega menú */
  li?: LiHTMLAttributes<HTMLLIElement> & { ref?: Ref<HTMLLIElement> };
};

/* ══ dock, distance based magnification ═══════════════════
   Scale falls off with distance from the cursor rather than
   applying only to the hovered item, which is what stops it
   reading as a row of buttons that happen to grow. */

export function MagnifyingDock({
  items,
  /* what the glyph under the cursor grows to. Menos que en el
     original (1.32): son palabras en mayúsculas, no un icono de
     20px, y a 1.32 se pisarían con las vecinas. */
  magnify = 1.18,
  /* how many neighbours either side feel it. This is the knob
     that decides whether the dock reads as a row of buttons
     that happen to grow or as a sheet being pushed up from
     underneath — at 0 it is the former, and no amount of
     magnification rescues it. */
  spread = 1,
  /* how far the nearest glyph rises out of the bar */
  lift = 3,
  className,
}: {
  items: DockItem[];
  magnify?: number;
  spread?: number;
  lift?: number;
  className?: string;
}) {
  const [hover, setHover] = useState<number | null>(null);

  /* ── THE BAR READS THE POINTER, THE ITEMS DO NOT ─────────
     Each item used to carry its own onMouseEnter, which fails
     on a touch screen twice over. A mouse event is the smaller
     half of it — the real problem is that a touch is captured
     to whatever it started on, so sliding a finger along the
     dock keeps sending every event to the first icon you
     landed on and nothing else ever learns the finger arrived.

     One handler on the bar, and the index comes from where the
     pointer is: the nearest item centre to the pointer's x.
     Measured rather than derived from the index, because the
     items are not all the same width once one of them is
     magnified — the geometry moves as you sweep, which is
     exactly what makes a dock a dock, and an arithmetic guess
     would lag it. */
  const bar = useRef<HTMLUListElement | null>(null);

  const at = (clientX: number) => {
    const els = bar.current?.querySelectorAll(".gdock-item");
    if (!els?.length) return null;
    let best = 0;
    let gap = Infinity;
    els.forEach((el, i) => {
      const b = el.getBoundingClientRect();
      const d = Math.abs(clientX - (b.left + b.width / 2));
      if (d < gap) { gap = d; best = i; }
    });
    return best;
  };

  const track = (e: React.PointerEvent) => {
    /* a mouse magnifies on hover, the way it always did; a
       finger passing over the bar (a tablet in landscape also
       shows this menu) would only make it jump */
    if (e.pointerType !== "mouse") return;
    setHover(at(e.clientX));
  };

  return (
    <ul
      className={className ? `gdock ${className}` : "gdock"}
      ref={bar}
      onPointerMove={track}
      onPointerLeave={() => setHover(null)}
    >
      {items.map(({ key, content, active, outside, li }, i) => {
        const d = hover === null ? 99 : Math.abs(i - hover);
        /* A raised cosine over the reach, rather than the three
           hand-picked steps this used to carry. Those could not
           be made adjustable without also picking every
           intermediate value by hand, and a curve is what the
           effect was always imitating: 1 under the cursor,
           easing to 0 at the edge of the reach, and flat zero
           past it. */
        const f =
          d > spread ? 0 : (1 + Math.cos((Math.PI * d) / (spread + 1))) / 2;
        const scale = 1 + (magnify - 1) * f;
        return (
          <li
            key={key}
            {...li}
            className={li?.className ? `gdock-item ${li.className}` : "gdock-item"}
            data-near={d <= 1 ? d : undefined}
            data-active={active ? "true" : "false"}
          >
            {/* the glyph magnifies, not the button. Scaling the
                whole item dragged the dot and the label along
                with it — the label ended up 15px further from
                the bar purely as a side effect of the zoom. */}
            <span
              className="gdock-glyph"
              style={{ transform: `translateY(${-lift * f}px) scale(${scale})` } as CSSProperties}
            >
              {content}
            </span>
            <span className="gdock-dot" data-on={active ? "true" : "false"} aria-hidden="true" />
            {outside}
          </li>
        );
      })}
    </ul>
  );
}
