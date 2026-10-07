#!/usr/bin/env python3
"""Galería de los lotes de la hoja (Navarrico): foto del lote + fotos de los
productos que lleva que están en el catálogo de Drive.

Uso: python3 scripts/importar-lotes-navarrico.py "<carpeta WEB ESTAFETA GOURMET>"
Genera public/images/lotes/<slug>/*.webp y data/lot-galleries.generated.ts.
Las fotos del lote se toman de public/images/productos/<slug>.webp (ya hechas
por importar-fotos.py). Los productos sin foto en Drive no salen en la galería.
"""
import json, sys
from pathlib import Path
from PIL import Image
sys.path.insert(0, str(Path(__file__).parent))
import importlib.util
spec = importlib.util.spec_from_file_location("lotes", Path(__file__).parent / "importar-lotes.py")
ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1])
CAT = SRC / "2. Catálogos"
NAV = CAT / "22. Conservas El NAVARRRICO"
OUT = ROOT / "public/images/lotes"

# Reutiliza el recorte/teñido de importar-lotes.py sin ejecutarlo.
src = (Path(__file__).parent / "importar-lotes.py").read_text(encoding="utf-8")
start = src.index("def to_rgb_on_arena")
end = src.index("def catalog_file")
ns = {"Image": Image, "ARENA": (236, 226, 205)}
exec(src[start:end], ns)
tile = ns["tile"]

P = "el-navarrico-pimientos-del-piquillo-enteros-extra"
C68 = "el-navarrico-cojonudos-esparragos-de-navarra-6-8-lata"
C810 = "el-navarrico-cojonudos-esparragos-de-navarra-8-10-lata"
COR = "el-navarrico-esparragos-cortos-blancos-extra-extra-gruesos"
PUE = "el-navarrico-puerros-enteros-extra-extrafinos"
ALC = "el-navarrico-corazones-de-alcachofa-al-natural-extra"
GALLERIES = {
    "navarrico-lote-detalle": [("Piquillos de Lodosa enteros extra (El Navarrico)", P)],
    "navarrico-lote-navarro": [("Espárragos de Navarra Cojonudos 6-8 (El Navarrico)", C68), ("Piquillos de Lodosa enteros extra (El Navarrico)", P)],
    "navarrico-lote-fusion-blanco": [("Espárragos de Navarra Cojonudos 8-10 (El Navarrico)", C810), ("Piquillos de Lodosa enteros extra (El Navarrico)", P)],
    "navarrico-lote-fusiontinto": [("Espárragos de Navarra Cojonudos 8-10 (El Navarrico)", C810), ("Piquillos de Lodosa enteros extra (El Navarrico)", P)],
    "navarrico-lote-imprescindible": [("Espárragos de Navarra Cojonudos 6-8 (El Navarrico)", C68), ("Piquillos de Lodosa enteros extra (El Navarrico)", P)],
    "navarrico-lote-gourmet": [("Piquillos de Lodosa enteros extra (El Navarrico)", P), ("Espárragos cortos blancos extra (El Navarrico)", COR), ("Puerros enteros extra extrafinos (El Navarrico)", PUE), ("Corazones de alcachofa al natural extra (El Navarrico)", ALC)],
    "navarrico-lote-capricho": [("Piquillos de Lodosa enteros extra (El Navarrico)", P), ("Espárragos cortos blancos extra (El Navarrico)", COR), ("Puerros enteros extra extrafinos (El Navarrico)", PUE), ("Corazones de alcachofa al natural extra (El Navarrico)", ALC)],
}
out = {}
for slug, items in GALLERIES.items():
    d = OUT / slug
    d.mkdir(parents=True, exist_ok=True)
    main = ROOT / "public/images/productos" / f"{slug}.webp"
    Image.open(main).save(d / "0.webp", "WEBP", quality=93, method=6)
    imgs = [{"src": f"/images/lotes/{slug}/0.webp", "alt": slug}]
    for i, (title, stem) in enumerate(items, 1):
        f = next(NAV.glob(stem + ".*"))
        tile(Image.open(f), d / f"{i}.webp", tint=f.suffix.lower() != ".png")
        imgs.append({"src": f"/images/lotes/{slug}/{i}.webp", "alt": title})
    out[slug] = imgs
(ROOT / "data/lot-galleries.generated.ts").write_text(
    "/**\n * GENERADO por scripts/importar-lotes-navarrico.py — no editar a mano.\n * Galería de los lotes de la hoja: slug → fotos (la primera es el lote; el alt de esa se pone en products.ts).\n */\n\n"
    f"export const lotGalleries: Record<string, {{ src: string; alt: string }}[]> = {json.dumps(out, ensure_ascii=False, indent=2)};\n",
    encoding="utf-8")
print(len(out), "lotes")
