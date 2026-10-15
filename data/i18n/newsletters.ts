import type { Newsletter } from "@/data/newsletters";
import type { Locale } from "@/lib/i18n/config";

type NSection = { title: string; paragraphs?: string[]; list?: string[]; tip?: string };
type NText = {
  theme: string;
  title: string;
  subtitle: string;
  excerpt: string;
  alt: string;
  lead: string;
  stats: { value: string; label: string }[];
  sections: NSection[];
  shopTitle: string;
  cta: string;
};

export const NEWSLETTER_SOURCE_TEXT: Record<"en" | "fr", string> = {
  en: "Origin information based on the official data published by Reyno Gourmet (Government of Navarre).",
  fr: "Informations d'origine fondées sur les données officielles publiées par Reyno Gourmet (Gouvernement de Navarre).",
};

/** Boletines en inglés y francés, por dirección (slug). Los productos, fotos y enlaces son los del original. */
export const NEWSLETTER_TEXTS: Record<string, [en: NText, fr: NText]> = {
  "vinos-do-navarra": [
    {
      theme: "Wines", title: "D.O. Navarra wines", subtitle: "Five zones, three climates and plenty of garnacha",
      excerpt: "Discover the five zones of Navarrese wine and how to choose a bottle for every moment.",
      alt: "Glasses and bottles of Navarrese wine",
      lead: "Navarre has been making wine since Roman times and, centuries later, the Camino de Santiago and the monasteries carried it all over Europe. Today it is one of the most varied wine denominations in Spain.",
      stats: [
        { value: "10,200 ha", label: "of vineyard, approximately" },
        { value: "5 zones", label: "Baja Montaña, Valdizarbe, Tierra Estella, Ribera Alta and Ribera Baja" },
        { value: "90 %", label: "of production is red wine" },
        { value: "+70 %", label: "native varieties" },
      ],
      sections: [
        { title: "One territory, three climates", paragraphs: ["Within a few kilometres, Navarre goes from the Atlantic influence of the north to the continental climate of the centre and the Mediterranean climate of the Ebro Ribera. This diversity explains why fresh rosés, barrel-aged whites and reds for laying down all come from here."],
          list: ["**Baja Montaña:** the northernmost, with a sub-humid climate.", "**Valdizarbe:** a transition zone, along the Camino de Santiago.", "**Tierra Estella:** in the west, also on the pilgrim route.", "**Ribera Alta:** with Olite as the capital of wine.", "**Ribera Baja:** the largest vineyard area and the most wineries."] },
        { title: "The grapes", paragraphs: ["Among the reds, **garnacha** and **tempranillo** rule, joined by cabernet sauvignon, merlot, mazuelo, graciano, syrah and pinot noir. Among the whites, viura, **chardonnay**, white garnacha, malvasía, sauvignon blanc and **small-berry muscat**, the base of Navarre's sweet wines, stand out."] },
        { title: "From plague to reinvention", paragraphs: ["At the end of the 19th century phylloxera devastated Navarre's vineyards: of around 50,000 hectares, barely 1,500 were left. Replanting with resistant rootstocks was the starting point of the modern vineyard we know today."],
          tip: "Not sure what to take to a meal? A Navarrese garnacha rosé almost never fails: it goes with vegetables, fish, rice dishes and even a good txistorra brunch." },
        { title: "How to read the label", list: ["**Joven:** fresh and fruity, to drink within the year.", "**Roble:** a short spell in oak.", "**Crianza, Reserva and Gran Reserva:** from less to more time ageing in barrel and bottle.", "**Dulce natural:** the territory of muscat."] },
      ],
      shopTitle: "Our selection of Navarrese wines", cta: "See all wines",
    },
    {
      theme: "Vins", title: "Vins D.O. Navarra", subtitle: "Cinq zones, trois climats et beaucoup de grenache",
      excerpt: "Découvrez les cinq zones du vin navarrais et comment choisir une bouteille pour chaque moment.",
      alt: "Verres et bouteilles de vin navarrais",
      lead: "La Navarre fait du vin depuis l'époque romaine et, des siècles plus tard, le Chemin de Compostelle et les monastères l'ont porté dans toute l'Europe. Aujourd'hui, c'est l'une des appellations les plus variées d'Espagne.",
      stats: [
        { value: "10 200 ha", label: "de vignoble environ" },
        { value: "5 zones", label: "Baja Montaña, Valdizarbe, Tierra Estella, Ribera Alta et Ribera Baja" },
        { value: "90 %", label: "de la production est du vin rouge" },
        { value: "+70 %", label: "de cépages autochtones" },
      ],
      sections: [
        { title: "Un territoire, trois climats", paragraphs: ["En quelques kilomètres, la Navarre passe de l'influence atlantique du nord au climat continental du centre et au climat méditerranéen de la Ribera de l'Èbre. Cette diversité explique pourquoi on y produit des rosés frais, des blancs élevés en fût et des rouges de garde."],
          list: ["**Baja Montaña :** la plus au nord, au climat subhumide.", "**Valdizarbe :** zone de transition, le long du Chemin de Compostelle.", "**Tierra Estella :** à l'ouest, également sur la route jacquaire.", "**Ribera Alta :** avec Olite pour capitale du vin.", "**Ribera Baja :** la plus grande surface de vignoble et le plus de caves."] },
        { title: "Les cépages", paragraphs: ["Parmi les rouges, le **grenache** et le **tempranillo** dominent, accompagnés du cabernet sauvignon, du merlot, du mazuelo, du graciano, de la syrah et du pinot noir. Parmi les blancs, la viura, le **chardonnay**, le grenache blanc, la malvoisie, le sauvignon blanc et le **muscat à petits grains**, base des vins doux navarrais, se distinguent."] },
        { title: "De la maladie à la réinvention", paragraphs: ["À la fin du XIXe siècle, le phylloxéra a ravagé le vignoble navarrais : sur environ 50 000 hectares, il n'en restait que 1 500. La replantation avec des porte-greffes résistants fut le point de départ du vignoble moderne que nous connaissons aujourd'hui."],
          tip: "Vous ne savez pas quoi apporter à un repas ? Un rosé de grenache navarrais ne déçoit presque jamais : il s'accorde avec les légumes, les poissons, les riz et même un bon brunch de txistorra." },
        { title: "Comment lire l'étiquette", list: ["**Joven :** frais et fruité, à boire dans l'année.", "**Roble :** un bref passage en fût.", "**Crianza, Reserva et Gran Reserva :** de moins à plus de temps de vieillissement en fût et en bouteille.", "**Dulce natural :** le domaine du muscat."] },
      ],
      shopTitle: "Notre sélection de vins navarrais", cta: "Voir tous les vins",
    },
  ],
  "esparrago-de-navarra": [
    {
      theme: "Garden", title: "Asparagus from Navarre", subtitle: "The white gold of the Ribera",
      excerpt: "How to recognise PGI asparagus, how to peel and cook it, and our favourites.",
      alt: "White asparagus with oil and parsley",
      lead: "White, tender and with that perfect balance between bitterness and softness. Navarre asparagus was one of the first protected products of the region and is still its most recognisable ambassador.",
      stats: [
        { value: "1986", label: "year the Protected Geographical Indication was created" },
        { value: "257", label: "protected municipalities in Navarre, Aragón and La Rioja" },
        { value: "April–June", label: "fresh asparagus season" },
        { value: "6–8 years", label: "productive life of each plant" },
      ],
      sections: [
        { title: "From the earth to the tin", paragraphs: ["Asparagus is grown in the Ebro valley, with a mild Mediterranean climate. It is planted in February and, from the second year, earthed up in March and harvested daily until June. After that the plant is left to grow so that it builds up strength for the next harvest.", "Navarre provides most of the protected area (176 municipalities), alongside 43 in Aragón and 38 in La Rioja."] },
        { title: "How to recognise it", paragraphs: ["PGI asparagus always carries:"], list: ["The **numbered back label** and the logo of the Espárrago de Navarra PGI.", "The European seal of Protected Geographical Indication.", "Simple ingredients: asparagus, water and salt.", "The number of spears (size), the net weight and the drained weight."] },
        { title: "In the kitchen", paragraphs: ["If you buy it fresh: hold it by the tip and peel it from top to bottom with a peeler, turning it so that it is even. Cut the base and boil it for about 10 minutes in salted water. Serve it warm with a good extra virgin olive oil."], tip: "If tinned, take them out of the jar 15 minutes beforehand and do not throw away the liquid: it is perfect for an asparagus cream soup or for a rice dish." },
        { title: "Sizes: how many spears", paragraphs: ["The number you will see on the jar (4-6, 6-8, 9-12...) shows how many asparagus fit in the pack: **the fewer, the thicker**. The extra-thick ones are the most tender and the most prized for eating just as they are."] },
      ],
      shopTitle: "Asparagus in our shop", cta: "Shop asparagus",
    },
    {
      theme: "Potager", title: "Asperge de Navarre", subtitle: "L'or blanc de la Ribera",
      excerpt: "Comment reconnaître une asperge IGP, comment l'éplucher et la cuire, et nos préférées.",
      alt: "Asperges blanches à l'huile et au persil",
      lead: "Blanche, tendre et avec ce parfait équilibre entre amertume et douceur. L'asperge de Navarre a été l'un des premiers produits protégés de la région et reste son ambassadrice la plus reconnaissable.",
      stats: [
        { value: "1986", label: "année de création de l'Indication Géographique Protégée" },
        { value: "257", label: "communes protégées en Navarre, Aragon et La Rioja" },
        { value: "Avril–juin", label: "saison de l'asperge fraîche" },
        { value: "6–8 ans", label: "durée de vie productive de chaque plant" },
      ],
      sections: [
        { title: "De la terre à la boîte", paragraphs: ["L'asperge est cultivée dans la vallée de l'Èbre, au climat méditerranéen tempéré. Elle est plantée en février et, à partir de la deuxième année, buttée en mars et récoltée chaque jour jusqu'en juin. Ensuite, on laisse la plante pousser pour qu'elle accumule des forces pour la récolte suivante.", "La Navarre fournit la plus grande partie de la zone protégée (176 communes), avec 43 en Aragon et 38 en La Rioja."] },
        { title: "Comment la reconnaître", paragraphs: ["Une asperge IGP porte toujours :"], list: ["La **contre-étiquette numérotée** et le logo de l'IGP Espárrago de Navarra.", "Le sceau européen d'Indication Géographique Protégée.", "Des ingrédients simples : asperge, eau et sel.", "Le nombre de pièces (calibre), le poids net et le poids égoutté."] },
        { title: "En cuisine", paragraphs: ["Si vous l'achetez fraîche : tenez-la par la pointe et épluchez-la de haut en bas avec un économe, en la tournant pour qu'elle soit uniforme. Coupez la base et faites-la cuire environ 10 minutes dans de l'eau salée. Servez-la tiède avec une bonne huile d'olive vierge extra."], tip: "En conserve, sortez-les du bocal 15 minutes avant et ne jetez pas le liquide : il est parfait pour un velouté d'asperges ou pour un riz." },
        { title: "Calibres : combien de pièces", paragraphs: ["Le chiffre que vous verrez sur le bocal (4-6, 6-8, 9-12...) indique combien d'asperges tiennent dans l'emballage : **moins il y en a, plus elles sont grosses**. Les extra-grosses sont les plus tendres et les plus appréciées pour être mangées telles quelles."] },
      ],
      shopTitle: "Des asperges dans notre boutique", cta: "Acheter des asperges",
    },
  ],
  "pimiento-del-piquillo": [
    {
      theme: "Garden", title: "Piquillo pepper", subtitle: "Flame-roasted, hand-peeled",
      excerpt: "Eight villages, a flame roast and a unique pepper: everything about the Lodosa piquillo.",
      alt: "Roasted piquillo peppers with sliced garlic",
      lead: "Small, deep red and beak-shaped. The piquillo is one of the great treasures of the Navarrese garden, and its Designation of Origin version is only grown and prepared in eight localities.",
      stats: [
        { value: "8", label: "municipalities: Andosilla, Azagra, Cárcar, Lerín, Lodosa, Mendavia, San Adrián and Sartaguda" },
        { value: "1987", label: "year of the Designation of Origin" },
        { value: "35–50 g", label: "weight of each pepper" },
        { value: "Sept.–Nov.", label: "hand-picked, week by week" },
      ],
      sections: [
        { title: "An artisan process", paragraphs: ["After harvesting, the peppers are washed and **roasted directly over the flame**. Then the core, skin and seeds are removed, without water, so as not to lose flavour. They are selected one by one, packed and sterilised. This is how they get their fleshy texture and that characteristic sweet, smoky touch."] },
        { title: "What is that liquid in the jar?", paragraphs: ["That thick juice you find when you open the jar is the **pepper's own juice**. Do not throw it away: use it for the sauce, a sofrito or to stew the stuffed peppers."] },
        { title: "How to enjoy it", list: ["**In a salad:** cut it just before serving to keep its vitamins.", "**With red meat:** its vitamin C helps absorb the iron.", "**Confit** over a low heat with garlic and oil, as a side.", "**Stuffed** with cod, meat or mushrooms: a Navarrese classic."], tip: "Warm the piquillos in a pan with a little oil and slices of garlic: in 5 minutes you have a perfect tapa to go with a garnacha rosé." },
        { title: "How to recognise the genuine one", paragraphs: ["Only producers within the D.O. may use the name **“Pimientos del Piquillo de Lodosa”**. Look for the official logo and the numbered back label of the Regulatory Council."] },
      ],
      shopTitle: "Piquillos in our shop", cta: "Shop peppers",
    },
    {
      theme: "Potager", title: "Poivron piquillo", subtitle: "Rôti à la flamme, pelé à la main",
      excerpt: "Huit villages, un rôtissage à la flamme et un poivron unique : tout sur le piquillo de Lodosa.",
      alt: "Piquillos rôtis à l'ail émincé",
      lead: "Petit, rouge intense et en forme de bec. Le piquillo est l'un des grands trésors du potager navarrais, et sa version d'Appellation d'Origine n'est cultivée et élaborée que dans huit localités.",
      stats: [
        { value: "8", label: "communes : Andosilla, Azagra, Cárcar, Lerín, Lodosa, Mendavia, San Adrián et Sartaguda" },
        { value: "1987", label: "année de l'Appellation d'Origine" },
        { value: "35–50 g", label: "poids de chaque poivron" },
        { value: "Sept.–nov.", label: "récolte manuelle, semaine après semaine" },
      ],
      sections: [
        { title: "Un procédé artisanal", paragraphs: ["Après la récolte, les poivrons sont lavés et **rôtis directement à la flamme**. On leur retire ensuite le cœur, la peau et les pépins, sans eau, pour ne pas perdre de saveur. Ils sont sélectionnés un à un, conditionnés et stérilisés. C'est ainsi qu'ils obtiennent leur texture charnue et cette touche douce et fumée si caractéristique."] },
        { title: "Quel est ce liquide dans le bocal ?", paragraphs: ["Ce jus épais que vous trouvez en ouvrant le bocal est le **jus du poivron lui-même**. Ne le jetez pas : utilisez-le pour la sauce, un sofrito ou pour mijoter les poivrons farcis."] },
        { title: "Comment le savourer", list: ["**En salade :** coupez-le juste avant de servir pour conserver ses vitamines.", "**Avec de la viande rouge :** sa vitamine C aide à absorber le fer.", "**Confit** à feu doux avec de l'ail et de l'huile, en accompagnement.", "**Farci** à la morue, à la viande ou aux champignons : un classique navarrais."], tip: "Faites chauffer les piquillos à la poêle avec un peu d'huile et des lamelles d'ail : en 5 minutes, vous avez une tapa parfaite pour accompagner un rosé de grenache." },
        { title: "Comment reconnaître le vrai", paragraphs: ["Seuls les producteurs de l'A.O. peuvent utiliser le nom **« Pimientos del Piquillo de Lodosa »**. Cherchez le logo officiel et la contre-étiquette numérotée du Conseil de régulation."] },
      ],
      shopTitle: "Des piquillos dans notre boutique", cta: "Acheter des poivrons",
    },
  ],
  "alcachofa-de-tudela": [
    {
      theme: "Garden", title: "Tudela artichoke", subtitle: "The flower of the Ribera",
      excerpt: "The Blanca de Tudela: a unique variety, available in autumn and spring, and also tinned.",
      alt: "Artichoke hearts with parsley",
      lead: "Round, compact, with a small hollow at the top. The Blanca de Tudela artichoke is the fruit of generations of Ribera farmers selecting their best plants.",
      stats: [
        { value: "2001", label: "year of the Protected Geographical Indication" },
        { value: "33", label: "municipalities of the Ribera de Navarra" },
        { value: "1 variety", label: "only the Blanca de Tudela" },
        { value: "~90 %", label: "of its composition is water" },
      ],
      sections: [
        { title: "Two seasons", paragraphs: ["The artichoke has a short season in **autumn** and a longer one in **spring**. Its cultivation in the area goes back to Andalusi times, and its fame spread across Spain in the 1980s."] },
        { title: "Tinned, no tricks", paragraphs: ["PGI artichoke in tins is only packed in a **glass jar** and without acidifiers or acidity correctors, to keep its natural flavour. You will find it as whole hearts or in halves."] },
        { title: "Good for everything", paragraphs: ["It provides fibre, phytosterols and flavonoids, helps digestion and is a great ally for a light diet."], list: ["**Sautéed** with ham and a drizzle of oil.", "**Battered** or in tempura as an aperitif.", "**In menestra**, the great dish of the Ribera.", "**Confit** in oil at a low temperature."], tip: "Drain the hearts well and brown them in the pan face down without moving them: they come out crisp outside and melting inside. Finish with flake salt." },
      ],
      shopTitle: "Tinned artichokes in our shop", cta: "Shop artichokes",
    },
    {
      theme: "Potager", title: "Artichaut de Tudela", subtitle: "La fleur de la Ribera",
      excerpt: "La Blanca de Tudela : une variété unique, d'automne et de printemps, aussi en conserve.",
      alt: "Cœurs d'artichaut au persil",
      lead: "Ronde, compacte et avec un petit creux sur le dessus. L'artichaut Blanca de Tudela est le fruit de générations d'agriculteurs de la Ribera qui ont sélectionné leurs meilleurs plants.",
      stats: [
        { value: "2001", label: "année de l'Indication Géographique Protégée" },
        { value: "33", label: "communes de la Ribera de Navarra" },
        { value: "1 variété", label: "uniquement la Blanca de Tudela" },
        { value: "~90 %", label: "de sa composition est de l'eau" },
      ],
      sections: [
        { title: "Deux saisons", paragraphs: ["L'artichaut a une courte saison en **automne** et une plus longue au **printemps**. Sa culture dans la région remonte à l'époque andalouse, et sa réputation s'est étendue à toute l'Espagne dans les années 80."] },
        { title: "En conserve, sans artifice", paragraphs: ["L'artichaut IGP en conserve n'est conditionné qu'en **bocal en verre** et sans acidifiants ni correcteurs d'acidité, pour préserver sa saveur naturelle. Vous le trouverez en cœurs entiers ou en moitiés."] },
        { title: "Bon pour tout", paragraphs: ["Il apporte des fibres, des phytostérols et des flavonoïdes, aide à la digestion et est un grand allié d'une alimentation légère."], list: ["**Sauté** avec du jambon et un filet d'huile.", "**Pané** ou en tempura à l'apéritif.", "**En menestra**, le grand plat de la Ribera.", "**Confit** dans l'huile à basse température."], tip: "Égouttez bien les cœurs et faites-les dorer à la poêle face vers le bas, sans les bouger : ils sont croustillants à l'extérieur et fondants à l'intérieur. Terminez avec des flocons de sel." },
      ],
      shopTitle: "Des artichauts en conserve dans notre boutique", cta: "Acheter des artichauts",
    },
  ],
  "quesos-idiazabal-y-roncal": [
    {
      theme: "Cheeses", title: "Sheep's cheeses: Idiazabal and Roncal", subtitle: "Raw milk, mountain pastures and patience",
      excerpt: "Two historic designations of Navarrese sheep's cheese and how to enjoy them.",
      alt: "Wedge of mature cheese and cubes of cheese",
      lead: "In the north of Navarre, latxa sheep graze in the mountains and their raw milk becomes two of Spain's most prestigious cheeses: Idiazabal and Roncal.",
      stats: [
        { value: "1981", label: "Roncal: the first cheese in Spain with a Designation of Origin" },
        { value: "1987", label: "year of the Idiazabal D.O." },
        { value: "2 months", label: "minimum ripening for Idiazabal" },
        { value: "4 months", label: "minimum ripening for Roncal" },
      ],
      sections: [
        { title: "Idiazabal", paragraphs: ["It is made in the Basque Country and Navarre with **raw milk from latxa and carranzana sheep**. It has a hard, smooth rind, an ivory to straw-yellow paste and a balanced flavour, with medium saltiness and a long finish. It exists in a natural version and a **smoked** one, with a darker rind.", "You will recognise it by its red band, the numbered holographic back label and the casein plaque engraved on the rind."] },
        { title: "Roncal", paragraphs: ["It is made and matured only in the seven villages of the Roncal valley, with raw milk from latxa and Navarrese sheep. Its paste is firm and slightly crumbly, with a pronounced, slightly spicy and buttery flavour."] },
        { title: "How to serve it", list: ["Take it out of the fridge **an hour beforehand**: at room temperature it gains in aroma and flavour.", "Cut it into thin wedges, removing the rind.", "Serve it with quince paste, walnuts or a fig jam."], tip: "Try the smoked Idiazabal with a Navarrese crianza red, and the most mature sheep's cheese with a very cold pacharán at the end of the meal." },
      ],
      shopTitle: "Sheep's cheeses in our shop", cta: "Shop cheeses",
    },
    {
      theme: "Fromages", title: "Fromages de brebis : Idiazabal et Roncal", subtitle: "Lait cru, pâturages de montagne et patience",
      excerpt: "Deux appellations historiques du fromage de brebis navarrais et comment les savourer.",
      alt: "Part de fromage affiné et dés de fromage",
      lead: "Dans le nord de la Navarre, les brebis latxa paissent dans les montagnes et leur lait cru devient deux des fromages les plus prestigieux d'Espagne : l'Idiazabal et le Roncal.",
      stats: [
        { value: "1981", label: "Roncal : le premier fromage d'Espagne avec une Appellation d'Origine" },
        { value: "1987", label: "année de l'A.O. Idiazabal" },
        { value: "2 mois", label: "d'affinage minimum de l'Idiazabal" },
        { value: "4 mois", label: "d'affinage minimum du Roncal" },
      ],
      sections: [
        { title: "Idiazabal", paragraphs: ["Il est élaboré au Pays basque et en Navarre avec du **lait cru de brebis latxa et carranzana**. Il a une croûte dure et lisse, une pâte d'ivoire à jaune paille et une saveur équilibrée, avec une salinité moyenne et une longue finale. Il existe en version nature et **fumée**, à la croûte plus foncée.", "Vous le reconnaîtrez à sa bande rouge, à sa contre-étiquette holographique numérotée et à la plaque de caséine gravée sur la croûte."] },
        { title: "Roncal", paragraphs: ["Il est élaboré et affiné uniquement dans les sept villages de la vallée de Roncal, avec du lait cru de brebis latxa et navarraise. Sa pâte est ferme et un peu friable, d'une saveur prononcée, légèrement piquante et beurrée."] },
        { title: "Comment le servir", list: ["Sortez-le du réfrigérateur **une heure avant** : à température ambiante, il gagne en arôme et en saveur.", "Coupez-le en fines parts, en retirant la croûte.", "Accompagnez-le de pâte de coing, de noix ou d'une confiture de figue."], tip: "Essayez l'Idiazabal fumé avec un rouge crianza navarrais, et le fromage de brebis le plus affiné avec un pacharán bien frais en fin de repas." },
      ],
      shopTitle: "Des fromages de brebis dans notre boutique", cta: "Acheter des fromages",
    },
  ],
  "aceite-de-navarra": [
    {
      theme: "Oil", title: "Olive oil from Navarre", subtitle: "Arróniz, the variety that gives character",
      excerpt: "Bitter, pungent and very balanced: this is Navarrese extra virgin olive oil.",
      alt: "Navarrese extra virgin olive oil",
      lead: "In the south of Navarre, among ranges, cierzo wind and plenty of sun, a unique olive grove grows. Its jewel is the arróniz, a native variety with a lot of personality.",
      stats: [
        { value: "2007", label: "year of the Aceite de Navarra P.D.O." },
        { value: "135", label: "municipalities in the south of Navarre" },
        { value: "< 0.3°", label: "acidity required" },
        { value: "3", label: "varieties: arróniz, empeltre and arbequina" },
      ],
      sections: [
        { title: "Only extra virgin", paragraphs: ["The designation protects extra virgin olive oil exclusively. It requires an acidity below 0.3°, a minimum fruitiness of 4.5 and zero defects. Blends must contain at least 10 % **arróniz**, the native variety."] },
        { title: "How it tastes", paragraphs: ["Medium to intense fruitiness, with green notes and the characteristic, very balanced **bitterness and pungency**. The harvest runs from October to December, when the olive is at its best."] },
        { title: "How to taste it at home", list: ["Pour a little into a small glass and warm it with your hand.", "Smell: look for freshly cut grass, tomato plant, artichoke.", "Taste: the bitterness on the tongue and the pungency in the throat are a sign of a fresh oil rich in polyphenols."], tip: "Keep the oil tightly closed, away from light and heat (never next to the hob). That way it will keep its aromas much longer." },
      ],
      shopTitle: "Oils in our shop", cta: "Shop oils",
    },
    {
      theme: "Huile", title: "Huile de Navarre", subtitle: "Arróniz, la variété qui donne du caractère",
      excerpt: "Amère, piquante et très équilibrée : voilà l'huile d'olive vierge extra navarraise.",
      alt: "Huile d'olive vierge extra navarraise",
      lead: "Dans le sud de la Navarre, entre sierras, vent cierzo et beaucoup de soleil, pousse une oliveraie au caractère unique. Son joyau est l'arróniz, une variété autochtone pleine de personnalité.",
      stats: [
        { value: "2007", label: "année de l'A.O.P. Aceite de Navarra" },
        { value: "135", label: "communes du sud de la Navarre" },
        { value: "< 0,3°", label: "d'acidité exigée" },
        { value: "3", label: "variétés : arróniz, empeltre et arbequina" },
      ],
      sections: [
        { title: "Uniquement vierge extra", paragraphs: ["L'appellation protège exclusivement l'huile d'olive vierge extra. Elle exige une acidité inférieure à 0,3°, un fruité minimum de 4,5 et zéro défaut. Les assemblages doivent contenir au moins 10 % d'**arróniz**, la variété autochtone."] },
        { title: "Quel goût a-t-elle", paragraphs: ["Un fruité moyen à intense, avec des notes vertes et l'**amertume et le piquant** caractéristiques, très équilibrés. La récolte va d'octobre à décembre, lorsque l'olive est à son meilleur."] },
        { title: "Comment la déguster chez soi", list: ["Versez un peu d'huile dans un petit verre et réchauffez-le avec la main.", "Sentez : cherchez l'herbe fraîchement coupée, le plant de tomate, l'artichaut.", "Goûtez : l'amertume sur la langue et le piquant dans la gorge sont le signe d'une huile fraîche et riche en polyphénols."], tip: "Conservez l'huile bien fermée, à l'abri de la lumière et de la chaleur (jamais près des feux). Elle gardera ainsi ses arômes beaucoup plus longtemps." },
      ],
      shopTitle: "Des huiles dans notre boutique", cta: "Acheter des huiles",
    },
  ],
  "pacharan-navarro": [
    {
      theme: "Liqueurs", title: "Navarrese pacharán", subtitle: "Sloes, anise and patience",
      excerpt: "From the 15th century to your after-dinner: what makes Navarrese pacharán unique and how to serve it.",
      alt: "Navarrese pacharán",
      lead: "As early as 1415 it was served at a noble wedding in Navarre, and Queen Blanche took it as a remedy in 1441. Six centuries later, pacharán is still the finishing touch to any Navarrese meal.",
      stats: [
        { value: "1988", label: "year of the Pacharán Navarro Geographical Indication" },
        { value: "125–300 g", label: "of sloes per litre" },
        { value: "25–30°", label: "alcohol strength of pacharán" },
        { value: "1–8 months", label: "of slow maceration" },
      ],
      sections: [
        { title: "How it is made", paragraphs: ["The sloes, the fruit of the blackthorn (Prunus spinosa), must be 100 % Navarrese, healthy and shiny. They are macerated slowly in an aniseed spirit for between one and eight months; then it is racked and filtered. The result has a colour from red to deep red, depending on each house's recipe."] },
        { title: "What it is like", paragraphs: ["Smooth and intense, sweet and tart, dry and fruity at the same time. A young, fresh liqueur with no additives other than sugar."] },
        { title: "How to serve it", list: ["**Very cold**, between 0 and 4 ºC.", "In a small glass, neat or with one large ice cube.", "With dark chocolate, biscuits or a mature sheep's cheese."], tip: "Every GI bottle carries a numbered back label from the Regulatory Council. Look for it to make sure it is genuine Navarrese pacharán." },
      ],
      shopTitle: "Pacharanes in our shop", cta: "Shop pacharán",
    },
    {
      theme: "Liqueurs", title: "Pacharán navarrais", subtitle: "Prunelles, anis et patience",
      excerpt: "Du XVe siècle à votre fin de repas : ce qui rend le pacharán navarrais unique et comment le servir.",
      alt: "Pacharán navarrais",
      lead: "Dès 1415, on le servait lors d'un mariage noble en Navarre, et la reine Blanche le prenait comme remède en 1441. Six siècles plus tard, le pacharán reste le point final de tout repas navarrais.",
      stats: [
        { value: "1988", label: "année de l'Indication Géographique Pacharán Navarro" },
        { value: "125–300 g", label: "de prunelles par litre" },
        { value: "25–30°", label: "degré d'alcool du pacharán" },
        { value: "1–8 mois", label: "de macération lente" },
      ],
      sections: [
        { title: "Comment il est élaboré", paragraphs: ["Les prunelles, fruit du prunellier (Prunus spinosa), doivent être 100 % navarraises, saines et brillantes. Elles macèrent lentement dans une eau-de-vie anisée entre un et huit mois ; ensuite, on soutire et on filtre. Le résultat a une couleur allant du rouge au rouge intense, selon la recette de chaque maison."] },
        { title: "Comment il est", paragraphs: ["Doux et intense, sucré et acidulé, sec et fruité à la fois. Une liqueur jeune et fraîche, sans autre additif que le sucre."] },
        { title: "Comment le servir", list: ["**Très frais**, entre 0 et 4 ºC.", "Dans un petit verre, seul ou avec un gros glaçon.", "Avec du chocolat noir, des biscuits ou un fromage de brebis affiné."], tip: "Chaque bouteille IG porte une contre-étiquette numérotée du Conseil de régulation. Regardez-la pour vous assurer que c'est un authentique pacharán navarrais." },
      ],
      shopTitle: "Des pacharans dans notre boutique", cta: "Acheter du pacharán",
    },
  ],
  "txistorra-de-navarra": [
    {
      theme: "Cured meats", title: "Txistorra from Navarre", subtitle: "The queen of brunch",
      excerpt: "It now has a European PGI: this is Navarrese txistorra and how to cook it well.",
      alt: "Chorizo, ham and salchichón cut into slices",
      lead: "Thin, red and with that unmistakable sizzle on the griddle. Txistorra has been part of Navarrese cooking since at least the early 19th century, and since 2024 it has Protected Geographical Indication.",
      stats: [
        { value: "2024", label: "registered as a PGI in the European register" },
        { value: "17–25 mm", label: "in diameter" },
        { value: "4", label: "base ingredients: pork, salt, paprika and garlic" },
        { value: "2 days", label: "minimum curing" },
      ],
      sections: [
        { title: "What is in it", paragraphs: ["Minced pork meat and fat seasoned with **salt, paprika and garlic**, stuffed into natural lamb or collagen casing. When cut, the meat and fat are clearly distinguishable, and its reddish colour comes from the paprika."] },
        { title: "How to cook it", list: ["**On the griddle or in a pan, without oil:** it releases its own fat.", "Medium heat, turning it, until golden and crisp.", "With bread, with fried eggs or wrapped in puff pastry."], tip: "The quintessential Sanfermines brunch: freshly cooked txistorra, bread and a very cold rosé. Try it with a young garnacha red too." },
      ],
      shopTitle: "Txistorra in our shop", cta: "Shop cured meats",
    },
    {
      theme: "Charcuteries", title: "Txistorra de Navarre", subtitle: "La reine du brunch",
      excerpt: "Elle a désormais une IGP européenne : voici la txistorra navarraise et comment bien la cuisiner.",
      alt: "Chorizo, jambon et saucisson coupés en tranches",
      lead: "Fine, rouge et avec ce grésillement inimitable sur la plancha. La txistorra fait partie de la cuisine navarraise depuis au moins le début du XIXe siècle, et depuis 2024 elle bénéficie d'une Indication Géographique Protégée.",
      stats: [
        { value: "2024", label: "inscrite comme IGP au registre européen" },
        { value: "17–25 mm", label: "de diamètre" },
        { value: "4", label: "ingrédients de base : porc, sel, paprika et ail" },
        { value: "2 jours", label: "de séchage minimum" },
      ],
      sections: [
        { title: "Ce qu'elle contient", paragraphs: ["De la viande et du gras de porc hachés et assaisonnés de **sel, paprika et ail**, embossés dans un boyau naturel d'agneau ou de collagène. À la coupe, on distingue bien la viande et le gras, et sa couleur rougeâtre vient du paprika."] },
        { title: "Comment la cuisiner", list: ["**À la plancha ou à la poêle, sans huile :** elle rend sa propre graisse.", "À feu moyen, en la retournant, jusqu'à ce qu'elle soit dorée et croustillante.", "Avec du pain, avec des œufs au plat ou enveloppée dans de la pâte feuilletée."], tip: "Le brunch de Sanfermines par excellence : txistorra tout juste cuite, du pain et un rosé bien frais. Essayez-la aussi avec un rouge jeune de grenache." },
      ],
      shopTitle: "De la txistorra dans notre boutique", cta: "Acheter des charcuteries",
    },
  ],
};

/** El boletín en el idioma pedido (en español, tal cual). Productos, foto y enlace del botón no cambian. */
export function localizeNewsletter(n: Newsletter, locale: Locale): Newsletter {
  if (locale === "es") return n;
  const t = NEWSLETTER_TEXTS[n.slug]?.[locale === "en" ? 0 : 1];
  if (!t) return n;
  return {
    ...n,
    theme: t.theme,
    title: t.title,
    subtitle: t.subtitle,
    excerpt: t.excerpt,
    image: { ...n.image, alt: t.alt },
    lead: t.lead,
    stats: t.stats,
    sections: t.sections,
    shop: { ...n.shop, title: t.shopTitle, cta: { ...n.shop.cta, label: t.cta } },
  };
}
