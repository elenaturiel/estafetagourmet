/**
 * Almacén de la cesta en cliente, persistido en localStorage.
 *
 * Se guarda una "foto" de cada línea (nombre, precio, enlace) como hace el
 * carrito de Shopify, para poder pintar la cesta sin volver a pedir el catálogo.
 * Al conectar Shopify, estas acciones pasarían a llamar a cartCreate /
 * cartLinesAdd / cartLinesUpdate / cartLinesRemove (ver README.md).
 */
export type CartLine = {
  /** Identificador del producto (slug; en Shopify, el ID de la variante). */
  id: string;
  name: string;
  href: string;
  price: number | null;
  byline?: string;
  imageLabel: string;
  quantity: number;
};

export type CartItemInput = Omit<CartLine, "quantity">;

const STORAGE_KEY = "eg-cart-v1";
const MAX_QTY = 99;
const EMPTY: CartLine[] = [];

let lines: CartLine[] | null = null;
const listeners = new Set<() => void>();

function load(): CartLine[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as CartLine[]) : [];
    return Array.isArray(parsed)
      ? parsed.filter((l) => l && typeof l.id === "string" && l.quantity > 0)
      : [];
  } catch {
    return [];
  }
}

function commit(next: CartLine[]) {
  lines = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Almacenamiento no disponible (modo privado): la cesta vive solo en memoria.
  }
  listeners.forEach((l) => l());
}

export const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        lines = load();
        listener();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot(): CartLine[] {
    if (lines === null) lines = load();
    return lines;
  },
  getServerSnapshot(): CartLine[] {
    return EMPTY;
  },
  add(item: CartItemInput, quantity = 1) {
    const current = cartStore.getSnapshot();
    const existing = current.find((l) => l.id === item.id);
    commit(
      existing
        ? current.map((l) =>
            l.id === item.id
              ? { ...l, ...item, quantity: Math.min(MAX_QTY, l.quantity + quantity) }
              : l,
          )
        : [...current, { ...item, quantity: Math.min(MAX_QTY, quantity) }],
    );
  },
  setQuantity(id: string, quantity: number) {
    const q = Math.max(0, Math.min(MAX_QTY, Math.floor(quantity)));
    const current = cartStore.getSnapshot();
    commit(
      q === 0
        ? current.filter((l) => l.id !== id)
        : current.map((l) => (l.id === id ? { ...l, quantity: q } : l)),
    );
  },
  remove(id: string) {
    commit(cartStore.getSnapshot().filter((l) => l.id !== id));
  },
  clear() {
    commit([]);
  },
};
