#!/usr/bin/env python3
"""Lotes especiales (carpeta "5. Lotes especiales" de Drive) → web.

Uso (desde la raíz del proyecto):
    python3 scripts/importar-lotes.py "<carpeta WEB ESTAFETA GOURMET descargada de Drive>"

Por cada lote:
  · foto principal: la caja con sus productos (`lote-X-opcion-a-caja.jpg`); si
    no existe (las opciones B no la tienen), se compone una con las fotos de sus
    productos;
  · una foto individual de cada producto que lleva (si la foto está también en
    el catálogo del proveedor se usa esa, que viene en mejor resolución);
  · la lista de productos para la descripción.
Genera public/images/lotes/<slug>/*.webp y data/lots.generated.ts.
Los precios NO están en Drive: se escriben en data/lots.ts.
"""
import json, re, sys
from pathlib import Path
from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))
ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else None
if not SRC or not SRC.exists():
    sys.exit(__doc__)
LOTS = SRC / "5. Lotes especiales"
CAT = SRC / "2. Catálogos"
OUT = ROOT / "public/images/lotes"
ARENA = (236, 226, 205)

BRANDS = [  # prefijo del archivo → nombre
    ("la-catedral-de-navarra", "La Catedral"), ("el-navarrico", "El Navarrico"), ("salamanca-iberica", "Salamanca Ibérica"),
    ("navarra-en-dulce", "Navarra en Dulce"), ("pago-de-cirsus", "Pago de Cirsus"), ("pedro-mayo", "Pedro Mayo"),
    ("ibericomio", "Ibericomio"), ("galocha", "Galocha"), ("aidin", "Aidin"), ("anko", "Anko"), ("arbizu", "Arbizu"),
    ("irache", "Irache"), ("irular", "Irular"), ("leyre", "Leyre"), ("unsi", "Unsi"), ("dantza", "Dantza"),
    ("alconde", "Alconde"), ("chivite", "Chivite"), ("palacio-de-sada", "Palacio de Sada"),
]
OCCASIONS = {
    "amigos": ("Amigos", "para compartir entre amigos"),
    "cumpleanos": ("Cumpleaños", "para celebrar un cumpleaños"),
    "empresas": ("Empresas", "para regalar desde la empresa"),
    "navidad": ("Navidad", "para las fiestas de Navidad"),
    "pareja": ("Pareja", "para disfrutar en pareja"),
    "san-fermin": ("San Fermín", "para vivir San Fermín"),
}


def nice(stem):
    for pre, name in BRANDS:
        if stem == pre or stem.startswith(pre + "-"):
            rest = stem[len(pre):].strip("-")
            break
    else:
        name, rest = "", stem
    rest = re.sub(r"-?\d+$", "", rest) if re.search(r"-\d$", rest) else rest  # "-1" de fotos repetidas
    words = rest.replace("-", " ").strip()
    words = re.sub(r"\b(\d+) (\d+)\b", r"\1-\2", words)
    words = words[:1].upper() + words[1:]
    fixes = {"Esparragos": "Espárragos", "esparragos": "espárragos", "pate": "paté", "habitas": "habitas", "jamon": "jamón",
             "iberico": "ibérico", "salchichon": "salchichón", "chorizo": "chorizo", "alcachofas": "alcachofas",
             "cana": "caña", "pimenton": "pimentón", "campana": "campaña", "menestra": "menestra", "castana": "castaña",
             "patxaran": "patxarán", "coleccion": "colección", "limon": "limón", "crianza": "crianza", "pacharan": "patxarán",
             "almendras marconas": "almendras marconas", "cafe": "café", "piquillo": "piquillo", "gambas": "gambas",
             "vieiras": "vieiras", "rellenos": "rellenos", "rellenas": "rellenas", "pochas a la navarra": "pochas a la navarra",
             "alcachofa": "alcachofa", "cardo": "cardo", "puerros": "puerros", "bollo": "bollo"}
    for a, b in fixes.items():
        words = re.sub(rf"\b{a}\b", b, words, flags=re.I) if a != b else words
    words = words.replace("Altos de inurrieta", "Altos de Inurrieta").replace("Regenera metanoia", "Regenera Metanoia")
    return (f"{words} ({name})" if name else words)


def to_rgb_on_arena(im):
    im = im.convert("RGBA")
    bg = Image.new("RGBA", im.size, ARENA + (255,))
    bg.alpha_composite(im)
    return bg.convert("RGB")


def tile(im, dst, size=(960, 1200), margin=0.07, tint=True):
    """Producto centrado y a tamaño uniforme sobre fondo arena."""
    from PIL import ImageChops, ImageDraw, ImageFilter
    if im.mode in ("RGBA", "LA", "P"):
        im = to_rgb_on_arena(im)
        tint = False
    im = im.convert("RGB")
    diff = ImageChops.difference(im, Image.new("RGB", im.size, ARENA if not tint else "white")).convert("L").point(lambda v: 255 if v > 14 else 0)
    box = diff.getbbox()
    if box:
        im = im.crop(box)
    W, H = size
    mb = (int(W * (1 - 2 * margin)), int(H * (1 - 2 * margin)))
    k = min(mb[0] / im.width, mb[1] / im.height, 2.2)
    im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
    if k > 1.05:
        im = im.filter(ImageFilter.UnsharpMask(radius=1.2, percent=70, threshold=2))
    canvas = Image.new("RGB", size, "white" if tint else ARENA)
    canvas.paste(im, ((W - im.width) // 2, (H - im.height) // 2))
    if tint:
        mask = canvas.convert("L").point(lambda v: 255 if v >= 232 else 0)
        for pt in [(0, 0), (W - 1, 0), (0, H - 1), (W - 1, H - 1)]:
            if mask.getpixel(pt) == 255:
                ImageDraw.floodfill(mask, pt, 128)
        bgm = mask.point(lambda v: 255 if v == 128 else 0).filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(4))
        canvas = Image.composite(ImageChops.multiply(canvas, Image.new("RGB", size, ARENA)), canvas, bgm)
    canvas.save(dst, "WEBP", quality=93, method=6)


def catalog_file(stem):
    for f in CAT.rglob("*"):
        if f.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp") and f.stem == stem:
            return f
    return None


def collage(items, dst, size=(960, 1200)):
    """Foto principal de un lote sin caja: sus productos en fila, sobre arena."""
    W, H = size
    canvas = Image.new("RGB", size, ARENA)
    ims = []
    for f in items:
        im = to_rgb_on_arena(Image.open(f)) if Image.open(f).mode in ("RGBA", "LA", "P") else Image.open(f).convert("RGB")
        ims.append(im)
    from PIL import ImageChops
    trimmed = []
    for im in ims:
        d = ImageChops.difference(im, Image.new("RGB", im.size, ARENA)).convert("L").point(lambda v: 255 if v > 14 else 0)
        b = d.getbbox()
        trimmed.append(im.crop(b) if b else im)
    cols = 3 if len(trimmed) > 4 else 2
    rows = -(-len(trimmed) // cols)
    cw, ch = (W - 60) // cols, (H - 120) // rows
    for i, im in enumerate(trimmed):
        k = min((cw - 20) / im.width, (ch - 20) / im.height)
        im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
        r, c = divmod(i, cols)
        canvas.paste(im, (30 + c * cw + (cw - im.width) // 2, 60 + r * ch + (ch - im.height) // 2))
    canvas.save(dst, "WEBP", quality=93, method=6)


lots = []
for d in sorted(p for p in LOTS.iterdir() if p.is_dir()):
    m = re.match(r"lote-(.+)-opcion-([ab])$", d.name)
    key, opt = m.group(1), m.group(2).upper()
    occ, why = OCCASIONS[key]
    slug = d.name
    out = OUT / slug
    out.mkdir(parents=True, exist_ok=True)
    files = sorted(f for f in d.iterdir() if f.suffix.lower() in (".png", ".jpg", ".jpeg"))
    items = [nice(f.stem) for f in files]
    box = LOTS / f"{slug}-caja.jpg"
    images = []
    if box.exists():
        tile(Image.open(box), out / "0.webp", margin=0.03, tint=True)
    else:
        collage(files, out / "0.webp")
    images.append({"src": f"/images/lotes/{slug}/0.webp", "alt": f"Lote {occ}, opción {opt}: todos los productos"})
    for i, f in enumerate(files, 1):
        src = catalog_file(f.stem)
        tile(Image.open(src or f), out / f"{i}.webp", tint=bool(src) and src.suffix.lower() != ".png")
        images.append({"src": f"/images/lotes/{slug}/{i}.webp", "alt": items[i - 1]})
    lots.append({"slug": slug, "occasion": occ, "why": why, "option": opt, "items": items, "images": images, "hasBox": box.exists()})

(ROOT / "data/lots.generated.ts").write_text(
    "/**\n * GENERADO por scripts/importar-lotes.py — no editar a mano.\n */\n\n"
    "export type LotRow = {\n  slug: string;\n  occasion: string;\n  why: string;\n  option: string;\n  items: string[];\n"
    "  images: { src: string; alt: string }[];\n};\n\n"
    f"export const lotRows: LotRow[] = {json.dumps([{k: v for k, v in l.items() if k != 'hasBox'} for l in lots], ensure_ascii=False, indent=2)};\n",
    encoding="utf-8",
)
for l in lots:
    print(l["slug"], "caja" if l["hasBox"] else "collage", len(l["items"]))
    for n in l["items"]:
        print("   -", n)
