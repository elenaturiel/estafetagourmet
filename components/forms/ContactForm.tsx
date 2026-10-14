"use client";

import { Link } from "@/components/ui/Link";
import { useRef, useState, type FormEvent } from "react";
import { EMAIL_RE, Field, inputClasses } from "@/components/forms/Field";
import { buttonClasses } from "@/components/ui/Button";
import { submitContact } from "@/lib/forms";
import { useT } from "@/lib/i18n/client";

type Errors = Partial<Record<"name" | "email" | "message" | "privacy", string>>;

export function ContactForm() {
  const t = useT().forms;
  const c = t.contact;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name")?.toString().trim() ?? "";
    const email = data.get("email")?.toString().trim() ?? "";
    const message = data.get("message")?.toString().trim() ?? "";
    const privacy = data.get("privacy") === "on";

    const next: Errors = {};
    if (!name) next.name = c.nameError;
    if (!EMAIL_RE.test(email)) next.email = c.emailError;
    if (message.length < 10) next.message = c.messageError;
    if (!privacy) next.privacy = c.privacyError;
    setErrors(next);

    const firstInvalid = (["name", "email", "message", "privacy"] as const).find((k) => next[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");
    await submitContact({ name, email, message });
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div role="status" className="border border-linea bg-papel p-6">
        <p className="font-serif text-[22px]">{c.sentTitle}</p>
        <p className="mt-2 text-[15px] text-secundario">
          {c.sentText}
        </p>
      </div>
    );
  }

  const describedBy = (key: keyof Errors) => (errors[key] ? `contact-${key}-error` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-label={c.aria}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="contact-name" label={c.name} error={errors.name}>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={`${inputClasses} min-h-[48px]`}
          />
        </Field>
        <Field id="contact-email" label={c.email} error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={`${inputClasses} min-h-[48px]`}
          />
        </Field>
      </div>
      <Field id="contact-message" label={c.message} error={errors.message} className="mt-4">
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message")}
          className={`${inputClasses} min-h-[112px] py-3`}
        />
      </Field>
      <div className="mt-4">
        <div className="flex items-start gap-3">
          <input
            id="contact-privacy"
            name="privacy"
            type="checkbox"
            required
            aria-invalid={errors.privacy ? true : undefined}
            aria-describedby={describedBy("privacy")}
            className="mt-0.5 h-5 w-5 shrink-0 accent-vino"
          />
          <label htmlFor="contact-privacy" className="text-[14px]">
            {c.accept}{" "}
            <Link href="/privacidad" className="underline underline-offset-2 hover:text-vino">
              {t.privacy}
            </Link>
          </label>
        </div>
        {errors.privacy ? (
          <p id="contact-privacy-error" className="mt-1.5 text-[13px] font-medium text-vino">
            {errors.privacy}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className={buttonClasses("primary", "md") + " mt-6 w-full sm:w-auto"}
      >
        {status === "sending" ? t.sending : c.send}
      </button>
      <p className="sr-only" role="status" aria-live="polite">
        {Object.keys(errors).length ? c.review : ""}
      </p>
    </form>
  );
}
