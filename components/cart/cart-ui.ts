/** Estado del cajón lateral de la cesta (abierto/cerrado), compartido en cliente. */
let open = false;
const listeners = new Set<() => void>();

export const cartUi = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  isOpen: () => open,
  isOpenServer: () => false,
  setOpen(next: boolean) {
    if (open === next) return;
    open = next;
    listeners.forEach((l) => l());
  },
};
