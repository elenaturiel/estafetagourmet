import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "crema" | "papel" | "crema-oscuro" | "vino";

const tones: Record<Tone, string> = {
  crema: "bg-crema",
  papel: "bg-papel border-y border-linea",
  "crema-oscuro": "bg-crema-oscuro",
  vino: "bg-vino text-crema on-dark",
};

export function Section({
  tone = "crema",
  className,
  innerClassName,
  children,
  ...props
}: {
  tone?: Tone;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  id?: string;
  "aria-labelledby"?: string;
}) {
  return (
    <section className={cn(tones[tone], "py-16 lg:py-24", className)} {...props}>
      <div className={cn("container-site", innerClassName)}>{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow text-vino", className)}>{children}</p>;
}

/** Cabecera de sección: título H2 + subtítulo opcional + acción a la derecha. */
export function SectionHeader({
  id,
  eyebrow,
  title,
  subtitle,
  action,
  className,
  tone = "light",
}: {
  id: string;
  eyebrow?: string;
  tone?: "light" | "dark";
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-reveal
      className={cn(
        "mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between lg:mb-10",
        className,
      )}
    >
      <div>
        {eyebrow ? (
          <p className={cn("eyebrow mb-3", tone === "dark" ? "text-dorado" : "text-vino")}>{eyebrow}</p>
        ) : null}
        <h2 id={id} className="text-[34px] leading-[1.05] tracking-[-0.02em] lg:text-[48px]">
          {title}
        </h2>
        {subtitle ? (
          <p
            className={cn(
              "mt-3 max-w-xl text-[16px] lg:text-[17px]",
              tone === "dark" ? "text-crema-sobre-vino" : "text-secundario",
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
