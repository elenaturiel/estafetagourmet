#!/usr/bin/env python3
"""Genera data/descriptions.ts: una descripción por producto, clave = slug.

Las descripciones se componen con frases redactadas a mano por tipo de producto
y datos públicos de cada productor. Son un BORRADOR: hay que revisarlas
(ingredientes, alérgenos, denominaciones) antes de darlas por buenas.
Uso: python3 scripts/generar-descripciones.py  (desde la raíz del proyecto)
Para retocar una descripción concreta, edita data/descriptions.ts a mano
(no vuelvas a ejecutar el script sin guardar antes tus cambios).
"""
import json, re, unicodedata

SRC = "data/products.generated.ts"
OUT = "data/descriptions.ts"


def slugify(s):
    s = unicodedata.normalize("NFD", s)
    s = re.sub(r"[̀-ͯ]", "", s).lower().replace("&", " y ")
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s[:80]


txt = open(SRC, encoding="utf-8").read()
m = re.search(r"productRows[^=]*=\s*(\[.*\])", txt, re.S)
rows = json.loads(re.sub(r",\s*\]", "]", m.group(1)))

IN = lambda p, n: re.search(p, n, re.I) is not None


def num(n):
    m = re.search(r"(\d+)\s*[-/]\s*(\d+)", n)
    return m.groups() if m else None


def esparrago(n, brand):
    c = num(n)
    cal = f" Calibre {c[0]}-{c[1]} piezas por envase." if c else ""
    if IN(r"yema", n):
        return ("Yemas de espárrago blanco: las puntas, la parte más tierna y delicada de la espiga. "
                "Perfectas para tostas, revueltos, ensaladas o simplemente con un hilo de aceite." + cal)
    if IN(r"brasa", n):
        return "Espárragos blancos asados a la brasa, con un punto ahumado que los distingue del clásico al natural. Listos para servir templados o en ensalada."
    if IN(r"aliñ", n):
        return "Espárragos blancos ya aliñados, listos para llevar a la mesa: abre, sirve y disfruta. Una entrada fácil y de lucimiento."
    if IN(r"puerro", n):
        return "Puerros cocidos y envasados al natural, tiernos y suaves. Buenos como entrante templado con vinagreta, en cremas o como guarnición."
    if IN(r"gal[oó]n|1 kg|bote", n):
        return "Formato grande de espárrago blanco de Navarra, pensado para quien los gasta en casa a menudo o para compartir en la mesa." + cal
    if IN(r"corto", n):
        return "Espárrago blanco troceado en formato corto, práctico para cocinar: salteados, revueltos, cremas o tortillas."
    return ("Espárrago blanco de la Ribera de Navarra, cultivado en la tierra y envasado al natural poco después de la recogida. "
            "Carne tierna, sabor suave y ligeramente dulce. Se come tal cual, con vinagreta o mayonesa, y es un clásico de la primavera navarra." + cal)


def d_catedral(n, cat):
    if cat == "esparragos": return esparrago(n, "LC")
    if cat == "pimientos":
        base = "Pimiento de la tierra, asado y pelado artesanalmente, envasado entero. Carne dulce y aroma a brasa: para rellenar, tostas, guisos o simplemente con aceite."
        if IN(r"confitado", n): return "Pimiento confitado lentamente en aceite: textura sedosa y sabor concentrado y dulce. Ideal sobre tostas, con queso o como acompañamiento de carnes."
        return base
    if cat == "alcachofas":
        if IN(r"mitad", n): return "Alcachofa al natural cortada por la mitad, tierna y de sabor limpio. Para freír, rebozar, gratinar o servir en ensalada."
        return "Corazones de alcachofa seleccionados, tiernos y de sabor delicado. A la plancha, en ensalada, con jamón o en cualquier guiso de verdura."
    if cat == "legumbres":
        if IN(r"habita|lágrimas", n): return "Habitas baby tiernas en aceite: pequeñas, verdes y de sabor fresco. Para saltear con jamón, acompañar huevos o servir como entrante."
        if IN(r"pochas con codorniz", n): return "Pochas de Navarra con codorniz: plato tradicional listo para calentar. Cuchara de otoño, reconfortante y con mucha tradición."
        if IN(r"pochas", n): return "Pochas con verduras, la legumbre fresca típica del otoño navarro cocinada con su sofrito. Solo hay que calentarlas."
        if IN(r"menestra", n): return "Menestra de verduras al natural, el plato más navarro de la primavera. Salteada con jamón o huevo duro queda completa."
        return "Verdura de huerta cocida y envasada al natural, lista para saltear, rehogar o gratinar. Una guarnición tradicional de la cocina navarra."
    if cat == "preparados":
        if IN(r"crema", n):
            v = re.sub(r".*CREMA DE ", "", n, flags=re.I).lower()
            return f"Crema de {v} elaborada con verdura, de textura fina y sabor casero. Se calienta en un minuto y se puede servir caliente o templada."
        if IN(r"piquillo", n): return "Salsa de pimiento del piquillo, de color vivo y sabor dulce y suave. Perfecta con pescados, carnes a la plancha o como base de guisos."
        if IN(r"vizca", n): return "Salsa vizcaína de la cocina vasco-navarra, con base de pimiento choricero y cebolla. Para bacalao, carnes y guisos."
        if IN(r"hongos", n): return "Salsa de hongos con aroma a bosque. Buena para acompañar carnes, pasta, arroz o patatas."
        if IN(r"picante", n): return "Salsa picante con carácter, elaborada con verduras de la huerta. Para dar un toque vivo a carnes, huevos o patatas."
        return "Fritada de verduras de huerta cocinadas despacio, al estilo de la cocina tradicional. Acompaña huevos, carnes, pescados o arroces."
    if cat == "encurtidos":
        return "Guindillas verdes de la tierra (piparras) en vinagre, crujientes y con un punto picante amable. El pincho clásico con anchoa, aceituna o queso, y buenas con cualquier plato frito."
    if cat == "setas-y-hongos":
        return "Hongos seleccionados cocinados y conservados en aceite. Se sirven en tostas, salteados con huevo, en revueltos, con carnes o como relleno."
    return None


def d_navarrico(n, cat):
    if cat == "esparragos":
        if IN(r"puerro", n): return "Puerros tiernos, cocidos y envasados. Muy buenos en vinagreta o como guarnición suave."
        return esparrago(n, "NAV")
    if cat == "pimientos":
        if IN(r"relleno", n):
            r = re.sub(r".*rellenos de ", "", n, flags=re.I)
            return f"Pimiento del piquillo relleno de {r}, listo para calentar. Un plato con tradición navarra que solo pide un par de minutos de horno o sartén con su salsa."
        if IN(r"etiqueta negra", n): return "Pimiento del piquillo de la gama Etiqueta Negra, producción limitada: selección de piezas especialmente cuidadas. Dulce, carnoso y con aroma a asado."
        if IN(r"tiras", n): return "Pimiento del piquillo cortado en tiras, práctico para tostas, ensaladas, revueltos y pizzas."
        return "Pimiento del piquillo de Lodosa, asado y pelado a mano, envasado entero. Dulce, suave y carnoso, para rellenar, guisar o comer con aceite de oliva."
    if cat == "alcachofas":
        if IN(r"rellena de jam", n): return "Alcachofa rellena de jamón, lista para calentar y servir. Un entrante sabroso con aire de plato casero."
        if IN(r"vieiras", n): return "Alcachofa rellena de vieiras y gambas: un bocado de mar y huerta, listo para calentar y servir."
        return "Alcachofa seleccionada de la gama Etiqueta Negra: tierna y de sabor delicado. Para plancha, gratinados o ensalada."
    if cat == "lotes":
        c = {
            "detalle": "Un lote para regalar sin complicarse: una pequeña selección de conservas navarras que gusta siempre.",
            "navarro": "Un lote con sabor a Navarra: conservas de la tierra reunidas para descubrir lo básico de la despensa navarra.",
            "gourmet": "Un lote gourmet con una selección amplia de conservas vegetales de calidad, ideal para regalar o compartir.",
            "imprescindible": "Los imprescindibles de la despensa navarra en un solo lote: verduras de la Ribera para tener a mano todo el año.",
            "capricho": "El lote más completo y generoso de la gama: pensado como regalo especial o para darse un capricho.",
        }
        for k, v in c.items():
            if IN(k, n): return v
        if IN(r"blanco", n): return "Lote que combina conservas navarras con vino blanco, pensado para maridar y regalar."
        return "Lote que combina conservas navarras con vino tinto, pensado para maridar y regalar."
    return None


def d_navarra_dulce(n, cat):
    if IN(r"galletas", n): return "Galletas con patxarán, el licor navarro por excelencia, en un dulce de merienda con un toque diferente."
    if IN(r"pastas", n): return "Pastas de San Fermín con patxarán: un detalle dulce y festivo, ideal para llevar de Pamplona."
    if IN(r"85", n): return "Chocolate negro 85 % cacao: intenso, amargo y con poco dulzor. Para quienes buscan el sabor puro del cacao."
    if IN(r"sin azucar", n): return "Chocolate negro con naranja, sin azúcar añadido: el aroma cítrico acompaña al cacao en una versión más ligera."
    for k, d in {
        "patxaran": "Chocolate negro con patxarán, el sabor de la fiesta navarra en una tableta: cacao intenso con notas de endrina y anís.",
        "naranja": "Chocolate negro con naranja: la clásica pareja del cacao y el cítrico, equilibrada y fresca.",
        "cereza y miel": "Chocolate negro con cereza y miel, de sabor afrutado y suave dulzor.",
        "caf": "Chocolate negro con café: aroma tostado y amargor elegante, ideal para acompañar el café.",
        "pasas al ron": "Chocolate negro con pasas al ron, un clásico goloso con aromas licorosos.",
    }.items():
        if IN(k, n): return d
    k = re.search(r"sabor n.\s*(\d+)", n, re.I)
    return f"Tableta de chocolate artesano de Navarra, sabor n.º {k.group(1)} de la colección. Cada sabor se presenta en formato individual: perfecto para regalar, coleccionar o probar todos." if k else None


def d_lvn(n, cat):
    if IN(r"crema", n):
        t = re.search(r"QUESO (.*?) 125", n, re.I).group(1).lower()
        return f"Crema de queso {t} para untar en tostas, pan o galletas, y para dar cuerpo a salsas. Formato pequeño para probar o llevar de picnic."
    if IN(r"trufa", n): return "Cuña de queso de oveja inyectado con trufa: cremoso y aromático, con el perfume inconfundible de la trufa. Un queso para sorprender en la tabla."
    if IN(r"romero", n): return "Cuña de queso de oveja inyectado con aceite de romero: matiz herbal y mediterráneo sobre un queso curado de oveja."
    ahum = IN(r"ahum", n)
    idi = IN(r"idiazabal", n)
    if idi:
        return (f"Cuña de queso de leche de oveja con denominación Idiazabal, {'ahumado' if ahum else 'natural'}. "
                + ("Sabor intenso con el característico toque de humo de leña, ideal con sidra o vino tinto." if ahum else
                   "Pasta firme y sabor láctico con matices de oveja, perfecto en tabla con membrillo o frutos secos."))
    if IN(r"oveja", n):
        t = "ahumado" if ahum else "natural"
        f = "media pieza" if IN(r"1/2", n) else "cuña"
        return (f"Queso de oveja de La Vasco Navarra, {f} {t}. "
                + ("El ahumado le da un perfil más intenso y aromático, muy bueno con vinos tintos." if ahum else
                   "Sabor franco a leche de oveja, textura firme y final persistente. Para tabla, aperitivo o gratinar."))
    if IN(r"semicurado", n): return "Queso semicurado en media pieza: sabor suave y textura cremosa que gusta a todo el mundo. Para tabla, bocadillos o fundir."
    if IN(r"reserva", n): return "Queso reserva en media pieza, con una maduración más larga: pasta firme, sabor profundo y largo final. Para disfrutar solo o con un buen vino."
    return "Queso curado en media pieza, de sabor marcado y pasta firme. Buen compañero de membrillo, nueces o un vino tinto joven."


def d_anko(n, cat):
    if cat == "pimientos":
        if IN(r"extra", n): return "Pimiento del piquillo categoría extra: piezas seleccionadas, enteras y de gran calidad, de carne dulce y aroma asado."
        return "Pimiento del piquillo de primera categoría, asado y pelado. Dulce y muy versátil: guisos, rellenos, salsas, pizzas y tostas."
    if cat == "dulces":
        f = re.sub(r".*mermelada (ECO )?", "", n, flags=re.I)
        eco = "ecológica " if IN(r"eco", n) else ""
        return f"Mermelada {eco}de {f}: fruta cocinada con cuidado, de sabor intenso. Para tostadas, yogures, quesos y repostería."
    if IN(r"gazpacho", n): return "Gazpacho ecológico, fresco y listo para beber. Ideal bien frío en verano, como entrante o en vaso."
    f = re.sub(r".*[Cc]rema (de |ECO )?", "", n)
    eco = "ecológica " if IN(r"eco", n) else ""
    return f"Crema {eco}de {f}: verduras trituradas hasta lograr una textura suave. Se calienta y se sirve: un primer plato rápido y saludable."


def d_katealde(n, cat):
    d = [
        (r"lote|cesta", "Estuche de la casa con una selección de foie gras y especialidades de pato, pensado para regalar o para una celebración."),
        (r"foie gras barqueta", "Foie gras de pato micuit en barqueta: textura sedosa y sabor delicado. Se corta en láminas y se sirve sobre pan tostado con mermelada."),
        (r"foie gras tarro", "Foie gras de pato en tarro: untuoso, fino y de sabor elegante. Con pan tostado y una mermelada dulce, es un aperitivo de fiesta."),
        (r"trufa", "Bloc de foie de pato con trufa: la untuosidad del foie y el aroma profundo de la trufa."),
        (r"champagne", "Bloc de foie de pato con champagne: matiz fresco y elegante."),
        (r"pi[ñn]on", "Bloc de foie de pato con piñones: textura cremosa con un toque de fruto seco."),
        (r"almendra", "Bloc de foie de pato con almendra: suave y cremoso con un punto crujiente y dulce."),
        (r"oporto", "Paté de foie con oporto, suave y aromático, para untar en tostas o canapés."),
        (r"lat[oó]n", "Paté de campaña en lata de regalo, con pimienta o finas hierbas. Para tostadas y tablas de embutidos."),
        (r"monta", "Paté de montaña, rústico y de sabor casero. Estupendo en bocadillos y tostas."),
        (r"alas", "Alas de pato confitadas: tiernas y jugosas, solo hay que calentarlas para dorar la piel."),
        (r"muslos", "Muslos de pato confitados en su propia grasa: carne tierna y sabrosa, que solo necesita dorarse en sartén u horno."),
        (r"jam[oó]n de pato", "Jamón de pato curado, en lonchas finas: sabor intenso y ligeramente ahumado. Para aperitivo y ensaladas."),
    ]
    for p, t in d:
        if IN(p, n): return t


def d_dantza(n, cat):
    if IN(r"edici[oó]n especial", n) and IN(r"extra grueso", n):
        return "Edición especial de espárrago extra grueso de Navarra, seleccionado por su gran tamaño y su carne tierna. Un capricho para la mesa."
    if IN(r"edici[oó]n especial", n):
        return "Edición especial de espárragos blancos de Navarra, con una selección más cuidada. Ideal para regalar o para una ocasión señalada."
    base = esparrago(n, "D")
    if IN(r"fiesta", n): return "Lata Fiesta de espárragos blancos de Navarra: formato pensado para compartir en reuniones de amigos y familia."
    return base


def d_arbizu(n, cat):
    if cat == "pates":
        if IN(r"morcilla", n): return "Paté de morcilla: sabor intenso y especiado, con el carácter de la morcilla de siempre. Para untar en pan tostado."
        if IN(r"hongos", n): return "Paté de campaña con hongos: aroma de monte y textura suave."
        if IN(r"brandy", n): return "Paté de campaña con un toque de brandy, aromático y redondo."
        return "Paté de campaña de sabor tradicional, suave y fácil de untar. Para tostas, bocadillos y aperitivos."
    if IN(r"txistorra", n):
        t = " Versión ecológica." if IN(r"eco", n) else ""
        if IN(r"1 kg", n): return "Txistorra de Arbizu en formato de un kilo, para tener siempre en casa: a la sartén, a la plancha o en bocadillo." + t
        return ("Txistorra de Navarra en formato individual: fina, jugosa y sabrosa. A la sartén, en bocadillo o con huevos fritos." 
                + (" Con un punto picante." if IN(r"picante", n) else "") + t)
    if IN(r"sidra", n): return "Chorizo cocinado a la sidra, listo para calentar: jugoso, con un toque ácido y aromático. Un clásico de la mesa de tapas."
    if IN(r"oreado", n): return "Chorizo oreado individual, curado de forma tradicional. Para aperitivo, bocadillo o un picoteo rápido."
    return f"Chorizo en sarta {'picante' if IN('picante', n) else 'dulce'}, para cocinar o comer como aperitivo. Sabor tradicional de la charcutería navarra."


def d_inurrieta(n, cat):
    if IN(r"estuche madera", n): return "Estuche de madera con vinos de Inurrieta: una presentación especial para regalar o para una ocasión señalada."
    if IN(r"estuche", n): return "Estuche de vinos de Inurrieta para regalar, con una selección de la bodega."
    rest = {
        "rosado": "Vino rosado de Inurrieta, fresco y afrutado. Ideal para el aperitivo, arroces y ensaladas.",
        "orchidea cuvee": "Orchidea Cuvée, vino blanco de la bodega: fresco, aromático y con carácter. Para pescados, mariscos y entrantes.",
        "orchidea": "Orchidea, vino blanco de Inurrieta: aromático y fresco, para aperitivos, pescados y verduras.",
        "blanco mimao": "Mimao blanco, un vino blanco de la casa: fácil de beber y con personalidad.",
        "altos": "Altos de Inurrieta, tinto de la bodega: estructura y fruta con carácter navarro. Para carnes y quesos.",
        "ficha": "Mimao Ficha, tinto de Inurrieta: suave y frutal, para el día a día.",
        "puro vicio": "Mimao Puro Vicio, tinto de edición más cuidada: intenso y con muchos matices. Para carnes, guisos y quesos curados.",
        "laderas": "Mimao Laderas, tinto de la gama alta de la casa: profundo, complejo y con largo final. Para ocasiones especiales.",
    }
    for k, v in rest.items():
        if IN(k, n): return v


def d_aceite(n, cat):
    if IN(r"vinagre", n): return "Vinagre de vino de La Maja: para aliñar ensaladas, verduras y gazpachos con un punto ácido limpio."
    if IN(r"lote", n): return "Lote de aceites de oliva virgen extra de distintas variedades, para comparar sabores y regalar a los amantes del buen aceite."
    if IN(r"estuche", n): return "Estuche de aceites de oliva virgen extra pensado para catar y regalar."
    if IN(r"trufa", n): return "Aceite de oliva virgen extra aromatizado con trufa blanca: unas gotas sobre huevos, pasta, arroces o carpaccios elevan cualquier plato."
    if IN(r"sin filtrar", n): return "Aceite de oliva virgen extra sin filtrar: más turbio, con un frutado intenso y fresco. Ideal en crudo."
    if IN(r"edici[oó]n limitada", n): return "Edición limitada de aceite de oliva virgen extra: producción corta y selección cuidada. Para disfrutarlo en crudo."
    if IN(r"arbequina", n): return "Aceite de oliva virgen extra de aceituna arbequina: suave, afrutado y con notas dulces. Ideal para aliñar, tostadas y repostería."
    if IN(r"koroneiki", n): return "Aceite de oliva virgen extra de aceituna koroneiki: intenso, verde y con un toque picante. Para ensaladas, carnes y verduras."
    if IN(r"arroniz", n): return "Aceite de oliva virgen extra de aceituna arróniz, variedad navarra: frutado, equilibrado y de gusto vegetal. Para el día a día."
    if IN(r"tosca", n): return "Aceite de oliva virgen extra de aceituna tosca: carácter marcado y toque amargo. Bueno con ensaladas y platos de cuchara."
    return "Aceite de oliva virgen extra de uso diario: sabor equilibrado y fresco, para cocinar, aliñar y mojar pan."


def d_vino(n, cat):
    n0 = n
    if IN(r"pack|estuche|lote", n): return "Pack de vinos para regalar o para disfrutar en una ocasión especial: una selección que muestra el estilo de la bodega."
    if IN(r"brut|espumoso", n):
        return "Espumoso elaborado con uva chardonnay: burbuja fina y sabor fresco. Para brindar o acompañar aperitivos y mariscos."
    if IN(r"moscatel|moscato", n): return "Vino dulce de uva moscatel: aromático, goloso y equilibrado por la acidez. Perfecto con postres, quesos azules y foie."
    if IN(r"dulce", n): return "Vino dulce de garnacha: goloso, frutal y con mucho cuerpo. Para postres de chocolate, quesos y foie."
    if IN(r"rosado|ros[eé]\b", n): return "Vino rosado fresco y afrutado, para aperitivos, ensaladas, arroces y platos ligeros."
    if IN(r"blanco|chardonnay|garnacha blanca", n):
        ex = " de crianza prolongada" if IN(r"gran reserva", n) else " con algo más de crianza" if IN(r"reserva", n) else ""
        return f"Vino blanco{ex}: fresco y aromático, con buena acidez. Con pescados, mariscos, verduras, arroces y quesos suaves."
    if IN(r"gran reserva", n): return "Gran reserva con largo envejecimiento: profundo, redondo y con muchos matices. Para carnes de caza, quesos curados y ocasiones especiales."
    if IN(r"reserva", n): return "Reserva con paso por barrica y botella: elegante, de taninos pulidos. Con carnes, asados y quesos curados."
    if IN(r"crianza", n): return "Crianza equilibrada, con fruta y notas de barrica. Con carnes, embutidos y guisos."
    if IN(r"merlot|pinot", n): return "Vino tinto monovarietal, de color profundo y sabor frutal. Para carnes, pasta y quesos."
    if IN(r"garnacha", n): return "Vino tinto de garnacha: fruta madura, cuerpo medio y final amable. Con tapas, carnes y embutidos."
    if IN(r"tinto|selecci|cuvee|vendimia|vidure|la a|pago|1891", n): return "Vino tinto de Navarra de la bodega: fruta, estructura y sabor con personalidad. Para carnes, guisos y quesos curados."
    return "Vino de Navarra con carácter de la bodega. Para acompañar quesos, embutidos y platos de cuchara."


def d_olasagasti(n, cat):
    if IN(r"crema", n): return "Crema de atún y anchoas para untar sobre tostas, canapés o verduras. Un aperitivo rápido con sabor a mar."
    if IN(r"ventresca", n): return "Ventresca de bonito en aceite, la parte más jugosa y tierna del pescado. Una exquisitez para servir tal cual, con pimiento o ensalada."
    if IN(r"escabeche", n): return "Bonito del norte en escabeche, con la acidez justa y textura jugosa. Para ensaladas, tostas o aperitivo."
    return "Bonito del norte en aceite: carne tierna, jugosa y con sabor delicado. Para ensaladas, tostas, pimientos o ensaladilla."


def d_mermelada(n, cat, brand):
    f = re.sub(r"^.*?mermelada( de)? ?", "", n, flags=re.I).strip() or "fruta"
    if IN(r"peregrino", n): return "Mermelada El Peregrino, una receta especial del Camino de Santiago. Dulce y afrutada, para tostadas, quesos y repostería."
    if IN(r"cebolla", n): return "Mermelada de cebolla con hongos: dulce y salada a la vez. Para acompañar carnes, quesos y foie."
    if IN(r"piquillo", n): return "Mermelada de pimiento del piquillo: dulce con un fondo especiado. Para quesos, carnes y tostas."
    if IN(r"patxar", n): return "Mermelada con patxarán: afrutada con notas de anís. Para acompañar quesos y postres."
    if IN(r"tomate", n): return "Mermelada de tomate, dulce y ligeramente ácida. Con quesos, carnes y tostadas saladas."
    return f"Mermelada de {f}, elaborada con fruta y de sabor intenso. Para tostadas, yogures, quesos y postres."


def d_leyre(n, cat):
    if IN(r"tabl", n):
        e = {"almendra": "con almendras", "85": "85 % cacao", "naranja": "con naranja"}
        k = next(v for p, v in e.items() if IN(p, n))
        return f"Tabletón de chocolate negro {k}: formato grande para compartir o tener en casa para cocinar y picar."
    d = {
        "85": "Chocolate negro 85 % cacao: sabor intenso y poco dulce.",
        "95": "Chocolate negro 95 % cacao: para los amantes del cacao más puro y amargo.",
        "naranja": "Chocolate negro con naranja: cacao intenso con un toque cítrico.",
        "almendra": "Chocolate con almendras: crujiente y sabroso.",
        "nueces": "Chocolate con nueces y pasas: textura crujiente y toque dulce.",
        "caf": "Chocolate con café: aroma tostado y sabor equilibrado.",
    }
    for k, v in d.items():
        if IN(k, n): return v


def d_pmayo(n, cat):
    if IN(r"cacao puro", n): return "Chocolate de cacao puro: intenso, amargo y sin concesiones."
    s = "sin azúcar añadido" if IN(r"s/az", n) else ""
    ex = " con almendra" if IN("almendra", n) else " con naranja" if IN("naranja", n) else ""
    return f"Chocolate{ex} {s}: sabor franco a cacao con un dulzor ligero. Para quienes cuidan el azúcar sin renunciar al placer."


def d_patxaran(n, cat):
    if IN(r"crema de naranja", n): return "Crema de naranja con patxarán: dulce, cítrica y suave, para tomar fría o con hielo."
    if IN(r"caf", n): return "Licor de café de Blanca Villa, aromático y goloso. Para tomar solo, con hielo o sobre helado."
    if IN(r"orujo", n): return "Licor de orujo: fuerte y con carácter, para el final de la comida."
    if IN(r"hierbas", n): return "Licor de hierbas aromático y digestivo, para el final de la comida."
    if IN(r"crema de patx", n): return "Crema de patxarán: versión suave y cremosa del licor navarro. Para postres, helados y para tomar fría."
    return "Patxarán navarro, licor de endrinas con anís: afrutado, aromático y con un punto dulce. Para tomar muy frío o con hielo tras la comida."


def d_ibero(n, cat):
    if IN(r"chorizo", n): return "Chorizo ibérico de calidad: sabor profundo y aroma a pimentón. Para tabla, aperitivo y bocadillo."
    if IN(r"salchich", n): return "Salchichón ibérico de bellota, con sabor suave y aromático a pimienta. Para tabla y aperitivos."
    if IN(r"jam[oó]n.*bellota|bellota", n): return "Jamón ibérico de bellota 100 %: loncha jugosa, aroma intenso y grasa infiltrada que se funde en boca. Se disfruta mejor a temperatura ambiente."
    return "Jamón ibérico de cebo, en lonchas. Un jamón sabroso y accesible para el día a día."


def d_beola(n, cat):
    if IN(r"albondigas", n): return "Albóndigas en salsa, preparadas al estilo casero. Calentar y servir: un plato de cuchara cómodo y sabroso."
    if IN(r"alubias", n): return "Alubias con costilla, receta tradicional lista para calentar. Plato de invierno, contundente y reconfortante."
    if IN(r"hongo", n): return "Paté de hígado de cerdo con hongos: suave, de sabor casero y aroma de bosque."
    return "Paté de hígado de cerdo de receta casera: textura suave para untar en tostas, bocadillos y aperitivos."


def d_sal(n, cat):
    if IN(r"escamas", n): return "Sal en escamas, de textura crujiente. Para terminar platos en la mesa: carnes, pescados, verduras y ensaladas."
    return "Sal tradicional de cocina, de grano fino y uso diario. Para cocinar y aliñar."


def d_piparras(n, cat):
    t = "pequeñas" if IN(r"peque", n) else "medianas"
    return f"Piparras {t} en vinagre: guindillas verdes crujientes con un picor suave. El acompañamiento clásico de pinchos, encurtidos y platos fritos."


def d_salamanca(n, cat):
    return d_ibero(n, cat)


producers = {
    "la-catedral": ("La Catedral, empresa familiar de Mendavia con más de ochenta años dedicada a las verduras de la Ribera.", d_catedral),
    "el-navarrico": ("Navarrico, de San Adrián, que elabora conservas vegetales desde 1960.", d_navarrico),
    "navarra-en-dulce": (None, d_navarra_dulce),
    "la-vasco-navarra": (None, d_lvn),
    "anko": ("Anko, de Cadreita, que trabaja las verduras de la Ribera de Navarra desde hace más de cincuenta años.", d_anko),
    "katealde": ("Katealde, de Altsasu, especialista en pato y foie gras.", d_katealde),
    "dantza": ("Dantza, conservera de Castejón con espárrago del valle del Ebro.", d_dantza),
    "arbizu": ("Arbizu, charcutería navarra con tradición desde 1984.", d_arbizu),
    "inurrieta": ("Bodega Inurrieta, vinos de Navarra.", d_inurrieta),
    "la-maja": (None, d_aceite), "monjardin": (None, None), "hacienda-queiles": (None, d_aceite),
    "ecoprolive": (None, d_aceite),
    "pago-de-cirsus": ("Pago de Cirsus, vinos de la Ribera de Navarra.", d_vino),
    "ochoa": (None, d_vino), "chivite": (None, d_vino), "irache": (None, d_vino),
    "unsi": (None, d_vino), "alconde": (None, d_vino), "palacio-de-sada": (None, d_vino),
    "olasagasti": (None, d_olasagasti),
    "aidin": (None, lambda n, c: d_mermelada(n, c, "")), "irular": (None, lambda n, c: d_mermelada(n, c, "")),
    "leyre": (None, d_leyre), "pedro-mayo": (None, d_pmayo),
    "grupo-la-navarra": (None, d_patxaran), "baines": (None, d_patxaran),
    "ibericomio": (None, d_ibero), "salamanca-iberica": (None, d_salamanca),
    "beola": (None, d_beola), "d-oro": (None, d_sal), "ubidea": (None, d_piparras),
}

taken = set()
out = {}
missing = []
for cat, prod, name, price in rows:
    base = slugify(name) or "producto"
    slug, i = base, 2
    while slug in taken:
        slug = f"{base}-{i}"; i += 1
    taken.add(slug)
    intro, fn = producers[prod]
    if prod == "monjardin":
        fn = d_aceite if cat == "aceites" else d_vino
    text = fn(name, cat) if fn else None
    if not text:
        missing.append(name); continue
    out[slug] = " ".join(text.split())

print(len(out), "descripciones;", len(missing), "sin texto:", missing)
with open(OUT, "w", encoding="utf-8") as f:
    f.write("// BORRADOR generado con scripts/generar-descripciones.py. Revisar antes de publicar\n"
            "// (ingredientes, alérgenos, denominaciones). Clave = slug del producto.\n"
            "export const DESCRIPTIONS: Record<string, string> = ")
    f.write(json.dumps(out, ensure_ascii=False, indent=2))
    f.write(";\n")
