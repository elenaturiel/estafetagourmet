import type { Locale } from "@/lib/i18n/config";
import type { Pairing, PairingGroup } from "@/data/pairings";

type PairingText = { kicker: string; title: string; with: string; text: string };
/** Textos de cada maridaje en inglés y francés, por número. Si falta, se usa el español. */
export const PAIRING_TEXTS: Record<number, [en: PairingText, fr: PairingText]> = {
  1: [{ kicker: "Asparagus · Chardonnay", title: "Asparagus from Navarre", with: "Castillo de Monjardín Chardonnay Reserva", text: "Asparagus is one of the hardest foods to pair. A barrel-aged chardonnay has the richness and acidity needed to go with it without turning bitter. Also with El Navarrico or La Catedral de Navarra." }, { kicker: "Asperge · Chardonnay", title: "Asperges de Navarre", with: "Castillo de Monjardín Chardonnay Reserva", text: "L'asperge est l'un des aliments les plus difficiles à accorder. Un chardonnay passé en fût a l'onctuosité et l'acidité nécessaires pour l'accompagner sans devenir amer. Aussi avec El Navarrico ou La Catedral de Navarra." }],
  2: [{ kicker: "Bonito · Sparkling wine", title: "Olasagasti bonito tuna belly with Ubidea piparras", with: "Castillo de Monjardín Brut Chardonnay Millésime", text: "The fine bubbles and acidity of the sparkling wine cut through the richness of the tuna belly, and the mild heat of the piparra brings it to life. An elegant bar-style aperitif." }, { kicker: "Bonite · Vin mousseux", title: "Ventrèche de bonite Olasagasti avec des piparras Ubidea", with: "Castillo de Monjardín Brut Chardonnay Millésime", text: "La bulle fine et l'acidité du vin mousseux nettoient le gras de la ventrèche, et le piquant doux de la piparra la réveille. Un apéritif de bar élégant." }],
  3: [{ kicker: "Piquillo · Rosé", title: "Piquillo peppers", with: "Palacio de Sada Rosado Garnacha or Irache Rosado 1891", text: "Garnacha rosé and piquillo: two classics of Navarre. The red fruit of the wine goes with the roasted sweetness of the pepper. Serve the rosé at 8–10 ºC." }, { kicker: "Piquillo · Rosé", title: "Piquillos", with: "Palacio de Sada Rosado Garnacha ou Irache Rosado 1891", text: "Rosé de grenache et piquillo : deux classiques de Navarre. Le fruit rouge du vin accompagne la douceur rôtie du poivron. Servir le rosé à 8–10 ºC." }],
  4: [{ kicker: "Cheese · Jam · Red", title: "La Vasco Navarra sheep's cheese with Irular fig jam", with: "Irache Crianza", text: "A mature sheep's cheese calls for a jam with character: the fig balances it, and the crianza adds structure without covering the cheese." }, { kicker: "Fromage · Confiture · Rouge", title: "Fromage de brebis La Vasco Navarra avec confiture de figue d'Irular", with: "Irache Crianza", text: "Un fromage de brebis affiné appelle une confiture de caractère : la figue l'équilibre, et le crianza apporte de la structure sans couvrir le fromage." }],
  5: [{ kicker: "Iberian · Single-estate red", title: "Acorn-fed Iberian from Ibericomio or Salamanca Ibérica", with: "Pago de Cirsus Cuvée Especial", text: "A red with ageing and polished tannins for the marbled fat of Iberian ham. If you prefer something fresher, Monjardín's Brut Millésime also works very well." }, { kicker: "Ibérique · Rouge de domaine", title: "Ibérique de bellota d'Ibericomio ou de Salamanca Ibérica", with: "Pago de Cirsus Cuvée Especial", text: "Un rouge avec de l'élevage et des tanins polis pour le gras infiltré de l'ibérique. Si l'on préfère quelque chose de plus frais, le Brut Millésime de Monjardín fonctionne aussi très bien." }],
  6: [{ kicker: "Txistorra · Garnacha", title: "Arbizu txistorra and chorizo", with: "Altos de Inurrieta or Unsi Terrazas Garnacha Tinta", text: "Reds with fruit and freshness that stand up to the paprika and fat of Navarrese cured meats. Ideal for nibbling at the bar or at home." }, { kicker: "Txistorra · Grenache", title: "Txistorra et chorizo d'Arbizu", with: "Altos de Inurrieta ou Unsi Terrazas Garnacha Tinta", text: "Des rouges avec du fruit et de la fraîcheur qui tiennent tête au paprika et au gras de la charcuterie navarraise. Idéal pour grignoter au comptoir ou à la maison." }],
  7: [{ kicker: "Pochas · Garnacha", title: "Navarrese-style pochas beans from La Catedral de Navarra", with: "Irache 1891 Colección Privada Garnacha Clásica", text: "Pochas are mild and creamy: they call for a medium-bodied red, with the fruit of garnacha and not too much oak, so it does not cover them." }, { kicker: "Pochas · Grenache", title: "Haricots pochas à la navarraise de La Catedral de Navarra", with: "Irache 1891 Colección Privada Garnacha Clásica", text: "La pocha est douce et crémeuse : elle appelle un rouge de corps moyen, avec le fruit du grenache et sans excès de bois, qui ne la couvre pas." }],
  8: [{ kicker: "Beans · A great wine", title: "Beola red beans with pork ribs", with: "Chivite Colección 125 Tinto", text: "A hearty dish for a red with structure. The ribs in the stew go well with the ripe fruit and ageing of the wine." }, { kicker: "Haricots · Grand vin", title: "Haricots rouges aux côtes de porc de Beola", with: "Chivite Colección 125 Tinto", text: "Un plat copieux pour un rouge de structure. Les côtes du ragoût s'accordent avec le fruit mûr et l'élevage du vin." }],
  9: [{ kicker: "Mushroom cream soup · Cellar white", title: "Anko mushroom cream soup", with: "Castillo de Monjardín Chardonnay Gran Reserva", text: "The woodland aromas and creamy texture of the mushrooms go with an aged white, with toasty notes and volume in the mouth." }, { kicker: "Velouté de champignons · Blanc de garde", title: "Velouté de champignons d'Anko", with: "Castillo de Monjardín Chardonnay Gran Reserva", text: "Les arômes de sous-bois et la texture crémeuse des champignons s'accordent avec un blanc d'élevage, aux notes toastées et au volume en bouche." }],
  10: [{ kicker: "Foie gras · Sweet wine", title: "Katealde duck block or mi-cuit foie gras", with: "Ochoa Late Harvest Muscat", text: "The classic pairing: the sweetness and acidity of the muscat contrast with the richness of the foie gras. Serve the wine cold, at 6–8 ºC." }, { kicker: "Foie gras · Vin doux", title: "Bloc de canard ou mi-cuit de Katealde", with: "Muscat vendange tardive d'Ochoa", text: "L'accord classique : la douceur et l'acidité du muscat contrastent avec le gras du foie gras. Servir le vin frais, à 6–8 ºC." }],
  11: [{ kicker: "Foie gras · Navarrese jam", title: "Katealde foie gras with Irular patxaran jam", with: "a touch of Sal d'Oro flake salt", text: "Patxaran jam gives a very Navarrese accent. A few flakes of organic salt over the foie gras bring the whole thing together." }, { kicker: "Foie gras · Confiture navarraise", title: "Foie gras de Katealde avec confiture de patxaran d'Irular", with: "une touche de sel Sal d'Oro en flocons", text: "La confiture de patxaran apporte une touche très navarraise. Quelques flocons de sel bio sur le foie gras subliment l'ensemble." }],
  12: [{ kicker: "Pâté · Jam · Young red", title: "Arbizu country pâté or Beola liver pâté", with: "Aidin tomato jam and Unsi Terrazas Garnacha Tinta", text: "Tomato adds sweetness and freshness to the pâté. A young, fruity garnacha rounds off a simple, well-balanced aperitif." }, { kicker: "Pâté · Confiture · Rouge jeune", title: "Pâté de campagne d'Arbizu ou pâté de foie de Beola", with: "confiture de tomate d'Aidin et Unsi Terrazas Garnacha Tinta", text: "La tomate apporte douceur et fraîcheur au pâté. Un grenache jeune et fruité complète un apéritif simple et rond." }],
  13: [{ kicker: "Dark chocolate · Sweet garnacha", title: "Pedro Mayo sugar-free chocolate with almonds or Leyre 85 %", with: "Unsi Dulce Garnacha", text: "Intense cocoa needs a sweet wine with fruit and structure. Sweet garnacha softens the bitterness and lengthens the finish." }, { kicker: "Chocolat noir · Grenache doux", title: "Chocolat Pedro Mayo sans sucre aux amandes ou Leyre 85 %", with: "Dulce Garnacha d'Unsi", text: "Le cacao intense a besoin d'un vin doux avec du fruit et de la structure. Le grenache doux adoucit l'amertume et allonge la finale." }],
  14: [{ kicker: "Patxaran chocolate · Patxaran", title: "Navarra en Dulce 72 % dark chocolate with patxaran", with: "Patxaran Etxeko, Baines Gold Label or Belasco", text: "The chocolate echoes the sloe aromas of the liqueur: a very Navarrese combination. Serve the patxaran very cold." }, { kicker: "Chocolat au patxaran · Patxaran", title: "Chocolat noir 72 % au patxaran de Navarra en Dulce", with: "Patxaran Etxeko, Baines Étiquette Or ou Belasco", text: "Le chocolat reprend les arômes de prunelle de la liqueur : une combinaison très navarraise. Servir le patxaran très frais." }],
  15: [{ kicker: "Orange · Patxaran cream", title: "Navarra en Dulce 85 % dark chocolate with orange", with: "Bianca Villa orange cream with patxaran", text: "Orange with orange: the citrus of the chocolate and of the cream reinforce each other, and the patxaran adds the local touch." }, { kicker: "Orange · Crème de patxaran", title: "Chocolat noir 85 % à l'orange de Navarra en Dulce", with: "Bianca Villa, crème d'orange au patxaran", text: "Orange sur orange : l'agrume du chocolat et de la crème se renforcent, et le patxaran apporte la touche locale." }],
  16: [{ kicker: "Coffee chocolate · Cream liqueur", title: "Leyre coffee chocolate", with: "Baines Cream", text: "The mild, sweet patxaran cream wraps around the toasted notes of coffee and cocoa. Serve over ice." }, { kicker: "Chocolat au café · Crème", title: "Chocolat Leyre au café", with: "Baines Cream", text: "La crème de patxaran, douce et sucrée, enveloppe les notes torréfiées du café et du cacao. Servir sur glace." }],
  17: [{ kicker: "Biscuits · Artisan patxaran", title: "Navarra en Dulce Sanfermines patxaran biscuits", with: "Laxoa artisan patxaran", text: "Biscuits and patxaran, the traditional Navarrese after-dinner. Perfect as a gift for the fiestas." }, { kicker: "Biscuits · Patxaran artisanal", title: "Biscuits au patxaran Sanfermines de Navarra en Dulce", with: "Patxaran artisanal Laxoa", text: "Biscuits et patxaran, la sobremesa de toujours en Navarre. Parfait comme cadeau pour les fêtes." }],
  18: [{ kicker: "Cheese · Jam · Patxaran", title: "Sheep's cheese with Irular patxaran jam", with: "Patxaran La Navarra", text: "A savoury-sweet ending: the mature cheese, the jam and the patxaran share the same sloe aromas." }, { kicker: "Fromage · Confiture · Patxaran", title: "Fromage de brebis avec confiture de patxaran d'Irular", with: "Patxaran La Navarra", text: "Une fin salée-sucrée : le fromage affiné, la confiture et le patxaran partagent les mêmes arômes de prunelle." }],
};
/** Títulos de cada sección de maridajes en inglés y francés, por dirección (slug). */
export const PAIRING_GROUP_TEXTS: Record<string, [en: { title: string; subtitle: string }, fr: { title: string; subtitle: string }]> = {
  "para-abrir": [{ title: "To start", subtitle: "A Navarrese aperitif with good wine" }, { title: "Pour commencer", subtitle: "Un apéritif navarrais avec un bon vin" }],
  "queso-y-embutidos": [{ title: "Cheese and cured meats", subtitle: "For the perfect board" }, { title: "Fromage et charcuteries", subtitle: "Pour la planche parfaite" }],
  "de-cuchara": [{ title: "Spoon dishes", subtitle: "Traditional dishes, local wines" }, { title: "Plats mijotés", subtitle: "Des plats d'hier, des vins d'ici" }],
  "foie-y-pates": [{ title: "Foie gras and pâtés", subtitle: "The gourmet treat" }, { title: "Foie gras et pâtés", subtitle: "Le plaisir gourmet" }],
  "dulce-final": [{ title: "Sweet ending", subtitle: "Chocolate and liqueurs from Navarre" }, { title: "Fin sucrée", subtitle: "Chocolat et liqueurs de Navarre" }],
  "sobremesa": [{ title: "Sobremesa", subtitle: "To stretch out the conversation" }, { title: "Sobremesa", subtitle: "Pour prolonger la conversation" }],
};
/** Nombre de las categorías enlazadas desde cada maridaje ("Quesos →"), en inglés y francés. */
const SHOP_LABELS: Record<string, [en: string, fr: string]> = {
  "Espárragos": ["Asparagus", "Asperges"],
  "Vinos": ["Wines", "Vins"],
  "Conservas": ["Tinned fish", "Conserves"],
  "Pimientos": ["Peppers", "Poivrons"],
  "Quesos": ["Cheeses", "Fromages"],
  "Mermeladas": ["Jams", "Confitures"],
  "Embutidos": ["Cured meats", "Charcuteries"],
  "Legumbres": ["Pulses", "Légumineuses"],
  "Preparados": ["Ready meals", "Plats cuisinés"],
  "Patés y foie": ["Pâtés and foie gras", "Pâtés et foie gras"],
  "Condimentos": ["Seasonings", "Condiments"],
  "Chocolates": ["Chocolates", "Chocolats"],
  "Patxarán y licores": ["Patxaran and liqueurs", "Patxaran et liqueurs"],
  "Chocolates y dulces": ["Chocolates and sweets", "Chocolats et douceurs"],
};

export function localizePairing(p: Pairing, locale: Locale): Pairing {
  if (locale === "es") return p;
  const i = locale === "en" ? 0 : 1;
  const t = PAIRING_TEXTS[p.n]?.[i];
  return {
    ...p,
    ...(t ?? {}),
    shop: p.shop.map((s) => ({ ...s, label: SHOP_LABELS[s.label]?.[i] ?? s.label })),
  };
}

export function localizePairingGroup(g: PairingGroup, locale: Locale): PairingGroup {
  if (locale === "es") return g;
  const t = PAIRING_GROUP_TEXTS[g.slug]?.[locale === "en" ? 0 : 1];
  return { ...g, title: t?.title ?? g.title, subtitle: t?.subtitle ?? g.subtitle, items: g.items.map((p) => localizePairing(p, locale)) };
}
