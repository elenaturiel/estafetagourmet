import type { ReactNode } from "react";
import { legalIsComplete } from "@/data/legal";
import { legalEntityFor } from "@/data/i18n/legal";
import { fmt } from "@/lib/i18n/config";
import { getLocale, getT } from "@/lib/i18n/server";
import { PageHeader } from "./PageHeader";

/**
 * Plantilla de página legal. Mientras falten los datos del titular (razón
 * social, NIF/CIF…) se avisa de que el texto es provisional; los textos
 * conviene que los revise un profesional antes de abrir la tienda.
 * En inglés y francés se avisa de que es una traducción de cortesía.
 */
export async function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  const [t, locale] = await Promise.all([getT(), getLocale()]);
  const l = t.legal;
  return (
    <>
      <PageHeader title={title} />
      <div className="container-site pb-12 lg:pb-24">
        {legalIsComplete ? null : (
          <p role="note" className="mb-8 max-w-3xl border border-vino/40 bg-papel p-4 text-[14px] text-vino lg:mb-10">
            <strong>{l.pending}</strong> {l.pendingText}
          </p>
        )}
        {l.courtesy ? <p className="mb-4 max-w-3xl text-[14px] text-secundario">{l.courtesy}</p> : null}
        <p className="mb-6 max-w-3xl text-[14px] text-secundario lg:mb-8">
          {fmt(l.updatedLabel, { date: legalEntityFor(locale).updated })}
        </p>
        <div className="legal max-w-3xl space-y-4 text-[15px] leading-[1.65] text-secundario lg:text-[16px] [&_h2]:mt-8 [&_h2]:text-[22px] [&_h2]:leading-tight [&_h2]:text-tinta lg:[&_h2]:mt-10 lg:[&_h2]:text-[26px] [&_h3]:mt-6 [&_h3]:text-[18px] [&_h3]:text-tinta lg:[&_h3]:text-[19px] [&_li]:ml-5 [&_li]:list-disc [&_a]:text-vino [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>
      </div>
    </>
  );
}
