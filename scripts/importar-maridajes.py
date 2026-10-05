#!/usr/bin/env python3
"""Fotos de los carteles de maridaje y de las fichas de lotes de regalo (PDF).

Uso:
    python3 scripts/importar-maridajes.py carteles-maridaje.pdf fichas-lotes-regalo.pdf

De cada tarjeta del cartel de maridaje (producto + vino) recorta la foto, quita
el blanco sobrante y la pone sobre el fondo arena de la web:
    public/images/maridajes/<n>.webp         (n = 1..18, en el orden del PDF)
De cada ficha de lote (3) recorta cada foto suelta (1..5.webp, en marco 4:5) y
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
if len(sys.argv) < 3:
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
    infos = sorted(page.get_image_info(), key=lambda i: (i["bbox"][0] > 190, i["bbox"][1]))
    left = sorted([i for i in infos if i["bbox"][0] < 200], key=lambda i: i["bbox"][1])
    right = sorted([i for i in infos if i["bbox"][0] >= 200], key=lambda i: i["bbox"][1])
    # las tarjetas (3 por página) están a ~ 200-380, 410-600 y 620-820 pt de alto
    bands = [(190, 400), (400, 610), (610, 830)]
    for lo, hi in bands:
        cell = [i for i in infos if lo <= (i["bbox"][1] + i["bbox"][3]) / 2 < hi]
        if not cell:
            continue
        x0 = min(i["bbox"][0] for i in cell) - 4
        y0 = min(i["bbox"][1] for i in cell) - 4
        x1 = max(i["bbox"][2] for i in cell) + 4
        y1 = max(i["bbox"][3] for i in cell) + 4
        n += 1
        to_arena(clip_image(page, pymupdf.Rect(x0, y0, x1, y1)), out / f"{n}.webp")
print(n, "tarjetas de maridaje")

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
    """Foto principal del lote: todas sus fotos juntas (3 arriba, 2 abajo)."""
    W, H = size
    canvas = Image.new("RGB", size, ARENA)
    layout = [(0, 0), (1, 0), (2, 0), (0.5, 1), (1.5, 1)]
    cw, ch = W // 3, H // 2
    for im, (cx, cy) in zip(ims, layout):
        k = min((cw - 40) / im.width, (ch - 60) / im.height)
        im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
        x = int(cx * cw + (cw - im.width) / 2)
        y = int(cy * ch + (ch - im.height) / 2)
        canvas.paste(im, (x, y))
    return canvas


slugs = ["navarra-en-una-caja", "sobremesa-navarra", "regalo-gourmet"]
doc = pymupdf.open(sys.argv[2])
for slug, page in zip(slugs, doc):
    d = ROOT / "public/images/lotes" / slug
    d.mkdir(parents=True, exist_ok=True)
    infos = sorted(page.get_image_info(), key=lambda i: i["bbox"][0])
    tiles = []
    for k, i in enumerate(infos, 1):
        tmp = d / f"_{k}.webp"
        to_arena(clip_image(page, pymupdf.Rect(*i["bbox"])), tmp, max_w=900)
        tiles.append(Image.open(tmp).convert("RGB"))
        tmp.unlink()
    collage(tiles).save(d / "0.webp", "WEBP", quality=92, method=6)
    for k, im in enumerate(tiles, 1):
        framed(im).save(d / f"{k}.webp", "WEBP", quality=92, method=6)
    print(slug, len(tiles), "fotos")
