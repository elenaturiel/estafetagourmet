"use client";

import { useActionState } from "react";
import { saveEncierroSeats, type ActionState } from "@/app/admin/actions";
import { ENCIERRO, type EncierroSeats } from "@/data/encierro";

/** Plazas libres de cada día del encierro: un número por día y un botón de guardar. */
export function EncierroSeatsForm({ seats }: { seats: EncierroSeats }) {
  const [state, action, saving] = useActionState<ActionState, FormData>(saveEncierroSeats, null);
  return (
    <form action={action} className="mt-8">
      <ul className="grid gap-3 sm:grid-cols-2">
        {ENCIERRO.days.map((day) => (
          <li key={day} className="flex items-center justify-between gap-4 border border-linea bg-papel px-4 py-3">
            <label htmlFor={`seats-${day}`} className="font-serif text-[19px]">
              {day} de julio
            </label>
            <span className="flex items-center gap-2">
              <input
                id={`seats-${day}`}
                name={`seats-${day}`}
                type="number"
                inputMode="numeric"
                min={0}
                max={99}
                required
                defaultValue={seats[day]}
                className="min-h-[48px] w-20 border border-tinta bg-crema px-3 text-center text-[18px]"
              />
              <span className="text-[14px] text-secundario">plazas</span>
            </span>
          </li>
        ))}
      </ul>
      {state?.error ? (
        <p role="alert" className="mt-4 text-[15px] font-semibold text-vino">
          {state.error}
        </p>
      ) : null}
      {state?.ok ? (
        <p role="status" className="mt-4 text-[15px] font-semibold">
          {state.message}
        </p>
      ) : null}
      <button type="submit" disabled={saving} className="mt-6 min-h-[48px] w-full bg-vino px-8 font-semibold text-crema disabled:opacity-60 sm:w-auto">
        {saving ? "Guardando…" : "Guardar plazas"}
      </button>
    </form>
  );
}
