import { dmSans, fraunces } from "../fonts";
import "../globals.css";

/** El panel del blog (Sanity Studio) no usa los idiomas ni la estructura de la web. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
