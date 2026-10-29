#!/usr/bin/env python3
"""Genera el .htaccess (Apache) de la copia estática: redirecciones de la tienda online,
productos retirados o renombrados y categorías unidas. Uso: python3 scripts/htaccess-estatico.py salida/.htaccess"""
import re, sys
from pathlib import Path
R=str(Path(__file__).resolve().parent.parent)
s=open(R+'/data/removed-products.ts').read()
head, rest = s.split('export const renamedProducts')
ren_part, merged_part = rest.split('export const MERGED_CATEGORIES')
removed=re.findall(r'^  \["([a-z-]+)", "([a-z0-9-]+)"\],$', head, re.M)
renamed=re.findall(r'^  \["([a-z-]+)", "([a-z0-9-]+)", "([a-z0-9-]+)"\],$', ren_part, re.M)
merged=re.findall(r'^  "?([a-z-]+)"?: "([a-z-]+)",$', merged_part, re.M)
moved=re.findall(r'^  \["([a-z-]+)", "([a-z0-9-]+)", "([a-z-]+)"\],$', merged_part.split('movedProducts')[1], re.M) if 'movedProducts' in merged_part else []
t=open(R+'/data/tienda-online.ts').read()
TIENDA=re.search(r'TIENDA_ONLINE = "([^"]+)"',t).group(1)
ONLINE=re.findall(r'^  "?([a-z-]+)"?: "(https://[^"]+)",$', t.split('CATEGORIAS_ONLINE')[1], re.M)
L='(en/|fr/)?'
out=["# Estafeta Gourmet: copia estática de la web (servidor Apache).",
"# Hace las redirecciones que en Vercel hacía la propia web.","",
"DirectoryIndex index.html","ErrorDocument 404 /404.html","Options -Indexes","","RewriteEngine On","",
"# /es/... es la versión en español sin prefijo",
"RewriteRule ^es/?$ / [R=301,L]","RewriteRule ^es/(.*)$ /$1 [R=301,L]","",
"# Toda la tienda (sin categoría ni productor): tienda online",
"RewriteCond %{QUERY_STRING} !(^|&)(productor|categoria)=",
f"RewriteRule ^{L}tienda/?$ {TIENDA} [R=302,L,NE,QSD]","",
"# Categorías que se compran en la tienda online"]
out+=[f"RewriteRule ^{L}tienda/{slug}/?$ {url} [R=302,L,NE]" for slug,url in ONLINE]
out+=["",
"# Productos retirados: a su categoría"]
out+=[f"RewriteRule ^{L}tienda/{c}/{sl}/?$ /$1tienda/{c} [R=301,L]" for c,sl in removed]
out+=["","# Productos con nombre nuevo"]
out+=[f"RewriteRule ^{L}tienda/{c}/{a}/?$ /$1tienda/{c}/{b} [R=301,L]" for c,a,b in renamed]
out+=["","# Productos que cambiaron de categoría"]
out+=[f"RewriteRule ^{L}tienda/{a}/{sl}/?$ /$1tienda/{b}/{sl} [R=301,L]" for a,sl,b in moved]
out+=["","# Categorías que se unieron a otras"]
out+=[f"RewriteRule ^{L}tienda/{a}(/.*)?$ /$1tienda/{b}$2 [R=301,L]" for a,b in merged]
out+=["","# Antigua página de la newsletter",f"RewriteRule ^{L}newsletter/?$ /$1blog [R=301,L]",""]
open(sys.argv[1],'w').write("\n".join(out)+"\n")
print(len(removed),len(renamed),len(merged))
