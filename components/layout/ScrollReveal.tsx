"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Activa las apariciones al hacer scroll.
 *
 * - [data-reveal]: el elemento aparece al entrar en pantalla.
 * - [data-reveal-stagger]: cada hijo aparece con un pequeño escalonado (70 ms).
 *
 * Se anima una sola vez: volver a animar cada vez que pasa por pantalla
 * sería una interfaz peleándose con quien la lee. Un único observer para
 * toda la página; se reinicia al cambiar de ruta.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Los grupos se observan enteros: así las tarjetas de un carrusel que
    // quedan fuera por el lateral no se quedan ocultas.
    const groups = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-stagger]"));
    groups.forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        const el = child as HTMLElement;
        el.setAttribute("data-reveal", "");
        el.style.setProperty("--reveal-i", String(Math.min(i, 6)));
      });
    });

    const singles = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-visible])"),
    ).filter((el) => !el.parentElement?.hasAttribute("data-reveal-stagger"));

    const show = (target: Element) => {
      if (target.hasAttribute("data-reveal-stagger")) {
        Array.from(target.children).forEach((c) => c.setAttribute("data-visible", ""));
      } else {
        target.setAttribute("data-visible", "");
      }
    };

    const targets = [...groups, ...singles];
    if (!("IntersectionObserver" in window)) {
      targets.forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          observer.unobserve(entry.target);
        }
      },
      // Se dispara algo antes de que el elemento esté del todo dentro.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
