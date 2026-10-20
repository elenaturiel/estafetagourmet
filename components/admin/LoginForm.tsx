"use client";

import { useActionState } from "react";
import { login, type ActionState } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(login, null);
  return (
    <form action={action} className="mx-auto max-w-sm">
      <h1 className="text-[32px] leading-tight">Entrar al panel</h1>
      <p className="mt-2 text-secundario">Escribe la contraseña para publicar entradas del blog y enviarlas por correo.</p>
      <label htmlFor="password" className="mt-6 block text-[14px] font-semibold">
        Contraseña
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        autoFocus
        className="mt-1 min-h-[48px] w-full border border-tinta bg-papel px-3 text-[16px]"
      />
      {state?.error ? (
        <p role="alert" className="mt-3 text-[14px] font-semibold text-vino">
          {state.error}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className="mt-5 min-h-[48px] w-full bg-vino px-6 font-semibold text-crema disabled:opacity-60">
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
