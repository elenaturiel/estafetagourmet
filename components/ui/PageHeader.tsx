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
    <header className="container-site pt-12 pb-10 lg:pt-16 lg:pb-14">
      {children}
      {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
      <h1 className="text-[40px] leading-[1.05] tracking-[-0.02em] lg:text-[60px]">{title}</h1>
      {intro ? <p className="mt-4 max-w-2xl text-[17px] leading-[1.6] text-secundario">{intro}</p> : null}
    </header>
  );
}
