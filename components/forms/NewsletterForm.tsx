"use client";

import { Link } from "@/components/ui/Link";
import { useId, useRef, useState, type FormEvent } from "react";
import { EMAIL_RE, inputClasses } from "@/components/forms/Field";
import { buttonClasses } from "@/components/ui/Button";
import { SubscribeError, submitNewsletter } from "@/lib/forms";
import { useLocale, useT } from "@/lib/i18n/client";
import { markSubscribed } from "@/components/newsletter/popup-store";

export function NewsletterForm({ source = "portada" }: { source?: "portada" | "web" } = {}) {
  const t = useT().forms;
  const locale = useLocale();
  const id = useId();
  const inputId = `${id}-email`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email")?.toString().trim() ?? "";
    if (!EMAIL_RE.test(email)) {
      setError(t.emailInvalid);
      inputRef.current?.focus();
      return;
    }
    setError(undefined);
    setStatus("sending");
    try {
      await submitNewsletter(email, source, "", locale);
      markSubscribed();
      setStatus("done");
    } catch (err) {
      const kind = err instanceof SubscribeError ? err.kind : "failed";
      const code = err instanceof SubscribeError && err.code ? ` (${err.code})` : "";
      setError(kind === "invalid" ? t.emailInvalid : kind === "unavailable" ? t.unavailable : t.subscribeFailed + code);
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <p role="status" className="mx-auto mt-8 max-w-md text-[16px] font-medium">
        {t.thanks}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto mt-8 max-w-[560px] text-left">
      <label htmlFor={inputId} className="mb-2 block text-[14px] font-medium">
        {t.emailLabel}
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
          placeholder={t.emailPlaceholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`${inputClasses} min-h-[52px] flex-1`}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonClasses("primary", "md") + " lg:min-h-[52px]"}
        >
          {status === "sending" ? t.sending : t.subscribe}
        </button>
      </div>
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="mt-2 text-[13px] font-medium text-vino">
          {error}
        </p>
      ) : null}
      <p className="mt-4 text-center text-[13px] text-secundario">
        {t.legalPre}{" "}
        <Link href="/privacidad" className="underline underline-offset-2 hover:text-vino">
          {t.privacy}
        </Link>
        {t.legalPost}
      </p>
    </form>
  );
}
