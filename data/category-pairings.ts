/**
 * Maridajes generales por tipo de producto. Se usan para completar la ficha de
 * cada producto hasta tener al menos 3 ideas de con qué tomarlo (además de los
 * maridajes de la página /maridajes, que van primero).
 *
 * Cada idea lleva su texto en los tres idiomas. Para añadir una: copia un
 * bloque { es, en, fr } dentro de la lista del tipo que toque.
 */
import type { PairingRule } from "@/data/pairing-products";
import type { Locale } from "@/lib/i18n/config";

export type TextPairing = { kicker: string; title: string; with: string; text: string };
type Trio = Record<Locale, TextPairing>;

const t = (es: TextPairing, en: TextPairing, fr: TextPairing): Trio => ({ es, en, fr });
const P = (kicker: string, title: string, w: string, text: string): TextPairing => ({ kicker, title, with: w, text });

export const CATEGORY_PAIRINGS: Record<string, Trio[]> = {
  aceites: [
    t(P("Aceite · Pan", "Pan de hogaza con aceite", "unas escamas de sal", "La forma más sencilla de apreciar un buen aceite: pan crujiente, un chorro generoso y sal en escamas."),
      P("Oil · Bread", "Rustic bread with olive oil", "a few flakes of salt", "The simplest way to appreciate a good oil: crusty bread, a generous drizzle and flaked salt."),
      P("Huile · Pain", "Pain de campagne à l'huile d'olive", "quelques flocons de sel", "La façon la plus simple d'apprécier une bonne huile : pain croustillant, un généreux filet et du sel en flocons.")),
    t(P("Aceite · Verduras", "Verduras a la plancha", "un chorrito en crudo al final", "Un aceite de calidad al final del plato realza el sabor de las verduras asadas sin taparlo."),
      P("Oil · Vegetables", "Griddled vegetables", "a drizzle of raw oil at the end", "A quality oil at the end of the dish lifts the flavour of roasted vegetables without covering it."),
      P("Huile · Légumes", "Légumes à la plancha", "un filet d'huile crue à la fin", "Une huile de qualité en fin de plat relève le goût des légumes grillés sans le couvrir.")),
    t(P("Aceite · Queso", "Queso curado con aceite", "una copa de blanco fresco", "Unas lascas de queso curado con un hilo de aceite virgen extra, y un vino blanco fresco para limpiar el paladar."),
      P("Oil · Cheese", "Mature cheese with olive oil", "a glass of fresh white wine", "A few shavings of mature cheese with a thread of extra virgin oil, and a fresh white wine to cleanse the palate."),
      P("Huile · Fromage", "Fromage affiné à l'huile d'olive", "un verre de blanc frais", "Quelques copeaux de fromage affiné avec un filet d'huile vierge extra, et un vin blanc frais pour nettoyer le palais.")),
    t(P("Aceite · Pescado", "Pescado a la plancha o al horno", "un chorrito de aceite en el plato", "Un aceite afrutado respeta la delicadeza del pescado blanco y aporta aroma al servirlo."),
      P("Oil · Fish", "Grilled or baked fish", "a drizzle of oil on the plate", "A fruity oil respects the delicacy of white fish and adds aroma when served."),
      P("Huile · Poisson", "Poisson grillé ou au four", "un filet d'huile dans l'assiette", "Une huile fruitée respecte la délicatesse du poisson blanc et apporte du parfum au service.")),
  ],
  condimentos: [
    t(P("Condimento · Carne", "Carnes a la parrilla", "un tinto con cuerpo", "Un toque de condimento al final del asado intensifica el sabor y sube el aroma de la brasa."),
      P("Seasoning · Meat", "Grilled meats", "a full-bodied red", "A touch of seasoning at the end of the roast intensifies flavour and lifts the aroma of the grill."),
      P("Condiment · Viande", "Viandes grillées", "un rouge charpenté", "Une touche de condiment en fin de cuisson intensifie le goût et relève l'arôme du gril.")),
    t(P("Condimento · Ensalada", "Ensaladas y verduras frescas", "un blanco joven", "Unas gotas o una pizca bastan para dar carácter a una ensalada sencilla."),
      P("Seasoning · Salad", "Salads and fresh vegetables", "a young white", "A few drops or a pinch is enough to give a simple salad character."),
      P("Condiment · Salade", "Salades et légumes frais", "un blanc jeune", "Quelques gouttes ou une pincée suffisent pour donner du caractère à une salade simple.")),
    t(P("Condimento · Huevos", "Huevos fritos o revueltos", "pan tostado", "Un toque de sal o especia sobre unos huevos de calidad convierte un plato diario en algo especial."),
      P("Seasoning · Eggs", "Fried or scrambled eggs", "toasted bread", "A touch of salt or spice on quality eggs turns an everyday dish into something special."),
      P("Condiment · Œufs", "Œufs au plat ou brouillés", "du pain grillé", "Une touche de sel ou d'épice sur des œufs de qualité transforme un plat du quotidien en quelque chose de spécial.")),
    t(P("Condimento · Aperitivo", "Tabla de aperitivo", "una caña bien fría", "Sobre queso fresco, aceitunas o tostas, un buen condimento marca la diferencia."),
      P("Seasoning · Aperitif", "Aperitif board", "an ice-cold beer", "On fresh cheese, olives or toasts, a good seasoning makes all the difference."),
      P("Condiment · Apéritif", "Planche d'apéritif", "une bière bien fraîche", "Sur du fromage frais, des olives ou des tartines, un bon condiment fait toute la différence.")),
  ],
  conservas: [
    t(P("Conserva · Pan", "Tosta con la conserva", "un blanco fresco o un vermut", "Sobre pan crujiente, con un hilo de aceite, es un aperitivo de barra que no falla."),
      P("Tinned · Bread", "Toast with the tinned fish", "a fresh white or a vermouth", "On crusty bread with a thread of oil, it's an aperitif that never fails."),
      P("Conserve · Pain", "Tartine à la conserve", "un blanc frais ou un vermouth", "Sur du pain croustillant avec un filet d'huile, c'est un apéritif qui ne déçoit jamais.")),
    t(P("Conserva · Piparras", "Con piparras y aceitunas", "un txakoli o un espumoso", "El picor suave y la acidez de las piparras equilibran el punto graso del pescado."),
      P("Tinned · Piparras", "With piparras and olives", "a txakoli or a sparkling wine", "The mild heat and acidity of the piparras balance the richness of the fish."),
      P("Conserve · Piparras", "Avec des piparras et des olives", "un txakoli ou un mousseux", "Le piquant doux et l'acidité des piparras équilibrent le côté gras du poisson.")),
    t(P("Conserva · Ensalada", "Ensalada de tomate y cebolla", "un rosado de garnacha", "Tomate maduro, cebolla tierna y la conserva por encima: un plato de verano en un minuto."),
      P("Tinned · Salad", "Tomato and onion salad", "a garnacha rosé", "Ripe tomato, sweet onion and the tinned fish on top: a summer dish in a minute."),
      P("Conserve · Salade", "Salade de tomate et oignon", "un rosé de grenache", "Tomate mûre, oignon tendre et la conserve par-dessus : un plat d'été en une minute.")),
    t(P("Conserva · Patatas", "Patatas cocidas o huevo duro", "una cerveza o un blanco ligero", "Un acompañamiento sencillo que deja que la conserva sea la protagonista."),
      P("Tinned · Potatoes", "Boiled potatoes or hard-boiled egg", "a beer or a light white", "A simple side that lets the tinned fish take centre stage."),
      P("Conserve · Pommes de terre", "Pommes de terre ou œuf dur", "une bière ou un blanc léger", "Un accompagnement simple qui laisse la vedette à la conserve.")),
  ],
  dulces: [
    t(P("Dulce · Café", "Con un buen café", "un espresso o un cortado", "Para la sobremesa: el amargor del café hace destacar el dulzor y el aroma."),
      P("Sweet · Coffee", "With a good coffee", "an espresso or a cortado", "For after the meal: the bitterness of coffee brings out the sweetness and aroma."),
      P("Sucré · Café", "Avec un bon café", "un expresso ou un noisette", "Pour la fin du repas : l'amertume du café fait ressortir la douceur et l'arôme.")),
    t(P("Dulce · Queso", "Con queso curado", "un tinto joven de garnacha", "Dulce y salado en el mismo bocado: unas lascas de queso curado con un poco de este dulce."),
      P("Sweet · Cheese", "With mature cheese", "a young garnacha red", "Sweet and savoury in the same bite: a few shavings of mature cheese with a little of this."),
      P("Sucré · Fromage", "Avec un fromage affiné", "un rouge jeune de grenache", "Sucré et salé dans la même bouchée : quelques copeaux de fromage affiné avec un peu de ce produit.")),
    t(P("Dulce · Licor", "Para terminar con un licor", "un pacharán navarro", "El final clásico de Navarra: un dulce y un chupito de pacharán bien frío."),
      P("Sweet · Liqueur", "To finish with a liqueur", "a Navarrese patxaran", "The classic Navarrese ending: something sweet and a well-chilled shot of patxaran."),
      P("Sucré · Liqueur", "Pour finir avec une liqueur", "un pacharan navarrais", "La fin classique de Navarre : une douceur et un petit verre de pacharan bien frais.")),
    t(P("Dulce · Yogur", "Con yogur, cuajada o helado", "unas nueces o almendras", "Como topping sobre un postre lácteo sencillo, aporta sabor y un toque de elegancia."),
      P("Sweet · Yoghurt", "With yoghurt, curd or ice cream", "a few walnuts or almonds", "As a topping on a simple dairy dessert, it adds flavour and a touch of elegance."),
      P("Sucré · Yaourt", "Avec du yaourt, du caillé ou une glace", "quelques noix ou amandes", "En topping sur un dessert lacté simple, il apporte du goût et une touche d'élégance.")),
  ],
  embutidos: [
    t(P("Embutido · Tinto", "Tabla de embutidos", "un tinto joven de garnacha", "La fruta y la frescura de una garnacha joven limpian la grasa y el pimentón del embutido."),
      P("Cured meat · Red", "Charcuterie board", "a young garnacha red", "The fruit and freshness of a young garnacha cut through the fat and paprika of the cured meat."),
      P("Charcuterie · Rouge", "Planche de charcuterie", "un rouge jeune de grenache", "Le fruit et la fraîcheur d'une jeune grenache nettoient le gras et le paprika de la charcuterie.")),
    t(P("Embutido · Pan", "Bocadillo o pincho con pan", "una caña o una sidra", "Con pan de hogaza y, si te gusta, unas piparras: el almuerzo navarro de toda la vida."),
      P("Cured meat · Bread", "Sandwich or pintxo on bread", "a beer or a cider", "With rustic bread and, if you like, a few piparras: the Navarrese lunch of always."),
      P("Charcuterie · Pain", "Sandwich ou pintxo sur pain", "une bière ou un cidre", "Avec du pain de campagne et, si vous aimez, quelques piparras : le casse-croûte navarrais de toujours.")),
    t(P("Embutido · Queso", "Con queso de oveja", "un crianza de Navarra", "Queso curado y embutido, juntos: la tabla clásica para compartir."),
      P("Cured meat · Cheese", "With sheep's cheese", "a Navarre crianza", "Mature cheese and cured meat together: the classic board to share."),
      P("Charcuterie · Fromage", "Avec du fromage de brebis", "un crianza de Navarre", "Fromage affiné et charcuterie ensemble : la planche classique à partager.")),
    t(P("Embutido · Huevos", "Con huevos fritos y patatas", "un rosado frío", "Un plato sencillo y contundente donde el embutido da todo su sabor."),
      P("Cured meat · Eggs", "With fried eggs and potatoes", "a chilled rosé", "A simple, hearty dish where the cured meat gives all its flavour."),
      P("Charcuterie · Œufs", "Avec des œufs au plat et des pommes de terre", "un rosé frais", "Un plat simple et copieux où la charcuterie donne tout son goût.")),
  ],
  legumbres: [
    t(P("Legumbre · Tinto", "Plato de cuchara", "un tinto joven de Navarra", "Un vino con fruta y poca madera acompaña el plato sin cansar."),
      P("Pulses · Red", "A hearty spoon dish", "a young Navarre red", "A wine with fruit and little oak accompanies the dish without tiring the palate."),
      P("Légumineuses · Rouge", "Un plat mijoté", "un rouge jeune de Navarre", "Un vin avec du fruit et peu de bois accompagne le plat sans fatiguer le palais.")),
    t(P("Legumbre · Verduras", "Salteadas con jamón o chorizo", "un rosado de garnacha", "Rehogadas con ajo y un poco de embutido, quedan listas en diez minutos."),
      P("Pulses · Vegetables", "Sautéed with ham or chorizo", "a garnacha rosé", "Sautéed with garlic and a little cured meat, they're ready in ten minutes."),
      P("Légumineuses · Légumes", "Sautées au jambon ou au chorizo", "un rosé de grenache", "Revenues à l'ail avec un peu de charcuterie, elles sont prêtes en dix minutes.")),
    t(P("Legumbre · Ensalada", "En ensalada templada", "un blanco joven", "Con tomate, cebolla y un buen aceite: un plato fresco y sencillo."),
      P("Pulses · Salad", "In a warm salad", "a young white", "With tomato, onion and a good olive oil: a fresh, simple dish."),
      P("Légumineuses · Salade", "En salade tiède", "un blanc jeune", "Avec tomate, oignon et une bonne huile d'olive : un plat frais et simple.")),
  ],
  lotes: [
    t(P("Lote · Mesa", "Para compartir en la mesa", "un buen vino de Navarra", "Abre el lote, pon los productos en tablas y deja que cada uno se sirva: una comida sin esfuerzo."),
      P("Gift set · Table", "To share at the table", "a good Navarre wine", "Open the set, put the products on boards and let everyone help themselves: an effortless meal."),
      P("Coffret · Table", "À partager à table", "un bon vin de Navarre", "Ouvrez le coffret, mettez les produits sur des planches et laissez chacun se servir : un repas sans effort.")),
    t(P("Lote · Aperitivo", "Aperitivo con amigos", "un espumoso o un vermut", "Perfecto para recibir sin cocinar: sacar, abrir y servir."),
      P("Gift set · Aperitif", "Aperitif with friends", "a sparkling wine or a vermouth", "Perfect for welcoming guests without cooking: take out, open and serve."),
      P("Coffret · Apéritif", "Apéritif entre amis", "un mousseux ou un vermouth", "Parfait pour recevoir sans cuisiner : sortir, ouvrir et servir.")),
    t(P("Lote · Regalo", "Para regalar", "una nota escrita a mano", "Un regalo que se disfruta, con productos de pequeños productores de Navarra."),
      P("Gift set · Present", "To give as a gift", "a handwritten note", "A gift that is enjoyed, with products from small Navarrese producers."),
      P("Coffret · Cadeau", "À offrir", "un mot écrit à la main", "Un cadeau qui se déguste, avec des produits de petits producteurs navarrais.")),
  ],
  pates: [
    t(P("Paté · Pan", "Tostas de paté", "un tinto joven o una copa de blanco", "Sobre pan tostado y con un toque de mermelada, es un aperitivo sencillo y elegante."),
      P("Pâté · Bread", "Pâté on toast", "a young red or a glass of white", "On toasted bread with a touch of jam, it's a simple and elegant aperitif."),
      P("Pâté · Pain", "Tartines de pâté", "un rouge jeune ou un verre de blanc", "Sur du pain grillé avec une touche de confiture, c'est un apéritif simple et élégant.")),
    t(P("Paté · Mermelada", "Con mermelada de tomate o de higo", "un vino dulce", "El dulce de la mermelada contrasta con la untuosidad del paté."),
      P("Pâté · Jam", "With tomato or fig jam", "a sweet wine", "The sweetness of the jam contrasts with the smoothness of the pâté."),
      P("Pâté · Confiture", "Avec de la confiture de tomate ou de figue", "un vin doux", "La douceur de la confiture contraste avec l'onctuosité du pâté.")),
    t(P("Paté · Encurtidos", "Con pepinillos y cebolletas", "un espumoso brut", "La acidez de los encurtidos y las burbujas del espumoso aligeran la grasa del paté."),
      P("Pâté · Pickles", "With gherkins and pickled onions", "a brut sparkling wine", "The acidity of the pickles and the bubbles of the sparkling wine lighten the richness of the pâté."),
      P("Pâté · Cornichons", "Avec des cornichons et des oignons grelots", "un mousseux brut", "L'acidité des cornichons et les bulles du mousseux allègent le gras du pâté.")),
  ],
  preparados: [
    t(P("Plato listo · Pan", "Calentar y servir con pan", "un tinto joven", "Calienta a fuego suave, sirve con pan crujiente y ya tienes la comida lista."),
      P("Ready meal · Bread", "Heat and serve with bread", "a young red", "Warm it gently, serve with crusty bread and your meal is ready."),
      P("Plat cuisiné · Pain", "À réchauffer et servir avec du pain", "un rouge jeune", "Faites chauffer doucement, servez avec du pain croustillant et le repas est prêt.")),
    t(P("Plato listo · Ensalada", "Con una ensalada verde", "un blanco fresco", "Una ensalada sencilla refresca y equilibra un plato contundente."),
      P("Ready meal · Salad", "With a green salad", "a fresh white", "A simple salad refreshes and balances a hearty dish."),
      P("Plat cuisiné · Salade", "Avec une salade verte", "un blanc frais", "Une salade simple rafraîchit et équilibre un plat copieux.")),
    t(P("Plato listo · Huevo", "Con un huevo frito encima", "una cerveza o un rosado", "Un toque casero que lo convierte en un plato completo."),
      P("Ready meal · Egg", "With a fried egg on top", "a beer or a rosé", "A homely touch that turns it into a complete dish."),
      P("Plat cuisiné · Œuf", "Avec un œuf au plat dessus", "une bière ou un rosé", "Une touche maison qui en fait un plat complet.")),
  ],
  quesos: [
    t(P("Queso · Mermelada", "Con mermelada de higo o membrillo", "un tinto crianza", "El dulce equilibra la sal y la intensidad del queso, y el vino con crianza aporta estructura."),
      P("Cheese · Jam", "With fig jam or quince paste", "a crianza red", "The sweetness balances the saltiness and intensity of the cheese, and the aged red adds structure."),
      P("Fromage · Confiture", "Avec de la confiture de figue ou de la pâte de coing", "un rouge crianza", "La douceur équilibre le sel et l'intensité du fromage, et le vin élevé apporte de la structure.")),
    t(P("Queso · Frutos secos", "Con nueces y miel", "un vino dulce o un moscatel", "Una combinación clásica de final de comida: crujiente, dulce y cremoso a la vez."),
      P("Cheese · Nuts", "With walnuts and honey", "a sweet wine or a muscat", "A classic way to finish a meal: crunchy, sweet and creamy all at once."),
      P("Fromage · Fruits secs", "Avec des noix et du miel", "un vin doux ou un muscat", "Une combinaison classique de fin de repas : croquant, sucré et crémeux à la fois.")),
    t(P("Queso · Embutido", "Con jamón o chorizo", "una garnacha joven", "La tabla de siempre: queso, embutido y pan, con un vino con fruta."),
      P("Cheese · Cured meat", "With ham or chorizo", "a young garnacha", "The board of always: cheese, cured meat and bread, with a fruity wine."),
      P("Fromage · Charcuterie", "Avec du jambon ou du chorizo", "une grenache jeune", "La planche de toujours : fromage, charcuterie et pain, avec un vin fruité.")),
    t(P("Queso · Ensalada", "Lascas sobre ensalada", "un blanco fresco o un rosado", "Unas lascas de queso curado sobre hojas verdes y un buen aceite elevan una ensalada."),
      P("Cheese · Salad", "Shavings over a salad", "a fresh white or a rosé", "A few shavings of mature cheese over green leaves and good oil elevate a salad."),
      P("Fromage · Salade", "Copeaux sur une salade", "un blanc frais ou un rosé", "Quelques copeaux de fromage affiné sur des feuilles vertes et une bonne huile subliment une salade.")),
  ],
  verduras: [
    t(P("Verdura · Aceite", "Con un buen aceite de oliva", "un blanco joven", "Sencillo: la verdura, un hilo de aceite virgen extra y poco más."),
      P("Vegetable · Oil", "With a good olive oil", "a young white", "Simple: the vegetable, a thread of extra virgin oil and little else."),
      P("Légume · Huile", "Avec une bonne huile d'olive", "un blanc jeune", "Simple : le légume, un filet d'huile vierge extra et peu de choses de plus.")),
    t(P("Verdura · Huevo", "Con huevo cocido o mayonesa", "un rosado de garnacha", "Un clásico de aperitivo o de entrante frío."),
      P("Vegetable · Egg", "With boiled egg or mayonnaise", "a garnacha rosé", "A classic aperitif or cold starter."),
      P("Légume · Œuf", "Avec un œuf dur ou de la mayonnaise", "un rosé de grenache", "Un classique d'apéritif ou d'entrée froide.")),
    t(P("Verdura · Pescado", "Con pescado o marisco", "un chardonnay o un espumoso", "La verdura acompaña pescados a la plancha, bonito o bacalao."),
      P("Vegetable · Fish", "With fish or shellfish", "a chardonnay or a sparkling wine", "The vegetable goes with grilled fish, bonito or cod."),
      P("Légume · Poisson", "Avec du poisson ou des fruits de mer", "un chardonnay ou un mousseux", "Le légume accompagne le poisson grillé, le thon blanc ou la morue.")),
    t(P("Verdura · Jamón", "Salteada con jamón", "un tinto joven", "Rehogada con ajo y taquitos de jamón, se convierte en un plato completo."),
      P("Vegetable · Ham", "Sautéed with ham", "a young red", "Sautéed with garlic and diced ham, it becomes a complete dish."),
      P("Légume · Jambon", "Sautés au jambon", "un rouge jeune", "Revenus à l'ail avec des dés de jambon, ils deviennent un plat complet.")),
  ],
  "vino-tinto": [
    t(P("Tinto · Embutidos", "Tabla de embutidos ibéricos", "chorizo, lomo y salchichón", "Un tinto con fruta y taninos suaves acompaña la grasa y el pimentón de los embutidos."),
      P("Red · Cured meats", "Iberian charcuterie board", "chorizo, loin and salchichón", "A red with fruit and soft tannins goes well with the fat and paprika of cured meats."),
      P("Rouge · Charcuterie", "Planche de charcuterie ibérique", "chorizo, lomo et saucisson", "Un rouge avec du fruit et des tanins souples accompagne le gras et le paprika de la charcuterie.")),
    t(P("Tinto · Queso", "Queso de oveja curado", "con mermelada de higo", "El queso curado de oveja pide un vino con estructura; la mermelada redondea el conjunto."),
      P("Red · Cheese", "Mature sheep's cheese", "with fig jam", "Mature sheep's cheese calls for a wine with structure; the jam rounds everything off."),
      P("Rouge · Fromage", "Fromage de brebis affiné", "avec de la confiture de figue", "Le fromage de brebis affiné demande un vin structuré ; la confiture arrondit l'ensemble.")),
    t(P("Tinto · Carne", "Carnes a la brasa o guisadas", "cordero, ternera o cerdo", "Servir a 16–18 ºC. Con carnes de sabor intenso, un tinto con cuerpo se luce."),
      P("Red · Meat", "Grilled or stewed meats", "lamb, beef or pork", "Serve at 16–18 ºC. With intensely flavoured meats, a full-bodied red shines."),
      P("Rouge · Viande", "Viandes grillées ou en sauce", "agneau, bœuf ou porc", "À servir à 16–18 ºC. Avec des viandes au goût intense, un rouge charpenté se révèle.")),
    t(P("Tinto · Legumbres", "Pochas, alubias y platos de cuchara", "un guiso de invierno", "Un tinto joven de Navarra acompaña bien los platos tradicionales de legumbre."),
      P("Red · Pulses", "Pochas, beans and spoon dishes", "a winter stew", "A young Navarre red goes well with traditional pulse dishes."),
      P("Rouge · Légumineuses", "Pochas, haricots et plats mijotés", "un ragoût d'hiver", "Un rouge jeune de Navarre accompagne bien les plats traditionnels de légumineuses.")),
  ],
  "vino-blanco": [
    t(P("Blanco · Espárrago", "Espárragos de Navarra", "con un hilo de aceite", "Un blanco con paso por barrica tiene la untuosidad necesaria para acompañar al espárrago."),
      P("White · Asparagus", "Asparagus from Navarre", "with a thread of olive oil", "A barrel-aged white has the richness needed to go with asparagus."),
      P("Blanc · Asperge", "Asperges de Navarre", "avec un filet d'huile d'olive", "Un blanc élevé en fût a l'onctuosité nécessaire pour accompagner l'asperge.")),
    t(P("Blanco · Pescado", "Pescado blanco y marisco", "merluza, bacalao o gambas", "Servir bien frío, a 8–10 ºC. Su frescura y acidez realzan los sabores del mar."),
      P("White · Fish", "White fish and shellfish", "hake, cod or prawns", "Serve well chilled, at 8–10 ºC. Its freshness and acidity bring out the flavours of the sea."),
      P("Blanc · Poisson", "Poisson blanc et fruits de mer", "merlu, morue ou crevettes", "À servir bien frais, à 8–10 ºC. Sa fraîcheur et son acidité relèvent les saveurs de la mer.")),
    t(P("Blanco · Queso", "Quesos suaves y cremosos", "queso fresco o semicurado", "Un blanco afrutado combina con quesos suaves sin taparlos."),
      P("White · Cheese", "Mild, creamy cheeses", "fresh or semi-mature cheese", "A fruity white goes with mild cheeses without overpowering them."),
      P("Blanc · Fromage", "Fromages doux et crémeux", "fromage frais ou demi-affiné", "Un blanc fruité s'accorde avec les fromages doux sans les couvrir.")),
    t(P("Blanco · Conservas", "Conservas y encurtidos", "bonito, anchoas y piparras", "La acidez del vino limpia el paladar entre bocado y bocado."),
      P("White · Tinned fish", "Tinned fish and pickles", "bonito, anchovies and piparras", "The acidity of the wine cleanses the palate between bites."),
      P("Blanc · Conserves", "Conserves et cornichons", "thon blanc, anchois et piparras", "L'acidité du vin nettoie le palais entre deux bouchées.")),
  ],
  "vino-rosado": [
    t(P("Rosado · Piquillo", "Pimientos del piquillo", "asados y con ajo", "Garnacha rosada y piquillo: dos clásicos de Navarra. Servir a 8–10 ºC."),
      P("Rosé · Piquillo", "Piquillo peppers", "roasted with garlic", "Garnacha rosé and piquillo: two Navarrese classics. Serve at 8–10 ºC."),
      P("Rosé · Piquillo", "Poivrons del piquillo", "grillés à l'ail", "Grenache rosé et piquillo : deux classiques de Navarre. À servir à 8–10 ºC.")),
    t(P("Rosado · Verduras", "Menestra y verduras de la huerta", "alcachofa, espárrago o borraja", "Un rosado con fruta y frescura acompaña las verduras sin amargar."),
      P("Rosé · Vegetables", "Menestra and garden vegetables", "artichoke, asparagus or borage", "A rosé with fruit and freshness goes with vegetables without turning bitter."),
      P("Rosé · Légumes", "Menestra et légumes du potager", "artichaut, asperge ou bourrache", "Un rosé avec du fruit et de la fraîcheur accompagne les légumes sans amertume.")),
    t(P("Rosado · Embutido", "Txistorra y chorizo", "a la plancha, en bocadillo", "El rosado fresco contrasta con el pimentón y la grasa del embutido."),
      P("Rosé · Cured meat", "Txistorra and chorizo", "griddled, in a sandwich", "A fresh rosé contrasts with the paprika and fat of the sausage."),
      P("Rosé · Charcuterie", "Txistorra et chorizo", "à la plancha, en sandwich", "Un rosé frais contraste avec le paprika et le gras de la saucisse.")),
    t(P("Rosado · Arroz", "Arroces y pasta", "con tomate o con verduras", "Un vino versátil para comidas de verano, ligeras y con sabor."),
      P("Rosé · Rice", "Rice dishes and pasta", "with tomato or vegetables", "A versatile wine for light, flavourful summer meals."),
      P("Rosé · Riz", "Riz et pâtes", "à la tomate ou aux légumes", "Un vin polyvalent pour des repas d'été légers et savoureux.")),
  ],
  "vino-espumoso": [
    t(P("Espumoso · Conservas", "Aperitivo de conservas", "bonito, anchoas y piparras", "La burbuja fina limpia la grasa y refresca el paladar. Servir muy frío."),
      P("Sparkling · Tinned fish", "Tinned-fish aperitif", "bonito, anchovies and piparras", "The fine bubbles cut through fat and refresh the palate. Serve very cold."),
      P("Mousseux · Conserves", "Apéritif de conserves", "thon blanc, anchois et piparras", "La bulle fine nettoie le gras et rafraîchit le palais. À servir très frais.")),
    t(P("Espumoso · Embutido", "Jamón ibérico", "cortado fino", "La acidez y las burbujas equilibran la untuosidad del ibérico."),
      P("Sparkling · Cured ham", "Iberian ham", "thinly sliced", "The acidity and bubbles balance the richness of Iberian ham."),
      P("Mousseux · Charcuterie", "Jambon ibérique", "tranché finement", "L'acidité et les bulles équilibrent l'onctuosité du jambon ibérique.")),
    t(P("Espumoso · Queso", "Quesos cremosos y frescos", "con un toque de miel", "El contraste entre lo cremoso y lo burbujeante es de lo más agradable."),
      P("Sparkling · Cheese", "Creamy, fresh cheeses", "with a touch of honey", "The contrast between creamy and bubbly is most pleasing."),
      P("Mousseux · Fromage", "Fromages crémeux et frais", "avec une touche de miel", "Le contraste entre le crémeux et le pétillant est des plus agréables.")),
    t(P("Espumoso · Celebración", "Brindis y celebraciones", "con unas almendras", "Un espumoso es siempre buena idea para empezar: sirve en copa estrecha y bien frío."),
      P("Sparkling · Celebration", "Toasts and celebrations", "with a few almonds", "A sparkling wine is always a good way to start: serve in a narrow glass and well chilled."),
      P("Mousseux · Célébration", "Toasts et célébrations", "avec quelques amandes", "Un mousseux est toujours une bonne façon de commencer : à servir dans une flûte et bien frais.")),
  ],
  "vino-dulce": [
    t(P("Dulce · Foie", "Foie gras y paté", "sobre pan tostado", "La dulzura y acidez del vino contrastan con la untuosidad del foie."),
      P("Sweet wine · Foie gras", "Foie gras and pâté", "on toasted bread", "The sweetness and acidity of the wine contrast with the richness of foie gras."),
      P("Vin doux · Foie gras", "Foie gras et pâté", "sur pain grillé", "La douceur et l'acidité du vin contrastent avec l'onctuosité du foie gras.")),
    t(P("Dulce · Queso azul", "Quesos curados o azules", "con nueces", "El dulce del vino hace de contrapunto al queso intenso."),
      P("Sweet wine · Blue cheese", "Mature or blue cheeses", "with walnuts", "The sweetness of the wine counterbalances intense cheese."),
      P("Vin doux · Fromage bleu", "Fromages affinés ou bleus", "avec des noix", "La douceur du vin fait contrepoint au fromage intense.")),
    t(P("Dulce · Chocolate", "Chocolate negro", "70 % o más", "Un vino dulce con fruta y estructura aguanta el cacao intenso."),
      P("Sweet wine · Chocolate", "Dark chocolate", "70 % or more", "A sweet wine with fruit and structure stands up to intense cocoa."),
      P("Vin doux · Chocolat", "Chocolat noir", "70 % ou plus", "Un vin doux avec du fruit et de la structure résiste au cacao intense.")),
    t(P("Dulce · Postre", "Postres de fruta o de almendra", "tarta, helado o fruta", "Sirve frío, en copa pequeña, para cerrar la comida."),
      P("Sweet wine · Dessert", "Fruit or almond desserts", "tart, ice cream or fruit", "Serve chilled, in a small glass, to end the meal."),
      P("Vin doux · Dessert", "Desserts aux fruits ou aux amandes", "tarte, glace ou fruits", "À servir frais, dans un petit verre, pour conclure le repas.")),
  ],
  licor: [
    t(P("Licor · Sobremesa", "Chupito después de comer", "bien frío, con hielo", "El final clásico de una comida navarra: sirve frío en vaso pequeño."),
      P("Liqueur · After dinner", "A shot after the meal", "well chilled, over ice", "The classic end to a Navarrese meal: serve cold in a small glass."),
      P("Liqueur · Digestif", "Un petit verre après le repas", "bien frais, avec des glaçons", "La fin classique d'un repas navarrais : à servir frais dans un petit verre.")),
    t(P("Licor · Chocolate", "Chocolate negro", "con 70 % de cacao o más", "El dulzor del licor suaviza el amargor del chocolate."),
      P("Liqueur · Chocolate", "Dark chocolate", "with 70 % cocoa or more", "The sweetness of the liqueur softens the bitterness of the chocolate."),
      P("Liqueur · Chocolat", "Chocolat noir", "à 70 % de cacao ou plus", "La douceur de la liqueur adoucit l'amertume du chocolat.")),
    t(P("Licor · Queso", "Queso curado y membrillo", "unas nueces", "Un final salado y dulce con aire de sobremesa."),
      P("Liqueur · Cheese", "Mature cheese and quince paste", "a few walnuts", "A savoury-sweet ending with an after-dinner feel."),
      P("Liqueur · Fromage", "Fromage affiné et pâte de coing", "quelques noix", "Une fin salée-sucrée à l'esprit de fin de repas.")),
    t(P("Licor · Postre", "Helado de vainilla", "un chorrito por encima", "Un truco muy fácil: unas gotas sobre helado de vainilla, y listo."),
      P("Liqueur · Dessert", "Vanilla ice cream", "a splash on top", "A very easy trick: a few drops over vanilla ice cream, and done."),
      P("Liqueur · Dessert", "Glace à la vanille", "un trait par-dessus", "Une astuce très facile : quelques gouttes sur une glace à la vanille, et c'est prêt.")),
  ],
  generic: [
    t(P("Navarra · Pan", "Con pan y aceite", "un blanco o un tinto joven", "Una forma sencilla de disfrutarlo: pan crujiente, buen aceite y vino de Navarra."),
      P("Navarre · Bread", "With bread and olive oil", "a white or a young red", "A simple way to enjoy it: crusty bread, good oil and wine from Navarre."),
      P("Navarre · Pain", "Avec du pain et de l'huile d'olive", "un blanc ou un rouge jeune", "Une façon simple de le savourer : pain croustillant, bonne huile et vin de Navarre.")),
    t(P("Navarra · Tabla", "En una tabla para compartir", "queso, embutido y encurtidos", "Para una comida entre amigos: varios productos, cada uno a su gusto."),
      P("Navarre · Board", "On a board to share", "cheese, cured meat and pickles", "For a meal among friends: several products, each to taste."),
      P("Navarre · Planche", "Sur une planche à partager", "fromage, charcuterie et cornichons", "Pour un repas entre amis : plusieurs produits, chacun à son goût.")),
    t(P("Navarra · Vino", "Con un vino de Navarra", "garnacha joven o rosado", "Los vinos de Navarra, frescos y con fruta, acompañan casi cualquier cosa."),
      P("Navarre · Wine", "With a Navarre wine", "young garnacha or rosé", "Navarre's wines, fresh and fruity, go with almost anything."),
      P("Navarre · Vin", "Avec un vin de Navarre", "grenache jeune ou rosé", "Les vins de Navarre, frais et fruités, s'accordent avec presque tout.")),
  ],
};

/**
 * Producto de la tienda al que lleva cada maridaje general (mismo orden que la
 * lista de arriba): categoría y, si se quiere, palabras del nombre. Entre los
 * que encajan se elige uno distinto según la ficha, para que no enlace siempre al mismo.
 */
export const CATEGORY_PAIRING_LINKS: Record<string, PairingRule[]> = {
  aceites: [{ cat: "condimentos" }, { cat: "verduras" }, { cat: "quesos" }, { cat: "conservas" }],
  condimentos: [{ cat: "embutidos" }, { cat: "verduras" }, { cat: "aceites" }, { cat: "conservas" }],
  conservas: [{ cat: "vinos", name: /blanco|chardonnay|brut/i }, { cat: "verduras", name: /piparra/i }, { cat: "vinos", name: /rosado/i }, { cat: "legumbres" }],
  dulces: [{ cat: "dulces" }, { cat: "quesos" }, { cat: "vinos", name: /pacharan|patxaran/i }, { cat: "dulces" }],
  embutidos: [{ cat: "vinos", name: /garnacha|tinto/i }, { cat: "verduras", name: /piparra/i }, { cat: "quesos" }, { cat: "vinos", name: /rosado/i }],
  legumbres: [{ cat: "vinos", name: /tinto/i }, { cat: "vinos", name: /rosado/i }, { cat: "vinos", name: /blanco|chardonnay/i }],
  lotes: [{ cat: "vinos" }, { cat: "vinos", name: /brut|millesime/i }, { cat: "lotes" }],
  pates: [{ cat: "vinos", name: /tinto/i }, { cat: "dulces", name: /mermelada|tomate|higo/i }, { cat: "vinos", name: /brut|millesime/i }],
  preparados: [{ cat: "vinos", name: /tinto/i }, { cat: "verduras" }, { cat: "vinos", name: /rosado/i }],
  quesos: [{ cat: "dulces", name: /mermelada|higo/i }, { cat: "dulces" }, { cat: "embutidos" }, { cat: "vinos", name: /blanco|rosado/i }],
  verduras: [{ cat: "aceites" }, { cat: "vinos", name: /rosado/i }, { cat: "vinos", name: /blanco|chardonnay/i }, { cat: "embutidos" }],
  "vino-tinto": [{ cat: "embutidos" }, { cat: "quesos" }, { cat: "embutidos" }, { cat: "legumbres" }],
  "vino-blanco": [{ cat: "verduras", name: /esparrag/i }, { cat: "conservas" }, { cat: "quesos" }, { cat: "conservas" }],
  "vino-rosado": [{ cat: "verduras", name: /piquillo|pimiento/i }, { cat: "verduras" }, { cat: "embutidos" }, { cat: "preparados" }],
  "vino-espumoso": [{ cat: "conservas" }, { cat: "embutidos" }, { cat: "quesos" }, { cat: "dulces" }],
  "vino-dulce": [{ cat: "pates" }, { cat: "quesos" }, { cat: "dulces", name: /chocolate/i }, { cat: "dulces" }],
  licor: [{ cat: "dulces" }, { cat: "dulces", name: /chocolate/i }, { cat: "quesos" }, { cat: "dulces" }],
  generic: [{ cat: "aceites" }, { cat: "quesos" }, { cat: "vinos" }],
};

/** Qué lista de maridajes generales le toca a un producto (según su categoría y, en bebidas, su tipo). */
export function categoryPairingKey(categorySlug: string, name: string): string {
  if (categorySlug === "vinos") {
    const n = name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    if (/pacharan|patxaran|licor|crema de|belasco|baines|bianca villa/.test(n)) return "licor";
    if (/brut|espumoso|cava|millesime/.test(n)) return "vino-espumoso";
    if (/dulce|moscatel|muscat|vendimia tardia|late harvest/.test(n)) return "vino-dulce";
    if (/rosado|rosat/.test(n)) return "vino-rosado";
    if (/blanco|chardonnay|sauvignon|verdejo|viura/.test(n)) return "vino-blanco";
    return "vino-tinto";
  }
  return CATEGORY_PAIRINGS[categorySlug] ? categorySlug : "generic";
}
