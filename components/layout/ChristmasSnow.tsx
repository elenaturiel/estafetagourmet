/**
 * Nieve cayendo (modo Navidad, temporal). Puramente decorativa:
 * no recibe clics y se oculta con «reducir movimiento». Estilos en app/navidad.css.
 */
const FLAKES = Array.from({ length: 55 }, (_, i) => {
  // Valores fijos pseudoaleatorios para que el servidor y el navegador pinten lo mismo.
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return {
    left: `${(r(1) * 100).toFixed(2)}%`,
    size: `${(10 + r(2) * 14).toFixed(1)}px`,
    fall: `${(9 + r(3) * 10).toFixed(1)}s`,
    sway: `${(2.5 + r(4) * 3).toFixed(1)}s`,
    delay: `-${(r(5) * 18).toFixed(1)}s`,
    opacity: (0.55 + r(6) * 0.45).toFixed(2),
  };
});

export function ChristmasSnow() {
  return (
    <div className="navidad-nieve" aria-hidden="true">
      {FLAKES.map((f, i) => (
        <span
          key={i}
          style={{
            left: f.left,
            fontSize: f.size,
            opacity: Number(f.opacity),
            animationDuration: `${f.fall}, ${f.sway}`,
            animationDelay: `${f.delay}, ${f.delay}`,
          }}
        >
          ❄
        </span>
      ))}
    </div>
  );
}
