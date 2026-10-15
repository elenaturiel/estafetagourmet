import type { Locale } from "@/lib/i18n/config";
import type { PortableBlock, Post } from "@/lib/types";

type PostText = { category: string; title: string; excerpt: string; body: string[]; imageAlt?: string };

/** Entradas del blog en inglés y francés, por dirección (slug). Las nuevas del panel salen en español hasta que se añadan aquí. */
export const POST_TEXTS: Record<string, [en: PostText, fr: PostText]> = {
  "bienvenidos-a-esta-aventura": [
    {
      category: "Our story", title: "Welcome",
      imageAlt: "Black-and-white portrait of the author, smiling with her hand resting on her cheek",
      excerpt: "There comes a moment in life when you look in the mirror and say: “this needs a change... or at least a stronger coffee”. That is how it all began. One day I decided that routine was a silent traitor, and that reinventing yourself is not just for butterflies and celebrities in a midlife crisis, but a moral obligation to myself.",
      body: [
        "There comes a moment in life when you look in the mirror and say: “this needs a change... or at least a stronger coffee”. That is how it all began. One day I decided that routine was a silent traitor, and that reinventing yourself is not just for butterflies and celebrities in a midlife crisis, but a moral obligation to myself.",
        "The new projects arrived wrapped in mystery, as if life had sent me a sealed envelope with unclear instructions and small print. Nobody warns you when a new chapter begins: you simply wake up one day thinking “I'm going to try something different” and the universe answers by sending you challenges you did not ask for, but do not turn down either, because deep down you know that is where the fun is.",
        "Changing professional direction is scary, yes, but it also has its comic side: learning new things against the clock, pretending to be confident in meetings where you do not understand half of what is said, and discovering hidden talents you never knew you had (like surviving chaos with a smile).",
        "Reinventing yourself every day is not a luxury, it is survival with style. And if I have learned one thing it is this: life rewards those who dare to start again, even with frayed nerves and cold coffee.",
        "Welcome to this exciting adventure full of premium gastronomy, products chosen with care and a passion for the work.",
      ],
    },
    {
      category: "Notre histoire", title: "Bienvenue",
      imageAlt: "Portrait en noir et blanc de l'autrice, souriante, la main appuyée sur la joue",
      excerpt: "Il y a un moment dans la vie où l'on se regarde dans le miroir et où l'on se dit : « il faut que ça change... ou au moins un café plus fort ». C'est ainsi que tout a commencé. Un jour, j'ai décidé que la routine était une traîtresse silencieuse, et que se réinventer n'est pas réservé aux papillons et aux célébrités en pleine crise de la quarantaine, mais une obligation morale envers moi-même.",
      body: [
        "Il y a un moment dans la vie où l'on se regarde dans le miroir et où l'on se dit : « il faut que ça change... ou au moins un café plus fort ». C'est ainsi que tout a commencé. Un jour, j'ai décidé que la routine était une traîtresse silencieuse, et que se réinventer n'est pas réservé aux papillons et aux célébrités en pleine crise de la quarantaine, mais une obligation morale envers moi-même.",
        "Les nouveaux projets sont arrivés enveloppés de mystère, comme si la vie m'avait envoyé une enveloppe fermée avec des instructions peu claires et des petits caractères. Personne ne vous prévient quand un nouveau chapitre commence : un jour, on se réveille en pensant « je vais essayer quelque chose de différent » et l'univers répond en nous envoyant des défis que nous n'avions pas demandés, mais que nous ne refusons pas non plus, car au fond nous savons que c'est là que réside le charme.",
        "Changer de voie professionnelle fait peur, oui, mais cela a aussi son côté comique : apprendre de nouvelles choses contre la montre, faire semblant d'être sûr de soi dans des réunions où l'on ne comprend pas la moitié de ce qui se dit, et découvrir des talents cachés que l'on ne se connaissait pas (comme survivre au chaos avec le sourire).",
        "Se réinventer chaque jour n'est pas un luxe, c'est de la survie avec style. Et si j'ai appris une chose, c'est celle-ci : la vie récompense ceux qui osent recommencer, même avec les nerfs à vif et le café froid.",
        "Bienvenue dans cette passionnante aventure pleine de gastronomie haut de gamme, de produits choisis avec soin et de passion pour le travail.",
      ],
    },
  ],
};

const paragraphs = (slug: string, texts: string[]): PortableBlock[] =>
  texts.map((text, i) => ({
    _type: "block",
    _key: `${slug}-${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${slug}-${i}-0`, text, marks: [] }],
  }));

export function localizePost(p: Post, locale: Locale): Post {
  if (locale === "es") return p;
  const t = POST_TEXTS[p.slug]?.[locale === "en" ? 0 : 1];
  if (!t) return p;
  return {
    ...p,
    category: t.category,
    title: t.title,
    excerpt: t.excerpt,
    body: paragraphs(p.slug, t.body),
    image: { ...p.image, alt: t.imageAlt ?? p.image.alt },
    cover: p.cover ? { ...p.cover, alt: t.imageAlt ?? p.cover.alt } : p.cover,
  };
}
