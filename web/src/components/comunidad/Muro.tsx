"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MOMENTOS, TIPOS_MOMENTO, type Momento, type TipoMomento } from "@/data/comunidad";
import { MiradaIsotipo } from "@/components/brand/MiradaIsotipo";
import { Eyebrow, Prototipo } from "@/components/ui/Prototipo";

const ESTILO: Record<TipoMomento, { card: string; etiqueta: string }> = {
  recomendacion: { card: "bg-amarillo", etiqueta: "Recomienda" },
  gracias: { card: "bg-naranja", etiqueta: "Agradece" },
  oportunidad: { card: "bg-cafe text-blanco", etiqueta: "Oportunidad" },
  aprendizaje: { card: "bg-blanco", etiqueta: "Comparte" },
};

export function Muro() {
  const [tipo, setTipo] = useState<TipoMomento | null>(null);
  const [borrador, setBorrador] = useState("");
  const [enviado, setEnviado] = useState(false);
  const lista = MOMENTOS.filter((m) => !tipo || m.tipo === tipo);

  return (
    <section className="relative bg-crema pb-24 pt-32 sm:pb-32 sm:pt-40" aria-labelledby="comunidad-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div data-reveal className="grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Eyebrow className="bg-blanco">Comunidad</Eyebrow>
            <h1 id="comunidad-title" className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
              El café se termina. Lo que pasa alrededor, se queda.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-cafe/80">
              Un barista aprende de otro. Alguien recomienda un lugar que acaba de conocer. Una cafetería encuentra a
              su próxima barista. Acá se ve todo lo que pasa cuando las personas se encuentran.
            </p>
          </div>
          <div className="flex items-end justify-start gap-4 lg:justify-end">
            <MiradaIsotipo className="w-40 sm:w-52" />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar momentos">
          <button
            onClick={() => setTipo(null)}
            aria-pressed={tipo === null}
            className={`rounded-full px-4 py-2 font-display text-sm transition-colors ${tipo === null ? "bg-cafe text-blanco" : "bg-blanco hover:bg-amarillo"}`}
          >
            Todo
          </button>
          {TIPOS_MOMENTO.map((t) => (
            <button
              key={t.id}
              onClick={() => setTipo(tipo === t.id ? null : t.id)}
              aria-pressed={tipo === t.id}
              className={`rounded-full px-4 py-2 font-display text-sm transition-colors ${tipo === t.id ? "bg-cafe text-blanco" : "bg-blanco hover:bg-amarillo"}`}
            >
              {t.label}
            </button>
          ))}
          <Prototipo className="ml-auto" />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_340px]">
          <motion.ul layout className="columns-1 gap-4 sm:columns-2 [&>li]:mb-4">
            <AnimatePresence initial={false}>
              {lista.map((m) => (
                <motion.li
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="break-inside-avoid"
                >
                  <MomentoCard m={m} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          <aside className="h-fit rounded-[2rem] bg-blanco p-6 lg:sticky lg:top-28">
            {enviado ? (
              <div role="status" className="text-center">
                <MiradaIsotipo className="mx-auto w-24" />
                <p className="mt-4 font-display text-xl font-semibold">¡Qué lindo eso!</p>
                <p className="mt-2 text-sm text-cafe/70">
                  Cuando Coffella abra, estos mensajes le van a llegar a quien se los merece. Por ahora es un prototipo y
                  no se publica nada.
                </p>
                <button onClick={() => { setEnviado(false); setBorrador(""); }} className="mt-4 text-sm underline underline-offset-4">
                  Escribir otro
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (borrador.trim().length > 3) setEnviado(true);
                }}
              >
                <label htmlFor="momento" className="font-display text-xl font-semibold">
                  ¿Te alegró la mañana? Decíselo.
                </label>
                <p className="mt-1 text-sm text-cafe/70">Un gracias, una recomendación, algo que aprendiste.</p>
                <textarea
                  id="momento"
                  value={borrador}
                  onChange={(e) => setBorrador(e.target.value)}
                  rows={4}
                  maxLength={280}
                  placeholder="Ej: Gracias Sofi por el filtrado de ayer…"
                  className="mt-4 w-full resize-none rounded-2xl border-2 border-cafe/15 bg-blanco p-3 focus:border-cafe focus:outline-none"
                />
                <div className="mt-1 flex justify-between text-xs text-cafe/70">
                  <span>Sin estrellas ni puntajes.</span>
                  <span>{borrador.length}/280</span>
                </div>
                <button
                  type="submit"
                  disabled={borrador.trim().length <= 3}
                  className="mt-4 w-full rounded-full bg-cafe py-3 font-display font-semibold text-blanco transition-opacity disabled:opacity-40"
                >
                  Compartir
                </button>
              </form>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

function MomentoCard({ m }: { m: Momento }) {
  const e = ESTILO[m.tipo];
  return (
    <article className={`rounded-[1.75rem] p-6 ${e.card}`}>
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cafe font-display font-semibold text-blanco ring-2 ring-blanco/50">
          {m.de[0]}
        </span>
        <p className="text-sm leading-tight">
          <strong className="font-display font-semibold">{m.de}</strong>
          <span className="block opacity-85">{m.rolDe}</span>
        </p>
        {m.para && (
          <p className="ml-auto flex items-center gap-1.5 text-sm">
            <svg viewBox="0 0 16 16" className="size-4 opacity-60" aria-hidden>
              <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
            <span className="sr-only">para</span>
            <strong className="font-display font-semibold">{m.para}</strong>
          </p>
        )}
      </div>
      <p className="mt-4 font-display text-lg leading-snug">{m.texto}</p>
      <p className="mt-4 flex flex-wrap gap-x-2 text-xs opacity-85">
        <span className="font-semibold uppercase tracking-wider">{e.etiqueta}</span>
        {m.lugar && <span>· {m.lugar}</span>}
        <span>· {m.hace}</span>
      </p>
    </article>
  );
}
