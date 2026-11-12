import "server-only";

/** Documento de Sanity que recuerda que un boletín de la web (data/newsletters.ts) ya se envió a la lista. */
export const webIssueSentId = (slug: string) => `boletinWebEnviado-${slug}`;

/** Lo que hace falta de un boletín para escribirlo en el correo. */
export type IssueForEmail = {
  subtitle?: string;
  lead?: string;
  stats?: { value: string; label: string }[];
  sections?: { title: string; paragraphs?: string[]; list?: string[]; tip?: string }[];
};

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** Escapa el texto y pasa `**así**` a negrita, como en la web. */
const rich = (t: string) => esc(t).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

const p = (t: string) => `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#2a1f1a">${rich(t)}</p>`;
const h2 = (t: string) =>
  `<h2 style="margin:24px 0 10px;font-family:Georgia,serif;font-size:24px;line-height:1.25;font-weight:normal;color:#2a1f1a">${esc(t)}</h2>`;

/** Cuerpo del correo de un boletín: subtítulo, entradilla, cifras y secciones. */
export function issueBodyHtml(issue: IssueForEmail): string {
  const stats = (issue.stats ?? [])
    .map(
      (x) =>
        `<td style="padding:8px 10px 8px 0;vertical-align:top;font-size:13px;line-height:1.4;color:#5e4e43"><span style="display:block;font-family:Georgia,serif;font-size:22px;color:#6e1f2e">${esc(x.value)}</span>${esc(x.label)}</td>`,
    )
    .join("");
  return (
    (issue.subtitle ? `<p style="margin:0 0 16px;font-family:Georgia,serif;font-size:19px;font-style:italic;color:#6e1f2e">${esc(issue.subtitle)}</p>` : "") +
    p(issue.lead ?? "") +
    (stats ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px"><tr>${stats}</tr></table>` : "") +
    (issue.sections ?? [])
      .map(
        (sec) =>
          h2(sec.title) +
          (sec.paragraphs ?? []).map(p).join("") +
          (sec.list?.length
            ? `<ul style="margin:0 0 16px;padding-left:22px;font-size:16px;line-height:1.6;color:#2a1f1a">${sec.list.map((li) => `<li style="margin:0 0 6px">${rich(li)}</li>`).join("")}</ul>`
            : "") +
          (sec.tip
            ? `<p style="margin:0 0 16px;padding:12px 16px;background:#f6f0e4;border-left:3px solid #e2b872;font-size:15px;line-height:1.55;color:#2a1f1a"><strong>Consejo Estafeta:</strong> ${rich(sec.tip)}</p>`
            : ""),
      )
      .join("")
  );
}
