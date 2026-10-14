"""
Fichas de producto (peso, ingredientes, alérgenos) desde el Excel
"Productos_ingredientes_alergenos.xlsx" → data/specs.generated.ts.

Uso:  python3 scripts/importar-fichas.py <excel.xlsx>      (necesita: pip install openpyxl)

Cada fila del Excel se une con el producto de la web por el nombre del artículo
(sin tildes ni signos). Lo que pone "No publicado" / "No indicado" no se copia.
La columna "Nivel del dato" se guarda: solo "Exacto" es el mismo producto y
formato; el resto se muestra en la web como información de referencia.
"""
import json
import re
import sys
import unicodedata
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parent.parent


def slugify(s):  # igual que lib/slug.ts
    s = "".join(c for c in unicodedata.normalize("NFD", s) if not unicodedata.combining(c)).lower().replace("&", " y ")
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")[:80]


def empty(v):
    return v is None or re.match(r"^\s*(no publicado|no indicad[oa]s?)\b", str(v), re.I) is not None


def clean(v):
    return re.sub(r"\s+", " ", str(v)).strip()


# Notas internas del Excel que no deben salir en la web.
NOTAS = re.compile(r"\s*\((?:[^)]*(?:según|deducido|también|tu hoja|no publicado|peso neto|Dantza)[^)]*)\)", re.I)


def tidy(v):
    v = clean(v)
    v = re.sub(r";\s*pieza entera publicada.*$", "", v)
    v = re.sub(r";\s*también existe.*$", "", v)
    v = v.replace("Formato localizado: ", "")
    return clean(NOTAS.sub("", v))


def other_data(v):
    """Variedad, añada y grado. Se descartan las notas internas del Excel (p. ej. cuando las tiendas no coinciden)."""
    v = tidy(v)
    if re.search(r"no coinciden", v):
        return None
    return re.sub(r"^Ficha actual: añada", "Añada", v)


def ingredients_text(v):
    """Lista de ingredientes sin las notas internas del Excel ("según el nombre", "la tienda menciona…")."""
    return re.sub(r"\s*\((?:según el nombre|la tienda menciona[^)]*)\)", "", clean(v))


def weight(v):
    if empty(v):
        return None, False
    v = tidy(v)
    return v, v.startswith("Ref.")


def allergens(v):
    if empty(v):
        return None
    v = clean(v)
    if v.startswith("Sulfitos (mención obligatoria"):
        return "Contiene sulfitos"
    v = re.sub(r"\s*\([^)]*etiqueta no localizada[^)]*\)", "", v)
    v = re.sub(r"\s*\(según ficha\)", "", v)
    v = re.sub(r"\.? ?Sello 'Sin gluten' en la web; no hay apartado de alérgenos\.?", "", v)
    if v.startswith("Sello 'Sin gluten'"):
        return None
    v = v.replace("Según cada producto (almendra, piñón, leche, huevo); sello 'Sin gluten'", "Según cada producto (almendra, piñón, leche, huevo)")
    v = v.replace("No se indican (la lista no incluye alérgenos)", "Ninguno en la lista de ingredientes")
    return clean(v)


def main(path):
    ws = openpyxl.load_workbook(path, data_only=True)["Productos"]
    out = {}
    for r in ws.iter_rows(min_row=2, values_only=True):
        name, ingredients, alerg, peso, pack, other, level = r[3], r[5], r[6], r[7], r[8], r[9], r[10]
        if not name:
            continue
        w, approx = weight(peso)
        spec = {
            "w": None if approx else w,
            "ref": w if approx else None,
            "i": None if empty(ingredients) else ingredients_text(ingredients),
            "a": allergens(alerg),
            "p": None if empty(pack) else tidy(pack),
            "o": other_data(other) if other and level == "Exacto" and not empty(other) else None,
            "exact": level == "Exacto",
        }
        spec = {k: v for k, v in spec.items() if v not in (None, False) or k == "exact"}
        if len(spec) > 1:
            out[slugify(name)] = spec
    ts = (
        "/**\n * GENERADO por scripts/importar-fichas.py — no editar a mano.\n"
        " * Fichas de producto del Excel de ingredientes y alérgenos, por slugify(título de la hoja).\n"
        " * w peso/volumen · ref peso de referencia (otro formato) · i ingredientes · a alérgenos · p envase · o otros datos · exact = dato del mismo producto y formato.\n */\n"
        "export type SpecRow = { w?: string; ref?: string; i?: string; a?: string; p?: string; o?: string; exact: boolean };\n\n"
        "export const specRows: Record<string, SpecRow> = "
        + json.dumps(out, ensure_ascii=False, indent=2)
        + ";\n"
    )
    (ROOT / "data/specs.generated.ts").write_text(ts, encoding="utf-8")
    print(f"{len(out)} fichas con algún dato → data/specs.generated.ts")


if __name__ == "__main__":
    main(sys.argv[1])
