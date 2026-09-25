import { cn } from "@/lib/cn";

/**
 * Cinta de texto en movimiento continuo. Decorativa: el contenido se repite
 * para el bucle y se oculta a lectores de pantalla (el texto no aporta
 * información que no esté en la página). Se detiene con "reducir movimiento".
 */
export function Marquee({
  items,
  className,
  separator = "✦",
}: {
  items: string[];
  className?: string;
  separator?: string;
}) {
  const row = (
    <ul className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <li key={i} className="flex items-center whitespace-nowrap">
          <span className="px-6 lg:px-8">{item}</span>
          <span className="text-[0.5em] opacity-70">{separator}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div aria-hidden="true" className={cn("overflow-hidden", className)}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </div>
  );
}
