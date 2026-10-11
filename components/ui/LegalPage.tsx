import type { ReactNode } from "react";
import { legalEntity, legalIsComplete } from "@/data/legal";
import { PageHeader } from "./PageHeader";

/**
 * Plantilla de página legal. Mientras falten los datos del titular (razón
 * social, NIF/CIF…) se avisa de que el texto es provisional; los textos
 * conviene que los revise un profesional antes de abrir la tienda.
 */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <PageHeader title={title} />
      <div className="container-site pb-16 lg:pb-24">
        {legalIsComplete ? null : (
          <p
            role="note"
            className="mb-10 max-w-3xl border border-vino/40 bg-papel p-4 text-[14px] text-vino"
          >
            <strong>Pendiente:</strong> faltan los datos del titular (los que aparecen entre
            corchetes) y la revisión de este texto por un profesional.
          </p>
        )}
        <p className="mb-8 max-w-3xl text-[14px] text-secundario">Última actualización: {legalEntity.updated}.</p>
        <div className="legal max-w-3xl space-y-4 text-[16px] leading-[1.65] text-secundario [&_h2]:mt-10 [&_h2]:text-[26px] [&_h2]:leading-tight [&_h2]:text-tinta [&_h3]:mt-6 [&_h3]:text-[19px] [&_h3]:text-tinta [&_li]:ml-5 [&_li]:list-disc [&_a]:text-vino [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>
      </div>
    </>
  );
}
