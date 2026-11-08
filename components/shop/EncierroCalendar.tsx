import { ENCIERRO, type EncierroSeats } from "@/data/encierro";
import { cn } from "@/lib/cn";
import { fmt, type Locale } from "@/lib/i18n/config";

type Texts = { calendarTitle: string; calendarIntro: string; seats: string; seat: string; full: string };

/** Julio del año del encierro, con las plazas libres de cada día de encierro (lunes primero). */
export function EncierroCalendar({ seats, locale, t }: { seats: EncierroSeats; locale: Locale; t: Texts }) {
  const year = ENCIERRO.year;
  const days = new Date(Date.UTC(year, 7, 0)).getUTCDate();
  const offset = (new Date(Date.UTC(year, 6, 1)).getUTCDay() + 6) % 7;
  const monthName = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(Date.UTC(year, 6, 1));
  const month = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  // 1–7 de enero de 2024 fue de lunes a domingo.
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }).format(Date.UTC(2024, 0, i + 1)),
  );
  const label = (n: number) => (n === 0 ? t.full : n === 1 ? t.seat : fmt(t.seats, { n }));

  return (
    <section aria-labelledby="encierro-calendario" className="mt-10 lg:mt-12">
      <h2 id="encierro-calendario" className="text-[24px] leading-tight tracking-[-0.015em] lg:text-[32px]">
        {t.calendarTitle} · {month}
      </h2>
      <p className="mt-2 text-[15px] text-secundario">{fmt(t.calendarIntro, { year })}</p>
      <div aria-hidden="true" className="mt-5 grid grid-cols-7 gap-1 text-center sm:gap-1.5">
        {weekdays.map((w) => (
          <div key={w} className="pb-1 text-[12px] font-semibold tracking-[0.06em] text-secundario uppercase">
            {w.replace(".", "")}
          </div>
        ))}
      </div>
      <ol className="grid grid-cols-7 gap-1 text-center sm:gap-1.5">
        {Array.from({ length: offset }, (_, i) => (
          <li key={`v${i}`} aria-hidden="true" />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const day = i + 1;
          const n = seats[day];
          const encierro = n !== undefined;
          return (
            <li
              key={day}
              aria-hidden={encierro ? undefined : true}
              className={cn(
                "flex min-h-[56px] flex-col items-center justify-start rounded-eg px-0.5 pt-1.5 pb-1 sm:min-h-[72px]",
                !encierro && "text-secundario/60",
                encierro && n > 0 && "border border-vino bg-papel",
                encierro && n === 0 && "border border-linea bg-crema-oscuro text-secundario",
              )}
            >
              <span className={cn("text-[15px] sm:text-[17px]", encierro && "font-semibold")}>
                {day}
                {encierro ? <span className="sr-only"> {month}:</span> : null}
              </span>
              {encierro ? (
                <span
                  className={cn(
                    "mt-0.5 text-[10px] leading-tight sm:text-[12px]",
                    n > 0 ? "font-semibold text-vino" : "line-through",
                  )}
                >
                  {label(n)}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
