import { defineMessages } from "./define";

type R = { label: string; short: string; blurb: string };

/** Ideas de regalo: a quién se regala. */
export const gifts = defineMessages({
  es: {
    recipients: {
      padres: { label: "Para padres", short: "Padres", blurb: "Los clásicos que nunca fallan" } as R,
      amigos: { label: "Para amigos", short: "Amigos", blurb: "Para compartir y picar" } as R,
      pareja: { label: "Para parejas", short: "Pareja", blurb: "Una cena, un detalle, un brindis" } as R,
      cumpleanos: { label: "Cumpleaños", short: "Cumpleaños", blurb: "Para celebrar un año más" } as R,
      navidad: { label: "Navidad", short: "Navidad", blurb: "Para las mesas de fiesta" } as R,
      sanfermin: { label: "San Fermín", short: "San Fermín", blurb: "Txistorra, patxarán y fiesta" } as R,
      eventos: { label: "Para eventos", short: "Eventos", blurb: "Celebraciones, bodas y reuniones" } as R,
      empresas: { label: "Para empresas", short: "Empresas", blurb: "Regalos para clientes y equipos" } as R,
    },
  },
  en: {
    recipients: {
      padres: { label: "For parents", short: "Parents", blurb: "The classics that never fail" },
      amigos: { label: "For friends", short: "Friends", blurb: "To share and nibble on" },
      pareja: { label: "For couples", short: "Couples", blurb: "A dinner, a gesture, a toast" },
      cumpleanos: { label: "Birthdays", short: "Birthdays", blurb: "To celebrate another year" },
      navidad: { label: "Christmas", short: "Christmas", blurb: "For festive tables" },
      sanfermin: { label: "San Fermín", short: "San Fermín", blurb: "Txistorra, patxaran and fiesta" },
      eventos: { label: "For events", short: "Events", blurb: "Celebrations, weddings and get-togethers" },
      empresas: { label: "For businesses", short: "Business", blurb: "Gifts for clients and teams" },
    },
  },
  fr: {
    recipients: {
      padres: { label: "Pour les parents", short: "Parents", blurb: "Les classiques qui ne déçoivent jamais" },
      amigos: { label: "Pour les amis", short: "Amis", blurb: "À partager et à grignoter" },
      pareja: { label: "Pour les couples", short: "Couples", blurb: "Un dîner, une attention, un toast" },
      cumpleanos: { label: "Anniversaires", short: "Anniversaires", blurb: "Pour fêter une année de plus" },
      navidad: { label: "Noël", short: "Noël", blurb: "Pour les tables de fête" },
      sanfermin: { label: "San Fermín", short: "San Fermín", blurb: "Txistorra, patxaran et fiesta" },
      eventos: { label: "Pour les événements", short: "Événements", blurb: "Fêtes, mariages et réunions" },
      empresas: { label: "Pour les entreprises", short: "Entreprises", blurb: "Cadeaux pour clients et équipes" },
    },
  },
});
