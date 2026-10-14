import type { ReactNode } from "react";
import { Eyebrow } from "./Section";

/** Cabecera sencilla para las páginas interiores (un único H1). */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="container-site pt-7 pb-6 lg:pt-16 lg:pb-14">
      {children}
      {eyebrow ? <Eyebrow className="mb-3 lg:mb-4">{eyebrow}</Eyebrow> : null}
      <h1 className="text-[32px] leading-[1.08] tracking-[-0.02em] sm:text-[40px] lg:text-[60px]">{title}</h1>
      {intro ? <p className="mt-3 max-w-2xl text-[16px] lg:mt-4 lg:text-[17px] leading-[1.6] text-secundario">{intro}</p> : null}
    </header>
  );
}
