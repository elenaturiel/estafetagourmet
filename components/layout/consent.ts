/**
 * Consentimiento de cookies (cliente). Se guarda en localStorage:
 * "granted" | "denied" | ausente (todavía no ha decidido).
 */
export type Consent = "granted" | "denied" | null;

const KEY = "eg-cookie-consent-v1";
const listeners = new Set<() => void>();
let reopenRequested = false;

export const consentStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): Consent {
    try {
      const v = window.localStorage.getItem(KEY);
      return v === "granted" || v === "denied" ? v : null;
    } catch {
      return null;
    }
  },
  /** En servidor asumimos "decidido" para no pintar el banner en el HTML. */
  getServerSnapshot(): Consent | "unknown" {
    return "unknown";
  },
  set(value: Exclude<Consent, null>) {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      // Sin almacenamiento, la decisión vale solo para esta visita.
    }
    reopenRequested = false;
    listeners.forEach((l) => l());
  },
  requestReopen() {
    reopenRequested = true;
    listeners.forEach((l) => l());
  },
  isReopenRequested() {
    return reopenRequested;
  },
};
