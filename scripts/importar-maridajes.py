#!/usr/bin/env python3
"""Fotos de los carteles de maridaje y de las fichas de lotes de regalo (PDF).

Uso:
    python3 scripts/importar-maridajes.py carteles-maridaje.pdf fichas-lotes-regalo.pdf

De cada tarjeta del cartel de maridaje saca la foto del producto y la de la
bebida, las junta (sin el «+» del cartel y con poca separación) y las pone
sobre el fondo arena de la web, en un marco 4:3:
    public/images/maridajes/pareja-<n>.webp  (n = 1..18, en el orden del PDF)
De cada ficha de lote (9) recorta cada foto suelta (1..5.webp, en marco 4:5) y
hace la principal juntándolas (0.webp):
    public/images/lotes/<slug>/
Los textos están escritos a mano en data/pairings.ts y data/gift-lots.ts.
Necesita pymupdf y Pillow.
"""
import sys
from pathlib import Path
import pymupdf
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parent.parent
ARENA = (236, 226, 205)
if len(sys.argv) < 2:
    sys.exit(__doc__)


def clip_image(page, rect, dpi=260):
    pix = page.get_pixmap(clip=rect, dpi=dpi, alpha=False)
    return Image.frombytes("RGB", (pix.width, pix.height), pix.samples)


def to_arena(im, dst, margin=0.04, max_w=1400):
    """Recorta el blanco, lo tiñe de arena (solo el fondo) y guarda en WebP."""
    from PIL import ImageDraw, ImageFilter
    diff = ImageChops.difference(im, Image.new("RGB", im.size, "white")).convert("L").point(lambda v: 255 if v > 14 else 0)
    box = diff.getbbox()
    if box:
        im = im.crop(box)
    pad = int(max(im.size) * margin)
    canvas = Image.new("RGB", (im.width + 2 * pad, im.height + 2 * pad), "white")
    canvas.paste(im, (pad, pad))
    mask = canvas.convert("L").point(lambda v: 255 if v >= 232 else 0)
    ImageDraw.floodfill(mask, (0, 0), 128)
    bgm = mask.point(lambda v: 255 if v == 128 else 0).filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(3))
    canvas = Image.composite(ImageChops.multiply(canvas, Image.new("RGB", canvas.size, ARENA)), canvas, bgm)
    if canvas.width > max_w:
        canvas = canvas.resize((max_w, round(canvas.height * max_w / canvas.width)), Image.LANCZOS)
    canvas.save(dst, "WEBP", quality=92, method=6)


def trim_white(im):
    diff = ImageChops.difference(im, Image.new("RGB", im.size, "white")).convert("L").point(lambda v: 255 if v > 14 else 0)
    box = diff.getbbox()
    return im.crop(box) if box else im


def pair(ims, size=(1200, 900), gap=0.05, box=0.86):
    """Las fotos de una tarjeta, una junto a otra y centradas en un marco 4:3 sobre arena."""
    from PIL import ImageDraw, ImageFilter
    h = max(im.height for im in ims)
    g = round(h * gap)
    row = Image.new("RGB", (sum(im.width for im in ims) + g * (len(ims) - 1), h), "white")
    x = 0
    for im in ims:
        row.paste(im, (x, (h - im.height) // 2))
        x += im.width + g
    W, H = size
    k = min(W * box / row.width, H * box / row.height, 2.5)
    row = row.resize((round(row.width * k), round(row.height * k)), Image.LANCZOS)
    canvas = Image.new("RGB", size, "white")
    canvas.paste(row, ((W - row.width) // 2, (H - row.height) // 2))
    mask = canvas.convert("L").point(lambda v: 255 if v >= 232 else 0)
    ImageDraw.floodfill(mask, (0, 0), 128)
    bgm = mask.point(lambda v: 255 if v == 128 else 0).filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(3))
    return Image.composite(ImageChops.multiply(canvas, Image.new("RGB", size, ARENA)), canvas, bgm)


def rows(infos, tol=40):
    out = []
    for im in sorted(infos, key=lambda i: i["bbox"][1]):
        if out and abs(out[-1][0]["bbox"][1] - im["bbox"][1]) < tol * 3 and abs(out[-1][0]["bbox"][1] + 40 - im["bbox"][1]) < 1000:
            pass
        out.append([im])
    return out


# ---- carteles de maridaje: 6 páginas x 3 tarjetas ----
doc = pymupdf.open(sys.argv[1])
out = ROOT / "public/images/maridajes"
out.mkdir(parents=True, exist_ok=True)
n = 0
for page in doc:
    # (la imagen de arriba a la derecha, y < 130, es el logotipo del PDF)
    infos = sorted([i for i in page.get_image_info() if i["bbox"][1] > 130], key=lambda i: (i["bbox"][0] > 190, i["bbox"][1]))
    left = sorted([i for i in infos if i["bbox"][0] < 200], key=lambda i: i["bbox"][1])
    right = sorted([i for i in infos if i["bbox"][0] >= 200], key=lambda i: i["bbox"][1])
    # las tarjetas (3 por página) están a ~ 200-380, 410-600 y 620-820 pt de alto
    bands = [(190, 400), (400, 610), (610, 830)]
    for lo, hi in bands:
        cell = [i for i in infos if lo <= (i["bbox"][1] + i["bbox"][3]) / 2 < hi]
        if not cell:
            continue
        n += 1
        # cada foto por separado (el «+» del cartel queda fuera) y juntas después
        ims = [trim_white(clip_image(page, pymupdf.Rect(*i["bbox"]))) for i in sorted(cell, key=lambda i: i["bbox"][0])]
        pair(ims).save(out / f"pareja-{n}.webp", "WEBP", quality=90, method=6)
print(n, "tarjetas de maridaje")

if len(sys.argv) < 3:
    sys.exit(0)

# ---- fichas de lote de regalo ----
def framed(im, size=(960, 1200), box=(0.9, 0.9), upscale=2.0):
    """La foto centrada y a buen tamaño en un marco 4:5 sobre arena (así no la recorta la tarjeta)."""
    W, H = size
    k = min(W * box[0] / im.width, H * box[1] / im.height, upscale)
    im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
    canvas = Image.new("RGB", size, ARENA)
    canvas.paste(im, ((W - im.width) // 2, (H - im.height) // 2))
    return canvas


def collage(ims, size=(960, 1200)):
    """Foto principal del lote: todas sus fotos juntas, en 2 filas (2+2, 3+2 o 3+3)."""
    W, H = size
    canvas = Image.new("RGB", size, ARENA)
    n = len(ims)
    top = 2 if n <= 4 else 3
    rows = [ims[:top], ims[top:]]
    rh = H // 2
    for r, row in enumerate(rows):
        if not row:
            continue
        cw = W // top
        x0 = (W - cw * len(row)) // 2
        for c, im in enumerate(row):
            k = min((cw - 50) / im.width, (rh - 80) / im.height)
            im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
            canvas.paste(im, (x0 + c * cw + (cw - im.width) // 2, r * rh + (rh - im.height) // 2))
    return canvas


# Fotos del PDF que no corresponden a lo que lleva el lote (por posición, desde 1).
SKIP = {"dehesa": [4]}  # la ficha de Dehesa trae una foto de Sal d'Oro que el lote no incluye

slugs = ["navarra-en-una-caja", "sobremesa-navarra", "regalo-gourmet", "txupinazo", "brisa-del-cantabrico", "dehesa", "huerta-de-la-ribera", "dulce-tentacion", "oro-de-navarra"]
doc = pymupdf.open(sys.argv[2])
for slug, page in zip(slugs, doc):
    d = ROOT / "public/images/lotes" / slug
    d.mkdir(parents=True, exist_ok=True)
    infos = sorted([i for i in page.get_image_info() if i["bbox"][1] > 130], key=lambda i: i["bbox"][0])
    tiles = []
    infos = [i for k, i in enumerate(infos, 1) if k not in SKIP.get(slug, [])]
    for k, i in enumerate(infos, 1):
        tmp = d / f"_{k}.webp"
        to_arena(clip_image(page, pymupdf.Rect(*i["bbox"])), tmp, max_w=900)
        tiles.append(Image.open(tmp).convert("RGB"))
        tmp.unlink()
    collage(tiles).save(d / "0.webp", "WEBP", quality=92, method=6)
    for k, im in enumerate(tiles, 1):
        framed(im).save(d / f"{k}.webp", "WEBP", quality=92, method=6)
    print(slug, len(tiles), "fotos")
