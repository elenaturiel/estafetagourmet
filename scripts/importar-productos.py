#!/usr/bin/env python3
"""
Importa el catálogo desde la hoja de cálculo de productos (.ods) y genera
data/products.generated.ts, que es lo que lee la web.

Uso:
    python3 scripts/importar-productos.py ruta/a/productos.ods

La hoja debe tener estas columnas (con cabecera en la primera fila):
    FAMILIA | SUBFAMILIA | ARTICULO | PVP final

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
    "IRULAR Mermelada patxarán",
    "ARBIZU Paté de morcilla",
    "LVN CUÑA QUESO DE OVEJA INYECTADO CON ACEITE DE ROMERO 200 G",
    "ECOPRO LOTE EXCLUSICVE 12 ACEITES",
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
    filas = leer_ods(Path(sys.argv[1]))
    cab = [c.upper() for c in filas[0]]
    if not (cab[0].startswith("FAMILIA") and cab[1].startswith("SUBFAMILIA")):
        sys.exit(f"Cabecera inesperada: {filas[0][:4]}")

    productos, desconocidas, proveedores = [], Counter(), {}
    for f in filas[1:]:
        familia, sub, art = (f + ["", "", "", ""])[:3]
        pvp = (f + ["", "", "", ""])[3]
        if not (familia and sub and art):
            continue
        cat = FAMILIAS.get(familia.upper())
        if not cat:
            desconocidas[familia] += 1
            continue
        nombre_p = nombre_proveedor(sub.upper())
        proveedores[slugify(nombre_p)] = nombre_p
        titulo = limpiar_nombre(art)
        if titulo in DESCATALOGADOS:
            continue
        # Los lotes de El Navarrico ya no se venden.
        if cat == "lotes" and slugify(nombre_p) == "el-navarrico":
            continue
        productos.append((cat, slugify(nombre_p), titulo, precio(pvp)))

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
        " * Para actualizar precios o productos: python3 scripts/importar-productos.py <hoja.ods>",
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
