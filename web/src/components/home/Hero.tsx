"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MiradaIsotipo } from "@/components/brand/MiradaIsotipo";

// Personas de ejemplo. Los nombres son ficticios: ilustran quiénes forman la comunidad.
const FELLOWS = [
  { name: "Sofi", role: "Barista", tone: "bg-naranja", pos: "left-[2%] top-[6%]", rot: -8 },
  { name: "Tomás", role: "Tostador", tone: "bg-cafe text-blanco", pos: "right-[0%] top-[14%]", rot: 6 },
  { name: "Lu", role: "Fan del café", tone: "bg-amarillo", pos: "left-[0%] bottom-[18%]", rot: 5 },
  { name: "Café Ámbar", role: "Cafetería", tone: "bg-crema", pos: "right-[4%] bottom-[8%]", rot: -5 },
  { name: "Nico", role: "Recién llegado", tone: "bg-blanco", pos: "left-[34%] bottom-[0%]", rot: -3 },
];

const ease = [0.2, 0.8, 0.2, 1] as const;

export function Hero() {
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const enter = (delay: number) =>
    reduce ? {} : { initial: { y: 24, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.7, delay, ease } };

  return (
    <section className="grain relative overflow-hidden" aria-labelledby="hero-title">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] top-[10%] h-[80vmin] w-[90vmin] rounded-full bg-degradado opacity-60 blur-3xl"
      />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-8 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:pt-24">
        <div className="relative z-10 text-center lg:text-left">
          <motion.p {...enter(0)} className="inline-flex items-center gap-2 rounded-full bg-amarillo px-3.5 py-1 font-display text-sm">
            <span className="size-2 rounded-full bg-naranja" aria-hidden />
            Comunidad cafetera
          </motion.p>

          <motion.h1
            id="hero-title"
            {...enter(0.08)}
            className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight"
          >
            Detrás de cada taza hay{" "}
            <span className="relative whitespace-nowrap">
              <span aria-hidden className="absolute -inset-x-2 bottom-[0.06em] top-[0.18em] -z-10 -rotate-1 rounded-2xl bg-naranja" />
              alguien.
            </span>
          </motion.h1>

          <motion.p {...enter(0.16)} className="mx-auto mt-6 max-w-xl text-lg text-cafe/80 sm:text-xl lg:mx-0">
            Coffella es donde baristas, cafeterías, tostadores y fans del café se encuentran. Para descubrir
            lugares, conocer a quién hizo tu café y encontrar tu propio lugar en la mesa.
          </motion.p>

          <motion.div {...enter(0.24)} className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href="#lado" className="rounded-full bg-cafe px-6 py-3.5 font-display font-semibold text-blanco transition-transform hover:-translate-y-0.5">
              Encontrá tu lugar
            </a>
            <a href="#mapa" className="rounded-full border-2 border-cafe px-6 py-3 font-display font-semibold transition-colors hover:bg-amarillo">
              Explorar cafeterías
            </a>
          </motion.div>
        </div>

        {/* La taza mira a quien pase; alrededor, la gente que forma la comunidad */}
        <div ref={stage} className="relative mx-auto aspect-[5/4] w-full max-w-[560px]">
          <motion.div
            className="absolute inset-x-[8%] top-1/2 -translate-y-1/2"
            initial={reduce ? false : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            <MiradaIsotipo className="w-full drop-shadow-[0_24px_32px_rgba(54,30,28,0.16)]" />
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
              initial={reduce ? false : { opacity: 0, y: 16, rotate: f.rot }}
              animate={{ opacity: 1, y: 0, rotate: f.rot }}
              transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 220, damping: 18 }}
              className={`sticker absolute z-20 flex cursor-grab touch-none select-none items-center gap-2 rounded-full py-1 pl-1 pr-3 font-display text-xs active:cursor-grabbing sm:py-1.5 sm:pl-1.5 sm:pr-4 sm:text-sm ${f.tone} ${f.pos}`}
              aria-label={`${f.name}, ${f.role}`}
            >
              <span className="grid size-7 place-items-center rounded-full bg-cafe font-semibold text-blanco ring-2 ring-blanco/60 sm:size-8">
                {f.name[0]}
              </span>
              <span className="text-left leading-tight">
                <span className="block font-semibold">{f.name}</span>
                <span className="block opacity-75">{f.role}</span>
              </span>
            </motion.button>
          ))}

          <p className="absolute -bottom-8 inset-x-0 hidden text-center font-display text-xs text-cafe/55 lg:block">
            Mové el mouse. Arrastrá a cualquiera. Acá todos tienen lugar.
          </p>
        </div>
      </div>
    </section>
  );
}
