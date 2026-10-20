/**
 * Pasa el texto que se escribe en el panel (formato sencillo) a Portable Text
 * —lo que lee la web— y al revés, para poder volver a editar una entrada.
 *
 *   ## Subtítulo        ### Subtítulo pequeño      > Cita
 *   - Lista             1. Lista numerada
 *   **negrita**  *cursiva*  [texto](https://enlace)
 *   ![descripción](imagen:ID)   una foto subida desde el panel
 */
type Mark = { _key: string; _type: "link"; href: string };
type Span = { _type: "span"; _key: string; text: string; marks: string[] };
export type PTBlock = {
  _type: "block" | "image";
  _key: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: Span[];
  markDefs?: Mark[];
  asset?: { _type: "reference"; _ref: string };
  alt?: string;
};

let counter = 0;
const key = () => `k${Date.now().toString(36)}${(counter++).toString(36)}${Math.random().toString(36).slice(2, 6)}`;

const TOKEN = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)/g;

function inline(text: string): { children: Span[]; markDefs: Mark[] } {
  const children: Span[] = [];
  const markDefs: Mark[] = [];
  let last = 0;
  const push = (t: string, marks: string[] = []) => {
    if (t) children.push({ _type: "span", _key: key(), text: t, marks });
  };
  for (const m of text.matchAll(TOKEN)) {
    push(text.slice(last, m.index));
    if (m[1] !== undefined) push(m[1], ["strong"]);
    else if (m[2] !== undefined) push(m[2], ["em"]);
    else {
      const def: Mark = { _key: key(), _type: "link", href: m[4] };
      markDefs.push(def);
      push(m[3], [def._key]);
    }
    last = (m.index ?? 0) + m[0].length;
  }
  push(text.slice(last));
  if (!children.length) push("");
  return { children, markDefs };
}

export function markdownToPortable(source: string): PTBlock[] {
  const out: PTBlock[] = [];
  const para: string[] = [];
  const flush = () => {
    if (!para.length) return;
    out.push({ _type: "block", _key: key(), style: "normal", ...inline(para.join("\n")) });
    para.length = 0;
  };
  for (const raw of source.replace(/\r\n?/g, "\n").split("\n")) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flush();
      continue;
    }
    let m: RegExpMatchArray | null;
    if ((m = line.match(/^!\[([^\]]*)\]\(imagen:([^)\s]+)\)$/))) {
      flush();
      out.push({ _type: "image", _key: key(), alt: m[1], asset: { _type: "reference", _ref: m[2] } });
    } else if ((m = line.match(/^(#{2,3})\s+(.*)$/))) {
      flush();
      out.push({ _type: "block", _key: key(), style: m[1].length === 2 ? "h2" : "h3", ...inline(m[2]) });
    } else if ((m = line.match(/^>\s?(.*)$/))) {
      flush();
      out.push({ _type: "block", _key: key(), style: "blockquote", ...inline(m[1]) });
    } else if ((m = line.match(/^[-*]\s+(.*)$/))) {
      flush();
      out.push({ _type: "block", _key: key(), style: "normal", listItem: "bullet", level: 1, ...inline(m[1]) });
    } else if ((m = line.match(/^\d+[.)]\s+(.*)$/))) {
      flush();
      out.push({ _type: "block", _key: key(), style: "normal", listItem: "number", level: 1, ...inline(m[1]) });
    } else para.push(line);
  }
  flush();
  return out;
}

export function portableToMarkdown(blocks: unknown): string {
  const list = (Array.isArray(blocks) ? blocks : []) as PTBlock[];
  const lines: string[] = [];
  let prevList = false;
  for (const b of list) {
    if (b._type === "image") {
      const ref = b.asset?._ref;
      if (ref) lines.push("", `![${b.alt ?? ""}](imagen:${ref})`);
      prevList = false;
      continue;
    }
    if (b._type !== "block") continue;
    const text = (b.children ?? [])
      .map((c) => {
        let t = c.text;
        for (const mk of c.marks ?? []) {
          if (mk === "strong") t = `**${t}**`;
          else if (mk === "em") t = `*${t}*`;
          else {
            const def = b.markDefs?.find((d) => d._key === mk);
            if (def?.href) t = `[${t}](${def.href})`;
          }
        }
        return t;
      })
      .join("");
    if (b.listItem) {
      if (!prevList) lines.push("");
      lines.push(`${b.listItem === "number" ? "1." : "-"} ${text}`);
      prevList = true;
      continue;
    }
    prevList = false;
    const prefix = b.style === "h2" ? "## " : b.style === "h3" ? "### " : b.style === "blockquote" ? "> " : "";
    lines.push("", `${prefix}${text}`);
  }
  return lines.join("\n").trim();
}
