#!/usr/bin/env bash
# Copia estática de la web para subirla a otro servidor (p. ej. el del dominio
# estafetagourmet.com por FTP). Deja en ./copia-estatica una carpeta con un
# index.html por página (es, en y fr), las fotos, los estilos y un .htaccess
# para Apache con las redirecciones.
#
# Uso:  bash scripts/copia-estatica.sh [https://www.estafetagourmet.com]
#
# Lo que NO funciona en la copia estática (necesita el servidor de la web):
# el alta en la newsletter y el formulario de contacto (/api/...), el panel del
# blog (/admin) y la detección automática del idioma.
set -euo pipefail
cd "$(dirname "$0")/.."
SITE="${1:-https://www.estafetagourmet.com}"
OUT="copia-estatica"
PORT=3123

rm -rf .next "$OUT"
STATIC_COPY=1 NEXT_PUBLIC_SITE_URL="$SITE" npx next build
npx next start -p "$PORT" > /dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT
for _ in $(seq 60); do curl -s -o /dev/null "localhost:$PORT/" && break; sleep 2; done

# Páginas: las del sitemap más las que no salen en él.
paths=$(curl -s "localhost:$PORT/sitemap.xml" | grep -o '<loc>[^<]*</loc>' | sed "s#<[^>]*>##g;s#$SITE##;s#^\$#/#")
for l in "" /en /fr; do paths+=$'\n'"$l/envios-y-devoluciones"$'\n'"$l/buscar"$'\n'"$l/cesta"; done
mkdir -p "$OUT"
while read -r p; do
  [ -z "$p" ] && continue
  mkdir -p "$OUT${p%/}"
  curl -sf -o "$OUT${p%/}/index.html" "localhost:$PORT$p"
done <<< "$(sort -u <<< "$paths")"
# La tienda con filtros (?productor=, ?categoria=) se abre en /tienda/.
for l in "" /en /fr; do mkdir -p "$OUT$l/tienda"; curl -sf -o "$OUT$l/tienda/index.html" "localhost:$PORT$l/tienda?categoria=quesos"; done
curl -s -o "$OUT/404.html" "localhost:$PORT/pagina-que-no-existe" || true
for f in robots.txt sitemap.xml favicon.ico; do curl -sf -o "$OUT/$f" "localhost:$PORT/$f"; done

mkdir -p "$OUT/_next"
cp -r .next/static "$OUT/_next/static"
cp -r public/. "$OUT/"
python3 scripts/htaccess-estatico.py "$OUT/.htaccess"
echo "Listo: $OUT ($(find "$OUT" -name index.html | wc -l) páginas)"
