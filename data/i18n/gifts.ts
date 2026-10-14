import type { Locale } from "@/lib/i18n/config";

/** Nombre y motivo de cada pareja de regalo en inglés y francés, por dirección (slug). */
const PAIR_TEXTS: Record<string, [en: { name: string; blurb: string }, fr: { name: string; blurb: string }]> = {
  "queso-y-vino": [
    { name: "Cheese and wine", blurb: "A mature sheep's cheese and a Navarrese red with character." },
    { name: "Fromage et vin", blurb: "Un fromage de brebis affiné et un rouge navarrais de caractère." },
  ],
  "txistorra-y-patxaran": [
    { name: "Txistorra and patxaran", blurb: "Navarre's fiesta in two products: the classic txistorra and a good patxaran to finish." },
    { name: "Txistorra et patxaran", blurb: "La fête navarraise en deux produits : la txistorra de toujours et un bon patxaran pour finir." },
  ],
  "jamon-y-tinto": [
    { name: "Ham and red wine", blurb: "Acorn-fed Iberian ham and a young red to open without a second thought." },
    { name: "Jambon et vin rouge", blurb: "Jambon ibérique de bellota et un rouge jeune à ouvrir sans réfléchir." },
  ],
  "foie-y-mermelada": [
    { name: "Foie gras and jam", blurb: "Duck foie gras with fig jam: the starter that shines on any table." },
    { name: "Foie gras et confiture", blurb: "Foie gras de canard à la confiture de figue : l'entrée qui brille sur toutes les tables." },
  ],
  "esparragos-y-blanco": [
    { name: "Asparagus and white wine", blurb: "White asparagus from Navarre and a fresh white to go with them." },
    { name: "Asperges et vin blanc", blurb: "Asperges blanches de Navarre et un blanc frais pour les accompagner." },
  ],
  "chocolate-y-moscatel": [
    { name: "Chocolate and muscat", blurb: "85 % dark chocolate and a late-harvest muscat: the perfect dessert." },
    { name: "Chocolat et muscat", blurb: "Chocolat noir 85 % et un muscat de vendange tardive : le dessert parfait." },
  ],
  "aperitivo-de-piparras": [
    { name: "Piparra aperitif", blurb: "Piparras and bonito del norte in escabeche: a classic pintxo at home." },
    { name: "Apéritif aux piparras", blurb: "Piparras et bonite du Nord en escabèche : un pintxo classique à la maison." },
  ],
  "cena-facil-para-dos": [
    { name: "Easy dinner for two", blurb: "Piquillo peppers stuffed with cod and a fresh rosé: ready in minutes." },
    { name: "Dîner facile pour deux", blurb: "Piquillos farcis à la morue et un rosé frais : prêt en quelques minutes." },
  ],
  "iberico-y-rosado": [
    { name: "Iberian and rosé", blurb: "Acorn-fed Iberian chorizo and a garnacha rosé, to nibble on with friends." },
    { name: "Ibérique et rosé", blurb: "Chorizo ibérique de bellota et un rosé de grenache, à grignoter entre amis." },
  ],
  "detalle-para-clientes": [
    { name: "A gift for clients", blurb: "Limited-edition extra virgin olive oil and patxaran biscuits: a business gift with the flavour of Navarre." },
    { name: "Une attention pour vos clients", blurb: "Huile d'olive vierge extra en édition limitée et biscuits au patxaran : un cadeau d'entreprise au goût de Navarre." },
  ],
};

export function localizeGiftPair<T extends { slug: string; name: string; blurb: string }>(p: T, locale: Locale): T {
  if (locale === "es") return p;
  const t = PAIR_TEXTS[p.slug]?.[locale === "en" ? 0 : 1];
  return t ? { ...p, ...t } : p;
}
