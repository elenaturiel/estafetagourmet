"use client";

import { useState, useTransition } from "react";
import { sendWebIssue } from "@/app/admin/actions";

type Issue = { slug: string; number: number; title: string; sentAt: string | null };

/** Boletines escritos en la web (data/newsletters.ts): enviar una prueba o a toda la lista. */
export function WebIssueList({ issues }: { issues: Issue[] }) {
  const [testTo, setTestTo] = useState("");
  const [note, setNote] = useState<{ slug: string; ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [, start] = useTransition();

  function send(issue: Issue, mode: "test" | "all") {
    if (mode === "all" && !window.confirm(`Se enviará «${issue.title}» por correo a TODOS los suscriptores. ¿Seguro?`)) return;
    setBusy(issue.slug);
    setNote(null);
    start(async () => {
      const res = await sendWebIssue(issue.slug, mode, testTo);
      setNote({ slug: issue.slug, ok: Boolean(res.ok), text: res.message ?? res.error ?? "Hecho." });
      setBusy(null);
    });
  }

  return (
    <section className="mt-12" aria-labelledby="boletines-web">
      <h2 id="boletines-web" className="text-[26px] leading-tight lg:text-[32px]">
        Boletines de la newsletter
      </h2>
      <p className="mt-1 text-[15px] text-secundario">
        Manda primero una prueba a tu correo para ver cómo queda; después, envíalo a todos los suscriptores (solo se puede una vez).
      </p>
      <label htmlFor="web-issue-test" className="mt-4 block text-[14px] font-semibold">
        Correo para las pruebas
      </label>
      <input
        id="web-issue-test"
        type="email"
        value={testTo}
        onChange={(e) => setTestTo(e.target.value)}
        placeholder="tu@correo.com"
        className="mt-1 min-h-[48px] w-full max-w-sm border border-tinta bg-papel px-3 text-[16px]"
      />
      <ul className="mt-6 divide-y divide-linea border-y border-linea">
        {issues.map((issue) => (
          <li key={issue.slug} className="py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="min-w-0">
                <span className="block font-serif text-[19px]">
                  Nº {issue.number} · {issue.title}
                </span>
                <span className="block text-[13px] text-secundario">
                  {issue.sentAt ? `Enviado a los suscriptores el ${new Date(issue.sentAt).toLocaleDateString("es-ES")}` : "Sin enviar por correo"}
                  {" · "}
                  <a href={`/newsletter/${issue.slug}`} target="_blank" rel="noreferrer" className="text-vino underline">
                    ver en la web
                  </a>
                </span>
              </span>
              <span className="flex gap-2">
                <button
                  type="button"
                  className="min-h-[44px] border border-tinta px-4 text-[14px] font-semibold disabled:opacity-60"
                  disabled={busy !== null}
                  onClick={() => send(issue, "test")}
                >
                  Enviar prueba
                </button>
                <button
                  type="button"
                  className="min-h-[44px] bg-vino px-4 text-[14px] font-semibold text-crema disabled:opacity-60"
                  disabled={busy !== null || Boolean(issue.sentAt)}
                  onClick={() => send(issue, "all")}
                >
                  {busy === issue.slug ? "Enviando…" : "Enviar a todos"}
                </button>
              </span>
            </div>
            {note?.slug === issue.slug ? (
              <p role="status" className={`mt-2 text-[15px] font-semibold ${note.ok ? "" : "text-vino"}`}>
                {note.text}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
