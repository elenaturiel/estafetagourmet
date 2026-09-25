/**
 * Memoria del popup de newsletter en el navegador (localStorage):
 * - si la persona se suscribe, no se vuelve a mostrar;
 * - si lo cierra, no se muestra otra vez hasta pasados 30 días.
 */
const KEY = "eg-newsletter-popup-v1";
const SNOOZE_DAYS = 30;

type State = { subscribed?: boolean; dismissedAt?: number };

function read(): State {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "{}") as State;
  } catch {
    return {};
  }
}

function write(state: State) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Sin almacenamiento: el popup podría volver a salir en otra visita.
  }
}

export function shouldShowPopup(): boolean {
  const s = read();
  if (s.subscribed) return false;
  if (s.dismissedAt && Date.now() - s.dismissedAt < SNOOZE_DAYS * 86_400_000) return false;
  return true;
}

export function markDismissed() {
  write({ ...read(), dismissedAt: Date.now() });
}

export function markSubscribed() {
  write({ ...read(), subscribed: true });
}
