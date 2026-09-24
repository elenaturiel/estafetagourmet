/**
 * English UI strings — TODO: complete and review before enabling /en.
 * Only a subset is translated; missing keys fall back to Spanish.
 */
import type { Dictionary } from "./es";

type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

export const en: DeepPartial<Dictionary> = {
  locale: "en",
  skipToContent: "Skip to content",
  nav: {
    label: "Main navigation",
    shop: "Shop",
    gifts: "Gifts & hampers",
    producers: "Producers",
    blog: "Blog",
    visit: "Visit us",
  },
};
