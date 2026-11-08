import "server-only";
import { encierroDocId, mergeEncierroSeats, type EncierroSeats } from "@/data/encierro";
import { sanityFetch } from "@/lib/sanity/client";

/** Plazas libres de cada día del encierro, tal y como se guardaron en el panel (/admin/encierro). */
export async function getEncierroSeats(): Promise<EncierroSeats> {
  try {
    const doc = await sanityFetch<{ days?: { day?: number; seats?: number }[] }>(
      `*[_id == $id][0]{ days }`,
      { id: encierroDocId() },
      "encierro",
    );
    return mergeEncierroSeats(doc?.days);
  } catch (e) {
    console.error("[encierro] plazas", e);
    return mergeEncierroSeats(null);
  }
}
