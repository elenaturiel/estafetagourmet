"use client";

import { useEffect, useRef } from "react";

/**
 * Vídeo de fondo del hero: se reproduce solo, sin sonido y en bucle continuo
 * (el archivo ya está preparado para que el final enlace con el principio).
 * Con "reducir movimiento" activado en el dispositivo se queda en la foto fija.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduce.matches) video.pause();
      else void video.play().catch(() => {});
    };
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        poster="/video/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        tabIndex={-1}
      >
        <source src="/video/hero.webm" type="video/webm" />
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      {/* Velo color crema: mantiene legible el texto y deja ver el vídeo a la derecha. */}
      <div className="absolute inset-0 bg-gradient-to-b from-crema/90 via-crema/80 to-crema/90 lg:bg-gradient-to-r lg:from-crema/95 lg:via-crema/70 lg:to-crema/10" />
    </div>
  );
}
