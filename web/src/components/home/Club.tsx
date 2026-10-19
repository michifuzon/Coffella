"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MiradaIsotipo } from "@/components/brand/MiradaIsotipo";
import { Eyebrow, Prototipo } from "@/components/ui/Prototipo";
import { VerMas } from "@/components/ui/VerMas";
import { RUTAS } from "@/lib/site";

const TOTAL = 8;

export function Club({ page = false }: { page?: boolean }) {
  const Title = page ? "h1" : "h2";
  const [sellos, setSellos] = useState(5);
  const lleno = sellos >= TOTAL;

  return (
    <section id="club" className={`relative overflow-hidden bg-blanco ${page ? "pb-24 pt-32 sm:pb-32 sm:pt-40" : "py-24 sm:py-32"}`} aria-labelledby="club-title">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <Eyebrow>Coffella Club</Eyebrow>
          <Title id="club-title" className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
            Beneficios sin competencia.
          </Title>
          <p className="mt-5 max-w-md text-lg text-cafe/80">
            Una tarjeta de sellos de las de siempre, en el celular. Juntás cafés en las cafeterías del club
            y te llevás uno de regalo. Nada más. Nada menos.
          </p>
          <ul className="mt-8 grid gap-3">
            {["Sin rankings", "Sin retos que vencen", "Sin niveles que perseguir", "A tu ritmo"].map((t) => (
              <li key={t} className="flex items-center gap-3 font-display text-lg">
                <span className="grid size-7 place-items-center rounded-full bg-naranja" aria-hidden>
                  <svg viewBox="0 0 16 16" className="size-3.5"><path d="m3.5 8 3 3 6-6" stroke="var(--cafe)" strokeWidth="2.2" fill="none" strokeLinecap="round" /></svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-[1.75rem] bg-crema p-6">
            <p className="font-display text-sm font-semibold">¿Tenés una cafetería?</p>
            <p className="mt-1 text-sm text-cafe/75">
              Sumate al club y mirá cómo vuelve tu gente: tasa de retorno, canjes y qué promociones funcionan. Sin
              exponer a nadie.
            </p>
          </div>
        </div>

        <div className="relative">
          <div aria-hidden className="absolute -inset-6 rounded-[3rem] bg-degradado opacity-80 blur-2xl" />
          <div className="relative rounded-[2.5rem] bg-cafe p-6 text-blanco shadow-2xl sm:p-10">
            <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:justify-between">
              <div>
                <p className="font-display text-xs uppercase tracking-widest text-amarillo">Tarjeta de sellos</p>
                <p className="mt-1 font-display text-2xl font-semibold">Café Ámbar</p>
              </div>
              <Prototipo className="shrink-0 text-blanco" />
            </div>

            <ol className="mt-8 grid grid-cols-4 gap-3" aria-label={`${sellos} de ${TOTAL} sellos`}>
              {Array.from({ length: TOTAL }, (_, i) => {
                const on = i < sellos;
                return (
                  <li key={i} className="aspect-square">
                    <div className={`grid size-full place-items-center rounded-full border-2 ${on ? "border-naranja bg-naranja" : "border-dashed border-blanco/30"}`}>
                      <AnimatePresence>
                        {on && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="w-3/4"
                          >
                            <MiradaIsotipo className="w-full" cupColor="var(--cafe)" eyeColor="var(--naranja)" title="" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {!on && i === TOTAL - 1 && <span className="font-display text-xs text-blanco/60">gratis</span>}
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="mt-6 text-center font-display text-lg" aria-live="polite">
              {lleno ? "¡El próximo va por la casa!" : `${sellos} de ${TOTAL} sellos · el 8.º es gratis`}
            </p>

            <div className="mt-6 flex gap-3">
              {lleno ? (
                <button onClick={() => setSellos(0)} className="flex-1 rounded-full bg-amarillo py-3.5 font-display font-semibold text-cafe">
                  Canjear mi café
                </button>
              ) : (
                <button
                  onClick={() => setSellos((s) => Math.min(TOTAL, s + 1))}
                  className="flex-1 rounded-full bg-naranja py-3.5 font-display font-semibold text-cafe transition-transform active:scale-95"
                >
                  Validar en barra
                </button>
              )}
            </div>
            <p className="mt-4 text-center text-xs text-blanco/50">Tocá “Validar en barra” para probar cómo funciona.</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {page ? <PanelCafeterias /> : (
          <div className="mt-14 flex justify-center">
            <VerMas href={RUTAS.club}>Cómo funciona el club</VerMas>
          </div>
        )}
      </div>
    </section>
  );
}

// Datos de ejemplo: visitas de socios del club por semana en una cafetería.
const SEMANAS = [
  { s: "Sem 1", v: 62 },
  { s: "Sem 2", v: 71 },
  { s: "Sem 3", v: 68 },
  { s: "Sem 4", v: 84 },
  { s: "Sem 5", v: 79 },
  { s: "Sem 6", v: 93 },
];

function PanelCafeterias() {
  const [hover, setHover] = useState<number | null>(null);
  const max = 100;
  return (
    <div className="mt-20 grid gap-6 rounded-[2.5rem] bg-crema p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="font-display text-sm uppercase tracking-widest text-cafe/60">Para cafeterías</p>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">Mirá cómo vuelve tu gente.</h2>
        <p className="mt-4 max-w-md text-cafe/80">
          Métricas simples del club para tomar mejores decisiones: quién vuelve, cuántos canjes hubo y qué promociones
          funcionaron. Siempre en números agregados, sin exponer a nadie.
        </p>
        <dl className="mt-8 grid grid-cols-3 gap-3">
          {[
            ["42%", "vuelve en 30 días"],
            ["126", "canjes del mes"],
            ["+18%", "visitas con promo"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl bg-blanco p-4">
              <dt className="sr-only">{l}</dt>
              <dd className="font-display text-2xl font-semibold sm:text-3xl">{n}</dd>
              <dd className="mt-1 text-xs text-cafe/70">{l}</dd>
            </div>
          ))}
        </dl>
        <Prototipo className="mt-6" />
      </div>

      <figure className="rounded-[2rem] bg-blanco p-6">
        <figcaption className="font-display font-semibold">Visitas de socios por semana</figcaption>
        <div className="relative mt-6 flex h-52 items-end gap-[2px] border-b border-cafe/15" role="img" aria-label="Visitas por semana, de 62 a 93">
          {[25, 50, 75].map((g) => (
            <span key={g} aria-hidden className="absolute inset-x-0 border-t border-dashed border-cafe/10" style={{ bottom: `${g}%` }} />
          ))}
          {SEMANAS.map((d, i) => (
            <button
              key={d.s}
              type="button"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              aria-label={`${d.s}: ${d.v} visitas`}
              className="relative flex h-full flex-1 items-end justify-center px-2"
            >
              <span
                className={`block w-full max-w-10 rounded-t-[4px] transition-colors ${hover === i ? "bg-cafe" : "bg-naranja"}`}
                style={{ height: `${(d.v / max) * 100}%` }}
              />
              {hover === i && (
                <span className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-cafe px-2.5 py-1 text-xs text-blanco">
                  {d.v} visitas
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="mt-2 flex gap-[2px] text-center text-xs text-cafe/60">
          {SEMANAS.map((d) => (
            <span key={d.s} className="flex-1">{d.s}</span>
          ))}
        </div>
        <table className="sr-only">
          <caption>Visitas de socios por semana</caption>
          <tbody>
            {SEMANAS.map((d) => (
              <tr key={d.s}><th scope="row">{d.s}</th><td>{d.v}</td></tr>
            ))}
          </tbody>
        </table>
      </figure>
    </div>
  );
}
