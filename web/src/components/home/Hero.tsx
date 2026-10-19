"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MiradaIsotipo } from "@/components/brand/MiradaIsotipo";

// Personas de ejemplo. Los nombres son ficticios: ilustran quiénes forman la comunidad.
const FELLOWS = [
  { name: "Sofi", role: "Barista", tone: "bg-naranja", pos: "left-[4%] top-[18%]", rot: -8 },
  { name: "Tomás", role: "Tostador", tone: "bg-cafe text-blanco", pos: "right-[6%] top-[12%]", rot: 6 },
  { name: "Lu", role: "Fan del café", tone: "bg-amarillo", pos: "left-[10%] bottom-[16%]", rot: 5 },
  { name: "Café Ámbar", role: "Cafetería", tone: "bg-crema", pos: "right-[3%] bottom-[22%]", rot: -5 },
  { name: "Juli", role: "Head roaster", tone: "bg-amarillo", pos: "left-[30%] top-[4%]", rot: 3 },
  { name: "Nico", role: "Recién llegado", tone: "bg-blanco", pos: "right-[28%] bottom-[4%]", rot: -4 },
];

export function Hero() {
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  return (
    <section className="grain relative overflow-hidden pt-28 sm:pt-32" aria-labelledby="hero-title">
      {/* halo degradado oficial, detrás de la taza */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[44%] h-[70vmin] w-[110vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-degradado opacity-70 blur-3xl"
      />

      <div ref={stage} className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <h1 id="hero-title" className="relative z-10 text-center font-display font-semibold leading-[1] tracking-tight">
          <motion.span
            className="block text-[clamp(2.1rem,5.6vw,5.25rem)]"
            initial={reduce ? false : { y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          >
            Detrás de cada taza
          </motion.span>
        </h1>

        {/* Escenario: la taza mira, los fellows se mueven alrededor */}
        <div className="relative mx-auto mt-4 h-[clamp(200px,34vw,400px)] max-w-5xl">
          <motion.div
            className="absolute inset-x-0 top-1/2 mx-auto w-[min(72%,460px)] -translate-y-1/2"
            initial={reduce ? false : { scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <MiradaIsotipo className="w-full drop-shadow-[0_30px_40px_rgba(54,30,28,0.18)]" />
          </motion.div>

          {FELLOWS.map((f, i) => (
            <motion.button
              key={f.name}
              type="button"
              drag={!reduce}
              dragConstraints={stage}
              dragElastic={0.2}
              whileHover={{ scale: 1.06, rotate: 0 }}
              whileDrag={{ scale: 1.1, rotate: 0, zIndex: 30 }}
              initial={reduce ? false : { opacity: 0, y: 20, rotate: f.rot }}
              animate={{ opacity: 1, y: 0, rotate: f.rot }}
              transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 220, damping: 18 }}
              className={`sticker absolute z-20 hidden cursor-grab touch-none select-none items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 font-display text-sm active:cursor-grabbing sm:flex ${f.tone} ${f.pos}`}
              aria-label={`${f.name}, ${f.role}`}
            >
              <span className="grid size-8 place-items-center rounded-full bg-cafe font-semibold text-blanco ring-2 ring-blanco/60">
                {f.name[0]}
              </span>
              <span className="text-left leading-tight">
                <span className="block font-semibold">{f.name}</span>
                <span className="block text-xs opacity-75">{f.role}</span>
              </span>
            </motion.button>
          ))}
        </div>

        <motion.p
          aria-hidden
          className="relative z-10 -mt-2 text-center font-display text-[clamp(2.1rem,5.6vw,5.25rem)] font-semibold leading-[1] tracking-tight"
          initial={reduce ? false : { y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
        >
          hay{" "}
          <span className="relative inline-block">
            <span className="absolute -inset-x-3 -inset-y-1 -z-10 rounded-[2rem] bg-amarillo" />
            alguien.
          </span>
        </motion.p>
        <span className="sr-only">hay alguien.</span>

        <div className="relative z-10 mx-auto mt-10 flex max-w-2xl flex-col items-center gap-6 pb-20 text-center">
          <p className="text-lg text-cafe/80 sm:text-xl">
            Coffella es la comunidad donde baristas, cafeterías, tostadores y fans del café se
            encuentran. Para descubrir lugares, conocer a quién hizo tu café y encontrar tu propio
            lugar en la mesa.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#lado"
              className="rounded-full bg-cafe px-6 py-3.5 font-display font-semibold text-blanco transition-transform hover:-translate-y-0.5"
            >
              Encontrá tu lugar
            </a>
            <a
              href="#mapa"
              className="rounded-full border-2 border-cafe px-6 py-3 font-display font-semibold transition-colors hover:bg-amarillo"
            >
              Explorar cafeterías
            </a>
          </div>
          <p className="hidden font-display text-xs text-cafe/60 sm:block">
            Psst: mové el mouse. Arrastrá a cualquiera. Acá todos tienen lugar.
          </p>
        </div>
      </div>
    </section>
  );
}
