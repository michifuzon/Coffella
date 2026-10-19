"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ATRIBUTOS, CAFETERIAS, type Atributo, type Cafeteria } from "@/data/comunidad";
import { Eyebrow, Prototipo } from "@/components/ui/Prototipo";

const precio = (n: number) => `$${n.toLocaleString("es-AR")}`;

export function Mapa() {
  const [filtros, setFiltros] = useState<Atributo[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [tipo, setTipo] = useState<"Todas" | Cafeteria["tipo"]>("Todas");
  const [seleccion, setSeleccion] = useState<string>("ambar");

  const resultados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return CAFETERIAS.filter(
      (c) =>
        filtros.every((f) => c.atributos.includes(f)) &&
        (tipo === "Todas" || c.tipo === tipo) &&
        (!q || c.nombre.toLowerCase().includes(q) || c.barrio.toLowerCase().includes(q)),
    );
  }, [filtros, busqueda, tipo]);

  const activa = resultados.find((c) => c.id === seleccion) ?? resultados[0];

  const toggle = (id: Atributo) =>
    setFiltros((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <section id="mapa" className="relative bg-blanco py-24 sm:py-32" aria-labelledby="mapa-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Explorar cafeterías</Eyebrow>
            <h2 id="mapa-title" className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
              Sabé cómo se vive un lugar <span className="text-naranja">antes de llegar.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <p className="max-w-sm text-cafe/70 md:text-right">
              Sin estrellitas. Te contamos si hay enchufes, cómo suena, quién está en la barra y qué te
              recomienda pedir.
            </p>
            <Prototipo />
          </div>
        </div>

        {/* Controles */}
        <div className="mt-10 flex flex-col gap-4 rounded-[2rem] bg-crema p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">Buscar por nombre o barrio</span>
              <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-cafe/50">
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscá por nombre o barrio en Córdoba"
                className="w-full rounded-full bg-blanco py-3 pl-12 pr-4 placeholder:text-cafe/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-naranja"
              />
            </label>
            <div className="flex rounded-full bg-blanco p-1" role="radiogroup" aria-label="Tipo de cafetería">
              {(["Todas", "Especialidad", "Tradicional"] as const).map((t) => (
                <button
                  key={t}
                  role="radio"
                  aria-checked={tipo === t}
                  onClick={() => setTipo(t)}
                  className={`rounded-full px-4 py-2 font-display text-sm transition-colors ${
                    tipo === t ? "bg-cafe text-blanco" : "hover:bg-amarillo"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" aria-label="Filtros">
            {ATRIBUTOS.map((a) => {
              const on = filtros.includes(a.id);
              return (
                <button
                  key={a.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(a.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    on ? "border-naranja bg-naranja text-cafe" : "border-cafe/15 bg-blanco hover:border-cafe/40"
                  }`}
                >
                  {on && <span aria-hidden>✓ </span>}
                  {a.label}
                </button>
              );
            })}
            {filtros.length > 0 && (
              <button onClick={() => setFiltros([])} className="shrink-0 px-3 text-sm underline underline-offset-4">
                Limpiar
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_1fr] [&>*]:min-w-0">
          {/* Mapa ilustrado */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-crema sm:aspect-[4/3] lg:aspect-auto lg:min-h-[560px]">
            <MapaBase />
            {CAFETERIAS.map((c) => {
              const visible = resultados.some((r) => r.id === c.id);
              const sel = activa?.id === c.id;
              return (
                <motion.button
                  key={c.id}
                  type="button"
                  onClick={() => setSeleccion(c.id)}
                  aria-label={`${c.nombre}, ${c.barrio}`}
                  aria-pressed={sel}
                  disabled={!visible}
                  className="absolute -translate-x-1/2 -translate-y-full"
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                  animate={{ opacity: visible ? 1 : 0.18, scale: sel ? 1.18 : 1, y: sel ? -6 : 0 }}
                  whileHover={visible ? { y: -6 } : undefined}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span
                    className={`sticker flex items-center gap-2 rounded-full py-1 pl-1 pr-3 font-display text-xs font-semibold ${
                      sel ? "bg-naranja" : "bg-cafe text-blanco"
                    }`}
                  >
                    <span className={`grid size-7 place-items-center rounded-full ${sel ? "bg-cafe text-blanco" : "bg-amarillo text-cafe"}`}>
                      {c.nombre.replace(/^(Café|La) /, "")[0]}
                    </span>
                    <span className={sel ? "" : "hidden sm:inline"}>{c.nombre}</span>
                  </span>
                  <span aria-hidden className={`mx-auto block h-3 w-0.5 ${sel ? "bg-naranja" : "bg-cafe"}`} />
                </motion.button>
              );
            })}
            <p className="absolute bottom-4 left-4 rounded-full bg-blanco/85 px-3 py-1.5 text-xs backdrop-blur" aria-live="polite">
              {resultados.length === 1 ? "1 lugar" : `${resultados.length} lugares`} con lo que buscás
            </p>
          </div>

          {/* Ficha */}
          <div className="min-w-0 rounded-[2rem] bg-cafe p-6 text-blanco sm:min-h-[480px] sm:p-8" aria-live="polite">
            <AnimatePresence mode="wait">
              {activa ? (
                <motion.article
                  key={activa.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="flex h-full flex-col"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-xs uppercase tracking-widest text-amarillo">
                        {activa.tipo} · {activa.barrio}
                      </p>
                      <h3 className="mt-2 font-display text-3xl font-semibold">{activa.nombre}</h3>
                    </div>
                    <span className="shrink-0 whitespace-nowrap rounded-full bg-blanco/10 px-3 py-1 text-xs">Act. {activa.actualizado}</span>
                  </div>

                  <dl className="mt-6 grid gap-4 text-sm">
                    <div>
                      <dt className="text-blanco/50">Cómo se vive</dt>
                      <dd className="mt-1 text-base">{activa.ambiente}</dd>
                    </div>
                    <div>
                      <dt className="text-blanco/50">Cómo suena</dt>
                      <dd className="mt-1 text-base">{activa.musica}</dd>
                    </div>
                    <div>
                      <dt className="text-blanco/50">Granos</dt>
                      <dd className="mt-1 text-base">{activa.granos}</dd>
                    </div>
                  </dl>

                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Características">
                    {activa.atributos.map((a) => (
                      <li key={a} className="rounded-full bg-blanco/10 px-3 py-1 text-xs">
                        {ATRIBUTOS.find((x) => x.id === a)?.label}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-2xl bg-naranja p-4 text-cafe">
                    <p className="font-display text-xs uppercase tracking-widest opacity-70">
                      Hoy en la barra: {activa.baristaDeTurno}
                    </p>
                    <p className="mt-1 font-display text-lg leading-snug">“{activa.recomienda}”</p>
                  </div>

                  <table className="mt-6 w-full text-sm">
                    <caption className="sr-only">Carta y precios</caption>
                    <tbody>
                      {activa.carta.map((i) => (
                        <tr key={i.item} className="border-b border-blanco/10 last:border-0">
                          <th scope="row" className="py-2 text-left font-normal">{i.item}</th>
                          <td className="py-2 text-right font-display">{precio(i.precio)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.article>
              ) : (
                <motion.div key="vacio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <p className="font-display text-2xl font-semibold">Nada por acá con esa combinación.</p>
                  <p className="max-w-xs text-blanco/70">Probá sacando un filtro. O contanos qué lugar falta, seguro alguien lo conoce.</p>
                  <button onClick={() => { setFiltros([]); setBusqueda(""); setTipo("Todas"); }} className="rounded-full bg-amarillo px-5 py-2.5 font-display text-sm font-semibold text-cafe">
                    Ver todos los lugares
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Mapa ilustrado de Córdoba (simplificado): calles, parques y el río Suquía. */
function MapaBase() {
  return (
    <svg aria-hidden viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
      <rect width="400" height="300" fill="var(--crema)" />
      <g stroke="var(--blanco)" strokeWidth="5" strokeLinecap="round">
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`v${i}`} x1={i * 36 + 8} y1="-10" x2={i * 36 - 20} y2="310" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`h${i}`} x1="-10" y1={i * 34 + 6} x2="410" y2={i * 34 + 18} />
        ))}
      </g>
      <g stroke="var(--blanco)" strokeWidth="10" strokeLinecap="round" fill="none">
        <path d="M-10 150 Q 120 130 230 160 T 420 120" />
        <path d="M210 -10 L 240 310" />
      </g>
      {/* Parques: formas orgánicas con arbolitos, sobre la grilla */}
      <g>
        <path d="M188 214c14-12 46-14 66-6s26 26 14 40-44 20-66 14-28-36-14-48Z" fill="#e2dfc4" />
        <path d="M312 206c10-8 30-8 38 2s4 26-10 30-30 2-34-10 0-16 6-22Z" fill="#e2dfc4" />
        <g fill="var(--amarillo)" opacity=".9">
          {[[208, 228], [224, 222], [240, 230], [216, 244], [234, 246], [252, 240], [322, 216], [336, 222], [328, 232]].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4.5" />
          ))}
        </g>
        <text x="200" y="272" fontSize="8" fill="var(--cafe)" opacity=".45" fontFamily="var(--font-sora)">Parque Sarmiento</text>
      </g>
      <path d="M-10 92 C 60 70, 110 120, 170 98 S 290 60, 410 84" fill="none" stroke="var(--amarillo)" strokeWidth="14" strokeLinecap="round" />
      <text x="330" y="74" fontSize="9" fill="var(--cafe)" opacity=".45" fontFamily="var(--font-sora)">Río Suquía</text>
    </svg>
  );
}
