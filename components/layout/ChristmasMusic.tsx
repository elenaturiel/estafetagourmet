"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n/client";

/** Pon aquí el archivo de audio (MP3). Si no existe, el botón no aparece. */
const SRC = "/navidad/musica.mp3";
const KEY = "eg-musica-navidad";

/**
 * Música de fondo navideña (modo Navidad, temporal).
 *
 * - Intenta sonar nada más abrir la web. Casi todos los navegadores lo
 *   bloquean hasta que el visitante interactúa, así que en ese caso empieza
 *   con su primer clic, toque o tecla.
 * - Si el visitante la pausa con el botón (abajo a la izquierda), se recuerda
 *   y no vuelve a sonar sola en sus próximas visitas.
 * - Sigue sonando al cambiar de página (el componente vive en el layout).
 */
export function ChristmasMusic() {
  const t = useT().common.music;
  const audio = useRef<HTMLAudioElement>(null);
  const chosen = useRef(false); // El visitante ya usó el botón: no arrancar sola.
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);
  const [blocked, setBlocked] = useState(false); // El navegador no la deja sonar aún.

  const remember = (on: boolean) => {
    try {
      localStorage.setItem(KEY, on ? "1" : "0");
    } catch {}
  };

  useEffect(() => {
    let off = false;
    try {
      off = localStorage.getItem(KEY) === "0";
    } catch {}
    if (off) return;
    const events = ["pointerdown", "keydown", "touchend"] as const;
    const stop = () => events.forEach((e) => window.removeEventListener(e, start));
    function start(e?: Event) {
      // El propio botón ya enciende/apaga la música: aquí no se toca.
      if (e?.target instanceof Element && e.target.closest("[data-musica]")) return;
      const a = audio.current;
      if (!a || !a.paused || chosen.current) return stop();
      a.play().then(stop, () => setBlocked(true));
    }
    events.forEach((e) => window.addEventListener(e, start));
    start(); // Por si el navegador permite el autoplay.
    return stop;
  }, []);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    chosen.current = true;
    if (a.paused) {
      a.play().catch(() => {});
      remember(true);
    } else {
      a.pause();
      remember(false);
    }
  };

  return (
    <>
      <audio
        ref={audio}
        src={SRC}
        loop
        preload="auto"
        onPlay={() => {
          setPlaying(true);
          setBlocked(false);
        }}
        onPause={() => setPlaying(false)}
        onError={() => setAvailable(false)}
      />
      {available && blocked && !playing ? (
        <button
          data-musica
          type="button"
          onClick={toggle}
          className="fixed left-[64px] z-40 rounded-full bg-crema px-4 py-2 text-[14px] font-semibold text-[var(--navidad-verde,#1b4a33)] shadow-[0_10px_30px_-8px_rgba(42,31,26,0.55)] bottom-[calc(var(--cookie-h,0px)+18px)] lg:left-[88px] lg:bottom-[calc(var(--cookie-h,0px)+32px)]"
        >
          🎵 {t.hint}
        </button>
      ) : null}
      {available ? (
        <button
          data-musica
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? t.pause : t.play}
          title={playing ? t.pause : t.play}
          className="fixed left-3 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--navidad-verde,#1b4a33)] text-crema shadow-[0_10px_30px_-8px_rgba(42,31,26,0.55)] transition-[bottom,transform] duration-200 ease-out hover:brightness-110 active:scale-95 bottom-[calc(var(--cookie-h,0px)+12px)] lg:left-6 lg:h-14 lg:w-14 lg:bottom-[calc(var(--cookie-h,0px)+24px)]"
        >
          {playing ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M9 17.5V6.2a1 1 0 0 1 .76-.97l9-2.25A1 1 0 0 1 20 4v11.5a2.5 2.5 0 1 1-2-2.45V7.03l-7 1.75v8.72A2.5 2.5 0 1 1 9 17.5Z" />
            </svg>
          )}
        </button>
      ) : null}
    </>
  );
}
