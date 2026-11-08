"use client";

import { Link } from "@/components/ui/Link";
import { useRef, useState, type FormEvent } from "react";
import { EMAIL_RE, Field, inputClasses } from "@/components/forms/Field";
import { buttonClasses } from "@/components/ui/Button";
import { site } from "@/data/site";
import { submitEncierro } from "@/lib/forms";
import { fmt } from "@/lib/i18n/config";
import { useT } from "@/lib/i18n/client";

type Errors = Partial<Record<"name" | "email" | "phone" | "date" | "people" | "privacy", string>>;

/** Días de encierro de San Fermín. */
const DAYS = [7, 8, 9, 10, 11, 12, 13, 14];
const PHONE_RE = /^\+?[\d\s().-]{6,20}$/;

/** Formulario de /el-encierro: nombre, correo, teléfono, fecha y número de personas. */
export function EncierroForm() {
  const t = useT().forms;
  const c = t.encierro;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name")?.toString().trim() ?? "";
    const email = data.get("email")?.toString().trim() ?? "";
    const phone = data.get("phone")?.toString().trim() ?? "";
    const date = data.get("date")?.toString() ?? "";
    const people = Number(data.get("people"));
    const privacy = data.get("privacy") === "on";

    const next: Errors = {};
    if (!name) next.name = c.nameError;
    if (!EMAIL_RE.test(email)) next.email = c.emailError;
    if (!PHONE_RE.test(phone)) next.phone = c.phoneError;
    if (!date) next.date = c.dateError;
    if (!Number.isInteger(people) || people < 1 || people > 50) next.people = c.peopleError;
    if (!privacy) next.privacy = c.privacyError;
    setErrors(next);

    const firstInvalid = (["name", "email", "phone", "date", "people", "privacy"] as const).find((k) => next[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");
    const ok = await submitEncierro({ name, email, phone, date, people, website: data.get("website")?.toString() ?? "" });
    setStatus(ok ? "done" : "error");
  }

  if (status === "done") {
    return (
      <div role="status" className="border border-linea bg-papel p-6">
        <p className="font-serif text-[22px]">{c.sentTitle}</p>
        <p className="mt-2 text-[15px] text-secundario">{c.sentText}</p>
      </div>
    );
  }

  const describedBy = (key: keyof Errors) => (errors[key] ? `encierro-${key}-error` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-label={c.aria}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="encierro-name" label={c.name} error={errors.name}>
          <input
            id="encierro-name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={`${inputClasses} min-h-[48px]`}
          />
        </Field>
        <Field id="encierro-email" label={c.email} error={errors.email}>
          <input
            id="encierro-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={`${inputClasses} min-h-[48px]`}
          />
        </Field>
        <Field id="encierro-phone" label={c.phone} error={errors.phone}>
          <input
            id="encierro-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("phone")}
            className={`${inputClasses} min-h-[48px]`}
          />
        </Field>
        <Field id="encierro-date" label={c.date} error={errors.date}>
          <select
            id="encierro-date"
            name="date"
            required
            defaultValue=""
            aria-invalid={errors.date ? true : undefined}
            aria-describedby={describedBy("date")}
            className={`${inputClasses} min-h-[48px]`}
          >
            <option value="" disabled>
              {c.datePlaceholder}
            </option>
            {DAYS.map((d) => (
              <option key={d} value={String(d)}>
                {fmt(c.dayOfJuly, { day: d })}
              </option>
            ))}
            <option value="sin-decidir">{c.dateUndecided}</option>
          </select>
        </Field>
        <Field id="encierro-people" label={c.people} error={errors.people}>
          <input
            id="encierro-people"
            name="people"
            type="number"
            inputMode="numeric"
            min={1}
            max={50}
            required
            aria-invalid={errors.people ? true : undefined}
            aria-describedby={describedBy("people")}
            className={`${inputClasses} min-h-[48px]`}
          />
        </Field>
      </div>
      <div className="mt-4">
        <div className="flex items-start gap-3">
          <input
            id="encierro-privacy"
            name="privacy"
            type="checkbox"
            required
            aria-invalid={errors.privacy ? true : undefined}
            aria-describedby={describedBy("privacy")}
            className="mt-0.5 h-5 w-5 shrink-0 accent-vino"
          />
          <label htmlFor="encierro-privacy" className="text-[14px]">
            {c.accept}{" "}
            <Link href="/privacidad" className="underline underline-offset-2 hover:text-vino">
              {t.privacy}
            </Link>
          </label>
        </div>
        {errors.privacy ? (
          <p id="encierro-privacy-error" className="mt-1.5 text-[13px] font-medium text-vino">
            {errors.privacy}
          </p>
        ) : null}
      </div>
      {/* Trampa para bots: las personas no lo ven. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {status === "error" ? (
        <p role="alert" className="mt-4 text-[14px] font-semibold text-vino">
          {fmt(c.sendError, { phone: site.phone.display })}
        </p>
      ) : null}
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
