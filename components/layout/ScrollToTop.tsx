"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Al entrar en otra página, la lleva arriba del todo.
 *
 * Next.js mantiene la posición si el contenido nuevo ya está a la vista (con
 * la cabecera fija eso deja la página "a la mitad"). Aquí se sube siempre,
 * salvo:
 * - con el botón "Atrás/Adelante", donde el navegador devuelve a donde estabas;
 * - si el enlace lleva a una sección concreta (#contacto…).
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const first = useRef(true);
  const fromHistory = useRef(false);

  useEffect(() => {
    const onPop = () => {
      fromHistory.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (fromHistory.current) {
      fromHistory.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
