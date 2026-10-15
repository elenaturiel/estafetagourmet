/**
 * GENERADO por scripts/importar-fichas.py — no editar a mano.
 * Fichas de producto del Excel de ingredientes y alérgenos, por slugify(título de la hoja).
 * w peso/volumen · ref peso de referencia (otro formato) · i ingredientes · a alérgenos · p envase · o otros datos · exact = dato del mismo producto y formato.
 */
export type SpecRow = { w?: string; ref?: string; i?: string; a?: string; p?: string; o?: string; exact: boolean };

export const specRows: Record<string, SpecRow> = {
  "lvn-queso-semicurado-1-2-piezas-400-g": {
    "w": "400 g",
    "i": "Leche pasteurizada de vaca y oveja, sal, coagulante microbiano, fermentos lácticos y conservador: E-252. Corteza no comestible.",
    "a": "Leche (incluida lactosa)",
    "exact": false
  },
  "lvn-queso-curado-1-2-piezas-400-g": {
    "w": "400 g",
    "i": "Leche pasteurizada de vaca (mínimo 80 %), leche pasteurizada de oveja (mínimo 5 %), sal, cuajo, fermentos lácticos. Conservador E-252. Corteza no comestible; conservadores en corteza E-202 y E-235 y colorante E-172.",
    "a": "Leche y derivados",
    "exact": false
  },
  "lvn-queso-reserva-1-2-piezas-350-g": {
    "w": "350 g",
    "a": "Leche",
    "exact": false
  },
  "lvn-queso-oveja-1-2-piezas-400-g": {
    "w": "400 g",
    "i": "Leche cruda de oveja, sal, cuajo, fermentos lácticos y conservadores: E-252 y E-1105 (lisozima: derivado del huevo). Corteza no comestible; conservadores en corteza E-202 y E-235 y colorante E-172.",
    "a": "Leche (incluida lactosa) y huevo (lisozima)",
    "p": "Pieza entera de ± 3 kg: ø 19 x 11 cm",
    "exact": false
  },
  "lvn-queso-de-oveja-v-navarra-ahum-1-2-pieza-400-g": {
    "w": "400 g",
    "i": "Leche cruda de oveja (lista completa no publicada)",
    "a": "Leche",
    "exact": false
  },
  "lvn-cuna-de-queso-d-o-idiazabal-ahum-250-g": {
    "w": "250 g",
    "a": "Leche",
    "exact": false
  },
  "lvn-cuna-de-queso-d-o-idiazabal-nat-250-g": {
    "w": "250 g",
    "a": "Leche",
    "exact": false
  },
  "lvn-cuna-de-queso-oveja-v-navarra-ahum-250-g": {
    "w": "250 g",
    "i": "Leche cruda de oveja (lista completa no publicada)",
    "a": "Leche",
    "exact": false
  },
  "lvn-cuna-de-queso-oveja-v-navarra-nat-250-g": {
    "w": "250 g",
    "i": "Leche cruda de oveja (lista completa no publicada)",
    "a": "Leche",
    "exact": false
  },
  "lvn-queso-oveja-v-navarra-cuna-250-g-est-metalico": {
    "w": "250 g",
    "i": "Leche cruda de oveja (lista completa no publicada)",
    "a": "Leche",
    "exact": false
  },
  "lvn-crema-al-queso-suave-125-gr": {
    "w": "125 g",
    "a": "Leche",
    "exact": false
  },
  "lvn-crema-al-queso-anejo-intenso-125-gr": {
    "w": "125 g",
    "a": "Leche",
    "exact": false
  },
  "lvn-crema-al-queso-de-oveja-125-gr": {
    "w": "125 g",
    "a": "Leche",
    "exact": false
  },
  "lvn-crema-al-queso-de-cabra-125-gr": {
    "w": "125 g",
    "a": "Leche",
    "exact": false
  },
  "lvn-cuna-queso-de-oveja-inyectado-con-trufa-150-g": {
    "w": "150 g",
    "a": "Leche",
    "exact": false
  },
  "lvn-cuna-queso-de-oveja-inyectado-con-aceite-de-romero-200-g": {
    "w": "200 g",
    "a": "Leche",
    "exact": false
  },
  "navarrico-esparrago-frasco-580-ml-9-12-fr-d-o": {
    "i": "Espárragos, agua y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Frasco 580 ml",
    "exact": false
  },
  "navarrico-esparragos-lata-425-ml-6-8-fr-d-o": {
    "i": "Espárragos, agua y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Lata 425 ml",
    "exact": false
  },
  "navarrico-esparrago-corto-frasco-mio-314-ml": {
    "i": "Espárragos, agua y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Frasco 314 ml",
    "exact": false
  },
  "navarrico-esparrago-frasco-370-ml-6-8-fr-d-o": {
    "i": "Espárragos, agua y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Frasco 370 ml",
    "exact": false
  },
  "navarrico-esparrago-frasco-370-ml-9-12": {
    "i": "Espárragos, agua y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Frasco 370 ml",
    "exact": false
  },
  "navarrico-esparragos-lata-425-ml-4-6-fr-d-o": {
    "i": "Espárragos, agua y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Lata 425 ml",
    "exact": false
  },
  "navarrico-esparragos-lata-425-ml-6-8-r-d-o": {
    "i": "Espárragos, agua y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Lata 425 ml",
    "exact": false
  },
  "navarrico-esparragos-lata-425-ml-8-10-d-o": {
    "i": "Espárragos, agua y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Lata 425 ml",
    "exact": false
  },
  "dantza-esparrago-do-navarra-lata-1-kg-4-6": {
    "i": "Espárragos, agua, sal, ácido cítrico.",
    "a": "Ninguno en la lista de ingredientes",
    "exact": false
  },
  "dantza-esparrago-do-navarra-lata-1-kg-6-10": {
    "i": "Espárragos, agua, sal, ácido cítrico.",
    "a": "Ninguno en la lista de ingredientes",
    "exact": false
  },
  "dantza-esparrago-do-navarra-lata-1-kg-10-14": {
    "i": "Espárragos, agua, sal, ácido cítrico.",
    "a": "Ninguno en la lista de ingredientes",
    "exact": false
  },
  "dantza-esparrago-do-navarra-lata-1-2-kg": {
    "i": "Espárragos, agua, sal, ácido cítrico.",
    "a": "Ninguno en la lista de ingredientes",
    "exact": false
  },
  "dantza-esparrago-do-navarra-lata-fiesta": {
    "i": "Espárragos, agua, sal, ácido cítrico.",
    "a": "Ninguno en la lista de ingredientes",
    "exact": false
  },
  "dantza-esparragos-blancos-de-navarra-edicion-especial": {
    "i": "Espárragos, agua, sal, ácido cítrico.",
    "a": "Ninguno en la lista de ingredientes",
    "exact": false
  },
  "dantza-esparrago-do-navarra-frasco-m-580-5-8-y-8-10": {
    "w": "325 g neto escurrido",
    "i": "Espárragos, agua, sal, ácido cítrico.",
    "a": "Ninguno en la lista de ingredientes",
    "exact": false
  },
  "dantza-esparrago-do-navarra-frasco-r-370-6-8": {
    "w": "205 g neto escurrido",
    "i": "Espárragos, agua, sal, ácido cítrico.",
    "a": "Ninguno en la lista de ingredientes",
    "exact": false
  },
  "dantza-esparrago-extra-grueso-edicion-especial": {
    "i": "Espárragos, agua, sal, ácido cítrico.",
    "a": "Ninguno en la lista de ingredientes",
    "exact": false
  },
  "dantza-yemas-do-navarra-frasco-b-250-muy-gruesas": {
    "w": "135 g neto escurrido (yemas muy gruesas, frasco)",
    "i": "Espárragos, agua, sal, ácido cítrico.",
    "a": "Ninguno en la lista de ingredientes",
    "exact": true
  },
  "dantza-yemas-do-navarra-frasco-b-250-gruesas": {
    "w": "135 g neto escurrido (yemas muy gruesas, frasco)",
    "i": "Espárragos, agua, sal, ácido cítrico.",
    "a": "Ninguno en la lista de ingredientes",
    "exact": false
  },
  "dantza-yemas-do-navarra-frasco-b-250-medianas": {
    "w": "135 g neto escurrido (yemas muy gruesas, frasco)",
    "i": "Espárragos, agua, sal, ácido cítrico.",
    "a": "Ninguno en la lista de ingredientes",
    "exact": false
  },
  "lc-esparragos-5": {
    "ref": "Ref. lata 8 frutos: 660 g neto / 425 g escurrido",
    "i": "Espárragos, agua, sal, acidulante (ácido cítrico).",
    "a": "No contiene",
    "p": "Lata",
    "exact": false
  },
  "lc-esparragos-6": {
    "ref": "Ref. lata 8 frutos: 660 g neto / 425 g escurrido",
    "i": "Espárragos, agua, sal, acidulante (ácido cítrico).",
    "a": "No contiene",
    "p": "Lata",
    "exact": false
  },
  "lc-esparragos-8": {
    "w": "660 g neto / 425 g escurrido",
    "i": "Espárragos, agua, sal, acidulante (ácido cítrico).",
    "a": "No contiene",
    "p": "Lata",
    "exact": true
  },
  "lc-esparragos-10": {
    "ref": "Ref. lata 8 frutos: 660 g neto / 425 g escurrido",
    "i": "Espárragos, agua, sal, acidulante (ácido cítrico).",
    "a": "No contiene",
    "p": "Lata",
    "exact": false
  },
  "lc-esparrago-06-08-frasco": {
    "w": "540 g neto / 325 g escurrido",
    "i": "Espárragos, agua, sal, acidulante (ácido cítrico).",
    "a": "No contiene",
    "p": "Tarro de cristal",
    "exact": true
  },
  "lc-esparrago-09-10-frasco": {
    "ref": "Ref. tarro 6/8: 540 g neto / 325 g escurrido",
    "i": "Espárragos, agua, sal, acidulante (ácido cítrico).",
    "a": "No contiene",
    "p": "Tarro de cristal",
    "exact": false
  },
  "lc-esparrago-04-06-frasco": {
    "ref": "Ref. tarro 6/8: 540 g neto / 325 g escurrido",
    "i": "Espárragos, agua, sal, acidulante (ácido cítrico).",
    "a": "No contiene",
    "p": "Tarro de cristal",
    "exact": false
  },
  "lc-yemas-4-6-frasco": {
    "w": "240 g neto / 140 g escurrido",
    "i": "Espárragos, agua, sal, acidulante (ácido cítrico).",
    "a": "No contiene",
    "p": "Tarro de cristal",
    "exact": true
  },
  "lc-yemas-8-12-frasco": {
    "ref": "Ref. yemas 4/6: 240 g neto / 140 g escurrido",
    "i": "Espárragos, agua, sal, acidulante (ácido cítrico).",
    "a": "No contiene",
    "p": "Tarro de cristal",
    "exact": false
  },
  "lc-esp-galon-10-12-bote": {
    "w": "975 g neto / 625 g escurrido",
    "i": "Espárragos, agua, sal, acidulante (ácido cítrico).",
    "a": "No contiene",
    "p": "Bote galón",
    "exact": true
  },
  "lc-esp-galon-18-24-bote": {
    "ref": "Ref. galón 10/12: 975 g neto / 625 g escurrido",
    "i": "Espárragos, agua, sal, acidulante (ácido cítrico).",
    "a": "No contiene",
    "p": "Bote galón",
    "exact": false
  },
  "lc-esp-09-12-frasco": {
    "ref": "Ref. tarro 6/8: 540 g neto / 325 g escurrido",
    "i": "Espárragos, agua, sal, acidulante (ácido cítrico).",
    "a": "No contiene",
    "p": "Tarro de cristal",
    "exact": false
  },
  "lc-esparrago-5": {
    "ref": "Ref. lata AL-370 6 frutos: 345 g neto / 220 g escurrido",
    "i": "Espárragos, agua, sal, acidulante (ácido cítrico).",
    "a": "No contiene",
    "p": "Lata AL-370",
    "exact": false
  },
  "lc-esparrago-6": {
    "w": "345 g neto / 220 g escurrido",
    "i": "Espárragos, agua, sal, acidulante (ácido cítrico).",
    "a": "No contiene",
    "p": "Lata AL-370",
    "exact": true
  },
  "lc-esparrago-6-8": {
    "ref": "Ref. lata AL-370 6 frutos: 345 g neto / 220 g escurrido",
    "i": "Espárragos, agua, sal, acidulante (ácido cítrico).",
    "a": "No contiene",
    "p": "Lata AL-370",
    "exact": false
  },
  "lc-esparrago-8-12": {
    "ref": "Ref. lata AL-370 6 frutos: 345 g neto / 220 g escurrido",
    "i": "Espárragos, agua, sal, acidulante (ácido cítrico).",
    "a": "No contiene",
    "p": "Lata AL-370",
    "exact": false
  },
  "la-maja-aove-alfar-2-l": {
    "w": "2 l",
    "i": "Aceite de oliva virgen extra (Arbequina)",
    "exact": false
  },
  "la-maja-aove-alfar-5-l": {
    "w": "5 l",
    "i": "Aceite de oliva virgen extra (Arbequina)",
    "p": "Lata",
    "o": "Variedad: Arbequina",
    "exact": true
  },
  "la-maja-aove-alfar-1-l": {
    "w": "1 l",
    "i": "Aceite de oliva virgen extra (Arbequina)",
    "exact": false
  },
  "la-maja-aove-alfar-arbequina": {
    "w": "250 ml",
    "i": "Aceite de oliva virgen extra (Arbequina)",
    "p": "Botella de vidrio",
    "exact": false
  },
  "ecopro-estuche-olive-lovers": {
    "w": "3 x 500 ml (1,5 l). Peso del estuche: 2,65 kg",
    "i": "3 AOVE: Edición Limitada (Arróniz y Picual), Coupage (Cornicabra, Picual y Arróniz) y Cornicabra",
    "exact": true
  },
  "ecopro-lote-exclusicve-12-aceites": {
    "w": "12 x 500 ml (6 l). Peso: 10,2 kg",
    "i": "12 botellas de AOVE 500 ml: 6 Edición Limitada + 6 a elegir (Coupage, Cornicabra, Edición Limitada o Sin filtrar)",
    "exact": true
  },
  "ecopro-edicion-limitada-500-ml": {
    "w": "500 ml",
    "i": "Aceite de oliva virgen extra de aceitunas Arróniz y Picual",
    "p": "Botella de vidrio",
    "o": "Variedades: Arróniz y Picual",
    "exact": true
  },
  "ecopro-edicion-limitada-250-ml": {
    "w": "250 ml",
    "i": "Aceite de oliva virgen extra de aceitunas Arróniz y Picual",
    "p": "Botella de vidrio",
    "o": "Variedades: Arróniz y Picual",
    "exact": true
  },
  "ecopro-sin-filtrar-500-ml": {
    "w": "500 ml",
    "i": "Aceite de oliva virgen extra Picual de cosecha súper temprana, sin filtrar",
    "p": "Botella de vidrio",
    "o": "Variedad: Picual",
    "exact": true
  },
  "monjardin-aove-arbequina-500ml": {
    "w": "500 ml",
    "i": "Aceite de oliva virgen extra Arbequina",
    "exact": false
  },
  "monjardin-aove-arbequina-750ml": {
    "w": "750 ml",
    "i": "Aceite de oliva virgen extra Arbequina",
    "exact": false
  },
  "monjardin-aove-arbequina-3000ml": {
    "w": "3000 ml",
    "i": "Aceite de oliva virgen extra Arbequina",
    "exact": false
  },
  "hq-anfora-arroniz-aove-250ml": {
    "w": "250 ml",
    "i": "Aceite de oliva virgen extra ecológico Arróniz (monovarietal)",
    "p": "Botella de vidrio",
    "o": "Variedad: Arróniz. Ecológico",
    "exact": true
  },
  "hq-anfora-trufa-blanca-aove-250-ml": {
    "w": "250 ml",
    "exact": false
  },
  "hq-abbae-aove-250ml": {
    "w": "250 ml",
    "i": "Aceite de oliva virgen extra ecológico Arbequina",
    "p": "Botella de vidrio",
    "exact": false
  },
  "hq-abbae-aove-500ml": {
    "w": "500 ml",
    "i": "Aceite de oliva virgen extra ecológico Arbequina",
    "p": "Botella de vidrio",
    "o": "Variedad: Arbequina. Ecológico",
    "exact": true
  },
  "hq-alhema-aove-500ml": {
    "w": "500 ml",
    "i": "Aceite de oliva virgen extra ecológico",
    "p": "Lata",
    "exact": true
  },
  "hq-alhema-aove-1000ml": {
    "w": "1000 ml",
    "i": "Aceite de oliva virgen extra ecológico",
    "p": "Lata",
    "exact": true
  },
  "hq-alhema-aove-3000ml": {
    "w": "3000 ml (peso 3000 g)",
    "i": "Aceite de oliva virgen extra ecológico",
    "p": "Lata",
    "exact": true
  },
  "navarrico-pimientos-rellenos-de-bacalao": {
    "i": "Salsa (38 %): tomate, pimiento del piquillo, aceite de oliva virgen extra, cebolla, azúcar, vino blanco, ajo, pimentón dulce y sal. Pimiento del piquillo (33 %): pimiento del piquillo, sal, azúcar y cloruro cálcico. Relleno (29 %): leche de vaca, bacalao (9 %), harina de trigo, aceite de oliva virgen extra, cebolla, ajo, sal y perejil.",
    "a": "Pescado, gluten (trigo), leche",
    "o": "EAN 8413239066020",
    "exact": true
  },
  "navarrico-piquillo-entero-frasco-350ml-d-o": {
    "ref": "Ref. piquillo entero extra Navarrico: 320 g neto / 300 g escurrido",
    "i": "Pimientos del piquillo, sal y ácido cítrico.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Frasco 350 ml",
    "exact": false
  },
  "navarrico-piquillo-entero-frasco-250ml-d-o": {
    "ref": "Ref. piquillo entero extra Navarrico: 320 g neto / 300 g escurrido",
    "i": "Pimientos del piquillo, sal y ácido cítrico.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Frasco 250 ml",
    "exact": false
  },
  "navarrico-piquillo-entero-extra-314-ml-etiqueta-negra-produccion-limitada": {
    "ref": "Ref. piquillo entero extra Navarrico: 320 g neto / 300 g escurrido",
    "i": "Pimientos del piquillo, sal y ácido cítrico.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Frasco 314 ml",
    "exact": false
  },
  "navarrico-cristal-106-ml-etiqueta-negra-produccion-limitada": {
    "w": "125 g neto escurrido (pimientos de cristal asados, frasco)",
    "exact": false
  },
  "navarrico-piquillo-tiras-frasco-250ml": {
    "w": "200 g neto escurrido (frasco)",
    "exact": false
  },
  "lc-pim-artesano-18-22-lata": {
    "ref": "Ref. piquillo entero D.O.P. Lodosa LC: 290 g neto / 260 g escurrido",
    "i": "Pimientos del piquillo, sal, acidulante: ácido cítrico.",
    "a": "No contiene",
    "p": "Lata 18-22 frutos",
    "exact": false
  },
  "lc-pim-artesano-26-30-lata": {
    "ref": "Ref. piquillo entero D.O.P. Lodosa LC: 290 g neto / 260 g escurrido",
    "i": "Pimientos del piquillo, sal, acidulante: ácido cítrico.",
    "a": "No contiene",
    "p": "Lata 26-30 frutos",
    "exact": false
  },
  "lc-pim-artesano-bote-cristal-212g-redondo": {
    "ref": "Ref. piquillo entero D.O.P. Lodosa LC: 290 g neto / 260 g escurrido",
    "i": "Pimientos del piquillo, sal, acidulante: ácido cítrico.",
    "a": "No contiene",
    "p": "Bote cristal 212 g redondo",
    "exact": false
  },
  "lc-pim-artesano-bote-cristal-314g-redondo": {
    "ref": "Ref. piquillo entero D.O.P. Lodosa LC: 290 g neto / 260 g escurrido",
    "i": "Pimientos del piquillo, sal, acidulante: ácido cítrico.",
    "a": "No contiene",
    "p": "Bote cristal 314 g redondo",
    "exact": false
  },
  "lc-pim-artesano-bote-cristal-314g-cuadrado": {
    "ref": "Ref. piquillo entero D.O.P. Lodosa LC: 290 g neto / 260 g escurrido",
    "i": "Pimientos del piquillo, sal, acidulante: ácido cítrico.",
    "a": "No contiene",
    "p": "Bote cristal 314 g cuadrado",
    "exact": false
  },
  "lc-pim-artesano-bote-cristal-580g-cuadrado": {
    "ref": "Ref. piquillo entero D.O.P. Lodosa LC: 290 g neto / 260 g escurrido",
    "i": "Pimientos del piquillo, sal, acidulante: ácido cítrico.",
    "a": "No contiene",
    "p": "Bote cristal 580 g cuadrado",
    "exact": false
  },
  "lc-pim-artesano-bote-cristal-360g-cilindrico": {
    "ref": "Ref. piquillo entero D.O.P. Lodosa LC: 290 g neto / 260 g escurrido",
    "i": "Pimientos del piquillo, sal, acidulante: ácido cítrico.",
    "a": "No contiene",
    "p": "Bote cristal 360 g cilíndrico",
    "exact": false
  },
  "lc-pim-artesano-bote-cristal-260g-cilindrico": {
    "ref": "Ref. piquillo entero D.O.P. Lodosa LC: 290 g neto / 260 g escurrido",
    "i": "Pimientos del piquillo, sal, acidulante: ácido cítrico.",
    "a": "No contiene",
    "p": "Bote cristal 260 g cilíndrico",
    "exact": false
  },
  "lc-pimiento-confitado": {
    "w": "125 g neto",
    "i": "Pimientos del piquillo, aceite de oliva, sal y acidulante: ácido cítrico.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Lata",
    "exact": true
  },
  "navarrico-alcachofa-rellena-de-jamon": {
    "w": "440 g neto (5 unidades)",
    "i": "Alcachofas (56 %), caldo de alcachofas, leche de vaca, vino blanco, aceite de oliva virgen extra (4,1 %), jamón serrano (4 %), harina de trigo, cebolla, azúcar y sal.",
    "a": "Contiene leche. Contiene gluten.",
    "p": "Envase de 425 ml",
    "exact": true
  },
  "lc-corazon-alcachofa-580g": {
    "w": "580 g",
    "i": "Alcachofas, agua, sal, antioxidante: ácido ascórbico.",
    "a": "No contiene",
    "exact": false
  },
  "lc-corazon-alcachofa-10-12": {
    "w": "355 g",
    "i": "Alcachofas, agua, sal, antioxidante: ácido ascórbico.",
    "a": "No contiene",
    "exact": true
  },
  "lc-corazon-alcachofa-16-20": {
    "ref": "Ref.: 290 g neto / 175 g escurrido",
    "i": "Alcachofas, agua, sal, antioxidante: ácido ascórbico.",
    "a": "No contiene",
    "exact": false
  },
  "lc-habitas-baby-aceite-250g-redondo": {
    "ref": "Ref.: 335 g neto / 235 g escurrido",
    "i": "Habitas baby en aceite de oliva (lista completa no publicada)",
    "exact": false
  },
  "lc-habitas-baby-aceite-314g-cuadrado": {
    "w": "314 g",
    "i": "Habitas baby en aceite de oliva (lista completa no publicada)",
    "exact": false
  },
  "pcirsus-tinto-seleccion-de-familia": {
    "i": "Uva: Cabernet Sauvignon, Syrah",
    "a": "Contiene sulfitos",
    "exact": false
  },
  "pcirsus-tinto-cuvee-especial": {
    "i": "Uva: Cabernet Sauvignon, Syrah",
    "a": "Contiene sulfitos",
    "exact": false
  },
  "pcirsus-tinto-o-ii-seleccion": {
    "i": "Uva: Tempranillo, Syrah",
    "a": "Contiene sulfitos",
    "exact": false
  },
  "pcirsus-pack-cirsus-edicion-especial": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "pcirsus-pack-cirsus-selecto": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "pcirsus-pack-cirsus-premium": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "pcirsus-vidure": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "pcirsus-pack-cirsus-familia": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "pcirsus-la-a": {
    "i": "Uva: Cabernet Sauvignon, Syrah",
    "a": "Contiene sulfitos",
    "exact": false
  },
  "pcirsus-vendimia-seleccionada": {
    "i": "Uva: Cabernet Sauvignon, Merlot, Syrah",
    "a": "Contiene sulfitos",
    "exact": false
  },
  "irache-tinto-de-pago-prado-de-irache": {
    "w": "75 cl",
    "i": "Uva: Tempranillo, Cabernet Sauvignon, Merlot",
    "a": "Contiene sulfitos",
    "o": "14,5 % vol. 12 meses en barrica. Vino de Pago",
    "exact": true
  },
  "irache-tinto-1891-col-priv-garnacha-clasica": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "irache-tinto-1891-col-priv-chardonnay-sobre-lias": {
    "i": "Uva: Chardonnay",
    "a": "Contiene sulfitos",
    "exact": false
  },
  "irache-tinto-1891-crianza": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "irache-rosado-1891": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "irache-blanco-1891": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "alconde-sierra-perra-garnacha-tinta": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "alconde-moreno-y-cabezon-garnacha-blanca": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "alconde-regenera-blanco-regenerativo": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "alconde-regenera-tinto-regenerativo": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "unsi-dulce-garnacha-tinta": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "unsi-tinto-finca-el-boyeral": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "unsi-tinto-finca-la-sierra": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "unsi-blanco-terrazas-garnacha-blanca": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "unsi-tinto-terrazas-garnacha-tinta": {
    "a": "Contiene sulfitos",
    "exact": false
  },
  "palacio-de-sada-rosado-garnacha": {
    "i": "Uva: Garnacha",
    "a": "Contiene sulfitos",
    "exact": false
  },
  "palacio-de-sada-blanco-de-uva-tinta": {
    "i": "Uva: Garnacha (blanco elaborado con uva tinta)",
    "a": "Contiene sulfitos",
    "exact": false
  },
  "chivite-blanco-coleccion-125": {
    "i": "Uva: Chardonnay",
    "a": "Contiene sulfitos",
    "o": "Añada 2024. 13,5 % vol.",
    "exact": true
  },
  "chivite-blanco-las-fincas": {
    "i": "Uva: Garnacha Blanca",
    "a": "Contiene sulfitos",
    "o": "Añada 2025. 13 % vol.",
    "exact": true
  },
  "gran-chivite-legardeta-blanco-2024": {
    "i": "Uva: Chardonnay",
    "a": "Contiene sulfitos",
    "o": "Añada 2025, 13,5 % vol.",
    "exact": true
  },
  "gran-chivite-legardeta-tinto-2023": {
    "i": "Uva: Syrah, Garnacha, Tempranillo",
    "a": "Contiene sulfitos",
    "o": "Añada 2024, 14 % vol.",
    "exact": true
  },
  "chivite-moscatel-viejisimo-2025": {
    "w": "37,5 cl",
    "i": "Uva: Moscatel de Grano Menudo",
    "a": "Contiene sulfitos",
    "o": "Añada 2025. 17 % vol.",
    "exact": true
  },
  "chivite-rosado-coleccion-125": {
    "i": "Uva: Garnacha, Tempranillo, Syrah",
    "a": "Contiene sulfitos",
    "o": "Añada 2023. 13,5 % vol.",
    "exact": true
  },
  "chivite-rosado-las-fincas": {
    "i": "Uva: Garnacha, Tempranillo",
    "a": "Contiene sulfitos",
    "o": "Añada 2025. 13 % vol.",
    "exact": true
  },
  "chivite-tinto-coleccion-125": {
    "i": "Uva: Tempranillo, Syrah",
    "a": "Contiene sulfitos",
    "o": "Añada 2021. 14,5 % vol. 12 meses en barrica de roble francés",
    "exact": true
  },
  "monjardin-blanco-chardonnay-gran-reserva": {
    "w": "75 cl",
    "i": "Uva: 100 % Chardonnay",
    "a": "Contiene sulfitos",
    "o": "Añada 2016. 13,5 % vol.",
    "exact": true
  },
  "monjardin-blanco-chardonnay-reserva": {
    "w": "75 cl",
    "i": "Uva: 100 % Chardonnay",
    "a": "Contiene sulfitos",
    "o": "Añada 2021. 13,5 % vol.",
    "exact": true
  },
  "monjardin-tinto-deyo-merlot-sin-fondo": {
    "w": "75 cl",
    "i": "Uva: 100 % Merlot",
    "a": "Contiene sulfitos",
    "o": "Añada 2021. 14 % vol.",
    "exact": true
  },
  "monjardin-tinto-pinot-noir-sin-fondo": {
    "w": "75 cl",
    "i": "Uva: 100 % Pinot Noir",
    "a": "Contiene sulfitos",
    "o": "Añada 2024. 13,5 % vol.",
    "exact": true
  },
  "monjardin-brut-chardonnay-millesime": {
    "i": "Uva: Chardonnay",
    "a": "Contiene sulfitos",
    "exact": false
  },
  "monjardin-brut-chardonnay-rose": {
    "i": "Uva: Chardonnay, Garnacha Tinta",
    "a": "Contiene sulfitos",
    "exact": false
  },
  "monjardin-brut-gran-reserva": {
    "i": "Uva: Chardonnay",
    "a": "Contiene sulfitos",
    "exact": false
  },
  "inurrieta-mimao-tinto-ficha": {
    "i": "Uva: Garnacha Tinta",
    "a": "Contiene sulfitos",
    "o": "Añada 2024. 15 % vol.",
    "exact": true
  },
  "inurrieta-mimao-puro-vicio-tinto": {
    "i": "Uva: Syrah",
    "a": "Contiene sulfitos",
    "o": "Añada 2023. 14 % vol.",
    "exact": true
  },
  "inurrieta-mimao-laderas-tinto": {
    "i": "Uva: Graciano",
    "a": "Contiene sulfitos",
    "o": "Añada 2022. 14,5 % vol.",
    "exact": true
  },
  "inurrieta-blanco-orchidea-cuvee": {
    "i": "Uva: Sauvignon Blanc",
    "a": "Contiene sulfitos",
    "o": "Añada 2023. 13,5 % vol. 8 meses en barrica sobre lías",
    "exact": true
  },
  "inurrieta-tinto-altos-de-inurrieta": {
    "i": "Uva: Graciano, Cabernet Sauvignon",
    "a": "Contiene sulfitos",
    "o": "Añada 2022. 14,5 % vol. Reserva",
    "exact": true
  },
  "inurrieta-blanco-mimao": {
    "i": "Uva: Garnacha Blanca",
    "a": "Contiene sulfitos",
    "o": "Añada 2023. 12,5 % vol. 4 meses en barrica",
    "exact": true
  },
  "inurrieta-blanco-orchidea": {
    "i": "Uva: Sauvignon Blanc",
    "a": "Contiene sulfitos",
    "o": "Añada 2025. 12,5 % vol.",
    "exact": true
  },
  "inurrieta-estuche-orchidea-mediodia-cuatrocientos": {
    "w": "3 botellas",
    "i": "3 vinos: Orchidea (Sauvignon Blanc), Mediodía (rosado) y Cuatrocientos (crianza)",
    "a": "Contiene sulfitos",
    "p": "Estuche de cartón",
    "exact": true
  },
  "inurrieta-estuche-orchidea-altos-cuatrocientos": {
    "w": "3 botellas",
    "i": "3 vinos: Orchidea (Sauvignon Blanc), Altos de Inurrieta (reserva) y Cuatrocientos (crianza)",
    "a": "Contiene sulfitos",
    "p": "Estuche de cartón",
    "exact": true
  },
  "inurrieta-estuche-madera-orchidea-cuveeladeras-puro-vicio": {
    "w": "3 botellas",
    "i": "3 vinos: Orchidea Cuvée (Sauvignon Blanc barrica), Laderas de Inurrieta (Graciano) y Puro Vicio (Syrah)",
    "a": "Contiene sulfitos",
    "p": "Estuche de madera",
    "exact": true
  },
  "inurrieta-rosado-mediodia": {
    "i": "Uva: Garnacha Tinta, Cabernet Sauvignon, Graciano, Syrah, Merlot",
    "a": "Contiene sulfitos",
    "o": "Añada 2025. 13 % vol.",
    "exact": true
  },
  "ochoa-gran-reserva": {
    "w": "75 cl",
    "i": "Uva: Tempranillo, Merlot, Cabernet Sauvignon",
    "a": "Contiene sulfitos",
    "o": "Añada 2015. 14,5 % vol.",
    "exact": true
  },
  "ochoa-reserva": {
    "i": "Uva: Mayoritariamente Tempranillo, con Merlot y Cabernet Sauvignon",
    "a": "Contiene sulfitos",
    "exact": false
  },
  "ochoa-moscatel-vendimia-tardia": {
    "w": "50 cl (cajas de 6)",
    "i": "Uva: 100 % Moscatel de Grano Menudo",
    "a": "Contiene sulfitos",
    "o": "Añada 2023. 15 % vol. Vino dulce de uvas sobremaduradas",
    "exact": true
  },
  "ochoa-alma-de-finca-secadero": {
    "i": "Uva: Tempranillo",
    "a": "Contiene sulfitos",
    "exact": false
  },
  "ochoa-corazon-de-finca-montijo": {
    "i": "Uva: Merlot 90 %, Cabernet Sauvignon 10 %",
    "a": "Contiene sulfitos",
    "exact": false
  },
  "ochoa-labrit-tinto": {
    "w": "75 cl (cajas de 6)",
    "i": "Uva: 100 % Garnacha",
    "a": "Contiene sulfitos",
    "o": "Añada 2024. 13,5 % vol.",
    "exact": true
  },
  "ochoa-labrit-rosado": {
    "w": "75 cl (cajas de 6)",
    "i": "Uva: 100 % Garnacha",
    "a": "Contiene sulfitos",
    "o": "Añada 2024. 13 % vol.",
    "exact": true
  },
  "ochoa-labrit-blanco": {
    "w": "75 cl (cajas de 6)",
    "i": "Uva: 100 % Garnacha Blanca",
    "a": "Contiene sulfitos",
    "o": "Añada 2024. 12,5 % vol.",
    "exact": true
  },
  "ochoa-uva-doble": {
    "i": "Uva: Viognier",
    "a": "Contiene sulfitos",
    "exact": false
  },
  "ochoa-moscato": {
    "w": "75 cl (cajas de 6)",
    "i": "Mosto parcialmente fermentado de 100 % Moscatel de Grano Menudo; sin azúcar añadido ni gasificación",
    "a": "Contiene sulfitos",
    "o": "Añada 2024. 5,5 % vol.",
    "exact": true
  },
  "lc-crema-de-verduras": {
    "w": "590 g",
    "i": "Verduras (60 %) (judía verde, acelga, calabaza, brócoli, espárrago triguero), agua, aceite de oliva, cebolla, patata, fécula de patata y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Tarro",
    "exact": true
  },
  "lc-crema-de-puerros": {
    "w": "590 g",
    "i": "Puerro, aceite de oliva, cebolla, patata y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Tarro",
    "exact": true
  },
  "lc-crema-de-calabacin": {
    "w": "590 g",
    "i": "Calabacín, aceite de oliva, cebolla, patata y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Tarro",
    "exact": true
  },
  "lc-crema-de-esparragos": {
    "w": "590 g",
    "i": "Espárrago, agua, aceite de oliva, patata, fécula de patata y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "exact": true
  },
  "olasagasti-bonito-en-aceite-112g": {
    "w": "112 g",
    "a": "Pescado",
    "exact": false
  },
  "olasagasti-bonito-en-aceite-200g": {
    "w": "200 g",
    "a": "Pescado",
    "exact": false
  },
  "olasagasti-bonito-en-escabeche-112g": {
    "w": "112 g",
    "a": "Pescado",
    "exact": false
  },
  "olasagasti-bonito-en-escabeche-250g": {
    "w": "250 g",
    "a": "Pescado",
    "exact": false
  },
  "olasagasti-bonito-en-aceite-135g": {
    "w": "135 g neto escurrido (lomos de bonito del norte en aceite de oliva, frasco)",
    "a": "Pescado",
    "exact": false
  },
  "olasagasti-bonito-en-aceite-210g": {
    "w": "210 g",
    "a": "Pescado",
    "exact": false
  },
  "olasagasti-bonito-en-aceite-550g": {
    "w": "550 g",
    "a": "Pescado",
    "exact": false
  },
  "olasagasti-ventresca-en-aceite-190-g": {
    "w": "190 g neto / 112,5 g escurrido",
    "a": "Pescado",
    "exact": false
  },
  "olasagasti-ventresca-en-aceite-110-g": {
    "w": "120 g",
    "a": "Pescado",
    "exact": false
  },
  "olasagasti-crema-de-atun-y-anchoas": {
    "a": "Pescado",
    "exact": false
  },
  "lc-hongos-en-aceite-1-2-lata": {
    "ref": "Ref. tarro: 260 g neto / 230 g escurrido",
    "i": "Hongos (Boletus edulis silvestres), aceite de oliva (8 %) y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "1/2 lata",
    "exact": false
  },
  "lc-hongos-en-aceite-314g-cuadrado": {
    "ref": "Ref. tarro: 260 g neto / 230 g escurrido",
    "i": "Hongos (Boletus edulis silvestres), aceite de oliva (8 %) y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Tarro 314 g cuadrado",
    "exact": false
  },
  "lc-hongos-en-aceite-580g-cuadrado": {
    "ref": "Ref. tarro: 260 g neto / 230 g escurrido",
    "i": "Hongos (Boletus edulis silvestres), aceite de oliva (8 %) y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Tarro 580 g cuadrado",
    "exact": false
  },
  "lc-hongos-en-aceite-360g-cilindrico": {
    "ref": "Ref. tarro: 260 g neto / 230 g escurrido",
    "i": "Hongos (Boletus edulis silvestres), aceite de oliva (8 %) y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Tarro 360 g cilíndrico",
    "exact": false
  },
  "pedro-mayo-cacao-puro": {
    "w": "250 g",
    "i": "Cacao en polvo desgrasado natural.",
    "exact": true
  },
  "leyre-85-125-grs": {
    "w": "125 g",
    "exact": false
  },
  "leyre-naranja-125-grs": {
    "w": "125 g",
    "exact": false
  },
  "leyre-almendra-125-grs": {
    "w": "125 g",
    "exact": false
  },
  "leyre-nueces-y-pasas-125-grs": {
    "w": "125 g",
    "exact": false
  },
  "leyre-cafe-125-grs": {
    "w": "125 g",
    "exact": false
  },
  "leyre-tableton-negro-almendras-800-grs": {
    "w": "800 g",
    "exact": false
  },
  "leyre-tableton-negro-85-leyre-400-grs": {
    "w": "400 g",
    "exact": false
  },
  "leyre-tableton-negro-con-naranja-400-grs": {
    "w": "400 g",
    "exact": false
  },
  "baines-patxaran-baines-etiqueta-oro": {
    "w": "70 cl",
    "i": "Endrinas navarras (Prunus spinosa) maceradas en anís (lista completa no publicada)",
    "p": "Caja: 31,5 x 9 x 9 cm",
    "exact": false
  },
  "ln-patxaran-etxeko": {
    "w": "1 l",
    "i": "Endrinas frescas maceradas en alcohol de melaza de remolacha, endulzado con azúcar y aromatizado con anís",
    "exact": false
  },
  "ln-patxaran-la-navarra": {
    "w": "1 l",
    "i": "Aguardiente, endrinas (Prunus spinosa) y anís estrellado",
    "exact": false
  },
  "katealde-foie-gras-tarro": {
    "w": "180 g",
    "i": "Hígado de pato cebado, sal, pimienta, conservador: nitrito sódico.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Bocal (tarro de cristal)",
    "o": "EAN 8436534950429",
    "exact": true
  },
  "katealde-foie-gras-barqueta-micuit": {
    "w": "210 g",
    "i": "Hígado de pato cebado, sal, especias naturales, conservador: nitrito sódico.",
    "a": "Ninguno en la lista de ingredientes",
    "o": "EAN 8436534950436 (210 g)",
    "exact": true
  },
  "katealde-bloc-de-foie-pato-con-trufa": {
    "w": "130 g",
    "i": "98 % hígado de pato cebado, 3 % trufa (Tuber melanosporum), sal, especias naturales, conservador: nitrito sódico.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Lata",
    "o": "EAN 8436534950405",
    "exact": true
  },
  "katealde-bloc-de-foie-pato-con-champagne": {
    "w": "130 g",
    "i": "90 % hígado de pato cebado, 8 % champagne, sal, especias naturales, conservador: nitrito sódico.",
    "a": "Ninguno en la lista de ingredientes",
    "p": "Lata",
    "o": "EAN 8436534950856",
    "exact": true
  },
  "katealde-bloc-de-foie-pato-con-pinon": {
    "w": "130 g",
    "i": "92 % hígado de pato cebado, 6 % piñón del país, sal, especias naturales, conservador: nitrito sódico.",
    "a": "Piñón (fruto seco/semilla; según la lista de ingredientes)",
    "p": "Lata",
    "o": "EAN 8436534950382",
    "exact": true
  },
  "katealde-bloc-de-foie-pato-con-almendra": {
    "w": "130 g",
    "i": "92 % hígado de pato cebado, 6 % almendra marcona, sal, especias naturales, conservador: nitrito sódico.",
    "a": "Frutos de cáscara: almendra (según la lista de ingredientes)",
    "p": "Lata",
    "o": "EAN 8436534950399",
    "exact": true
  },
  "katealde-pate-de-foie-al-oporto": {
    "w": "130 g",
    "i": "35 % hígado de pato cebado, papada de cerdo, magro de pato, leche, huevo, sal, conservador: nitrito sódico, especias naturales, 0,3 % oporto.",
    "a": "Leche, huevo (según la lista de ingredientes)",
    "o": "EAN 8436534950245 (130 g)",
    "exact": true
  },
  "katealde-laton-campana-pimienta-o-finas-hierbas": {
    "w": "1000 g",
    "i": "Pimienta verde: carne y grasa de cerdo, hígado de cerdo, huevo, sal, leche, azúcar, 0,5 % pimienta verde, especias naturales, conservador: nitrito sódico. | Finas hierbas: carne y grasa de cerdo, hígado de cerdo, huevo, sal, especias naturales, leche, azúcar, finas hierbas (0,25 %), conservador: nitrito sódico.",
    "a": "Huevo, leche (según la lista de ingredientes)",
    "o": "EAN 8436534950580 (pimienta verde) / 8436534950566 (finas hierbas)",
    "exact": true
  },
  "katealde-pate-de-montana": {
    "w": "130 g",
    "i": "Papada de cerdo, hígado de cerdo, huevo, cebolla, sal, azúcar, especias naturales.",
    "a": "Huevo (según la lista de ingredientes)",
    "o": "EAN 8436534950368",
    "exact": true
  },
  "katealde-confit-de-pato-muslos-2": {
    "w": "2 muslos",
    "i": "Muslos de pato, grasa de pato y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "o": "EAN 8436534950597",
    "exact": true
  },
  "katealde-confit-de-pato-alas": {
    "w": "6 alas",
    "i": "Alas de pato, grasa de pato y sal.",
    "a": "Ninguno en la lista de ingredientes",
    "o": "EAN 8436534950610 (6 alas)",
    "exact": true
  },
  "katealde-jamon-de-pato": {
    "w": "Fileteado 100 g",
    "i": "Pechuga de pato, sal, especias naturales, conservador: nitrato potásico.",
    "a": "Ninguno en la lista de ingredientes",
    "o": "EAN 8436534950627 (100 g)",
    "exact": true
  },
  "katealde-lote-historia-del-foie": {
    "w": "210 g + 105 g",
    "i": "Foie gras mi cuit 210 g, mermelada especial foie gras 105 g, lira de corte, plato de pizarra, póster puzle y libro 'Historia del foie gras'",
    "o": "EAN 8436534950030",
    "exact": true
  },
  "katealde-cesta-foie-gras": {
    "w": "5 x 130 g",
    "i": "Opción 'blocs variado': bloc de pato, bloc de oca, bloc de pato con almendra marcona, con piñón y con trufa | Opción 'variado': bloc de pato, bloc de oca, parfait, mousse 50 % foie y paté al oporto",
    "a": "Según cada producto (almendra, piñón, leche, huevo)",
    "p": "Cesta de mimbre",
    "exact": false
  },
  "arbizu-pate-de-campana-hongos": {
    "w": "150 g",
    "a": "Huevo",
    "exact": false
  }
};
