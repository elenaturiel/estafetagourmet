"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react";
import type { Transition, Variants } from "motion/react";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * Menú de escritorio de la cabecera. Es la mecánica del "SiteHeader" (variante
 * mega) adaptada a esta web, con los mismos enlaces de siempre:
 *
 *  · el marcador de la sección actual (raya vino) se DESLIZA de un enlace a
 *    otro, y al pasar el ratón una pastilla suave sigue al cursor;
 *  · el panel de la tienda se abre con un muelle (crece con un poco de vida y
 *    se encoge sin rebote); su contenido entra desde el lado hacia el que
 *    te mueves, y al abrir desde cerrado cae desde la barra;
 *  · hover con intención (70 ms antes de abrir, 180 ms de gracia al salir);
 *  · teclado: ← → entre enlaces, ↓ entra al panel, ↑ ↓ Inicio Fin dentro,
 *    Esc cierra y devuelve el foco;
 *  · con "reducir movimiento" solo hay fundidos.
 *
 * Se quitó del original lo que aquí ya hace otra parte: la marca, las
 * acciones y la hoja móvil (el menú móvil es el cajón de Header.tsx), y las
 * variantes simple/centrada.
 */

export type SiteNavItem = {
  /** Valor estable, también sirve para marcar la sección actual. */
  value: string;
  label: string;
  href: string;
  /** Si la sección es la página actual. */
  current: boolean;
  /** Panel desplegable (solo "Tienda"). Se cierra al elegir un enlace de dentro. */
  panel?: ReactNode;
  /** Texto accesible del botón que abre el panel. */
  panelLabel?: string;
};

type Bezier = [number, number, number, number];
/* Curvas y tiempos propios (el original usa los tokens de movimiento de su
   librería, que aquí no existen). Mismos valores que usa el resto de la web. */
const enter: Bezier = [0.23, 1, 0.32, 1];
const standard: Bezier = [0.4, 0, 0.2, 1];
const D = { instant: 0.12, fast: 0.18, standard: 0.28, exit: 0.2 };
const BLUR = 4;
const MORPH: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 36,
  mass: 1,
};

/** Muelles por duración visual, escritos como rigidez y amortiguación para que, al reajustarlos, se conserve la velocidad en curso. */
const physical = (visualDuration: number, bounce: number): Transition => {
  const root = (2 * Math.PI) / (visualDuration * 1.2);
  return {
    type: "spring",
    stiffness: root * root,
    damping: 2 * (1 - bounce) * root,
    mass: 1,
  };
};
const GROW = physical(0.44, 0.12);
const SHRINK = physical(0.34, 0);
const GLIDE = physical(0.3, 0.1);
const SLIDE = physical(0.4, 0.06);
const HOVER_INTENT = 70;
const LEAVE_GRACE = 180;
const TRAVEL = 36;

/** El contenido del panel entra desde el lado del elemento recién abierto; al abrir desde cerrado cae desde la barra. */
const faceVariants: Variants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction * TRAVEL,
    y: direction ? 0 : -6,
    filter: `blur(${BLUR}px)`,
  }),
  shown: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: {
      x: SLIDE,
      y: SLIDE,
      opacity: { duration: D.fast, ease: enter, delay: 0.02 },
      filter: { duration: D.standard, ease: enter },
    },
  },
  gone: (direction: number) => ({
    opacity: 0,
    x: direction * -TRAVEL * 0.6,
    filter: `blur(${BLUR}px)`,
    transition: {
      x: SLIDE,
      opacity: { duration: D.instant, ease: standard },
      filter: { duration: D.instant, ease: standard },
    },
  }),
};
const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: D.fast } },
  gone: { opacity: 0, transition: { duration: D.instant } },
};

/** Una cara del panel informa de su altura natural mientras es la actual; la que sale flota fuera del flujo y queda inerte. */
function Face({
  direction,
  reduced,
  onHeight,
  children,
}: {
  direction: number;
  reduced: boolean;
  onHeight: (height: number) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const present = useIsPresent();
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || !present) return;
    onHeight(node.offsetHeight);
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => onHeight(node.offsetHeight));
    observer.observe(node);
    return () => observer.disconnect();
  }, [present, onHeight]);
  return (
    <motion.div
      ref={ref}
      className="w-full data-[leaving]:absolute data-[leaving]:inset-x-0 data-[leaving]:top-0"
      data-face=""
      data-leaving={present ? undefined : ""}
      inert={!present}
      custom={direction}
      variants={reduced ? fadeVariants : faceVariants}
      initial="hidden"
      animate="shown"
      exit="gone"
    >
      {children}
    </motion.div>
  );
}

export function SiteNav({
  items,
  label,
}: {
  items: SiteNavItem[];
  label: string;
}) {
  const id = useId();
  const reduced = !!useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState<{ value: string; direction: number } | null>(
    null,
  );
  const [panel, setPanel] = useState<{ height: number | null; grow: boolean }>({
    height: null,
    grow: true,
  });
  const triggerRefs = useRef(new Map<string, HTMLElement>());
  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openTimer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);
  const focusFirst = useRef(false);
  const openItem = open
    ? items.find((item) => item.value === open.value)
    : undefined;

  const clearTimers = useCallback(() => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  }, []);
  useEffect(() => clearTimers, [clearTimers]);

  const openPanel = useCallback(
    (value: string | null) => {
      setOpen((previous) => {
        if (!value) return null;
        if (previous?.value === value) return previous;
        const from = previous
          ? items.findIndex((item) => item.value === previous.value)
          : -1;
        const to = items.findIndex((item) => item.value === value);
        return { value, direction: from < 0 ? 0 : Math.sign(to - from) };
      });
      if (!value) setPanel({ height: null, grow: true });
    },
    [items],
  );

  const close = useCallback(
    (restoreFocus = false) => {
      clearTimers();
      const was = open?.value;
      openPanel(null);
      if (restoreFocus && was) triggerRefs.current.get(was)?.focus();
    },
    [open, openPanel, clearTimers],
  );

  /** Cierra el panel sin mover el foco (al elegir un enlace de dentro). */
  const dismiss = useCallback(() => {
    clearTimers();
    openPanel(null);
  }, [clearTimers, openPanel]);

  // Pulsar fuera y Esc cierran el panel.
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // Al abrir con el teclado, el foco entra en el primer enlace del panel.
  useEffect(() => {
    if (!open || !focusFirst.current) return;
    focusFirst.current = false;
    const frame = requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus(),
    );
    return () => cancelAnimationFrame(frame);
  }, [open]);

  function onItemPointerEnter(event: ReactPointerEvent, item: SiteNavItem) {
    if (event.pointerType !== "mouse") return;
    setHovered(item.value);
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    if (item.panel) {
      if (open) openPanel(item.value);
      else
        openTimer.current = window.setTimeout(
          () => openPanel(item.value),
          HOVER_INTENT,
        );
    } else if (open) {
      closeTimer.current = window.setTimeout(
        () => openPanel(null),
        LEAVE_GRACE,
      );
    }
  }
  function onRegionPointerLeave(event: ReactPointerEvent) {
    if (event.pointerType !== "mouse") return;
    setHovered(null);
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => openPanel(null), LEAVE_GRACE);
  }
  function onRegionPointerEnter(event: ReactPointerEvent) {
    if (event.pointerType === "mouse") window.clearTimeout(closeTimer.current);
  }

  function onNavKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const triggers = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>("[data-nav-link]"),
    );
    const index = triggers.indexOf(document.activeElement as HTMLElement);
    if (index < 0) return;
    event.preventDefault();
    const nextIndex =
      (index + (event.key === "ArrowRight" ? 1 : -1) + triggers.length) %
      triggers.length;
    triggers[nextIndex].focus();
    if (open) {
      const item = items[nextIndex];
      openPanel(item?.panel ? item.value : null);
    }
  }
  function onTriggerKeyDown(event: ReactKeyboardEvent, value: string) {
    if (event.key !== "ArrowDown") return;
    event.preventDefault();
    if (open?.value === value)
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    else {
      focusFirst.current = true;
      openPanel(value);
    }
  }
  function onPanelKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    const links = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        "[data-face]:not([data-leaving]) a, [data-face]:not([data-leaving]) button",
      ),
    );
    if (!links.length) return;
    event.preventDefault();
    const index = links.indexOf(document.activeElement as HTMLElement);
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? links.length - 1
          : event.key === "ArrowDown"
            ? Math.min(index + 1, links.length - 1)
            : index - 1;
    if (next < 0) {
      close(true);
      return;
    }
    links[next]?.focus();
  }

  // Crecer lleva un poco de vida; encoger se asienta sin rebote.
  const onHeight = useCallback(
    (height: number) =>
      setPanel((previous) =>
        previous.height === height
          ? previous
          : {
              height,
              grow: previous.height === null || height > previous.height,
            },
      ),
    [],
  );

  const panelId = `${id}-panel`;

  return (
    <nav
      ref={rootRef}
      aria-label={label}
      className="relative hidden border-t border-linea lg:block"
      onKeyDown={onNavKeyDown}
      onPointerLeave={onRegionPointerLeave}
      onPointerEnter={onRegionPointerEnter}
    >
      <LayoutGroup id={id}>
        <ul className="container-site flex h-12 items-center justify-center gap-1 xl:gap-4">
          {items.map((item) => {
            const isOpen = open?.value === item.value;
            const label = (
              <span className="relative z-10 text-[14px] font-semibold tracking-[0.06em] uppercase transition-colors">
                {item.label}
              </span>
            );
            const decorations = (
              <>
                {hovered === item.value && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-y-1.5 inset-x-0 rounded-full bg-crema-oscuro/70"
                    transition={reduced ? { duration: 0 } : GLIDE}
                    aria-hidden="true"
                  />
                )}
                {item.current && (
                  <motion.span
                    layoutId="nav-current"
                    className="absolute inset-x-3 bottom-0 h-0.5 bg-vino"
                    transition={reduced ? { duration: 0 } : MORPH}
                    aria-hidden="true"
                  />
                )}
              </>
            );
            return (
              <li
                key={item.value}
                className="relative"
                onPointerEnter={(event) => onItemPointerEnter(event, item)}
              >
                <div
                  className={cn(
                    "relative flex h-12 items-center",
                    item.current ? "text-vino" : "text-tinta",
                    "hover:text-vino",
                  )}
                >
                  {decorations}
                  <Link
                    href={item.href}
                    data-nav-link=""
                    aria-current={item.current ? "page" : undefined}
                    onClick={() => close()}
                    onKeyDown={(event) =>
                      item.panel && onTriggerKeyDown(event, item.value)
                    }
                    ref={(node) => {
                      if (node) triggerRefs.current.set(item.value, node);
                      else triggerRefs.current.delete(item.value);
                    }}
                    className={cn(
                      "relative flex h-12 items-center px-3",
                      item.panel ? "pr-1" : null,
                    )}
                  >
                    {label}
                  </Link>
                  {item.panel ? (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={isOpen ? panelId : undefined}
                      aria-label={item.panelLabel}
                      onClick={() => {
                        clearTimers();
                        openPanel(isOpen ? null : item.value);
                      }}
                      onKeyDown={(event) => onTriggerKeyDown(event, item.value)}
                      className="relative z-10 inline-flex h-11 w-8 items-center justify-center"
                    >
                      <ChevronDownIcon
                        size={14}
                        className={cn(
                          "transition-transform",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </LayoutGroup>

      <AnimatePresence>
        {openItem?.panel && (
          <motion.div
            key="panel"
            id={panelId}
            ref={panelRef}
            role="region"
            aria-label={openItem.label}
            onKeyDown={onPanelKeyDown}
            onClick={(event) => {
              // Elegir un enlace del panel lo cierra.
              if ((event.target as HTMLElement).closest("a")) dismiss();
            }}
            className="absolute inset-x-0 top-full z-40 overflow-hidden border-y border-linea bg-crema shadow-[0_24px_40px_-24px_rgba(42,31,26,0.25)]"
            initial={
              reduced ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.985 }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: panel.height ?? "auto",
            }}
            exit={
              reduced
                ? { opacity: 0, transition: { duration: D.instant } }
                : {
                    opacity: 0,
                    y: -4,
                    scale: 0.99,
                    transition: { duration: D.exit, ease: standard },
                  }
            }
            transition={
              reduced
                ? { duration: 0 }
                : {
                    height: panel.grow ? GROW : SHRINK,
                    y: GROW,
                    scale: GROW,
                    opacity: { duration: D.fast, ease: enter },
                  }
            }
          >
            <AnimatePresence initial={false} custom={open?.direction ?? 0}>
              <Face
                key={openItem.value}
                direction={open?.direction ?? 0}
                reduced={reduced}
                onHeight={onHeight}
              >
                {openItem.panel}
              </Face>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
