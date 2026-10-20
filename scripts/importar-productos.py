#!/usr/bin/env python3
"""
Importa el catálogo desde la hoja de cálculo de productos (.xlsx u .ods) y
genera data/products.generated.ts, que es lo que lee la web.

Uso:
    python3 scripts/importar-productos.py ruta/a/PLANTILLA_ARTÍCULOS.xlsx [--no-bajar]

Con --no-bajar, si la hoja trae para un producto un precio más bajo que el
que ya tiene la web, se queda el de la web (se usó con el EXCEL_WEB de oct.
2026, que traía precios antiguos: la tienda pidió quedarse con los más altos).

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

# Familia de la hoja → slug de categoría (data/categories.ts). Desde el
# EXCEL_WEB de oct. 2026 la hoja usa 11 familias; las antiguas se mantienen
# para poder leer hojas viejas (van a la categoría que las sustituye).
FAMILIAS = {
    "QUESOS": "quesos",
    "EMBUTIDO": "embutidos",
    "VINOS Y LICORES": "vinos",
    "VERDURAS": "verduras",
    "CONSERVAS": "conservas",
    "LEGUMBRES": "legumbres",
    "ACEITES": "aceites",
    "PREPARADO": "preparados",
    "PATES": "pates",
    "CONDIMENTOS": "condimentos",
    "DULCES": "dulces",
    "LOTES": "lotes",
    # Familias de hojas anteriores
    "VINOS": "vinos",
    "BEBIDAS": "vinos",
    "ESPÁRRAGOS": "verduras",
    "ALCACHOFAS": "verduras",
    "PIMIENTO": "verduras",
    "SETAS Y HONGOS": "verduras",
    "LEGUMBRE": "legumbres",
    "ACEITE": "aceites",
    "ENCURTIDOS": "conservas",
    "ATUN Y BONITO": "conservas",
}

# Títulos equivocados en la hoja → título correcto.
CORREGIR_TITULO = {
    # La añada cambia cada año: en la web va sin ella para no cambiar de ficha.
    "GRAN CHIVITE LEGARDETA Blanco 2024": "GRAN CHIVITE LEGARDETA Blanco",
    "GRAN CHIVITE LEGARDETA Tinto 2023": "GRAN CHIVITE LEGARDETA Tinto",
    "CHIVITE COL. 125 VENDIMIA TARDIA. MOSCATEL": "CHIVITE Vendimia Tardía COLECCION 125",
    # La hoja dice 200 g, pero la cuña es de 150 g.
    "LVN CUÑA QUESO DE OVEJA INYECTADO CON TRUFA 200 G.": "LVN CUÑA QUESO DE OVEJA INYECTADO CON TRUFA 150 G",
    "LVN CUÑA QUESO DE OVEJA INYECTADO CON AJO NEGRO 200 G": "LVN CUÑA QUESO DE OVEJA INYECTADO CON AJO NEGRO 150 G",
    "LVN CUÑA QUESO DE OVEJA INYECTADO CON TRUFA 150 G.": "LVN CUÑA QUESO DE OVEJA INYECTADO CON TRUFA 150 G",
    # Se escribe Gaztazarra.
    "LARRA GAZTAHAZARRA Crema oveja 200 g": "LARRA GAZTAZARRA Crema oveja 200 g",
    "EKIA Gaztazaharra": "EKIA Gaztazarra",
    "EKIA gaztahazarra": "EKIA Gaztazarra",
}

# Productos que se venden en la web aunque aún no estén en la hoja
# (categoría, proveedor tal cual en la hoja, título, PVP con IVA). Si la hoja ya
# trae el título, manda la hoja.
EXTRA_PRODUCTOS: list[tuple[str, str, str, float | None]] = []

# Títulos que la hoja repite por error: la segunda fila es otro producto.
# En el EXCEL_WEB de oct. 2026 el chorizo Galocha sale dos veces y la segunda
# es el salchichón (mismo precio).
SEGUNDA_FILA = {"IBERICOMIO Chorizo ibérico Galocha": "IBERICOMIO Salchichón ibérico Galocha"}

# Títulos que la hoja repite con el mismo nombre para formatos distintos: se
# distinguen por el precio (precio → título en la web); las filas con otro
# precio sobran. Cualquier otro título repetido es un duplicado: manda la
# primera fila (así lo pidió la tienda para los de La Catedral, oct. 2026).
FORMATOS_POR_PRECIO: dict[str, dict[float, str]] = {}

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
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) != 1:
        sys.exit(__doc__)
    ruta = Path(args[0])
    filas = leer_xlsx(ruta) if ruta.suffix.lower() == ".xlsx" else leer_ods(ruta)
    cab = [c.upper() for c in filas[0]]
    col_pvp = next((i for i, c in enumerate(cab) if c.strip() == "PVP FINAL"), 3)
    if not (cab[0].startswith("FAMILIA") and cab[1].startswith("SUBFAMILIA")):
        sys.exit(f"Cabecera inesperada: {filas[0][:4]}")

    productos, desconocidas, proveedores = [], Counter(), {}
    vistos, duplicados = set(), []
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
        if titulo in FORMATOS_POR_PRECIO:
            titulo = FORMATOS_POR_PRECIO[titulo].get(precio(pvp))
            if not titulo:
                continue
        if titulo in vistos and titulo in SEGUNDA_FILA:
            titulo = SEGUNDA_FILA[titulo]
        if titulo in vistos:
            duplicados.append(titulo)
            continue
        vistos.add(titulo)
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

    if "--no-bajar" in sys.argv:
        salida = Path(__file__).resolve().parent.parent / "data/products.generated.ts"
        antes = {
            m.group(1).replace('\\"', '"'): float(m.group(2))
            for m in re.finditer(r'^  \[".*?", ".*?", "((?:[^"\\]|\\.)*)", ([\d.]+)\],$', salida.read_text(encoding="utf-8"), re.M)
        }
        subidos = 0
        for i, (c, p, t, pr) in enumerate(productos):
            if pr is not None and t in antes and antes[t] > pr:
                productos[i] = (c, p, t, antes[t])
                subidos += 1
        print(f"--no-bajar: {subidos} precios de la hoja más bajos que los de la web; se quedan los de la web")

    if duplicados:
        print("Filas repetidas en la hoja (se usa la primera): " + "; ".join(duplicados))

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
