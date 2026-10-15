#!/usr/bin/env python3
"""
Importa el catálogo desde la hoja de cálculo de productos (.xlsx u .ods) y
genera data/products.generated.ts, que es lo que lee la web.

Uso:
    python3 scripts/importar-productos.py ruta/a/PLANTILLA_ARTÍCULOS.xlsx

Se lee la primera hoja (en la plantilla, «Plantilla (2)»). Las tres primeras
columnas deben ser FAMILIA | SUBFAMILIA | ARTICULO (con cabecera en la primera
fila); el precio sale de la columna cuya cabecera es «PVP final» (en la
plantilla, la H) o, si no la hay, de la cuarta.

- FAMILIA     → categoría de la tienda (ver FAMILIAS más abajo)
- SUBFAMILIA  → proveedor / productor (filtro "Productor")
- ARTICULO    → título del producto (se respeta tal cual; solo se limpian
                guiones bajos y guiones que separan palabras)
- PVP final   → precio con IVA. Vacío o 0 = "Precio a consultar"

Si aparece una familia que no está en FAMILIAS, el script se detiene y lo
dice: añádela aquí y crea la categoría en data/categories.ts.

No edites data/products.generated.ts a mano (se sobrescribe al importar).
Lo que sí se edita a mano: data/products.ts (destacados, etiquetas…),
data/producers.ts (localidades, fotos) y data/categories.ts.
"""
import re
import sys
import unicodedata
import zipfile
from collections import Counter
from pathlib import Path
from xml.etree import ElementTree as ET

# Productos descatalogados: se ignoran aunque sigan en la hoja (título tal cual sale en la web).
DESCATALOGADOS = {
    "LVN CUÑA QUESO DE OVEJA INYECTADO CON ACEITE DE ROMERO 200 G",
    "ECOPRO LOTE EXCLUSICVE 12 ACEITES",
    # Fuera de la plantilla de artículos (PLANTILLA_ARTÍCULOS.xlsx, oct. 2026):
    "LVN QUESO SEMICURADO 1/2 PIEZAS 400 G.",
    "LVN QUESO CURADO 1/2 PIEZAS 400 G.",
    "LVN QUESO OVEJA 1/2 PIEZAS 400 G.",
    "LVN QUESO DE OVEJA V. NAVARRA AHUM. 1/2 PIEZA 400 G.",
    "LVN CREMA AL QUESO SUAVE 125 GR.",
    "AIDIN mermelada de otoño",
    "LC ESPÁRRAGO 04-06 FRASCO",
    "LC Pencas acelga natural",
    "LVN CREMA AL QUESO AÑEJO INTENSO 125 GR.",
    "LVN CREMA AL QUESO DE OVEJA 125 GR.",
    "LVN CREMA AL QUESO DE CABRA 125 GR.",
    "NAVARRICO ESPÁRRAGOS ALIÑADOS",
    "DANTZA Espárrago DO Navarra Lata 1/2 Kg",
    "DANTZA Espárrago DO Navarra Lata Fiesta",
    "DANTZA Espárragos blancos de Navarra (Edición Especial)",
    "DANTZA Espárrago Extra Grueso (Edición Especial)",
    "DANTZA Yemas DO Navarra frasco B 250 ( gruesas)",
    "DANTZA Yemas DO Navarra frasco B 250 (medianas)",
    "LA MAJA AOVE ALFAR 5 l",
    "MONJARDIN AOVE arbequina 3000ml",
    "HQ ALHEMA AOVE 3000ml",
    "PCIRSUS Tinto O II SELECCIÓN",
    "PCIRSUS Pack Cirsus Edición especial",
    "PCIRSUS Pack Cirsus Selecto",
    "PCIRSUS Pack Cirsus Premium",
    "PCIRSUS Pack Cirsus Familia",
    "OCHOA Gran Reserva",
    "NAVARRA Chocolate sabor nº7",
    "NAVARRA Chocolate sabor nº8",
    "NAVARRA Chocolate sabor nº9",
    "NAVARRA Chocolate sabor nº10",
    "NAVARRA Chocolate sabor nº11",
    "NAVARRA Chocolate sabor nº12",
    "NAVARRA Chocolate sabor nº13",
    "NAVARRA Galletas de patxaran",
    "AIDIN mermelada de albaricoque",
    "AIDIN mermelada de cereza",
    "AIDIN mermelada de ciruela",
    "LEYRE TABLETON NEGRO ALMENDRAS 800 GRS.",
    "KATEALDE Foie gras tarro",
    "KATEALDE Bloc de foie pato con piñon",
    "KATEALDE Bloc de foie pato con almendra",
    "KATEALDE Latón campaña pimienta o finas hierbas",
    "KATEALDE Lote historia del foie",
    "KATEALDE Cesta foie gras",
    "ARBIZU Txistorra 1 kg",
    "ARBIZU Chorizo individual oreado",
    "IBERICOMIO Jamón de cebo 50% ibérico Loncheado",
}

# Familia de la hoja → slug de categoría (data/categories.ts)
FAMILIAS = {
    "QUESOS": "quesos",
    "EMBUTIDO": "embutidos",
    "VINOS": "vinos",
    "ESPÁRRAGOS": "esparragos",
    "ALCACHOFAS": "alcachofas",
    "PIMIENTO": "pimientos",
    "LEGUMBRE": "legumbres",
    "ACEITE": "aceites",
    "PREPARADO": "preparados",
    "PATES": "pates",
    "ENCURTIDOS": "encurtidos",
    "CONDIMENTOS": "condimentos",
    "DULCES": "dulces",
    "BEBIDAS": "bebidas",
    "LOTES": "lotes",
    "ATUN Y BONITO": "conservas",  # ya no es categoría propia
    "SETAS Y HONGOS": "setas-y-hongos",
}

# Títulos equivocados en la hoja → título correcto. En la plantilla de oct. 2026
# los tamaños de La Maja Alfar Arbequina están cambiados (el de 11,20 € es el
# de 1000 ml y el de 5,30 €, el de 250 ml). Quitar cuando se corrija la hoja.
CORREGIR_TITULO = {
    "LA MAJA AOVE ALFAR ARBEQUINA 250": "LA MAJA AOVE ALFAR ARBEQUINA 1000",
    "LA MAJA AOVE ALFAR ARBEQUINA 1000": "LA MAJA AOVE ALFAR ARBEQUINA 250",
    # La añada cambia cada año: en la web va sin ella para no cambiar de ficha.
    "GRAN CHIVITE LEGARDETA Blanco 2024": "GRAN CHIVITE LEGARDETA Blanco",
    "GRAN CHIVITE LEGARDETA Tinto 2023": "GRAN CHIVITE LEGARDETA Tinto",
    "CHIVITE COL. 125 VENDIMIA TARDIA. MOSCATEL": "CHIVITE Vendimia Tardía COLECCION 125",
}

# Productos que se venden en la web aunque aún no estén en la hoja
# (categoría, proveedor tal cual en la hoja, título, PVP con IVA). Si la hoja ya
# trae el título, manda la hoja.
EXTRA_PRODUCTOS = [
    ("embutidos", "LARRASOAÑA", "LARRASOAÑA txistorra dulce 220g", 3.5),
    ("embutidos", "LARRASOAÑA", "LARRASOAÑA txistorra picante 220g", 3.5),
]

# Proveedores escritos de dos formas en la hoja → forma única
ALIAS_PROVEEDOR = {"NAVARRA ENDULCE": "NAVARRA EN DULCE"}

# Cómo se escribe el nombre de cada proveedor en la web (el resto se pasa a
# "Título" automáticamente: LA CATEDRAL → La Catedral).
NOMBRES_PROVEEDOR = {
    "ANKO": "Anko",
    "D'ORO": "D'Oro",
    "IBERICOMIO": "Ibericomio",
    "SALAMANCA IBÉRICA": "Salamanca Ibérica",
    "GRUPO LA NAVARRA": "Grupo La Navarra",
}
MINUSCULAS = {"de", "del", "la", "el", "en", "y", "los", "las"}

NS = {
    "t": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
    "x": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
}
T = "{%s}" % NS["t"]


def slugify(s: str) -> str:
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn").lower()
    s = s.replace("&", " y ")
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")[:80]


def nombre_proveedor(raw: str) -> str:
    raw = ALIAS_PROVEEDOR.get(raw, raw)
    if raw in NOMBRES_PROVEEDOR:
        return NOMBRES_PROVEEDOR[raw]
    palabras = raw.lower().split()
    return " ".join(
        w if (i > 0 and w in MINUSCULAS) else w.capitalize() for i, w in enumerate(palabras)
    )


def limpiar_nombre(n: str) -> str:
    n = n.replace("’", "'").replace("_", " ")
    n = re.sub(r"(?<=[^\W\d_])-(?=\w)", " ", n)  # palabra-palabra → palabra palabra
    n = re.sub(r"\s-(?=\w)", " ", n)  # " -palabra" → " palabra"
    return re.sub(r"\s+", " ", n).strip()


def precio(txt: str):
    t = re.sub(r"[^\d,.]", "", txt).replace(",", ".")
    if not t:
        return None
    try:
        v = round(float(t), 2)
    except ValueError:
        return None
    return v if v > 0 else None


def leer_xlsx(path: Path):
    """Filas de la primera hoja de un .xlsx, con cada celda en su columna."""
    m = "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}"
    r = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
    z = zipfile.ZipFile(path)
    textos = []
    if "xl/sharedStrings.xml" in z.namelist():
        for si in ET.fromstring(z.read("xl/sharedStrings.xml")).iter(m + "si"):
            textos.append("".join(t.text or "" for t in si.iter(m + "t")))
    primera = ET.fromstring(z.read("xl/workbook.xml")).find(f"{m}sheets/{m}sheet")
    rels = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
    destino = next(x.get("Target") for x in rels if x.get("Id") == primera.get(r + "id"))
    hoja = ET.fromstring(z.read("xl/" + destino.lstrip("/").removeprefix("xl/")))

    def col(ref: str) -> int:
        n = 0
        for ch in re.match(r"[A-Z]+", ref).group():
            n = n * 26 + ord(ch) - 64
        return n - 1

    filas = []
    for fila in hoja.iter(m + "row"):
        celdas = {}
        for c in fila.iter(m + "c"):
            v, t = c.find(m + "v"), c.get("t")
            if t == "s" and v is not None:
                txt = textos[int(v.text)]
            elif t == "inlineStr":
                txt = "".join(x.text or "" for x in c.iter(m + "t"))
            else:
                txt = v.text if v is not None else ""
            celdas[col(c.get("r"))] = (txt or "").strip()
        if any(celdas.values()):
            filas.append([celdas.get(i, "") for i in range(max(celdas) + 1)])
    return filas


def leer_ods(path: Path):
    root = ET.fromstring(zipfile.ZipFile(path).read("content.xml"))
    filas = []
    for tr in root.iter(T + "table-row"):
        celdas = []
        for c in tr:
            if c.tag not in (T + "table-cell", T + "covered-table-cell"):
                continue
            n = min(int(c.get(T + "number-columns-repeated", "1")), 20)
            txt = "".join("".join(p.itertext()) for p in c.findall("x:p", NS)).strip()
            celdas.extend([txt] * n)
        if any(celdas):
            filas.append(celdas)
    return filas


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    ruta = Path(sys.argv[1])
    filas = leer_xlsx(ruta) if ruta.suffix.lower() == ".xlsx" else leer_ods(ruta)
    cab = [c.upper() for c in filas[0]]
    col_pvp = next((i for i, c in enumerate(cab) if c.strip() == "PVP FINAL"), 3)
    if not (cab[0].startswith("FAMILIA") and cab[1].startswith("SUBFAMILIA")):
        sys.exit(f"Cabecera inesperada: {filas[0][:4]}")

    productos, desconocidas, proveedores = [], Counter(), {}
    for f in filas[1:]:
        familia, sub, art = (f + ["", "", "", ""])[:3]
        pvp = f[col_pvp] if col_pvp < len(f) else ""
        if not (familia and sub and art):
            continue
        cat = FAMILIAS.get(familia.upper())
        if not cat:
            desconocidas[familia] += 1
            continue
        nombre_p = nombre_proveedor(sub.upper())
        proveedores[slugify(nombre_p)] = nombre_p
        titulo = limpiar_nombre(art)
        titulo = CORREGIR_TITULO.get(titulo, titulo)
        if titulo in DESCATALOGADOS:
            continue
        # Los lotes de El Navarrico ya no se venden.
        if cat == "lotes" and slugify(nombre_p) == "el-navarrico":
            continue
        productos.append((cat, slugify(nombre_p), titulo, precio(pvp)))

    titulos = {p[2] for p in productos}
    for cat, sub, titulo, pvp in EXTRA_PRODUCTOS:
        if titulo not in titulos:
            nombre_p = nombre_proveedor(sub.upper())
            proveedores[slugify(nombre_p)] = nombre_p
            productos.append((cat, slugify(nombre_p), titulo, pvp))

    if desconocidas:
        sys.exit(
            "Familias sin categoría (añádelas a FAMILIAS y a data/categories.ts): "
            + ", ".join(f"{k} ({v})" for k, v in desconocidas.items())
        )

    def ts(s: str) -> str:
        return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'

    out = [
        "/**",
        " * GENERADO por scripts/importar-productos.py — no editar a mano.",
        " * Para actualizar precios o productos: python3 scripts/importar-productos.py <PLANTILLA_ARTÍCULOS.xlsx>",
        " */",
        "",
        "/** [categoría, proveedor, título del artículo, precio con IVA (null = a consultar)] */",
        "export type ProductRow = [category: string, producer: string, name: string, price: number | null];",
        "",
        "/** Proveedores (subfamilia): slug → nombre. */",
        "export const producerNames: Record<string, string> = {",
        *[f"  {ts(k)}: {ts(v)}," for k, v in sorted(proveedores.items())],
        "};",
        "",
        "export const productRows: ProductRow[] = [",
        *[
            f"  [{ts(c)}, {ts(p)}, {ts(n)}, {'null' if pr is None else pr}],"
            for c, p, n, pr in productos
        ],
        "];",
        "",
    ]
    destino = Path(__file__).resolve().parent.parent / "data" / "products.generated.ts"
    destino.write_text("\n".join(out), encoding="utf-8")
    sin_precio = sum(1 for p in productos if p[3] is None)
    print(f"{len(productos)} productos, {len(proveedores)} proveedores, {sin_precio} sin precio → {destino}")


if __name__ == "__main__":
    main()
