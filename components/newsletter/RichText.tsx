import { Fragment } from "react";

/** Texto de los boletines: `**así**` sale en negrita. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-tinta">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
