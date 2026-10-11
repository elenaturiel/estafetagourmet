/**
 * Pasa el texto del panel (Portable Text de Sanity) a HTML sencillo para un
 * correo: párrafos, subtítulos, citas, listas, negrita, cursiva, enlaces y fotos.
 */
type Span = { _type: "span"; text: string; marks?: string[] };
type Block = {
  _type: string;
  style?: string;
  listItem?: string;
  children?: Span[];
  markDefs?: { _key: string; _type: string; href?: string }[];
  asset?: unknown;
  alt?: string;
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function inline(block: Block): string {
  return (block.children ?? [])
    .map((c) => {
      let html = esc(c.text).replace(/\n/g, "<br>");
      for (const mark of c.marks ?? []) {
        if (mark === "strong") html = `<strong>${html}</strong>`;
        else if (mark === "em") html = `<em>${html}</em>`;
        else {
          const def = block.markDefs?.find((d) => d._key === mark);
          if (def?.href && /^(https?:|mailto:)/.test(def.href))
            html = `<a href="${esc(def.href)}" style="color:#6e1f2e;text-decoration:underline">${html}</a>`;
        }
      }
      return html;
    })
    .join("");
}

const P = "margin:0 0 16px;font-size:16px;line-height:1.6;color:#2a1f1a";

export function portableToHtml(blocks: unknown, imageUrl: (asset: unknown) => string | undefined): string {
  const list = (Array.isArray(blocks) ? blocks : []) as Block[];
  let html = "";
  let open: "ul" | "ol" | null = null;
  const close = () => {
    if (open) html += `</${open}>`;
    open = null;
  };
  for (const b of list) {
    if (b._type === "image") {
      close();
      const src = imageUrl(b);
      if (src) html += `<img src="${esc(src)}" alt="${esc(b.alt ?? "")}" width="560" style="display:block;width:100%;height:auto;margin:0 0 16px;border:0">`;
      continue;
    }
    if (b._type !== "block") continue;
    if (b.listItem) {
      const tag = b.listItem === "number" ? "ol" : "ul";
      if (open !== tag) {
        close();
        html += `<${tag} style="margin:0 0 16px;padding-left:22px;font-size:16px;line-height:1.6;color:#2a1f1a">`;
        open = tag;
      }
      html += `<li style="margin:0 0 6px">${inline(b)}</li>`;
      continue;
    }
    close();
    const text = inline(b);
    if (!text.trim()) continue;
    if (b.style === "h2") html += `<h2 style="margin:24px 0 10px;font-family:Georgia,serif;font-size:24px;line-height:1.25;font-weight:normal;color:#2a1f1a">${text}</h2>`;
    else if (b.style === "h3") html += `<h3 style="margin:20px 0 8px;font-family:Georgia,serif;font-size:19px;line-height:1.3;font-weight:normal;color:#2a1f1a">${text}</h3>`;
    else if (b.style === "blockquote") html += `<blockquote style="margin:0 0 16px;padding:4px 0 4px 16px;border-left:3px solid #e2b872;font-family:Georgia,serif;font-size:18px;font-style:italic;line-height:1.5;color:#5e4e43">${text}</blockquote>`;
    else html += `<p style="${P}">${text}</p>`;
  }
  close();
  return html;
}
