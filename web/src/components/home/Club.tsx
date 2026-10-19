"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MiradaIsotipo } from "@/components/brand/MiradaIsotipo";
import { Eyebrow, Prototipo } from "@/components/ui/Prototipo";

const TOTAL = 8;

export function Club() {
  const [sellos, setSellos] = useState(5);
  const lleno = sellos >= TOTAL;

  return (
    <section id="club" className="relative overflow-hidden bg-blanco py-24 sm:py-32" aria-labelledby="club-title">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <Eyebrow>Coffella Club</Eyebrow>
          <h2 id="club-title" className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
            Beneficios sin competencia.
          </h2>
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
    </section>
  );
}
