import type { Locale } from "@/lib/i18n/config";
import type { Category } from "@/lib/types";

type Tr = { name: string; title: string; intro: string; alt: string };
type Seo = { title: string; description: string; heading: string; text: string[] };
type T2 = { en: Tr; fr: Tr };

/** Nombre, título, presentación y texto de la foto de cada categoría, en inglés y francés. */
const TEXTS: Record<string, T2> = {
  esparragos: {
    en: { name: "Asparagus", title: "Asparagus from Navarre", intro: "Asparagus from Navarre's gardens, selected at our shop.", alt: "White asparagus with oil and parsley" },
    fr: { name: "Asperges", title: "Asperges de Navarre", intro: "Asperges des potagers de Navarre, sélectionnées dans notre boutique.", alt: "Asperges blanches à l'huile et au persil" },
  },
  alcachofas: {
    en: { name: "Artichokes", title: "Artichokes", intro: "Preserved artichokes from the garden, selected at our shop.", alt: "Artichoke hearts with parsley" },
    fr: { name: "Artichauts", title: "Artichauts", intro: "Artichauts en conserve du potager, sélectionnés dans notre boutique.", alt: "Cœurs d'artichaut au persil" },
  },
  pimientos: {
    en: { name: "Peppers", title: "Peppers", intro: "Piquillo peppers and other varieties, selected at our shop.", alt: "Roasted piquillo peppers with sliced garlic" },
    fr: { name: "Poivrons", title: "Poivrons", intro: "Piquillos et autres variétés, sélectionnés dans notre boutique.", alt: "Piquillos rôtis à l'ail émincé" },
  },
  conservas: {
    en: { name: "Tinned fish", title: "Tinned fish", intro: "Tinned fish selected at our shop on Calle Estafeta.", alt: "Tin of fish with a fork" },
    fr: { name: "Conserves", title: "Conserves", intro: "Conserves sélectionnées dans notre boutique de la Calle Estafeta.", alt: "Boîte de conserve de poisson avec une fourchette" },
  },
  legumbres: {
    en: { name: "Pulses", title: "Pulses", intro: "White beans, red beans, lentils and other pulses selected at our shop.", alt: "White beans, red beans and lentils" },
    fr: { name: "Légumineuses", title: "Légumineuses", intro: "Haricots blancs, haricots rouges, lentilles et autres légumineuses sélectionnés dans notre boutique.", alt: "Haricots blancs, haricots rouges et lentilles" },
  },
  verduras: {
    en: { name: "Vegetables", title: "Vegetables", intro: "Preserved vegetables from the garden, selected at our shop.", alt: "Vegetable medley, borage and cardoon" },
    fr: { name: "Légumes", title: "Légumes", intro: "Légumes en conserve du potager, sélectionnés dans notre boutique.", alt: "Menestra de légumes, bourrache et cardon" },
  },
  quesos: {
    en: { name: "Cheeses", title: "Navarrese cheeses", intro: "Artisan cheeses from small producers, tasted one by one at our shop.", alt: "Wedge of mature cheese and cubes of cheese" },
    fr: { name: "Fromages", title: "Fromages de Navarre", intro: "Fromages artisanaux de petits producteurs, goûtés un à un dans notre boutique.", alt: "Part de fromage affiné et dés de fromage" },
  },
  embutidos: {
    en: { name: "Cured meats", title: "Navarrese cured meats", intro: "Txistorra, chorizo and cured meats from Navarrese workshops.", alt: "Chorizo, ham and salchichón cut into slices" },
    fr: { name: "Charcuteries", title: "Charcuteries de Navarre", intro: "Txistorra, chorizo et charcuteries affinées d'ateliers navarrais.", alt: "Chorizo, jambon et saucisson coupés en tranches" },
  },
  aceites: {
    en: { name: "Oils", title: "Oils from Navarre", intro: "Extra virgin olive oil from Navarrese mills.", alt: "Bottle of extra virgin olive oil" },
    fr: { name: "Huiles", title: "Huiles de Navarre", intro: "Huile d'olive vierge extra de moulins navarrais.", alt: "Bouteille d'huile d'olive vierge extra" },
  },
  "setas-y-hongos": {
    en: { name: "Mushrooms", title: "Mushrooms", intro: "Preserved mushrooms, selected at our shop.", alt: "Button mushrooms, chanterelles and mixed mushrooms on a plate" },
    fr: { name: "Champignons", title: "Champignons", intro: "Champignons en conserve, sélectionnés dans notre boutique.", alt: "Champignons de Paris, girolles et champignons variés dans une assiette" },
  },
  cremas: {
    en: { name: "Cream soups", title: "Cream soups", intro: "Vegetable cream soups ready to heat and serve.", alt: "Two bowls of vegetable cream soup" },
    fr: { name: "Veloutés", title: "Veloutés", intro: "Veloutés de légumes prêts à réchauffer et à servir.", alt: "Deux bols de velouté de légumes" },
  },
  salsas: {
    en: { name: "Sauces", title: "Sauces", intro: "Sauces to go with meat, fish and vegetables.", alt: "Jar of sauce with a spoon" },
    fr: { name: "Sauces", title: "Sauces", intro: "Sauces pour accompagner viandes, poissons et légumes.", alt: "Pot de sauce avec une cuillère" },
  },
  pates: {
    en: { name: "Pâtés", title: "Pâtés", intro: "Spreadable pâtés, ideal for an aperitif.", alt: "Pâté in a terrine and on a slice of toast" },
    fr: { name: "Pâtés", title: "Pâtés", intro: "Pâtés à tartiner, idéaux pour l'apéritif.", alt: "Pâté en terrine et sur une tartine" },
  },
  encurtidos: {
    en: { name: "Pickles", title: "Pickles", intro: "Chillies and pickles for the aperitif.", alt: "Bowl of pickled chillies" },
    fr: { name: "Pickles", title: "Pickles", intro: "Piments et pickles pour l'apéritif.", alt: "Bol de piments au vinaigre" },
  },
  condimentos: {
    en: { name: "Seasonings", title: "Seasonings", intro: "Salts, spices and seasonings for cooking.", alt: "Salt flakes on a plate" },
    fr: { name: "Condiments", title: "Condiments", intro: "Sels, épices et condiments pour cuisiner.", alt: "Flocons de sel sur une assiette" },
  },
  preparados: {
    en: { name: "Ready meals", title: "Ready meals", intro: "Ready meals to heat and serve.", alt: "Casserole of stewed beans" },
    fr: { name: "Plats cuisinés", title: "Plats cuisinés", intro: "Plats cuisinés prêts à réchauffer et à servir.", alt: "Cocotte de haricots mijotés" },
  },
  mermeladas: {
    en: { name: "Jams", title: "Jams", intro: "Jams and preserves for breakfasts and cheese boards.", alt: "Jar of jam with a spoon" },
    fr: { name: "Confitures", title: "Confitures", intro: "Confitures pour les petits-déjeuners et les plateaux de fromages.", alt: "Pot de confiture avec une cuillère" },
  },
  chocolates: {
    en: { name: "Chocolates", title: "Chocolates", intro: "Chocolates selected at our shop on Calle Estafeta.", alt: "Dark chocolate bar in squares" },
    fr: { name: "Chocolats", title: "Chocolats", intro: "Chocolats sélectionnés dans notre boutique de la Calle Estafeta.", alt: "Tablette de chocolat noir en carrés" },
  },
  dulces: {
    en: { name: "Sweets", title: "Sweets", intro: "Biscuits, traditional sweets and treats for coffee time.", alt: "Biscuits and traditional sweets" },
    fr: { name: "Douceurs", title: "Douceurs", intro: "Biscuits, douceurs traditionnelles et gourmandises pour le café.", alt: "Biscuits et douceurs traditionnelles" },
  },
  vinos: {
    en: { name: "D.O. Navarra wines", title: "D.O. Navarra wines", intro: "Reds, rosés and whites from small Navarrese wineries.", alt: "Glasses of red, rosé and white wine" },
    fr: { name: "Vins D.O. Navarra", title: "Vins D.O. Navarra", intro: "Vins rouges, rosés et blancs de petites caves de Navarre.", alt: "Verres de vin rouge, rosé et blanc" },
  },
  espumosos: {
    en: { name: "Sparkling wines", title: "Sparkling wines", intro: "Sparkling wines for toasts and celebrations.", alt: "Glass of sparkling wine" },
    fr: { name: "Vins mousseux", title: "Vins mousseux", intro: "Vins mousseux pour trinquer et célébrer.", alt: "Coupe de vin mousseux" },
  },
  bebidas: {
    en: { name: "Drinks", title: "Drinks and liqueurs", intro: "Patxaran, liqueurs and other drinks.", alt: "Glasses of patxaran and liqueur" },
    fr: { name: "Boissons", title: "Boissons et liqueurs", intro: "Patxaran, liqueurs et autres boissons.", alt: "Verres de patxaran et de liqueur" },
  },
  lotes: {
    en: { name: "Gift sets", title: "Gift sets", intro: "Sets with the best of the shop, ready to enjoy or give as a gift.", alt: "Gift set with txistorra, asparagus, peppers and wine" },
    fr: { name: "Coffrets", title: "Coffrets", intro: "Coffrets avec le meilleur de la boutique, prêts à savourer ou à offrir.", alt: "Coffret avec txistorra, asperges, poivrons et vin" },
  },
};

/** Categorías con textos de buscador propios (las demás los generan con una plantilla). */
const CUSTOM_SEO: Record<string, { en: Seo; fr: Seo }> = {
  quesos: {
    en: {
      title: "Artisan Navarrese cheeses: Roncal and Idiazabal",
      description: "Buy artisan Navarrese cheeses from small producers: DOP Roncal, Idiazabal, sheep, goat and cow. Delivery in 24–48 h or pickup at Calle Estafeta in Pamplona.",
      heading: "Artisan Navarrese cheeses, online and in Pamplona",
      text: ["A selection of cheeses from small Navarrese producers, tasted one by one at our shop on Calle Estafeta. Order online with delivery across mainland Spain in 24–48 h or come and collect them."],
    },
    fr: {
      title: "Fromages artisanaux de Navarre : Roncal et Idiazabal",
      description: "Achetez des fromages artisanaux de Navarre de petits producteurs : AOP Roncal, Idiazabal, brebis, chèvre et vache. Livraison en 24–48 h ou retrait Calle Estafeta à Pampelune.",
      heading: "Fromages artisanaux de Navarre, en ligne et à Pampelune",
      text: ["Une sélection de fromages de petits producteurs navarrais, goûtés un à un dans notre boutique de la Calle Estafeta. Commandez en ligne avec livraison dans toute l'Espagne péninsulaire en 24–48 h ou venez les retirer."],
    },
  },
  embutidos: {
    en: {
      title: "Artisan Navarrese cured meats: txistorra and chorizo",
      description: "Txistorra (chistorra), chorizo and artisan cured meats from Navarrese workshops. Shop online with delivery in 24–48 h or collect your order at Calle Estafeta in Pamplona.",
      heading: "Artisan Navarrese cured meats, online and in Pamplona",
      text: ["Cured meats from small Navarrese workshops, selected at our shop on Calle Estafeta. Order online with delivery across mainland Spain in 24–48 h or come and collect them."],
    },
    fr: {
      title: "Charcuteries artisanales de Navarre : txistorra et chorizo",
      description: "Txistorra (chistorra), chorizo et charcuteries artisanales d'ateliers navarrais. Achetez en ligne avec livraison en 24–48 h ou retirez votre commande Calle Estafeta à Pampelune.",
      heading: "Charcuteries artisanales de Navarre, en ligne et à Pampelune",
      text: ["Charcuteries de petits ateliers navarrais, sélectionnées dans notre boutique de la Calle Estafeta. Commandez en ligne avec livraison dans toute l'Espagne péninsulaire en 24–48 h ou venez les retirer."],
    },
  },
  aceites: {
    en: {
      title: "Extra virgin olive oil from Navarre",
      description: "Extra virgin olive oil from Navarrese mills, selected at our shop on Calle Estafeta in Pamplona. Delivery across mainland Spain in 24–48 h.",
      heading: "Oils from Navarre, online and in Pamplona",
      text: ["Extra virgin olive oils from Navarrese mills. Order online with delivery across mainland Spain in 24–48 h or come and collect them on Calle Estafeta."],
    },
    fr: {
      title: "Huile d'olive vierge extra de Navarre",
      description: "Huile d'olive vierge extra de moulins navarrais, sélectionnée dans notre boutique de la Calle Estafeta à Pampelune. Livraison dans toute l'Espagne péninsulaire en 24–48 h.",
      heading: "Huiles de Navarre, en ligne et à Pampelune",
      text: ["Huiles d'olive vierge extra de moulins navarrais. Commandez en ligne avec livraison dans toute l'Espagne péninsulaire en 24–48 h ou venez les retirer Calle Estafeta."],
    },
  },
  vinos: {
    en: {
      title: "D.O. Navarra wines: reds, rosés and whites",
      description: "D.O. Navarra wines from small wineries: reds, rosés and whites selected at our shop in Pamplona. Delivery across mainland Spain in 24–48 h.",
      heading: "Wines from Navarre, online and in Pamplona",
      text: ["Wines from small D.O. Navarra wineries, tasted at our shop on Calle Estafeta. Order online with delivery across mainland Spain in 24–48 h or come and collect them."],
    },
    fr: {
      title: "Vins D.O. Navarra : rouges, rosés et blancs",
      description: "Vins de la D.O. Navarra de petites caves : rouges, rosés et blancs sélectionnés dans notre boutique de Pampelune. Livraison dans toute l'Espagne péninsulaire en 24–48 h.",
      heading: "Vins de Navarre, en ligne et à Pampelune",
      text: ["Vins de petites caves de la D.O. Navarra, dégustés dans notre boutique de la Calle Estafeta. Commandez en ligne avec livraison dans toute l'Espagne péninsulaire en 24–48 h ou venez les retirer."],
    },
  },
};

const SIMPLE_SEO = {
  en: (title: string, intro: string): Seo => ({
    title: `${title}: shop online`,
    description: `${intro} Shop online with delivery across mainland Spain in 24–48 h or collect your order at our shop on Calle Estafeta in Pamplona.`,
    heading: `${title}, online and in Pamplona`,
    text: [`${intro} Order online with delivery across mainland Spain in 24–48 h or collect your order at Calle Estafeta, 70.`],
  }),
  fr: (title: string, intro: string): Seo => ({
    title: `${title} : achat en ligne`,
    description: `${intro} Achetez en ligne avec livraison dans toute l'Espagne péninsulaire en 24–48 h ou retirez votre commande dans notre boutique de la Calle Estafeta à Pampelune.`,
    heading: `${title}, en ligne et à Pampelune`,
    text: [`${intro} Commandez en ligne avec livraison dans toute l'Espagne péninsulaire en 24–48 h ou retirez votre commande au 70 Calle Estafeta.`],
  }),
};

const OCCASIONS: Record<"en" | "fr", { label: string; options: Record<string, string> }> = {
  en: { label: "Occasion", options: { regalo: "Gift sets", amigos: "Friends", cumpleanos: "Birthdays", empresas: "Businesses", navidad: "Christmas", pareja: "Couples", sanfermin: "San Fermín" } },
  fr: { label: "Occasion", options: { regalo: "Coffrets cadeaux", amigos: "Amis", cumpleanos: "Anniversaires", empresas: "Entreprises", navidad: "Noël", pareja: "Couples", sanfermin: "San Fermín" } },
};

const PHOTO: Record<"en" | "fr", string> = { en: "Photo", fr: "Photo" };

/** La categoría en el idioma pedido (en español se devuelve tal cual). */
export function localizeCategory(c: Category, locale: Locale): Category {
  if (locale === "es") return c;
  const tr = TEXTS[c.slug]?.[locale];
  if (!tr) return c;
  const seo = CUSTOM_SEO[c.slug]?.[locale] ?? SIMPLE_SEO[locale](tr.title, tr.intro);
  return {
    ...c,
    name: tr.name,
    title: tr.title,
    intro: tr.intro,
    image: { ...c.image, alt: tr.alt, placeholder: `${PHOTO[locale]} · ${tr.name.toLowerCase()}` },
    seo,
    filters: c.filters.map((f) =>
      f.key === "ocasion"
        ? { ...f, label: OCCASIONS[locale].label, options: f.options.map((o) => ({ ...o, label: OCCASIONS[locale].options[o.value] ?? o.label })) }
        : f,
    ),
  };
}
