import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { RUTAS } from "@/lib/site";

const COLS = [
  {
    t: "Descubrí",
    l: [
      ["Cafeterías", RUTAS.cafeterias],
      ["Agenda", RUTAS.agenda],
      ["Personas", RUTAS.personas],
    ],
  },
  {
    t: "Participá",
    l: [
      ["Comunidad", RUTAS.comunidad],
      ["Club", RUTAS.club],
      ["Sumate", RUTAS.sumate],
    ],
  },
  { t: "Cuidado", l: [["Privacidad", RUTAS.privacidad]] },
] as const;

export function Footer() {
  return (
    <footer className="bg-cafe text-blanco">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <Link href={RUTAS.inicio} aria-label="Coffella, inicio">
              <Logo bajada tone="blanco" className="h-16 w-auto sm:h-20" />
            </Link>
            <p className="mt-6 max-w-xs text-blanco/70">
              Hay más detrás de esta taza. Una comunidad de fellows unidos por el café.
            </p>
          </div>
          <nav aria-label="Pie de página" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLS.map((c) => (
              <div key={c.t}>
                <p className="font-display text-sm font-semibold text-amarillo">{c.t}</p>
                <ul className="mt-4 grid gap-2 text-sm">
                  {c.l.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="text-blanco/75 transition-colors hover:text-naranja">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <p className="mt-16 border-t border-blanco/10 pt-6 text-xs text-blanco/50">
          © 2026 Coffella · Comunidad cafetera. Hecho en Córdoba, con mucho café de por medio.
        </p>
      </div>
    </footer>
  );
}
