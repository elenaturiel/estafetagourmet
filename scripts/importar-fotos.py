#!/usr/bin/env python3
"""Fotos de productos y productores → public/images/ + data/images.generated.ts.

Uso (desde la raíz del proyecto):
    python3 scripts/importar-fotos.py "<carpeta con 'WEB ESTAFETA GOURMET' descargada de Drive>"

Cada producto se empareja con la foto del catálogo del proveedor mediante las
reglas de este archivo (patrón sobre el título de la hoja → archivo). Las fotos
se pasan a WebP, se recorta el blanco sobrante, se centran a tamaño uniforme y el fondo blanco pasa a color arena (así el recorte de las
tarjetas, 4:5, nunca corta el producto) y se guardan con el slug del producto.
Los productos sin regla (o sin foto en Drive) quedan con el marcador.
Necesita Pillow (pip install pillow).
"""
import json, re, sys, unicodedata
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else None
if not SRC or not SRC.exists():
    sys.exit(__doc__)
CAT = SRC / "2. Catálogos"
BRANDS = SRC / "3. Imagen proveedor"
OUT_P = ROOT / "public/images/productos"
OUT_M = ROOT / "public/images/productores"


def slugify(s):
    s = unicodedata.normalize("NFD", s)
    s = re.sub(r"[̀-ͯ]", "", s).lower().replace("&", " y ")
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")[:80]


txt = (ROOT / "data/products.generated.ts").read_text(encoding="utf-8")
rows = json.loads(re.sub(r",\s*\]", "]", re.search(r"productRows[^=]*=\s*(\[.*\])", txt, re.S).group(1)))

# carpeta de cada proveedor en el catálogo
FOLDERS = {
    "unsi": "1. Bodegas UNSI", "baines": "10. Licores BAINES", "grupo-la-navarra": "11. Licores La Navarra",
    "arbizu": "13. Embutidos ARBIZU", "ibericomio": "14. IBERICOMIO", "salamanca-iberica": "15. SALAMANCA IBERICA",
    "aidin": "16. Mermeladas AIDIN", "irular": "17. Mermeladas IRULAR", "anko": "18. Conservas ANKO",
    "dantza": "19. Conservas DANTZA", "alconde": "2. Bodegas ALCONDE", "la-catedral": "20. Conservas LC La Catedral",
    "olasagasti": "21. Conservas OLASAGASTI", "el-navarrico": "22. Conservas El NAVARRRICO", "beola": "23. Conservas BEOLA",
    "la-maja": "24. Aceites La Maja", "ecoprolive": "25. Aceites ECOPROLIVE", "hacienda-queiles": "26. Aceites Hacienda Queiles",
    "la-vasco-navarra": "27. Quesos LA VASCO NAVARRA", "ubidea": "28. Preparados UBIDEA", "d-oro": "29. Condimentos SAL D'ORO",
    "irache": "3. Bodegas IRACHE", "katealde": "30. Patés KATEALDE", "monjardin": "4. Bodegas CASTILLO DE MONJARDIN",
    "ochoa": "5. Bodegas OCHOA", "pago-de-cirsus": "6. Bodegas PAGO DE CIRSUS", "chivite": "7. Bodegas CHIVITE",
    "inurrieta": "8. Bodegas INURRIETA", "palacio-de-sada": "9. Bodegas PALACIO DE SADA",
    "navarra-en-dulce": "31. Dulces y chocolates", "leyre": "31. Dulces y chocolates", "pedro-mayo": "31. Dulces y chocolates",
}

# Reglas: producto → foto. Patrón (regex, sin distinguir mayúsculas) sobre el título; gana la primera que encaje.
# La foto es un trozo del nombre del archivo (único dentro de la carpeta del proveedor).
LC = "20. Conservas LC La Catedral"
RULES = {
 "la-catedral": [
  (r"ESPÁRRAGOS 5$|ESPÁRRAGO 5$", "esparragos-enteros-extra-muy-gruesos-5-frutos-lata"),
  (r"ESPÁRRAGOS 6$|ESPÁRRAGO 6$", "esparragos-enteros-extra-gruesos-6-frutos-lata"),
  (r"ESPÁRRAGOS (8|10)$|ESPÁRRAGO 6-8|ESPÁRRAGO 8-12", "esparragos-enteros-extra-muy-gruesos-6-8-lata"),
  (r"Yemas", "yemas-de-esparragos-blancos-extra-8-12"),
  (r"ESPÁRRAGO 04-06 FRASCO|Galón 10/12", "esparragos-blancos-extra-muy-gruesos-tarro-alto"),
  (r"ESP", "esparragos-blancos-extra-gruesos-tarro"),
  (r"PIM ARTESANO BOTE CRISTAL (212|314g REDONDO)", "pimientos-del-piquillo-tarro-redondo-1"),
  (r"PIM ARTESANO BOTE CRISTAL (360|260)", "pimientos-del-piquillo-enteros-extra-tarro-redondo-2"),
  (r"PIM ARTESANO BOTE CRISTAL 314g CUADRADO", "pimientos-del-piquillo-tarro-cuadrado-1"),
  (r"PIM ARTESANO BOTE CRISTAL 580", "pimientos-del-piquillo-tarro-cuadrado-2"),
  (r"PIMIENTO CONFITADO", "pimientos-del-piquillo-tarro-cuadrado-2"),
  (r"MITAD ALCACHOFA", "alcachofas-corazones-en-mitades-primera-al-natural"),
  (r"CORAZON ALCACHOFA 580", "alcachofas-tarro-cuadrado-2"),
  (r"CORAZON ALCACHOFA 10-12", "alcachofas-corazones-enteros-10-12-tarro-cuadrado"),
  (r"CORAZON ALCACHOFA 16-20", "alcachofas-tarro-redondo-3"),
  (r"Habitas Baby aceite 314", "habitas-baby-tarro-cuadrado"),
  (r"Habitas Baby|Lágrimas", "habitas-baby-tarro-redondo"),
  (r"Pochas con codorniz", "pochas-con-muslitos-de-codorniz"),
  (r"Pochas", "pochas-a-la-navarra"),
  (r"Menestra", "menestra-extra"), (r"Pencas", "pencas-de-acelga"), (r"Cardo", "-cardo"), (r"Acelga", "-acelga"),
  (r"SALSA DE PIQUILLOS", "salsa-de-piquillo"), (r"VIZCAINA", "salsa-vizcaina"), (r"SALSA DE HONGOS", "salsa-de-hongos"),
  (r"ALEGRIAS", "alegrias-riojanas"), (r"FRITADA", "fritada"),
  (r"CREMA DE VERDURAS", "crema-de-verduras"), (r"PUERROS", "crema-de-puerro"), (r"CALABAZA", "crema-de-calabaza"),
  (r"CALABACIN", "crema-de-calabacin"), (r"CREMA DE ESPARRAGOS", "crema-de-esparrago"),
  (r"PIPARRAS", "guindillas-piparras"),
  (r"Hongos en aceite 1/2", "hongos-2"), (r"Hongos en aceite 314", "hongos-3"), (r"Hongos en aceite 580", "hongos-4"),
  (r"Hongos en aceite 360", "hongos-tarro-redondo"),
 ],
 "el-navarrico": [
  (r"FRASCO 580 ml 9/12", "9-12-tarro"), (r"LATA 425 ml 6/8 FR", "6-8-lata."), (r"CORTO FRASCO", "esparragos-cortos"),
  (r"FRASCO 370 ml 6/8", "6-8-tarro."), (r"FRASCO 370 ml 9/12", "9-12-tarro"), (r"LATA 425 ml 4/6", "4-6-lata"),
  (r"LATA 425 ml 6/8 R", "6-8-lata-2"), (r"LATA 425 ml 8/10", "8-10-lata"), (r"PUERROS", "puerros"),
  (r"rellenos de bacalao", "rellenos-de-bacalao"), (r"rellenos de hongos", "rellenos-de-hongos"),
  (r"rellenos de merluza", "rellenos-de-merluza-y-gambas."),
  (r"PIQUILLO ENTERO FRASCO 350", "pimientos-del-piquillo-enteros-extra."), (r"PIQUILLO ENTERO FRASCO 250", "pimientos-del-piquillo-enteros-extra-2"),
  (r"ETIQUETA NEGRA PRODUCCIÓN LIMITADA", "pimientos-del-piquillo-enteros-extra-2"),
  (r"ALCACHOFAS ET NEGRA 12/14", "alcachofa-al-natural-extra."), (r"CORAZONES ALCACHOFA", "extra-11-15"),
  (r"rellena de jamón", "rellenas-de-jamon"), (r"rellena de vieiras", "rellenas-de-vieiras"),
  (r"LOTE DETALLE", "maletin"), (r"LOTE NAVARRO", "caja-kraft"), (r"LOTE FUSIÓN BLANCO", "arriezu"),
  (r"LOTE FUSIÓNTINTO", "bagordi"), (r"LOTE GOURMET", "caja-negra"), (r"LOTE IMPRESCINDIBLE", "caja-amarilla"),
  (r"LOTE CAPRICHO", "caja-negra"),
 ],
 "navarra-en-dulce": [
  (r"PASTAS SAN FERMIN", "sanfermines-pastas"), (r"NEGRO PATXARAN", "72-al-pacharan"),
  (r"NEGRO NARANJA SIN", "85-sin-azucares-con-naranja"), (r"NEGRO NARANJA", "72-con-naranja-confitada."),
  (r"CEREZA", "cereza-y-miel"), (r"CAF", "navarra-en-dulce-chocolate-negro-con-cafe"), (r"PASAS", "pasas-al-ron"),
 ],
 "leyre": [
  (r"TABLETON NEGRO ALMENDRAS", "negro-con-almendras-marcona"), (r"TABLETON NEGRO 85", "extrafino-negro-85"),
  (r"TABLETON NEGRO CON NARANJA", "negro-con-naranja."), (r"85", "extrafino-negro-85"), (r"95", "extrafino-negro-95"),
  (r"NARANJA", "negro-con-naranja."), (r"ALMENDRA", "negro-con-almendras-marcona"), (r"CAFÉ", "negro-con-cafe"),
 ],
 "pedro-mayo": [
  (r"cacao puro", "cacao-puro"), (r"almendra", "almendras-marconas"), (r"naranja", "naranja-confitada"),
  (r"S/azúcar$", "pedro-mayo-62-chocolate-negro."),
 ],
 "la-vasco-navarra": [
  (r"SEMICURADO", "semi medio"), (r"QUESO CURADO", "curado medio"), (r"RESERVA", "medio reserva"),
  (r"QUESO OVEJA 1/2", "oveja medio"), (r"AHUM. 1/2", "Cuña oveja ahumado"),
  (r"IDIAZABAL AHUM", "Cuña Idiazabal ahumado"), (r"IDIAZABAL NAT", "Cuña Idiazabal."),
  (r"OVEJA V NAVARRA AHUM", "Cuña oveja ahumado"), (r"OVEJA V NAVARRA NAT", "Cuña oveja natural"),
  (r"EST. METALICO", "VN-LATA-TRI"), (r"CREMA AL QUESO SUAVE", "Crema queso suave"),
  (r"AÑEJO", "Crema queso añejo"), (r"CREMA AL QUESO DE OVEJA", "Crema queso oveja"),
  (r"CREMA AL QUESO DE CABRA", "Crema queso."), (r"TRUFA", "trufa"),
 ],
 "anko": [
  (r"piquillo", "pimientos-del-piquillo-de-navarra-extra-enteros"),
  (r"Crema ECO verduras", "crema-ecologica-de-verduras"), (r"ECO calabaza", "crema-ecologica-de-calabaza"),
  (r"calabacín con quinoa", "calabacin-con-quinoa"), (r"guisante", "guisantes-maiz-y-coco"),
  (r"Gazpacho", "gazpacho"), (r"alcachofas", "crema-de-alcachofa"), (r"espárragos", "crema-de-esparragos"),
  (r"hongos", "crema-de-hongos"), (r"frambuesa", "ECO-FRAMB-1"), (r"albaricoque", "ECO-ALB-14"),
  (r"naranja amarga", "ECO-NAR-AM-5"), (r"melocotón", "MELOCOTON-3"),
 ],
 "katealde": [
  (r"Lote historia", "tabla-foie-gras"), (r"Cesta", "cesta-bloc-de-pato"), (r"barqueta", "foie-gras-mi-cuit"),
  (r"Foie gras tarro", "foie-gras-de-pato-entero"), (r"trufa", "con-trufa"), (r"champagne", "champagne"),
  (r"piñon", "pinon-del-pais."), (r"almendra", "con-almendras"), (r"oporto", "oporto"),
  (r"Latón", "pimienta-verde."), (r"montaña", "montana"), (r"muslos", "2-muslos"), (r"alas", "6-manchons"),
  (r"Jamón de pato", "jamon-de-pato"),
 ],
 "dantza": [
  (r"Lata 1 Kg", "lata_kilo_4-6"), (r"Lata 1/2 Kg", "Mediokilo_5-7."), (r"Fiesta", "Esparragos_fiesta."),
  (r"blancos de Navarra \(Edición", "Edicion_especial_3-5."), (r"Frasco M 580", "M580"), (r"Frasco R 370", "R370"),
  (r"Extra Grueso", "Extragrueso"), (r"Yemas", "Yemas_DO_Navarra_muy_gruesas."),
 ],
 "arbizu": [
  (r"Paté de campaña hongos", "campana-con-hongos"), (r"campaña brandy", "campana-al-brandy"),
  (r"Paté de campaña", "arbizu-pate-de-campana."), (r"individual eco", "ecologica-220g"),
  (r"individual picante", "txistorra-picante."), (r"Txistorra individual", "arbizu-txistorra."),
  (r"Txistorra 1 kg", "txistorra-de-navarra"), (r"individual oreado", "txorizo-oreado-180g"),
  (r"sarta dulce", "txorizo-dulce-250g"), (r"sarta picante", "txorizo-picante-250g"), (r"sidra", "sidra-lata"),
 ],
 "inurrieta": [
  (r"ESTUCHE MADERA", "caja_madera"), (r"Mediodia Cuatrocientos", "estuche_orchidea_mediodia"),
  (r"ESTUCHE Orchidea Altos", "estuche_orchidea_altos"), (r"MIMAO tinto ficha", "mimao_garnacha."),
  (r"puro vicio", "puro_vicio"), (r"laderas", "laderas_de_inurrieta"), (r"orchidea cuvee", "orchidea_cuvee"),
  (r"altos de", "altos_de_inurrieta"), (r"BLANCO MIMAO", "mimao_garnacha_blanca"),
  (r"BLANCO orchidea", "sauvignon_blanc"), (r"rosado", "mediodia_rosado"),
 ],
 "la-maja": [
  (r"ARRONIZ", "arroniz"), (r"TOSCA", "tosca"), (r"KORONEIKI", "koroneiki"), (r"2 l|5 l", "garrafa-2l"),
  (r"ALFAR 1 l", "lata-1l"), (r"VINAGRE", "vinagre"), (r"ARBEQUINA", "la-maja-aove-500ml"),
 ],
 "monjardin": [
  (r"arbequina", "campos-monjardin-aove"), (r"chardonnay gran reserva", "Blanco chardonnay-gran"),
  (r"chardonnay reserva", "Blanco chardonnay-reserva"), (r"Deyo", "Deyo"), (r"pinot", "pinot-noir"),
  (r"MILLESIME", "BRUT-CHARDONNAY-MILLESIME"), (r"ROSE", "BRUT-CHARDONNAY-ROSE"), (r"BRUT GRAN", "brut-gran-reserva.png"),
 ],
 "pago-de-cirsus": [
  (r"SELECCIÓN DE FAMILIA", "pago-de-cirsus-seleccion-de-familia"), (r"CUVEE", "pago-de-cirsus-cuvee-especial"),
  (r"O II", "011-seleccion"), (r"Edición especial", "estuche-libro-pago-de-cirsus-la-a-y-vidure."),
  (r"Selecto", "estuche-libro-pago-de-cirsus-la-a-y-vidure (1)"),
  (r"Premium", "estuche-pago-de-cirsus-cuvee-especial-y-moscatel"), (r"VIDURE", "vidure-2020"),
  (r"Familia", "caja-madera"), (r"La A", "pago-de-cirsus-la-a."), (r"VENDIMIA", "vendimia-seleccionada"),
 ],
 "ochoa": [
  (r"Gran Reserva", "gran_reserva."), (r"Reserva", "reserva."), (r"Moscatel", "moscatel_vendimia"),
  (r"Secadero", "alma_finca"), (r"Montijo", "corazon_finca"), (r"Labrit rosado", "labrit_rosado"),
  (r"Labrit blanco", "labrit_garnacha_blanca"), (r"Uva Doble", "uva_doble"), (r"Moscato", "moscato_de_ochoa"),
 ],
 "olasagasti": [
  (r"aceite 112", "aceite-de-oliva-112g"), (r"aceite 200", "aceite-de-oliva-200g"), (r"escabeche", "escabeche-120g"),
  (r"aceite 135", "tarro-pequeno"), (r"aceite 210", "tarro."), (r"aceite 550", "tarro-grande"),
  (r"Ventresca en aceite 190", "VENTRESCA 190"), (r"Ventresca en aceite 110", "VENTRESCA 110"), (r"Crema", "crema-de-atun"),
 ],
 "aidin": [
  (r"almendra", "albaricoque-con-almendra"), (r"albaricoque", "aidin-albaricoque."), (r"cereza", "cereza-de-valle"),
  (r"ciruela", "ciruela-claudia"), (r"frambuesa", "frambuesa-con-arandanos"), (r"naranja", "naranja-dulce"),
  (r"pera", "pera-con-vino"), (r"tomate", "tomate-con-vainilla"), (r"melocotón", "melocoton-rojo"), (r"peregrino", "peregrino"),
 ],
 "irular": [
  (r"albaricoque", "albaricoque-con-naranja"), (r"cebolla", "cebolla-con-hongos"), (r"cereza", "irular-cereza"),
  (r"higo", "higo-con"), (r"naranja", "mermelada-de-naranja-irular"), (r"piquillo", "pimiento-de-piquillo"),
  (r"manzana", "manzana-y-frutos"), (r"pera", "pera-nuez"), (r"tomate", "irular-tomate"),
 ],
 "chivite": [
  (r"Blanco COLECCION", "coleccion_125_blanco"), (r"Blanco las fincas", "las_fincas_blanco"),
  (r"LEGARDETA Blanco", "legardeta_chardonnay"), (r"LEGARDETA Tinto", "legardeta_tinto"), (r"MOSCATEL", "moscatel_viejisimo"),
  (r"Rosado COLECCION", "coleccion_125_rosado"), (r"Rosado Las Fincas", "las_fincas_rosado"),
  (r"Tinto colección", "coleccion_125_tinto"),
 ],
 "hacienda-queiles": [
  (r"ARRONIZ", "arroniz"), (r"TRUFA", "trufa-blanca"), (r"ABBAE", "arbae"), (r"ALHEMA", "alhema"),
 ],
 "grupo-la-navarra": [
  (r"BELASCO", "belasco"), (r"ETXEKO", "etxeko"), (r"PATXARÁN LA NAVARRA|Patxarán LA NAVARRA", "la-navarra-pacharan"),
  (r"crema de naranja", "crema-de-naranja"), (r"café", "licor-cafe"), (r"orujo", "orujo"), (r"hierbas", "hierbas"),
 ],
 "baines": [(r"etiqueta oro", "etiqueta-oro-con-estuche."), (r"Crema", "baines-cream-70cl."), (r"LAXOA", "laxoa")],
 "irache": [
  (r"PRADO", "28_m"), (r"GARNACHA", "32_m"), (r"CHARDONNAY", "31_m"), (r"CRIANZA", "9_m"), (r"ROSADO", "8_m"), (r"BLANCO", "7_m"),
 ],
 "ecoprolive": [(r"OLIVE LOVERS", "estuche-super-premium"), (r"Edición Limitada", "edicion-limitada-500ml."), (r"Sin filtrar", "sin-filtrar-500ml.")],
 "unsi": [
  (r"DULCE", "unsi-dulce-garnacha"), (r"BOYERAL", "el-boyeral"), (r"LA SIERRA", "lasierra-garnacha-2016."),
  (r"BLANCO", "blanco-garnacha-blanca"), (r"TERRAZAS", "tinto-garnacha-de-montana"),
 ],
 "ibericomio": [
  (r"Montecillo", "montecillo"), (r"Jamón de Bellota 100% Ibérica", "martin-matas"), (r"Chorizo", "galocha-chorizo"),
  (r"cebo", "lote-sobres-iberico-loncheado"),
 ],
 "salamanca-iberica": [
  (r"cebo", "jamon-iberico-loncheado"), (r"Jamón ibérico bellota", "lote-sobres-jamon-iberico."),
  (r"Chorizo", "chorizo-iberico-loncheado"), (r"Salchichón", "salchichon"),
 ],
 "alconde": [
  (r"SIERRA PERRA", "sierra-perra"), (r"MORENO", "moreno-y-cabezon"), (r"BLANCO", "metanoia-blanco"), (r"TINTO", "metanoia-tinto"),
 ],
 "beola": [
  (r"albondigas", "albondigas"), (r"alubias", "alubias"), (r"hongo", "con-hongos"), (r"Paté", "beola-pate-de-higado-de-cerdo."),
 ],
 "palacio-de-sada": [(r"ROSADO", "rosado"), (r"BLANCO", "blanco_uva")],
 "d-oro": [(r"ESCAMAS", "SAL ESCAMAS."), (r"TRADICIONAL", "SAL TRADICIONAL.")],
 "ubidea": [(r"MEDIANAS", "300g"), (r"PEQUEÑAS", "180g.")],
}
# En las reglas, un punto final ("xx.") significa "el nombre del archivo termina así antes de la extensión".


def find(folder, key):
    d = CAT / folder
    exact = key.endswith(".")
    k = key[:-1] if exact else key
    hits = []
    for f in sorted(d.rglob("*")):
        if f.suffix.lower() not in (".jpg", ".jpeg", ".png", ".webp"):
            continue
        stem = f.stem
        if re.search(r" \(\d\)$", stem) and "(1)" not in k:
            continue
        if (exact and stem.lower().endswith(k.lower())) or (not exact and k.lower() in f.name.lower()):
            hits.append(f)
    # "2" de una foto repetida: nos quedamos con la primera por orden alfabético
    return hits[0] if hits else None


ARENA = (236, 226, 205)  # #ece2cd, el fondo de las fotos de producto (--color-arena)


def tile(src, dst, size=(960, 1200), margin=0.06, trim=False, tint=False):
    from PIL import ImageChops, ImageDraw, ImageFilter
    im = Image.open(src)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, "white")
        bg.paste(im, mask=im.split()[-1])
        im = bg
    im = im.convert("RGB")
    if trim:
        # Recorta el blanco que rodea al producto (muchas fotos lo traen con
        # mucho aire) para que todos llenen el mismo espacio dentro del marco.
        diff = ImageChops.difference(im, Image.new("RGB", im.size, "white")).convert("L").point(lambda v: 255 if v > 14 else 0)
        box = diff.getbbox()
        if box:
            pad = int(max(im.size) * 0.01)
            im = im.crop((max(0, box[0] - pad), max(0, box[1] - pad), min(im.width, box[2] + pad), min(im.height, box[3] + pad)))
    W, H = size
    box = (int(W * (1 - 2 * margin)), int(H * (1 - 2 * margin)))
    # Ajusta al marco (ampliando las pequeñas, hasta 2,2x) para que todos los
    # productos ocupen el mismo espacio; un toque de nitidez compensa el aumento.
    k = min(box[0] / im.width, box[1] / im.height, 2.2)
    im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
    if k > 1.05:
        im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=70, threshold=2))
    canvas = Image.new("RGB", size, "white")
    canvas.paste(im, ((W - im.width) // 2, (H - im.height) // 2))
    if tint:
        # El fondo blanco pasa a color arena SIN tocar el producto: solo se
        # tiñe lo blanco que está conectado con el borde (el blanco de dentro,
        # como una etiqueta, se queda blanco) y se difumina el contorno.
        mask = canvas.convert("L").point(lambda v: 255 if v >= 232 else 0)
        for pt in [(0, 0), (W - 1, 0), (0, H - 1), (W - 1, H - 1), (W // 2, 0), (W // 2, H - 1), (0, H // 2), (W - 1, H // 2)]:
            if mask.getpixel(pt) == 255:
                ImageDraw.floodfill(mask, pt, 128)
        bgm = mask.point(lambda v: 255 if v == 128 else 0)
        bgm = bgm.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(4))
        tinted = ImageChops.multiply(canvas, Image.new("RGB", size, ARENA))
        canvas = Image.composite(tinted, canvas, bgm)
    canvas.save(dst, "WEBP", quality=93, method=6)


OUT_P.mkdir(parents=True, exist_ok=True)
OUT_M.mkdir(parents=True, exist_ok=True)

taken, mapping, missing = set(), {}, []
for cat, prod, name, price in rows:
    base = slugify(name) or "producto"
    slug, i = base, 2
    while slug in taken:
        slug = f"{base}-{i}"; i += 1
    taken.add(slug)
    key = next((k for pat, k in RULES.get(prod, []) if re.search(pat, name, re.I)), None)
    folder = FOLDERS.get(prod)
    src = find(folder, key) if key and folder else None
    if not src:
        missing.append(f"{prod} | {name}" + (f"  (regla '{key}' sin archivo)" if key else ""))
        continue
    tile(src, OUT_P / f"{slug}.webp", margin=0.06, trim=True, tint=True)
    mapping[slug] = f"/images/productos/{slug}.webp"

# Productores (logotipos de "3. Imagen proveedor")
brands = {}
for f in sorted(BRANDS.glob("marca-*")):
    s = f.stem.replace("marca-", "")
    s = {"la-catedral-de-navarra": "la-catedral", "sal-d-oro": "d-oro"}.get(s, s)
    tile(f, OUT_M / f"{s}.webp", size=(720, 960), margin=0.12)
    brands[s] = f"/images/productores/{s}.webp"

out = ROOT / "data/images.generated.ts"
out.write_text(
    "/**\n * GENERADO por scripts/importar-fotos.py — no editar a mano.\n */\n\n"
    "/** Foto de cada producto: slug → ruta pública. Sin entrada = marcador. */\n"
    f"export const productImages: Record<string, string> = {json.dumps(mapping, ensure_ascii=False, indent=2)};\n\n"
    "/** Logotipo de cada proveedor: slug → ruta pública. */\n"
    f"export const producerImages: Record<string, string> = {json.dumps(brands, ensure_ascii=False, indent=2)};\n",
    encoding="utf-8",
)
print(f"{len(mapping)} productos con foto de {len(rows)}; {len(brands)} logotipos")
print("\nSIN FOTO:")
print("\n".join(missing))
