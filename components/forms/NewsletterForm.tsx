"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { EMAIL_RE, inputClasses } from "@/components/forms/Field";
import { buttonClasses } from "@/components/ui/Button";
import { submitNewsletter } from "@/lib/forms";

export function NewsletterForm() {
  const id = useId();
  const inputId = `${id}-email`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email")?.toString().trim() ?? "";
    if (!EMAIL_RE.test(email)) {
      setError("Escribe un correo electrónico válido, por ejemplo nombre@correo.com.");
      inputRef.current?.focus();
      return;
    }
    setError(undefined);
    setStatus("sending");
    await submitNewsletter(email);
    setStatus("done");
  }

  if (status === "done") {
    return (
      <p role="status" className="mx-auto mt-8 max-w-md text-[16px] font-medium">
        ¡Gracias! Te hemos apuntado. Te escribiremos con las novedades de temporada.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto mt-8 max-w-[560px] text-left">
      <label htmlFor={inputId} className="mb-2 block text-[14px] font-medium">
        Tu correo electrónico
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          ref={inputRef}
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder="nombre@correo.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`${inputClasses} min-h-[52px] flex-1`}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonClasses("primary", "md") + " lg:min-h-[52px]"}
        >
          {status === "sending" ? "Enviando…" : "Suscribirme"}
        </button>
      </div>
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="mt-2 text-[13px] font-medium text-vino">
          {error}
        </p>
      ) : null}
      <p className="mt-4 text-center text-[13px] text-secundario">
        Al suscribirte aceptas la{" "}
        <Link href="/privacidad" className="underline underline-offset-2 hover:text-vino">
          política de privacidad
        </Link>
        . Puedes darte de baja cuando quieras.
      </p>
    </form>
  );
}
